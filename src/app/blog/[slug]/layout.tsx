import type { Metadata } from "next";
import { db } from "@/lib/db";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await db.blogPost.findUnique({
      where: { slug, isPublished: true },
      select: {
        title: true,
        excerpt: true,
        category: true,
        author: true,
        publishedAt: true,
        seoTitle: true,
        seoDesc: true,
        featuredImage: true,
      },
    });

    const title = post?.seoTitle || post?.title || "Blog Post";
    const description =
      post?.seoDesc ||
      post?.excerpt ||
      "Read expert tips and advice on wedding planning, party ideas, corporate events, decoration trends & Nepali event culture from Marigold Banquet Hall.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post?.publishedAt?.toISOString(),
        authors: [post?.author || "Marigold Team"],
        url: `https://marigoldbanquet.com.np/blog/${slug}`,
        images: post?.featuredImage
          ? [{ url: post.featuredImage, width: 1200, height: 630, alt: title }]
          : [
              {
                url: "https://marigoldbanquet.com.np/og-image.png",
                width: 1152,
                height: 864,
                alt: title,
              },
            ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          post?.featuredImage || "https://marigoldbanquet.com.np/og-image.png",
        ],
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description:
        "Read expert tips and advice on wedding planning, party ideas, corporate events, decoration trends & Nepali event culture from Marigold Banquet Hall.",
    };
  }
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
