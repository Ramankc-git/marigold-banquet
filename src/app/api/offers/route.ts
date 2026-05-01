import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { offerSchema } from "@/lib/validations";

// ── GET /api/offers ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));

    const where = all ? {} : { isActive: true };

    const [offers, total] = await Promise.all([
      db.offer.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.offer.count({ where }),
    ]);

    return apiResponse({ offers, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/offers ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = offerSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const offer = await db.offer.create({
      data: {
        title: data.title,
        description: data.description,
        discount: data.discount || null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        isActive: data.isActive ?? true,
      },
    });

    return apiResponse(offer, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/offers ──────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Offer ID is required", 400);
    }

    const partialSchema = offerSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.offer.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Offer not found", 404);
    }

    const offer = await db.offer.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(offer);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/offers ─────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Offer ID is required", 400);
    }

    const existing = await db.offer.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Offer not found", 404);
    }

    await db.offer.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
