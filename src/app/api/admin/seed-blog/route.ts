import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAdminSession, hasPermission } from "@/config";
import { BLOG_SEED_DATA } from "@/data/blog-seed-data";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // ── Auth check ────────────────────────────────────────────────────
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required. Please log in." },
        { status: 401 }
      );
    }

    if (!hasPermission(user.role, "editor")) {
      return NextResponse.json(
        { error: "Insufficient permissions. Editor role or higher required." },
        { status: 403 }
      );
    }

    // ── Upsert all 26 blog posts by slug ──────────────────────────────
    let created = 0;
    let updated = 0;
    const errors: { slug: string; message: string }[] = [];

    for (const post of BLOG_SEED_DATA) {
      try {
        const result = await prisma.blogPost.upsert({
          where: { slug: post.slug },
          update: {
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            readTime: post.readTime,
            seoTitle: post.seoTitle,
            featuredImage: post.featuredImage,
            seoDesc: post.seoDesc,
            isPublished: post.isPublished,
            publishedAt: new Date(post.publishedAt),
          },
          create: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            readTime: post.readTime,
            seoTitle: post.seoTitle,
            featuredImage: post.featuredImage,
            seoDesc: post.seoDesc,
            isPublished: post.isPublished,
            publishedAt: new Date(post.publishedAt),
          },
        });

        // A new post will have `createdAt` very close to now;
        // an existing post will have an older `createdAt`.
        const ageMs = Date.now() - result.createdAt.getTime();
        if (ageMs < 5000) {
          created++;
        } else {
          updated++;
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        errors.push({ slug: post.slug, message });
      }
    }

    return NextResponse.json({
      success: true,
      total: BLOG_SEED_DATA.length,
      created,
      updated,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    console.error("[seed-blog] Error:", err);
    return NextResponse.json(
      { error: "Failed to seed blog posts", details: message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
