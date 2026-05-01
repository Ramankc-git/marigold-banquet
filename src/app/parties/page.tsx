'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Cake,
  Heart,
  Gift,
  Flame,
  Baby,
  PartyPopper,
  GraduationCap,
  Globe,
  Check,
  ChevronDown,
  Star,
  Sparkles,
  Music,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const partyTypes = [
  {
    icon: Cake,
    name: 'Birthday',
    subtypes: 'Kids / Adult / Milestone',
    description: 'Celebrate another year of joy',
    details:
      'From themed children\'s parties with fun activities and games to elegant adult milestone celebrations, we create the perfect birthday experience. Choose from custom cake arrangements, themed decorations, entertainment options, and our delicious party menus.',
  },
  {
    icon: Heart,
    name: 'Engagement / Swayambar',
    subtypes: 'Ring Ceremony / Traditional',
    description: 'Begin your journey together',
    details:
      'Mark the beginning of your beautiful journey with a memorable engagement ceremony. Whether it\'s a modern ring ceremony or a traditional Swayambar, our team creates an intimate and romantic setting that reflects your love story.',
  },
  {
    icon: Gift,
    name: 'Anniversary',
    subtypes: 'Silver / Golden / Milestone',
    description: 'Renew your vows and celebrate love',
    details:
      'Celebrate the milestones of your journey together. Our anniversary packages include elegant décor, personalized touches, romantic lighting, and exquisite dining — perfect for renewing vows or simply celebrating years of togetherness.',
  },
  {
    icon: Flame,
    name: 'Bratabandha / Bartaman',
    subtypes: 'Sacred Thread Ceremony',
    description: 'Sacred thread ceremony with grand celebration',
    details:
      'Honour this important rite of passage with a ceremony that balances spiritual significance with celebratory grandeur. We provide traditional setup for the sacred rituals alongside a festive banquet for family and guests.',
  },
  {
    icon: Baby,
    name: 'Pasni / Nwaran',
    subtypes: 'Rice Feeding / Naming Ceremony',
    description: 'Rice feeding ceremony for your little one',
    details:
      'Celebrate your child\'s first milestone with a beautiful Pasni (rice feeding) or Nwaran (naming) ceremony. Our venue provides a safe, welcoming environment with traditional arrangements and delightful catering for all ages.',
  },
  {
    icon: PartyPopper,
    name: 'Baby Shower',
    subtypes: 'Traditional / Modern Theme',
    description: 'Welcome the newest member of the family',
    details:
      'A joyful celebration welcoming the newest member of your family. From charming decorations to fun games and delectable treats, we create a warm and festive atmosphere for the parents-to-be and their loved ones.',
  },
  {
    icon: GraduationCap,
    name: 'Farewell / Retirement',
    subtypes: 'Workplace / Personal',
    description: 'Honor achievements and new beginnings',
    details:
      'Bid farewell in style — whether it\'s a colleague retiring, a friend moving abroad, or a student graduating. Our farewell packages include personalized decorations, speeches setup, and a menu that suits the occasion.',
  },
  {
    icon: Globe,
    name: 'Cultural Programs',
    subtypes: 'Festivals / Community Events',
    description: 'Celebrate our rich heritage',
    details:
      'From Dashain and Tihar celebrations to community gatherings and cultural performances, our versatile spaces accommodate events of all scales. We honour Nepal\'s diverse traditions with authentic arrangements and festive ambiance.',
  },
];

