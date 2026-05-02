import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { faqSchema } from "@/lib/validations";
import { FAQService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all, category } = parseFilters(searchParams);

    const result = await FAQService.list({
      limit, offset, all, category,
      orderBy: { order: "asc" as const },
    });

    return apiResponse({ faqs: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const faq = await FAQService.create(parsed.data);
    return apiResponse(faq, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id || typeof id !== "string") {
      return apiError("FAQ ID is required", 400);
    }

    const partialSchema = faqSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const faq = await FAQService.update(id, parsed.data);
    return apiResponse(faq);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("FAQ not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("FAQ ID is required", 400);

    await FAQService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("FAQ not found", 404);
    }
    return handlePrismaError(error);
  }
}
