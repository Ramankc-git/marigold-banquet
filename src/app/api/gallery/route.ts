import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const all = searchParams.get("all");

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (!all) where.isActive = true;

    const photos = await db.galleryPhoto.findMany({
      where,
      orderBy: { order: "asc" },
      take: 200,
    });

    const videos = await db.galleryVideo.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ photos, videos });
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, caption, category } = body;

    if (!url || !category) {
      return NextResponse.json(
        { error: "URL and category are required" },
        { status: 400 }
      );
    }

    const photo = await db.galleryPhoto.create({
      data: {
        url,
        caption: caption || null,
        category,
        isActive: true,
        order: 0,
      },
    });

    return NextResponse.json({ success: true, photo }, { status: 201 });
  } catch (error) {
    console.error("Create gallery photo error:", error);
    return NextResponse.json(
      { error: "Failed to add photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    await db.galleryPhoto.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery photo error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
