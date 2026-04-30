import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where = status ? { status } : {};

    const bookings = await db.booking.findMany({
      where,
      orderBy: { eventDate: "asc" },
      take: limit,
      include: {
        hall: { select: { name: true } },
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      eventType,
      hallId,
      expectedGuests,
      eventDate,
      startTime,
      endTime,
      packageType,
      totalAmount,
      notes,
    } = body;

    if (!fullName || !phone || !eventType || !eventDate) {
      return NextResponse.json(
        { error: "Full name, phone, event type, and event date are required" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        fullName,
        phone,
        email: email || null,
        eventType,
        hallId: hallId || null,
        expectedGuests: expectedGuests || null,
        eventDate,
        startTime: startTime || null,
        endTime: endTime || null,
        packageType: packageType || null,
        totalAmount: totalAmount || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const booking = await db.booking.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
