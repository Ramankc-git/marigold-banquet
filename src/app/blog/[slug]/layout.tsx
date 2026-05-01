import type { Metadata } from "next";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Fallback blog post data for metadata generation (must be server-side)
const blogMeta: Record<string, { title: string; excerpt: string; publishedAt: string }> = {
  "how-to-plan-the-perfect-wedding-in-kathmandu": {
    title: "How to Plan the Perfect Wedding in Kathmandu",
    excerpt:
      "Planning a wedding in Kathmandu? Here is your complete guide to venues, vendors, and traditions.",
    publishedAt: "2025-01-15",
  },
  "complete-bratabandha-planning-guide": {
    title: "Complete Bratabandha Planning Guide for Modern Families",
    excerpt:
      "Everything you need to know about organizing a memorable bratabandha ceremony.",
    publishedAt: "2025-01-20",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogMeta[slug];

  const title = post
    ? `${post.title}`
    : "Blog Post";
  const description = post
    ? post.excerpt
    : "Read expert tips and advice on wedding planning, party ideas, corporate events, decoration trends & Nepali event culture from Marigold Banquet Hall.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post?.publishedAt,
      authors: ["Marigold Team"],
      url: `https://marigoldbanquet.com.np/blog/${slug}`,
      images: [
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
      images: ["https://marigoldbanquet.com.np/og-image.png"],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
