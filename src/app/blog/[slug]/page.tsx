"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Facebook } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  category: string;
  author: string | null;
  readTime: number | null;
  publishedAt: string | null;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  wedding_tips: "Wedding Tips",
  party_ideas: "Party Ideas",
  corporate_events: "Corporate Events",
  decoration_trends: "Decoration Trends",
  food_catering: "Food & Catering",
  venue_guide: "Venue Guide",
  nepal_event_culture: "Nepal Event Culture",
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog-post?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.post) {
            setPost(data.post);
            setLoading(false);
            return;
          }
        }
      } catch {
        // API unavailable
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  // BlogPosting structured data for SEO
  const blogPostingJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    author: {
      "@type": "Organization",
      name: post.author || "Marigold Team",
      url: "https://marigoldbanquet.com.np",
    },
    publisher: {
      "@type": "Organization",
      name: "Marigold Banquet Hall & Party Palace",
      url: "https://marigoldbanquet.com.np",
      logo: {
        "@type": "ImageObject",
        url: "https://marigoldbanquet.com.np/logo.svg",
      },
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://marigoldbanquet.com.np/blog/${slug}`,
    },
    image: post.featuredImage || "https://marigoldbanquet.com.np/og-image.png",
    wordCount: post.content.split(/\s+/).length,
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="animate-spin w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-burgundy mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The blog post you are looking for does not exist or may have been removed.
          </p>
          <Link href="/blog">
            <Button className="bg-burgundy hover:bg-burgundy-dark text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    post.title + " - Marigold Banquet Blog"
  )}`;

  return (
    <div className="pt-28 pb-16">
      {/* BlogPosting Structured Data */}
      {blogPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
      )}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-marigold/10 text-marigold-dark px-3 py-1 rounded-full text-sm font-medium mb-4">
            {categoryLabels[post.category] || post.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            {post.author && <span>By {post.author}</span>}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Draft"}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            )}
          </div>

          {/* Featured image */}
          {post.featuredImage ? (
            <div className="w-full h-64 md:h-96 rounded-lg mb-8 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-burgundy to-burgundy-dark rounded-lg mb-8" />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-serif text-2xl text-burgundy mt-8 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </motion.div>

        {/* Share buttons */}
        <div className="border-t border-marigold/20 mt-12 pt-8">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-burgundy rounded-lg p-8 text-center text-white">
          <h3 className="font-serif text-2xl mb-3">
            Planning an Event at Marigold?
          </h3>
          <p className="text-ivory/80 mb-6">
            Let us help you create the perfect celebration
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking">
              <Button className="bg-marigold hover:bg-marigold-dark text-burgundy-dark font-medium px-6">
                Book a Viewing
              </Button>
            </Link>
            <a href="https://wa.me/9779851111191" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-ivory/30 text-ivory hover:bg-ivory/10 px-6"
              >
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
