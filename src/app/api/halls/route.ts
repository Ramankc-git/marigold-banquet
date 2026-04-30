import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const halls = await db.hall.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { photos: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json({ halls });
  } catch (error) {
    console.error("Fetch halls error:", error);
    return NextResponse.json(
      { error: "Failed to fetch halls" },
      { status: 500 }
    );
  }
}
