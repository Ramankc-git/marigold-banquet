import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { offerSchema } from "@/lib/validations";
import { OfferService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all } = parseFilters(searchParams);

    const result = await OfferService.list({
      limit, offset, all,
      orderBy: { createdAt: "desc" as const },
    });

    return apiResponse({ offers: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = offerSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const offer = await OfferService.create(parsed.data);
    return apiResponse(offer, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

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
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const offer = await OfferService.update(id, parsed.data);
    return apiResponse(offer);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Offer not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Offer ID is required", 400);

    await OfferService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Offer not found", 404);
    }
    return handlePrismaError(error);
  }
}
