'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  Flower2,
  Minus,
  Landmark,
  Sparkles,
  TreePine,
  Sun,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const themes = [
  {
    name: 'Royal',
    icon: Crown,
    gradient: 'from-burgundy-dark via-burgundy to-marigold-dark',
    description: 'Opulent draping, chandeliers, and regal color palettes',
    longDescription: 'Transform your venue into a royal court with rich velvets, golden accents, cascading chandeliers, and majestic draping fit for a king and queen.',
  },
  {
    name: 'Floral',
    icon: Flower2,
    gradient: 'from-rose-gold via-pink-300 to-marigold-light',
    description: 'Abundant fresh flowers creating a garden paradise',
    longDescription: 'Immerse your celebration in blooms — rose walls, hanging floral installations, petal pathways, and fragrant centerpieces from our partner florists.',
  },
  {
    name: 'Minimalist',
    icon: Minus,
    gradient: 'from-gray-200 via-ivory-dark to-white',
    description: 'Clean lines, subtle elegance, modern sophistication',
    longDescription: 'Less is more. Clean geometric lines, monochrome palettes, and curated accent pieces create an atmosphere of refined sophistication.',
  },
  {
    name: 'Traditional Nepali',
    icon: Landmark,
    gradient: 'from-burgundy via-red-700 to-marigold',
    description: 'Authentic Nepali decor with cultural motifs',
    longDescription: 'Celebrate your heritage with traditional Dhaka patterns, brass utensils, oil lamps, marigold garlands, and authentic Nepali craftsmanship.',
  },
  {
    name: 'Modern Glam',
    icon: Sparkles,
    gradient: 'from-gray-800 via-rose-gold to-marigold-light',
    description: 'Contemporary luxury with metallic accents',
    longDescription: 'Shimmering metallics, mirror installations, crystal centerpieces, and champagne tones — where modern design meets pure glamour.',
  },
  {
    name: 'Rustic',
    icon: TreePine,
    gradient: 'from-amber-700 via-amber-600 to-yellow-600',
    description: 'Natural elements, warm tones, charming simplicity',
    longDescription: 'Burlap runners, mason jars, wooden signage, fairy lights, and wildflower arrangements — a warm, earthy celebration of natural beauty.',
  },
  {
    name: 'Garden',
    icon: Sun,
    gradient: 'from-green-600 via-emerald-500 to-teal-400',
    description: 'Outdoor elegance with natural beauty',
    longDescription: 'Bring the outdoors in with lush greenery, botanical prints, hanging gardens, and enchanted forest elements for a magical garden celebration.',
  },
];

const packageTiers = [
  {
    name: 'Basic',
    price: 'NPR 50,000',
    priceNote: 'Starting from',
    gradient: 'from-ivory-dark to-white',
    features: [
      'Standard flower arrangement',
      'Basic lighting setup',
      'Simple backdrop',
      'Table centerpieces',
      'Entrance decoration',
    ],
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'NPR 1,50,000',
    priceNote: 'Most Popular',
    gradient: 'from-burgundy to-burgundy-dark',
    features: [
      'Premium flower arrangements',
      'Theme lighting & ambiance',
      'Custom backdrop design',
      'Mandap / Stage decoration',
      'Draping & ceiling decor',
      'Table styling & linens',
      'Photo booth corner',
    ],
    highlight: true,
  },
  {
    name: 'Luxury',
    price: 'NPR 3,00,000',
    priceNote: 'Full Transformation',
    gradient: 'from-marigold-dark via-marigold to-marigold-light',
    features: [
      'Exotic imported flowers',
      'Designer lighting installation',
      'Grand mandap / Stage',
      'Full venue transformation',
      'Custom furniture & props',
      'Entrance & pathway design',
      'Ceiling installation',
      'VIP lounge setup',
    ],
    highlight: false,
  },
];

export default function DecorationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Decoration & Themes"
        subtitle="Transform your vision into reality"
        backgroundImage="linear-gradient(135deg, #B76E79 0%, #6B1D2A 30%, #4A0E1A 60%, #DAA520 100%)"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Decoration' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Theme Galleries */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Choose Your Theme
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From royal opulence to rustic charm — select a theme that reflects your style
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {themes.map((theme, i) => (
              <motion.div
                key={theme.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="luxury-card-hover border-marigold/20 overflow-hidden group h-full">
                  <div className={`h-48 bg-gradient-to-br ${theme.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <theme.icon className="w-14 h-14 text-white/70 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-serif text-xl font-bold text-burgundy mb-2">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {theme.description}
                    </p>
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-marigold hover:text-marigold-dark transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decoration Package Tiers */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Decoration Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a package that suits your vision and budget
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {packageTiers.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-marigold text-white px-4 py-1 border-0 text-sm shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`luxury-card-hover border-marigold/20 h-full ${
                    pkg.highlight ? 'ring-2 ring-burgundy shadow-xl' : ''
                  }`}
                >
                  <div className={`h-3 bg-gradient-to-r ${pkg.gradient} rounded-t-xl`} />
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-serif text-2xl text-burgundy">
                      {pkg.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {pkg.priceNote}
                    </p>
                    <p className="font-serif text-3xl font-bold text-marigold-dark mt-2">
                      {pkg.price}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-marigold mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/booking" className="block mt-6">
                      <Button
                        className={`w-full rounded-sm ${
                          pkg.highlight
                            ? 'bg-burgundy hover:bg-burgundy-dark text-white'
                            : 'bg-white text-burgundy border-2 border-burgundy hover:bg-burgundy hover:text-white'
                        } transition-all`}
                      >
                        Book a Viewing
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              See the Transformation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Witness how our decoration team transforms ordinary spaces into extraordinary experiences
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <Card className="border-marigold/20 overflow-hidden">
              <div className="h-64 md:h-80 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gray-400/50 flex items-center justify-center">
                  <Palette className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-500 font-serif text-lg">Before Setup</p>
              </div>
              <CardContent className="p-4 text-center">
                <Badge variant="outline" className="text-gray-500 border-gray-300">
                  Empty Venue Space
                </Badge>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-marigold/20 overflow-hidden">
              <div className="h-64 md:h-80 bg-gradient-to-br from-burgundy via-rose-gold to-marigold flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <p className="text-white font-serif text-lg">After Setup</p>
              </div>
              <CardContent className="p-4 text-center">
                <Badge className="bg-burgundy text-white border-0">
                  Royal Theme Applied
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Request Custom Decoration */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <EnquiryForm
              title="Request Custom Decoration"
              subtitle="Share your vision and our design team will bring it to life"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
