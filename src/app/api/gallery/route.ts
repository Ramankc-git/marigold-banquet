import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { galleryPhotoSchema } from "@/lib/validations";

const ALLOWED_CATEGORIES = ["weddings", "parties", "corporate", "decoration", "food", "venue_spaces"] as const;

// ── GET /api/gallery ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};

    if (category) {
      if (!ALLOWED_CATEGORIES.includes(category as (typeof ALLOWED_CATEGORIES)[number])) {
        return apiError(
          `Invalid category. Allowed values: ${ALLOWED_CATEGORIES.join(", ")}`,
          400
        );
      }
      where.category = category;
    }

    if (!all) {
      where.isActive = true;
    }

    const [photos, total] = await Promise.all([
      db.galleryPhoto.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.galleryPhoto.count({ where }),
    ]);

    // Also return videos (lightweight, no pagination needed)
    const videos = await db.galleryVideo.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: "asc" },
    });

    return apiResponse({ photos, videos, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/gallery ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = galleryPhotoSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    // Validate category against allowed values
    if (!ALLOWED_CATEGORIES.includes(data.category as (typeof ALLOWED_CATEGORIES)[number])) {
      return apiError(
        `Invalid category. Allowed values: ${ALLOWED_CATEGORIES.join(", ")}`,
        400
      );
    }

    const photo = await db.galleryPhoto.create({
      data: {
        url: data.url,
        caption: data.caption || null,
        category: data.category,
        eventDate: data.eventDate || null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(photo, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/gallery ─────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Photo ID is required", 400);
    }

    const existing = await db.galleryPhoto.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Gallery photo not found", 404);
    }

    await db.galleryPhoto.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
