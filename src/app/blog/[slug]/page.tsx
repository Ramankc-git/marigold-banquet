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

const fallbackPosts: Record<string, BlogPost> = {
  "how-to-plan-the-perfect-wedding-in-kathmandu": {
    id: "1",
    title: "How to Plan the Perfect Wedding in Kathmandu",
    slug: "how-to-plan-the-perfect-wedding-in-kathmandu",
    excerpt: "Planning a wedding in Kathmandu? Here is your complete guide to venues, vendors, and traditions.",
    content: `Planning a wedding in Kathmandu is an exciting journey that blends rich cultural traditions with modern celebrations. The capital city of Nepal offers a unique setting for weddings, with its stunning mountain backdrops, vibrant culture, and world-class venues.

## Choosing the Right Venue

The first and most important decision in your wedding planning journey is selecting the perfect venue. Kathmandu offers a range of options from traditional courtyards to modern banquet halls. When choosing a venue, consider the number of guests, the type of ceremony, parking availability, and whether the venue offers in-house catering and decoration services.

Marigold Banquet Hall in Tokha-07, Gairigaun offers a stunning setting with multiple hall options, in-house catering featuring authentic Nepali cuisine, and comprehensive decoration packages that can be customized to match your vision.

## Understanding Nepali Wedding Traditions

Nepali weddings are multi-day celebrations filled with meaningful rituals. From the Mehendi ceremony to the main wedding day and the reception, each event has its own significance. Understanding these traditions helps you plan each ceremony appropriately and allocate the right budget and time for each.

## Budget Planning

A well-planned budget is the foundation of a successful wedding. In Kathmandu, wedding costs can vary significantly based on the venue, guest count, catering choices, and decoration style. On average, a mid-range wedding in Kathmandu can cost between NPR 5-15 lakhs, while luxury weddings can exceed NPR 30 lakhs.

## Vendor Selection

Key vendors for a Kathmandu wedding include photographers, caterers, decorators, mehendi artists, makeup artists, and musicians. It is advisable to book vendors at least 3-6 months in advance, especially during the wedding season (November to February and April to May).

## Timeline and Checklist

Start planning at least 6-12 months before your wedding date. Create a detailed timeline covering venue booking, vendor selection, invitation sending, outfit shopping, and pre-wedding ceremony arrangements. A well-organized timeline ensures nothing is missed and reduces stress as the big day approaches.`,
    featuredImage: null,
    category: "wedding_tips",
    author: "Marigold Team",
    readTime: 5,
    publishedAt: "2025-01-15",
    createdAt: "2025-01-15",
  },
  "complete-bratabandha-planning-guide": {
    id: "3",
    title: "Complete Bratabandha Planning Guide for Modern Families",
    slug: "complete-bratabandha-planning-guide",
    excerpt: "Everything you need to know about organizing a memorable bratabandha ceremony.",
    content: `The Bratabandha ceremony, also known as Bartaman or Upanayana, is one of the most important Sanskaras (sacraments) in Hindu tradition. It marks the symbolic transition of a young boy into formal religious education and spiritual awareness. Planning this sacred ceremony requires attention to both traditional rituals and modern celebration expectations.

## Understanding the Significance

Bratabandha literally means "taking the vow of celibacy" and traditionally marks the beginning of a boy's formal education in the Gurukul system. Today, while the spiritual significance remains, the ceremony has evolved into a grand celebration where families come together to honor this important milestone.

## Key Rituals and Timeline

The ceremony typically begins with Ganesh Puja, followed by the main rituals including the wearing of the Janai (sacred thread), Havan (sacred fire ceremony), and blessings from elders. The entire ceremony can take 3-5 hours depending on the family's traditions and the Pandit's guidance.

## Venue Selection

Choosing the right venue for a Bratabandha is crucial. You need a space that can accommodate the ritual area, guests for the ceremony, and a separate dining area. Marigold Banquet Hall offers flexible hall configurations that can be set up with a traditional mandap for the ceremony while maintaining comfortable seating for guests.

## Modern vs Traditional Setup

Modern families often blend traditional elements with contemporary celebrations. While the core rituals remain unchanged, the decoration, catering, and entertainment aspects have evolved. Many families now opt for themed decoration that incorporates both traditional Nepali elements and modern aesthetics.

## Catering Considerations

Food is central to any Nepali celebration. For Bratabandha ceremonies, a traditional Nepali feast is customary. Consider offering a mix of traditional items like dal-bhat, achar, and sel-roti alongside popular modern dishes. Ensure there are pure vegetarian options as many guests may prefer them during religious ceremonies.

## Budget Planning

A typical Bratabandha celebration in Kathmandu can range from NPR 1-5 lakhs depending on the guest count and scale of celebration. Key expenses include venue rental, catering, decoration, priest fees, and gifts.`,
    featuredImage: null,
    category: "nepal_event_culture",
    author: "Marigold Team",
    readTime: 7,
    publishedAt: "2025-01-20",
    createdAt: "2025-01-20",
  },
};

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
        // Use fallback
      }
      // Use fallback post
      if (fallbackPosts[slug]) {
        setPost(fallbackPosts[slug]);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

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

          {/* Featured image placeholder */}
          <div className="w-full h-64 md:h-96 bg-gradient-to-br from-burgundy to-burgundy-dark rounded-lg mb-8" />
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
