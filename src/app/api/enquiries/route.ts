import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { enquirySchema, enquiryStatusSchema } from "@/lib/validations";
import { EnquiryService } from "@/services";
import { ENQUIRY_STATUSES } from "@/constants";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { status } = parseFilters(searchParams);

    if (status && !ENQUIRY_STATUSES.includes(status as any)) {
      return apiError(`Invalid status. Allowed: ${ENQUIRY_STATUSES.join(", ")}`, 400);
    }

    const result = await EnquiryService.list({ limit, offset, status });
    return apiResponse({ enquiries: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const enquiry = await EnquiryService.create(parsed.data);
    return apiResponse(enquiry, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquiryStatusSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const { id, status, notes } = parsed.data;
    const enquiry = await EnquiryService.updateStatus(id, status, notes);
    return apiResponse(enquiry);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Enquiry not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Enquiry ID is required", 400);

    await EnquiryService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Enquiry not found", 404);
    }
    return handlePrismaError(error);
  }
}
