'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/shared/whatsapp-icon';
import {
  Camera,
  UtensilsCrossed,
  Palette,
  HandMetal,
  Sparkles,
  Music,
  Phone,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SectionHero } from '@/components/shared/section-hero';

interface Vendor {
  name: string;
  description: string;
  phone: string;
}

interface VendorCategory {
  category: string;
  icon: React.ElementType;
  badgeColor: string;
  badgeBg: string,
  vendors: Vendor[];
}

const vendorCategories: VendorCategory[] = [
  {
    category: 'Photographers',
    icon: Camera,
    badgeColor: 'text-burgundy',
    badgeBg: 'bg-burgundy/10',
    vendors: [
      {
        name: 'Kathmandu Photo Studio',
        description: 'Professional wedding photography',
        phone: '+977-9801234567',
      },
      {
        name: 'Light & Lens Photography',
        description: 'Cinematic event coverage',
        phone: '+977-9812345678',
      },
      {
        name: 'Smile Capture',
        description: 'Candid and traditional photography',
        phone: '+977-9823456789',
      },
    ],
  },
  {
    category: 'Caterers',
    icon: UtensilsCrossed,
    badgeColor: 'text-marigold-dark',
    badgeBg: 'bg-marigold/10',
    vendors: [
      {
        name: 'Himalayan Flavors',
        description: 'Premium Nepali and Indian cuisine',
        phone: '+977-9834567890',
      },
      {
        name: 'Valley Catering',
        description: 'Multi-cuisine specialist',
        phone: '+977-9845678901',
      },
    ],
  },
  {
    category: 'Decorators',
    icon: Palette,
    badgeColor: 'text-rose-gold',
    badgeBg: 'bg-rose-gold/10',
    vendors: [
      {
        name: 'Dream Decor Nepal',
        description: 'Theme decoration experts',
        phone: '+977-9856789012',
      },
      {
        name: 'Floral Fantasy',
        description: 'Fresh flower arrangements',
        phone: '+977-9867890123',
      },
    ],
  },
  {
    category: 'Mehendi Artists',
    icon: HandMetal,
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50',
    vendors: [
      {
        name: 'Mehendi Magic',
        description: 'Bridal and party mehendi',
        phone: '+977-9878901234',
      },
      {
        name: 'Henna Art Nepal',
        description: 'Traditional and contemporary designs',
        phone: '+977-9889012345',
      },
    ],
  },
  {
    category: 'Makeup Artists',
    icon: Sparkles,
    badgeColor: 'text-pink-700',
    badgeBg: 'bg-pink-50',
    vendors: [
      {
        name: 'Glamour Studio',
        description: 'Bridal and event makeup',
        phone: '+977-9890123456',
      },
      {
        name: 'Beauty by Priya',
        description: 'Professional makeup services',
        phone: '+977-9801234568',
      },
    ],
  },
  {
    category: 'Bands / DJs',
    icon: Music,
    badgeColor: 'text-purple-700',
    badgeBg: 'bg-purple-50',
    vendors: [
      {
        name: 'Nepal Beats Band',
        description: 'Live music for all occasions',
        phone: '+977-9812345679',
      },
      {
        name: 'DJ Rhythm',
        description: 'Professional DJ services',
        phone: '+977-9823456780',
      },
    ],
  },
];

export default function VendorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Preferred Vendors"
        subtitle="Trusted partners for your perfect event"
        backgroundImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Preferred Vendors' },
        ]}
      />

      {/* Vendor Categories */}
      {vendorCategories.map((cat, catIndex) => {
        const Icon = cat.icon;
        const isEven = catIndex % 2 === 0;
        return (
          <section
            key={cat.category}
            className={`py-16 md:py-20 ${isEven ? 'bg-ivory' : 'bg-white'}`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-4xl font-bold text-burgundy">
                    {cat.category}
                  </h2>
                </div>
                <div className="section-divider mb-4" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {cat.vendors.map((vendor, vIndex) => (
                  <motion.div
                    key={vendor.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: vIndex * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 luxury-card-hover border border-burgundy/5 group"
                  >
                    {/* Card Header with gradient */}
                    <div className="h-2 bg-gradient-to-r from-burgundy via-rose-gold to-marigold" />

                    <div className="p-6">
                      {/* Category Badge */}
                      <Badge
                        variant="secondary"
                        className={`${cat.badgeBg} ${cat.badgeColor} border-0 text-xs font-medium mb-4`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {cat.category}
                      </Badge>

                      {/* Vendor Name */}
                      <h3 className="font-serif text-xl font-bold text-burgundy mb-2 group-hover:text-burgundy-dark transition-colors">
                        {vendor.name}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {vendor.description}
                      </p>

                      {/* Phone - Click to Call */}
                      <a
                        href={`tel:${vendor.phone.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-burgundy hover:text-marigold-dark transition-colors group/phone"
                      >
                        <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center group-hover/phone:bg-marigold/10 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span>{vendor.phone}</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Become a Partner */}
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
            <div className="w-20 h-20 rounded-full bg-marigold/20 flex items-center justify-center mx-auto mb-8">
              <HandMetal className="w-10 h-10 text-marigold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Become a Partner
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8 text-lg">
              Are you a vendor? Partner with Marigold Banquet Hall and connect with
              hundreds of clients looking for your services. Join our trusted network of
              preferred vendors in Kathmandu.
            </p>
            <a
              href="https://wa.me/9779851111191?text=Hello%20Marigold%20Banquet%2C%20I%20am%20interested%20in%20becoming%20a%20preferred%20vendor%20partner."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Partner with Marigold on WhatsApp
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
