'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Play,
  Share2,
  MessageCircle,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { SectionHero } from '@/components/shared/section-hero';

const categories = [
  'All',
  'Weddings',
  'Parties',
  'Corporate',
  'Decoration',
  'Food',
  'Venue Spaces',
];

const galleryItems = [
  { id: 1, category: 'Weddings', title: 'Royal Wedding Setup', gradient: 'from-burgundy-dark via-burgundy to-marigold-dark', height: 'h-72' },
  { id: 2, category: 'Decoration', title: 'Floral Mandap', gradient: 'from-rose-gold via-pink-300 to-marigold-light', height: 'h-96' },
  { id: 3, category: 'Food', title: 'Gourmet Platter', gradient: 'from-marigold via-amber-500 to-orange-500', height: 'h-64' },
  { id: 4, category: 'Venue Spaces', title: 'Grand Hall', gradient: 'from-burgundy via-burgundy-light to-rose-gold', height: 'h-80' },
  { id: 5, category: 'Weddings', title: 'Couple Entrance', gradient: 'from-marigold-dark via-burgundy to-burgundy-dark', height: 'h-72' },
  { id: 6, category: 'Parties', title: 'Birthday Celebration', gradient: 'from-purple-500 via-pink-400 to-rose-gold', height: 'h-64' },
  { id: 7, category: 'Corporate', title: 'Conference Setup', gradient: 'from-gray-700 via-gray-500 to-gray-300', height: 'h-80' },
  { id: 8, category: 'Decoration', title: 'Rustic Setup', gradient: 'from-amber-700 via-amber-500 to-yellow-400', height: 'h-96' },
  { id: 9, category: 'Food', title: 'Live Counter', gradient: 'from-red-700 via-burgundy to-marigold', height: 'h-64' },
  { id: 10, category: 'Venue Spaces', title: 'Outdoor Garden', gradient: 'from-green-700 via-emerald-500 to-teal-400', height: 'h-72' },
  { id: 11, category: 'Weddings', title: 'Reception Night', gradient: 'from-burgundy via-purple-800 to-marigold-dark', height: 'h-80' },
  { id: 12, category: 'Parties', title: 'Festival Night', gradient: 'from-marigold via-rose-gold-light to-burgundy-light', height: 'h-64' },
];

const videoPlaceholders = [
  { id: 1, title: 'Wedding Highlights Reel', gradient: 'from-burgundy to-marigold' },
  { id: 2, title: 'Venue Tour Walkthrough', gradient: 'from-rose-gold to-burgundy-light' },
  { id: 3, title: 'Food & Decor Showcase', gradient: 'from-marigold-dark to-burgundy' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItemData = galleryItems.find((item) => item.id === selectedItem);

  const navigateItem = (direction: 'prev' | 'next') => {
    if (selectedItem === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem);
    if (currentIndex === -1) return;
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1].id);
    }
  };

  const whatsappShareUrl = encodeURIComponent(
    'Hello! I just had an amazing event at Marigold Banquet Hall & Party Palace. Check out their venue: https://marigoldbanquet.com'
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Gallery"
        subtitle="Moments captured at Marigold"
        backgroundImage="linear-gradient(135deg, #6B1D2A 0%, #DAA520 40%, #B76E79 70%, #4A0E1A 100%)"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Category Filter */}
      <section className="py-8 px-4 bg-ivory sticky top-20 z-30 border-b border-marigold/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-burgundy text-white border-burgundy shadow-md'
                    : 'bg-white text-burgundy border-marigold/30 hover:border-burgundy hover:bg-burgundy/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid - Masonry Style */}
      <section className="py-16 px-4 bg-ivory">
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="columns-2 md:columns-3 gap-4 space-y-4"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={item.title || "Gallery photo"}
                  onClick={() => setSelectedItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedItem(item.id);
                    }
                  }}
                >
                  <div
                    className={`${item.height} bg-gradient-to-br ${item.gradient} rounded-lg flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <Camera className="w-10 h-10 text-white/40 group-hover:scale-110 transition-transform duration-300" />
                    {/* Overlay info on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <p className="text-white font-serif text-sm font-medium">{item.title}</p>
                      <Badge className="mt-1 bg-white/20 text-white border-0 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    {/* Heart icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No photos in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedItemData?.title || 'Gallery Image'}</DialogTitle>
            <DialogDescription>Gallery image detail view</DialogDescription>
          </DialogHeader>
          {selectedItemData && (
            <div className="relative">
              <div
                className={`w-full min-h-[400px] md:min-h-[500px] bg-gradient-to-br ${selectedItemData.gradient} flex items-center justify-center`}
              >
                <Camera className="w-20 h-20 text-white/50" />
              </div>
              {/* Navigation arrows */}
              <button
                onClick={() => navigateItem('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => navigateItem('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <div>
                  <p className="text-white font-serif text-lg font-medium">{selectedItemData.title}</p>
                  <Badge className="bg-white/20 text-white border-0 text-xs mt-1">
                    {selectedItemData.category}
                  </Badge>
                </div>
                <Heart className="w-6 h-6 text-white cursor-pointer hover:text-red-400 transition-colors" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Video Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch highlights from our events and venue tours
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {videoPlaceholders.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${video.gradient} rounded-lg flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden`}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-serif text-sm mt-3 font-medium">{video.title}</p>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-burgundy via-burgundy-dark to-burgundy text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeInUp}>
            <Share2 className="w-14 h-14 text-marigold-light mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Share Your Marigold Moment
            </h2>
            <p className="text-ivory/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Had a memorable event at Marigold? Share your experience with friends and family on WhatsApp!
            </p>
            <a
              href={`https://wa.me/?text=${whatsappShareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-sm px-8 py-6 text-lg shadow-xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                Share on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
