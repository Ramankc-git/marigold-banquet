'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
  Instagram,
  ExternalLink,
  Loader2,
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
import { trackGalleryView, trackInstagramClick, trackWhatsAppClick } from '@/lib/analytics';

const categories = [
  'All',
  'Weddings',
  'Parties',
  'Corporate',
  'Decoration',
  'Food',
  'Venue Spaces',
];

const categoryMap: Record<string, string> = {
  weddings: 'Weddings',
  parties: 'Parties',
  corporate: 'Corporate',
  decoration: 'Decoration',
  food: 'Food',
  venue_spaces: 'Venue Spaces',
};

interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string | null;
  category: string;
  eventDate?: string | null;
  isActive: boolean;
  order: number;
  source: string;
  instagramPermalink?: string | null;
  instagramMediaId?: string | null;
}

interface GalleryVideo {
  id: string;
  youtubeUrl: string;
  title: string;
  category: string;
  isActive: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [instagramPhotos, setInstagramPhotos] = useState<GalleryPhoto[]>([]);
  const [instagramUsername, setInstagramUsername] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Fetch gallery data from API
  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?limit=100');
      if (res.ok) {
        const json = await res.json();
        const result = json.data;
        if (result?.photos) {
          setPhotos(result.photos);
        }
        if (result?.videos) {
          setVideos(result.videos);
        }
      }
    } catch {
      // Will show empty state
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Instagram section data
  const fetchInstagram = useCallback(async () => {
    try {
      const res = await fetch('/api/instagram?limit=6');
      if (res.ok) {
        const json = await res.json();
        const result = json.data;
        if (result?.photos) {
          setInstagramPhotos(result.photos);
        }
        if (result?.username) {
          setInstagramUsername(result.username);
        }
      }
    } catch {
      // Instagram section is optional
    }
  }, []);

  useEffect(() => {
    fetchGallery();
    fetchInstagram();
  }, [fetchGallery, fetchInstagram]);

  // Combine database photos with empty placeholders if none exist
  const displayPhotos = photos.length > 0 ? photos : [];

  const filteredItems =
    activeCategory === 'All'
      ? displayPhotos
      : displayPhotos.filter(
          (item) => categoryMap[item.category] === activeCategory || item.category === activeCategory
        );

  const selectedItemData = displayPhotos.find((item) => item.id === selectedItem?.toString());

  const navigateItem = (direction: 'prev' | 'next') => {
    if (selectedItem === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem?.toString());
    if (currentIndex === -1) return;
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedItem(Number(filteredItems[currentIndex - 1].id));
    } else if (direction === 'next' && currentIndex < filteredItems.length - 1) {
      setSelectedItem(Number(filteredItems[currentIndex + 1].id));
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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-burgundy animate-spin" />
              <span className="ml-3 text-muted-foreground">Loading gallery...</span>
            </div>
          ) : (
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
                    aria-label={item.caption || "Gallery photo"}
                    onClick={() => { setSelectedItem(Number(item.id)); trackGalleryView(item.category, item.source); }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedItem(Number(item.id));
                        trackGalleryView(item.category, item.source);
                      }
                    }}
                  >
                    <div className="relative rounded-lg overflow-hidden group">
                      {item.url ? (
                        <Image
                          src={item.url}
                          alt={item.caption || 'Gallery photo'}
                          width={400}
                          height={item.source === 'instagram' ? 400 : 300}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-burgundy-dark via-burgundy to-marigold-dark flex items-center justify-center">
                          <Camera className="w-10 h-10 text-white/40" />
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      {/* Overlay info on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        <p className="text-white font-serif text-sm font-medium">
                          {item.caption || 'Gallery Photo'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-white/20 text-white border-0 text-xs">
                            {categoryMap[item.category] || item.category}
                          </Badge>
                          {item.source === 'instagram' && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs flex items-center gap-1">
                              <Instagram className="w-3 h-3" />
                              Instagram
                            </Badge>
                          )}
                        </div>
                      </div>
                      {/* Instagram icon for instagram-sourced photos */}
                      {item.source === 'instagram' && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Instagram className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      {/* Heart icon for non-instagram photos */}
                      {item.source !== 'instagram' && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredItems.length === 0 && !loading && (
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
            <DialogTitle>{selectedItemData?.caption || 'Gallery Image'}</DialogTitle>
            <DialogDescription>Gallery image detail view</DialogDescription>
          </DialogHeader>
          {selectedItemData && (
            <div className="relative">
              {selectedItemData.url ? (
                <div className="w-full min-h-[400px] md:min-h-[500px] relative bg-black">
                  <Image
                    src={selectedItemData.url}
                    alt={selectedItemData.caption || 'Gallery image'}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full min-h-[400px] md:min-h-[500px] bg-gradient-to-br from-burgundy-dark via-burgundy to-marigold-dark flex items-center justify-center">
                  <Camera className="w-20 h-20 text-white/50" />
                </div>
              )}
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
                  <p className="text-white font-serif text-lg font-medium">
                    {selectedItemData.caption || 'Gallery Photo'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      {categoryMap[selectedItemData.category] || selectedItemData.category}
                    </Badge>
                    {selectedItemData.source === 'instagram' && selectedItemData.instagramPermalink && (
                      <a
                        href={selectedItemData.instagramPermalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-pink-300 hover:text-pink-200"
                      >
                        <Instagram className="w-3 h-3" />
                        View on Instagram
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                {selectedItemData.instagramPermalink ? (
                  <a
                    href={selectedItemData.instagramPermalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                ) : (
                  <Heart className="w-6 h-6 text-white cursor-pointer hover:text-red-400 transition-colors" />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instagram Feed Section */}
      {instagramPhotos.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Instagram className="w-8 h-8 text-pink-500" />
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy">
                  Follow Us on Instagram
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {instagramUsername
                  ? `Follow @${instagramUsername} for the latest updates, behind-the-scenes, and event highlights`
                  : 'Stay connected with us for the latest event highlights and behind-the-scenes moments'}
              </p>
              <div className="section-divider mt-6" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instagramPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(Number(photo.id))}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    {photo.url ? (
                      <Image
                        src={photo.url}
                        alt={photo.caption || 'Instagram photo'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <Instagram className="w-8 h-8 text-white/60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                        {photo.instagramPermalink && (
                          <a
                            href={photo.instagramPermalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </a>
                        )}
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {photo.caption && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {instagramUsername && (
              <div className="text-center mt-8">
                <a
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackInstagramClick()}
                >
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8">
                    <Instagram className="w-5 h-5 mr-2" />
                    Follow @${instagramUsername}
                  </Button>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

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
            {videos.length > 0 ? (
              videos.map((video, i) => {
                const ytId = getYouTubeId(video.youtubeUrl);
                const thumbnailUrl = ytId
                  ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                  : null;
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    <div
                      className="aspect-video rounded-lg overflow-hidden group cursor-pointer relative"
                      onClick={() => setActiveVideo(video.youtubeUrl)}
                    >
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-burgundy to-marigold flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-serif text-sm font-medium drop-shadow-lg">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              // Default placeholder videos
              <>
                {[
                  { id: 1, title: 'Wedding Highlights Reel', gradient: 'from-burgundy to-marigold' },
                  { id: 2, title: 'Venue Tour Walkthrough', gradient: 'from-rose-gold to-burgundy-light' },
                  { id: 3, title: 'Food & Decor Showcase', gradient: 'from-marigold-dark to-burgundy' },
                ].map((video, i) => (
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
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Video Dialog */}
      <Dialog open={activeVideo !== null} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Video Player</DialogTitle>
            <DialogDescription>Event video playback</DialogDescription>
          </DialogHeader>
          {activeVideo && (
            <div className="aspect-video">
              <iframe
                src={`${activeVideo.replace('watch?v=', 'embed/')}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

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
              onClick={() => trackWhatsAppClick('gallery_share')}
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
