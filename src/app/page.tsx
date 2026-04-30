'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, PartyPopper, Briefcase, MapPin, ArrowRight, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const eventPages = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Your dream wedding in the heart of Kathmandu. Traditional & modern ceremonies with luxury packages.',
    href: '/weddings',
    gradient: 'from-burgundy to-burgundy-dark',
    cta: 'Explore Weddings',
  },
  {
    icon: PartyPopper,
    title: 'Private Parties',
    description: 'Birthday, engagement, anniversary, bratabandha, pasni — every celebration deserves the perfect venue.',
    href: '/parties',
    gradient: 'from-rose-gold to-burgundy-light',
    cta: 'Explore Parties',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    description: 'Professional seminars, conferences, product launches, and award nights with premium AV & catering.',
    href: '/corporate',
    gradient: 'from-burgundy-dark to-burgundy',
    cta: 'Explore Corporate',
  },
  {
    icon: MapPin,
    title: 'Our Spaces',
    description: 'Three distinctive halls — Grand Marigold, Rose Garden, and Golden Terrace — plus outdoor garden venues.',
    href: '/spaces',
    gradient: 'from-marigold-dark to-marigold',
    cta: 'Explore Spaces',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy-dark to-burgundy" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23DAA520%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-white font-serif text-3xl font-bold">M</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
          >
            Marigold Banquet Hall
            <span className="block gold-gradient-text text-3xl md:text-5xl lg:text-6xl mt-2">
              & Party Palace
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto mb-10"
          >
            Premium venue for weddings, parties & corporate events in Tokha-07 Gairigaun, Kathmandu. In-house catering & decoration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/booking">
              <Button size="lg" className="bg-marigold hover:bg-marigold-dark text-white rounded-sm px-8 shadow-xl">
                Book a Viewing
              </Button>
            </Link>
            <a href="tel:+9779851111191">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-burgundy rounded-sm px-8">
                <Phone className="w-4 h-4 mr-2" />
                +977-9851111191
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Event Pages Navigation */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Your Event, Our Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whatever the occasion, Marigold provides the perfect setting with unmatched service
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {eventPages.map((page, idx) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="luxury-card-hover"
              >
                <Link href={page.href}>
                  <Card className="h-full border-marigold/10 overflow-hidden cursor-pointer group">
                    <div className={`h-2 bg-gradient-to-r ${page.gradient}`} />
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-burgundy/5 flex items-center justify-center group-hover:bg-burgundy/10 transition-colors">
                          <page.icon className="w-6 h-6 text-burgundy" />
                        </div>
                        <CardTitle className="font-serif text-xl text-burgundy group-hover:text-burgundy-dark transition-colors">
                          {page.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {page.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-burgundy group-hover:gap-2 transition-all">
                        {page.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Why Choose Marigold?
            </h2>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '700+', label: 'Guest Capacity' },
              { number: '3', label: 'Elegant Halls' },
              { number: '500+', label: 'Events Hosted' },
              { number: '10+', label: 'Years of Service' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="gold-gradient-text text-4xl font-bold font-serif mb-1">
                  {stat.number}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-burgundy via-burgundy-dark to-burgundy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Celebrate?
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Contact us today to book a viewing or discuss your event requirements. Our team is ready to make your vision a reality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-marigold hover:bg-marigold-dark text-white rounded-sm px-8">
                  Book a Viewing
                </Button>
              </Link>
              <a href="https://wa.me/9779851111191" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-burgundy rounded-sm px-8">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
