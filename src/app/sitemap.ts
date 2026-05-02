import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const baseUrl = "https://marigoldbanquet.com.np";

// Force dynamic rendering so the sitemap fetches blog posts at request time
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published blog posts from the database
  let publishedPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    publishedPosts = await db.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // If database is unavailable (e.g. during build), skip blog posts
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/weddings`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/parties`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spaces`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/food`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/decoration`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2025-01-20",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog post URLs from database
  const blogPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
