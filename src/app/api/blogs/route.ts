import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    const where = all ? {} : { isPublished: true };

    const posts = await db.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      author,
      seoTitle,
      seoDesc,
      isPublished,
    } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: "Title, slug, content, and category are required" },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featuredImage: featuredImage || null,
        category,
        author: author || null,
        seoTitle: seoTitle || null,
        seoDesc: seoDesc || null,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    if (data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const allowedFields = [
      "title",
      "slug",
      "excerpt",
      "content",
      "featuredImage",
      "category",
      "author",
      "readTime",
      "seoTitle",
      "seoDesc",
      "isPublished",
      "publishedAt",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in data) {
        updateData[field] = data[field as keyof typeof data];
      }
    }

    const post = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await db.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
