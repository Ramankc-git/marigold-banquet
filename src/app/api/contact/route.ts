import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, email, message } = body;

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const contact = await db.enquiry.create({
      data: {
        fullName,
        phone,
        email: email || null,
        eventType: "general_inquiry",
        specialReqs: message,
        referenceNumber: `MG-${Date.now().toString(36).toUpperCase()}`,
      },
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
