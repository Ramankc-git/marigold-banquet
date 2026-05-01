import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt } from "@/lib/api-utils";
import { bookingSchema, bookingStatusSchema } from "@/lib/validations";

const ALLOWED_BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const status = searchParams.get("status");

    const where = status && ALLOWED_BOOKING_STATUSES.includes(status as typeof ALLOWED_BOOKING_STATUSES[number])
      ? { status }
      : {};

    const [bookings, total] = await Promise.all([
      db.booking.findMany({
        where,
        orderBy: { eventDate: "asc" },
        take: limit,
        skip: offset,
        include: {
          hall: { select: { name: true } },
        },
      }),
      db.booking.count({ where }),
    ]);

    return apiResponse({ bookings, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, errors);
    }

    const booking = await db.booking.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        eventType: parsed.data.eventType,
        hallId: parsed.data.hallId || null,
        expectedGuests: parsed.data.expectedGuests ?? null,
        eventDate: parsed.data.eventDate,
        startTime: parsed.data.startTime || null,
        endTime: parsed.data.endTime || null,
        packageType: parsed.data.packageType || null,
        totalAmount: parsed.data.totalAmount ?? null,
        notes: parsed.data.notes || null,
      },
    });

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
      const errors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, errors);
    }

    const { id, status, notes } = parsed.data;

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Booking not found", 404);
    }

    const booking = await db.booking.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return apiResponse(booking);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/bookings ─────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Booking ID is required", 400);
    }

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Booking not found", 404);
    }

    await db.booking.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