const packages = [
  {
    name: 'Basic Package',
    price: 'NPR 75,000',
    features: [
      'Hall access (4 hours)',
      'Basic decoration',
      'Snacks & beverages',
      'Sound system',
      'Parking for 30 vehicles',
    ],
    highlight: false,
  },
  {
    name: 'Premium Package',
    price: 'NPR 1,50,000',
    features: [
      'Hall access (6 hours)',
      'Theme decoration',
      'Buffet dinner',
      'DJ & sound system',
      'Photo booth setup',
      'Parking for 60 vehicles',
    ],
    highlight: true,
  },
  {
    name: 'Luxury Package',
    price: 'NPR 3,00,000',
    features: [
      'Full venue access (8 hours)',
      'Luxury decoration & florals',
      'Multi-cuisine premium buffet',
      'Live entertainment / DJ',
      'Photography coverage',
      'Event coordination',
      'Valet parking',
    ],
    highlight: false,
  },
];

const galleryItems = [
  { gradient: 'from-rose-gold via-rose-gold-light to-ivory-dark', label: 'Birthday Setup' },
  { gradient: 'from-burgundy via-burgundy-light to-rose-gold', label: 'Engagement Decor' },
  { gradient: 'from-marigold via-marigold-light to-marigold-dark', label: 'Anniversary Dinner' },
  { gradient: 'from-burgundy-dark via-burgundy to-marigold', label: 'Cultural Night' },
  { gradient: 'from-rose-gold via-marigold to-burgundy-light', label: 'Baby Shower' },
  { gradient: 'from-marigold-dark via-rose-gold to-burgundy', label: 'Farewell Party' },
];

function PartyCard({ party }: { party: (typeof partyTypes)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="luxury-card-hover"
    >
      <Card className="h-full border-marigold/10 overflow-hidden">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-burgundy/5 flex items-center justify-center mb-3">
            <party.icon className="w-7 h-7 text-burgundy" />
          </div>
          <CardTitle className="font-serif text-xl text-burgundy">
            {party.name}
          </CardTitle>
          <p className="text-xs text-marigold font-medium">{party.subtypes}</p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm mb-3">
            {party.description}
          </p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground text-sm text-left leading-relaxed pt-2 border-t border-marigold/10">
                  {party.details}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="justify-center pb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-medium text-burgundy hover:text-burgundy-dark transition-colors"
          >
            {expanded ? 'Show Less' : 'Learn More'}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function PartiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Private Parties"
        subtitle="Every celebration deserves the perfect venue"
        backgroundImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236B1D2A'/%3E%3Cstop offset='50%25' style='stop-color:%238B3A4A'/%3E%3Cstop offset='100%25' style='stop-color:%234A0E1A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='1080'/%3E%3C/svg%3E"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Parties' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Party Types Grid */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Celebrations We Host
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, every occasion finds its perfect home at Marigold
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partyTypes.map((party) => (
              <PartyCard key={party.name} party={party} />
            ))}
          </div>
        </div>
      </section>

      {/* Party Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Party Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Packages designed to make every celebration unforgettable
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="luxury-card-hover"
              >
                <Card
                  className={`h-full overflow-hidden ${
                    pkg.highlight
                      ? 'border-2 border-marigold shadow-xl relative'
                      : 'border-marigold/10'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute top-0 right-0">
                      <Badge className="bg-marigold text-white rounded-none rounded-bl-lg px-3 py-1 text-xs font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-serif text-2xl text-burgundy">
                      {pkg.name}
                    </CardTitle>
                    <p className="gold-gradient-text text-2xl font-bold font-serif mt-2">
                      {pkg.price}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/booking" className="w-full">
                      <Button
                        className={`w-full rounded-sm ${
                          pkg.highlight
                            ? 'bg-burgundy hover:bg-burgundy-dark text-white'
                            : 'bg-white border border-burgundy text-burgundy hover:bg-burgundy hover:text-white'
                        }`}
                      >
                        Select Package
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Party Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how we bring celebrations to life
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="aspect-[4/3] rounded-xl overflow-hidden luxury-card-hover cursor-pointer relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan My Party Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <EnquiryForm
            prefillEventType="birthday"
            title="Plan My Party"
            subtitle="Tell us about your celebration and we'll create the perfect plan for you"
          />
        </div>
      </section>
    </div>
  );
}
