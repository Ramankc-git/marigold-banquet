'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/shared/section-hero';

const blogPosts = [
  {
    id: 1,
    slug: 'how-to-plan-the-perfect-wedding-in-kathmandu',
    title: 'How to Plan the Perfect Wedding in Kathmandu',
    category: 'Wedding Tips',
    readTime: 5,
    excerpt:
      'Planning a wedding in Kathmandu? Here\'s your complete guide to venues, vendors, and traditions.',
    gradient: 'from-burgundy/80 to-rose-gold/60',
  },
  {
    id: 2,
    slug: 'top-wedding-decoration-trends-in-nepal-2025',
    title: 'Top Wedding Decoration Trends in Nepal 2025',
    category: 'Decoration Trends',
    readTime: 6,
    excerpt:
      'Discover the latest decoration trends transforming Nepali weddings.',
    gradient: 'from-marigold/70 to-marigold-light/50',
  },
  {
    id: 3,
    slug: 'complete-bratabandha-planning-guide-for-modern-families',
    title: 'Complete Bratabandha Planning Guide for Modern Families',
    category: 'Nepal Event Culture',
    readTime: 7,
    excerpt:
      'Everything you need to know about organizing a memorable bratabandha ceremony.',
    gradient: 'from-rose-gold/70 to-burgundy/50',
  },
  {
    id: 4,
    slug: 'how-to-choose-the-right-banquet-hall-in-kathmandu',
    title: 'How to Choose the Right Banquet Hall in Kathmandu',
    category: 'Venue Guide',
    readTime: 5,
    excerpt:
      'Key factors to consider when selecting the perfect banquet hall for your event.',
    gradient: 'from-burgundy-dark/70 to-burgundy/50',
  },
  {
    id: 5,
    slug: 'best-catering-menu-ideas-for-nepali-wedding-receptions',
    title: 'Best Catering Menu Ideas for Nepali Wedding Receptions',
    category: 'Food & Catering',
    readTime: 6,
    excerpt:
      'From traditional to fusion, explore menu options that delight every guest.',
    gradient: 'from-marigold-dark/70 to-marigold/50',
  },
  {
    id: 6,
    slug: 'pasni-ceremony-modern-vs-traditional-setup-ideas',
    title: 'Pasni Ceremony: Modern vs Traditional Setup Ideas',
    category: 'Nepal Event Culture',
    readTime: 5,
    excerpt:
      'Balancing tradition with modern touches for your child\'s pasni ceremony.',
    gradient: 'from-rose-gold/60 to-marigold-light/40',
  },
  {
    id: 7,
    slug: 'corporate-event-planning-checklist-for-kathmandu-businesses',
    title: 'Corporate Event Planning Checklist for Kathmandu Businesses',
    category: 'Corporate Events',
    readTime: 4,
    excerpt:
      'A comprehensive checklist to ensure your corporate event runs smoothly.',
    gradient: 'from-burgundy/60 to-ivory-dark/60',
  },
  {
    id: 8,
    slug: 'budget-wedding-planning-tips-in-nepal',
    title: 'Budget Wedding Planning Tips in Nepal',
    category: 'Wedding Tips',
    readTime: 6,
    excerpt:
      'Smart strategies for a beautiful wedding without breaking the bank.',
    gradient: 'from-marigold/60 to-rose-gold/50',
  },
];

const categories = [
  'All',
  'Wedding Tips',
  'Party Ideas',
  'Corporate Events',
  'Decoration Trends',
  'Food & Catering',
  'Venue Guide',
  'Nepal Event Culture',
];

const categoryColors: Record<string, string> = {
  'Wedding Tips': 'bg-rose-gold/10 text-rose-gold',
  'Party Ideas': 'bg-marigold/10 text-marigold-dark',
  'Corporate Events': 'bg-burgundy/10 text-burgundy',
  'Decoration Trends': 'bg-marigold/10 text-marigold-dark',
  'Food & Catering': 'bg-marigold/10 text-marigold-dark',
  'Venue Guide': 'bg-burgundy/10 text-burgundy',
  'Nepal Event Culture': 'bg-rose-gold/10 text-rose-gold',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Blog"
        subtitle="Tips, ideas, and inspiration for your events"
        backgroundImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      {/* Category Filter */}
      <section className="py-12 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-burgundy text-white shadow-md'
                    : 'bg-white text-burgundy hover:bg-burgundy/10 border border-burgundy/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-burgundy/30 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-burgundy mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground">
                No blog posts in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 luxury-card-hover"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                  {/* Image placeholder */}
                  <div
                    className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          categoryColors[post.category] ||
                          'bg-marigold/10 text-marigold-dark'
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-burgundy mb-3 group-hover:text-marigold-dark transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <span className="text-marigold-dark text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-marigold rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-gold rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Plan Your Event
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Inspired by our blog? Let us help you bring your vision to life.
              Contact us to start planning your perfect celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="bg-marigold hover:bg-marigold-dark text-white px-8 py-6 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  Book a Viewing
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-ivory/30 text-ivory hover:bg-ivory/10 px-8 py-6 rounded-sm text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
