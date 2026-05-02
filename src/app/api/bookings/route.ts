import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { bookingSchema, bookingStatusSchema } from "@/lib/validations";
import { BookingService } from "@/services";
import { BOOKING_STATUSES } from "@/constants";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { status } = parseFilters(searchParams);

    if (status && !BOOKING_STATUSES.includes(status as any)) {
      return apiError(`Invalid status. Allowed: ${BOOKING_STATUSES.join(", ")}`, 400);
    }

    const result = await BookingService.list({ limit, offset, status });
    return apiResponse({ bookings: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return apiError("Invalid request body. Expected JSON.", 400);
    }
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const booking = await BookingService.create(parsed.data);
    return apiResponse(booking, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingStatusSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const { id, status, notes } = parsed.data;
    const booking = await BookingService.updateStatus(id, status, notes);
    return apiResponse(booking);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Booking not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Booking ID is required", 400);

    await BookingService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Booking not found", 404);
    }
    return handlePrismaError(error);
  }
}
