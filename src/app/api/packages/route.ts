import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { packageSchema } from "@/lib/validations";

// ── GET /api/packages ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));
    const category = searchParams.get("category");
    const tier = searchParams.get("tier");

    const where: Record<string, unknown> = all ? {} : { isActive: true };
    if (category) where.category = category;
    if (tier) where.tier = tier;

    const [packages, total] = await Promise.all([
      db.package.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.package.count({ where }),
    ]);

    return apiResponse({ packages, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/packages ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const pkg = await db.package.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        tier: data.tier,
        description: data.description,
        price: data.price ?? null,
        priceUnit: data.priceUnit || null,
        includes: data.includes || "[]",
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(pkg, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/packages ───────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Package ID is required", 400);
    }

    const partialSchema = packageSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.package.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Package not found", 404);
    }

    const pkg = await db.package.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(pkg);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/packages ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Package ID is required", 400);
    }

    const existing = await db.package.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Package not found", 404);
    }

    await db.package.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
