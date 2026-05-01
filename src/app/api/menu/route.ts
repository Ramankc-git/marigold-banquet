import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { menuItemSchema } from "@/lib/validations";

// ── GET /api/menu ──────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));
    const category = searchParams.get("category");

    const where: Record<string, unknown> = all ? {} : { isActive: true };
    if (category) where.category = category;

    const [items, total] = await Promise.all([
      db.menuItem.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.menuItem.count({ where }),
    ]);

    return apiResponse({ items, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/menu ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = menuItemSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const item = await db.menuItem.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description || null,
        pricePerPlate: data.pricePerPlate ?? null,
        isVegetarian: data.isVegetarian ?? false,
        isJain: data.isJain ?? false,
        isHalal: data.isHalal ?? false,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(item, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/menu ────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Menu item ID is required", 400);
    }

    const partialSchema = menuItemSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.menuItem.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Menu item not found", 404);
    }

    const item = await db.menuItem.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(item);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/menu ───────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Menu item ID is required", 400);
    }

    const existing = await db.menuItem.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Menu item not found", 404);
    }

    await db.menuItem.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
