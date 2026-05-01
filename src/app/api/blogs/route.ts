import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { blogPostSchema } from "@/lib/validations";

// ── GET /api/blogs ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));

    const where = all ? {} : { isPublished: true };

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.blogPost.count({ where }),
    ]);

    return apiResponse({ posts, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/blogs ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const post = await db.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category,
        author: data.author || null,
        readTime: data.readTime || null,
        seoTitle: data.seoTitle || null,
        seoDesc: data.seoDesc || null,
        isPublished: data.isPublished ?? false,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });

    return apiResponse(post, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/blogs ────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Post ID is required", 400);
    }

    const partialSchema = blogPostSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Blog post not found", 404);
    }

    const updateData: Record<string, unknown> = { ...parsed.data };

    // Auto-set publishedAt when publishing for the first time
    if (updateData.isPublished === true && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const post = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return apiResponse(post);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/blogs ───────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Post ID is required", 400);
    }

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Blog post not found", 404);
    }

    await db.blogPost.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
