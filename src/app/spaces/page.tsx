'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Check,
  Users,
  Maximize2,
  TreePine,
  Sparkles,
  CalendarCheck,
  ArrowRight,
  Eye,
  Rotate3d,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const halls = [
  {
    name: 'Grand Marigold Hall',
    tagline: 'Our flagship venue for grand celebrations',
    gradient: 'from-burgundy via-burgundy-light to-rose-gold',
    capacity: {
      banquet: 500,
      theatre: 700,
      cocktail: 350,
    },
    dimensions: '5,000 sq ft',
    features: ['Stage', 'AV Equipment', 'Air Conditioning', 'Natural Light'],
    description:
      'The crown jewel of Marigold, our Grand Hall is designed for the most spectacular events. With soaring ceilings, magnificent chandeliers, and abundant natural light, this space transforms beautifully for weddings, galas, and large-scale conferences.',
  },
  {
    name: 'Rose Garden Hall',
    tagline: 'Elegant charm with garden views',
    gradient: 'from-rose-gold via-rose-gold-light to-ivory-dark',
    capacity: {
      banquet: 300,
      theatre: 400,
      cocktail: 200,
    },
    dimensions: '3,000 sq ft',
    features: ['Stage', 'AV Equipment', 'Air Conditioning', 'Garden Access'],
    description:
      'The Rose Garden Hall offers an enchanting blend of indoor elegance and outdoor beauty. With direct access to our manicured gardens, this versatile space is perfect for events that desire a touch of nature alongside sophisticated interiors.',
  },
  {
    name: 'Golden Terrace',
    tagline: 'Intimate luxury for special gatherings',
    gradient: 'from-marigold via-marigold-light to-marigold-dark',
    capacity: {
      banquet: 150,
      theatre: 200,
      cocktail: 120,
    },
    dimensions: '1,500 sq ft',
    features: ['AV Equipment', 'Air Conditioning', 'Outdoor Access', 'Intimate Setting'],
    description:
      'The Golden Terrace is our most intimate venue, perfect for smaller celebrations that demand luxury. With warm golden accents, outdoor terrace access, and a cozy ambiance, it\'s ideal for engagement parties, milestone birthdays, and executive gatherings.',
  },
];

export default function SpacesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Explore Our Spaces"
        subtitle="Discover the perfect venue for your event"
        backgroundImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234A0E1A'/%3E%3Cstop offset='50%25' style='stop-color:%236B1D2A'/%3E%3Cstop offset='100%25' style='stop-color:%238B3A4A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='1080'/%3E%3C/svg%3E"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Spaces' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Hall Cards */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Our Venue Spaces
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three distinctive spaces, each with its own character and charm
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {halls.map((hall, idx) => (
              <motion.div
                key={hall.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-marigold/10 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Photo Placeholder */}
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${hall.gradient}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-70" />
                          <p className="font-serif text-2xl font-bold opacity-90">
                            {hall.name}
                          </p>
                          <p className="text-sm opacity-70 mt-1">
                            Venue Photo
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-8">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-burgundy mb-1">
                        {hall.name}
                      </h3>
                      <p className="text-rose-gold text-sm font-medium mb-4">
                        {hall.tagline}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {hall.description}
                      </p>

                      {/* Capacity Table */}
                      <div className="mb-6">
                        <h4 className="font-serif text-sm font-semibold text-burgundy mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Seating Capacity
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-ivory rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-burgundy font-serif">
                              {hall.capacity.banquet}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Banquet
                            </p>
                          </div>
                          <div className="bg-ivory rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-burgundy font-serif">
                              {hall.capacity.theatre}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Theatre
                            </p>
                          </div>
                          <div className="bg-ivory rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-burgundy font-serif">
                              {hall.capacity.cocktail}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Cocktail
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dimensions */}
                      <div className="flex items-center gap-2 mb-5">
                        <Maximize2 className="w-4 h-4 text-marigold" />
                        <span className="text-sm text-muted-foreground">
                          <span className="font-semibold text-burgundy">
                            {hall.dimensions}
                          </span>{' '}
                          event space
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-serif text-sm font-semibold text-burgundy mb-3">
                          Features & Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hall.features.map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1.5 text-xs bg-burgundy/5 text-burgundy px-3 py-1.5 rounded-full"
                            >
                              <Check className="w-3 h-3 text-marigold" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/booking" className="flex-1">
                          <Button className="w-full bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                            <CalendarCheck className="w-4 h-4 mr-2" />
                            Check Availability
                          </Button>
                        </Link>
                        <Link href="/booking" className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-white rounded-sm"
                          >
                            Book This Space
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor / Garden Space */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <TreePine className="w-16 h-16 mx-auto mb-3 opacity-70" />
                    <p className="font-serif text-2xl font-bold opacity-90">
                      Garden & Outdoor
                    </p>
                    <p className="text-sm opacity-70 mt-1">Outdoor Venue Photo</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
                  Outdoor & Garden Spaces
                </h2>
                <div className="section-divider mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For those who dream of celebrating under the open sky, our
                  beautifully landscaped garden spaces offer a breath-taking
                  alternative to our indoor halls. Surrounded by lush greenery
                  and fragrant marigolds, these spaces are perfect for wedding
                  ceremonies, cocktail receptions, and evening soirees.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Landscaped garden with marigold beds',
                    'Flexible open-air setup for up to 250 guests',
                    'Weather-proof canopy and lighting',
                    'Seamless indoor-outdoor flow from Rose Garden Hall',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button className="bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                    Enquire About Outdoor Space
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 360° Virtual Tour */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center max-w-3xl mx-auto">
            <Rotate3d className="w-16 h-16 mx-auto mb-6 text-marigold-light" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              360° Virtual Tour
            </h2>
            <p className="text-ivory/80 mb-10">
              Experience our venues from the comfort of your home. Take an
              immersive virtual tour of all our spaces and start planning your
              perfect event.
            </p>

            {/* Virtual Tour Placeholder */}
            <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-marigold-light opacity-50" />
                  <p className="font-serif text-xl font-semibold text-ivory/70 mb-2">
                    Virtual Tour Coming Soon
                  </p>
                  <p className="text-sm text-ivory/50">
                    Our immersive 360° virtual tour is being prepared
                  </p>
                </div>
              </div>
            </div>

            <p className="text-ivory/60 text-sm mb-6">
              In the meantime, we&apos;d love to show you around in person.
              Book a viewing and experience the grandeur firsthand.
            </p>
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-marigold hover:bg-marigold-dark text-white rounded-sm px-8"
              >
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book a Viewing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 max-w-4xl">
          <EnquiryForm
            title="Check Availability"
            subtitle="Select your preferred space and date — we'll confirm availability within hours"
          />
        </div>
      </section>
    </div>
  );
}
