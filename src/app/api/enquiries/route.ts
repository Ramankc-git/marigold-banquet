import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      eventType,
      hallPreference,
      expectedGuests,
      preferredDate,
      budgetRange,
      specialReqs,
      referenceNumber,
    } = body;

    if (!fullName || !phone || !eventType) {
      return NextResponse.json(
        { error: "Full name, phone, and event type are required" },
        { status: 400 }
      );
    }

    const enquiry = await db.enquiry.create({
      data: {
        fullName,
        phone,
        email: email || null,
        eventType,
        hallPreference: hallPreference || null,
        expectedGuests: expectedGuests || null,
        preferredDate: preferredDate || null,
        budgetRange: budgetRange || null,
        specialReqs: specialReqs || null,
        referenceNumber: referenceNumber || `MG-${Date.now().toString(36).toUpperCase()}`,
      },
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where = status ? { status } : {};

    const enquiries = await db.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
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

    const enquiry = await db.enquiry.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
      },
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
