import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BUSINESS } from "@/constants";
import type { Metadata } from "next";
import BlogPostClient from "./blog-post-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug, isPublished: true },
    select: {
      title: true,
      excerpt: true,
      featuredImage: true,
      category: true,
      publishedAt: true,
      content: true,
    },
  });

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.title;
  const description =
    post.excerpt || post.content?.substring(0, 160)?.replace(/[#*\n]/g, "").trim() || "";
  const ogImage = post.featuredImage
    ? `${BUSINESS.website}${post.featuredImage}`
    : `${BUSINESS.website}/og-image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      url: `${BUSINESS.website}/blog/${slug}`,
      images: [{ url: ogImage, width: 1152, height: 864, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug, isPublished: true },
  });

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={JSON.parse(JSON.stringify(post))} />;
}
