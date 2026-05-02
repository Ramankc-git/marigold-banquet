import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination } from "@/lib/api-utils";
import { testimonialSchema } from "@/lib/validations";
import { TestimonialService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const result = await TestimonialService.list({
      all,
      limit: 100,
      offset: 0,
      orderBy: { order: "asc" as const },
    });

    return apiResponse(result.items);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const testimonial = await TestimonialService.create(parsed.data);
    return apiResponse(testimonial, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return apiError("Testimonial ID is required", 400);
    }

    const parsed = testimonialSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const testimonial = await TestimonialService.update(id, parsed.data);
    return apiResponse(testimonial);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Testimonial not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Testimonial ID is required", 400);

    await TestimonialService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Testimonial not found", 404);
    }
    return handlePrismaError(error);
  }
}
