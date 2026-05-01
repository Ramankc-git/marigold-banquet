import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, parseBoolean } from "@/lib/api-utils";
import { hallSchema } from "@/lib/validations";

// ── GET /api/halls ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = parseBoolean(searchParams.get("all"));

    const where: Record<string, unknown> = {};
    if (!all) {
      where.isActive = true;
    }

    const halls = await db.hall.findMany({
      where,
      orderBy: { order: "asc" },
      include: { photos: { orderBy: { order: "asc" } } },
    });

    return apiResponse(halls);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/halls ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = hallSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;
    const hall = await db.hall.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        capacityBanquet: data.capacityBanquet ?? null,
        capacityTheatre: data.capacityTheatre ?? null,
        capacityCocktail: data.capacityCocktail ?? null,
        dimensionsSqft: data.dimensionsSqft ?? null,
        features: data.features ?? "[]",
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
      include: { photos: true },
    });

    return apiResponse(hall, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/halls ─────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return apiError("Hall ID is required", 400);
    }

    const existing = await db.hall.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Hall not found", 404);
    }

    // Validate update fields
    const parsed = hallSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const hall = await db.hall.update({
      where: { id },
      data: parsed.data,
      include: { photos: true },
    });

    return apiResponse(hall);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/halls ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Hall ID is required", 400);
    }

    const existing = await db.hall.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Hall not found", 404);
    }

    await db.hall.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
