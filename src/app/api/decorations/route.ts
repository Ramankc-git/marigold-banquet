import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { decorationThemeSchema } from "@/lib/validations";

// ── GET /api/decorations ───────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));
    const category = searchParams.get("category");

    const where: Record<string, unknown> = all ? {} : { isActive: true };
    if (category) where.category = category;

    const [themes, total] = await Promise.all([
      db.decorationTheme.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
        include: { photos: { orderBy: { order: "asc" } } },
      }),
      db.decorationTheme.count({ where }),
    ]);

    return apiResponse({ themes, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/decorations ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = decorationThemeSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const theme = await db.decorationTheme.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        tier: data.tier,
        description: data.description,
        includes: data.includes || "[]",
        price: data.price ?? null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
      include: { photos: true },
    });

    return apiResponse(theme, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/decorations ─────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Decoration theme ID is required", 400);
    }

    const partialSchema = decorationThemeSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.decorationTheme.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Decoration theme not found", 404);
    }

    const theme = await db.decorationTheme.update({
      where: { id },
      data: parsed.data,
      include: { photos: true },
    });

    return apiResponse(theme);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/decorations ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Decoration theme ID is required", 400);
    }

    const existing = await db.decorationTheme.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Decoration theme not found", 404);
    }

    await db.decorationTheme.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
