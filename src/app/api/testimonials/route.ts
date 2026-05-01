import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, parseBoolean } from "@/lib/api-utils";
import { testimonialSchema } from "@/lib/validations";

// ── GET /api/testimonials ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = parseBoolean(searchParams.get("all"));

    const where: Record<string, unknown> = {};
    if (!all) {
      where.isActive = true;
    }

    const testimonials = await db.testimonial.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return apiResponse(testimonials);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/testimonials ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;
    const testimonial = await db.testimonial.create({
      data: {
        clientName: data.clientName,
        eventType: data.eventType,
        rating: data.rating ?? 5,
        review: data.review,
        photo: data.photo || null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(testimonial, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/testimonials ─────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return apiError("Testimonial ID is required", 400);
    }

    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Testimonial not found", 404);
    }

    const parsed = testimonialSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(testimonial);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/testimonials ────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Testimonial ID is required", 400);
    }

    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Testimonial not found", 404);
    }

    await db.testimonial.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
