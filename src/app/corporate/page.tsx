'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Presentation,
  Users,
  Rocket,
  UtensilsCrossed,
  Trophy,
  FileText,
  Monitor,
  Projector,
  Mic,
  Disc3,
  Lightbulb,
  Volume2,
  Check,
  Building2,
  Briefcase,
  Landmark,
  Shield,
  Coffee,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const eventTypes = [
  {
    icon: Presentation,
    title: 'Seminars',
    description: 'Professional seminars with state-of-the-art AV equipment and comfortable seating for focused learning.',
  },
  {
    icon: Users,
    title: 'Conferences',
    description: 'Multi-track conferences with breakout rooms, registration desk setup, and full technical support.',
  },
  {
    icon: Rocket,
    title: 'Product Launches',
    description: 'High-impact product launches with dramatic lighting, stage setup, and media-friendly arrangements.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Team Dinners',
    description: 'Elegant corporate dining experiences with customized menus and sophisticated ambience.',
  },
  {
    icon: Trophy,
    title: 'Award Nights',
    description: 'Glamorous award ceremonies with red carpet setup, stage, and trophy presentation arrangements.',
  },
  {
    icon: FileText,
    title: 'AGMs',
    description: 'Formal Annual General Meetings with voting setup, projection systems, and professional seating.',
  },
];

const avEquipment = [
  { icon: Monitor, label: 'LED Screen', desc: 'High-definition LED walls up to 20ft' },
  { icon: Projector, label: 'Projector', desc: '4K projectors with motorized screens' },
  { icon: Mic, label: 'Mic System', desc: 'Wireless handheld & lapel microphones' },
  { icon: Disc3, label: 'DJ Console', desc: 'Professional DJ setup with mixing' },
  { icon: Lightbulb, label: 'Stage Lighting', desc: 'Intelligent moving head & LED lights' },
  { icon: Volume2, label: 'Sound System', desc: 'Line array speakers with surround sound' },
];

const packages = [
  {
    name: 'Half-Day Package',
    price: 'NPR 75,000',
    duration: '4 hours',
    features: [
      'Hall access (4 hours)',
      'Basic AV setup',
      'Tea & coffee service',
      'Stationery kit',
      'Parking for 30 vehicles',
    ],
    highlight: false,
  },
  {
    name: 'Full-Day Package',
    price: 'NPR 1,25,000',
    duration: '8 hours',
    features: [
      'Full hall access (8 hours)',
      'Complete AV setup',
      'Lunch & tea breaks',
      'Registration desk',
      'Branding & signage',
      'Parking for 60 vehicles',
    ],
    highlight: true,
  },
  {
    name: 'Evening Package',
    price: 'NPR 1,00,000',
    duration: '5 hours',
    features: [
      'Evening hall access (5 hrs)',
      'AV with mood lighting',
      'Cocktail dinner',
      'DJ & entertainment',
      'Valet parking',
    ],
    highlight: false,
  },
];

const seatingConfigs = [
  {
    type: 'Theatre',
    icon: '🎭',
    capacity: 'Up to 700',
    desc: 'Rows facing the stage — ideal for presentations and keynotes',
  },
  {
    type: 'Classroom',
    icon: '📚',
    capacity: 'Up to 350',
    desc: 'Tables with chairs — perfect for workshops and training',
  },
  {
    type: 'Boardroom',
    icon: '💼',
    capacity: 'Up to 40',
    desc: 'Single large table — suited for executive meetings',
  },
  {
    type: 'Banquet',
    icon: '🍽️',
    capacity: 'Up to 500',
    desc: 'Round tables — best for dinners and award ceremonies',
  },
];

const clientLogos = [
  { name: 'Nepal Bank Ltd.', icon: Landmark },
  { name: 'Chaudhary Group', icon: Building2 },
  { name: 'Nepal Telecom', icon: Briefcase },
  { name: 'Siddhartha Bank', icon: Landmark },
  { name: 'IME Group', icon: Shield },
  { name: 'Himalayan Java', icon: Coffee },
];

export default function CorporatePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Corporate Events"
        subtitle="Professional events with premium service"
        backgroundImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234A0E1A'/%3E%3Cstop offset='50%25' style='stop-color:%236B1D2A'/%3E%3Cstop offset='100%25' style='stop-color:%234A0E1A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='1080'/%3E%3C/svg%3E"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Corporate' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Event Types */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Corporate Event Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From boardroom meetings to grand conferences, we deliver excellence
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {eventTypes.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card-hover"
              >
                <Card className="h-full border-marigold/10">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-14 h-14 rounded-full bg-burgundy/5 flex items-center justify-center mb-3">
                      <event.icon className="w-7 h-7 text-burgundy" />
                    </div>
                    <CardTitle className="font-serif text-xl text-burgundy">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AV Equipment */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Audio-Visual Equipment
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto">
              State-of-the-art technology for seamless presentations
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {avEquipment.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-5 text-center"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-marigold-light" />
                <h3 className="font-serif font-bold text-lg mb-1">{item.label}</h3>
                <p className="text-ivory/70 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Corporate Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible packages to suit every business need
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
                        Best Value
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {pkg.duration}
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

      {/* Seating Configurations */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Seating Configurations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible layouts to match your event format
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {seatingConfigs.map((config, idx) => (
              <motion.div
                key={config.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center luxury-card-hover"
              >
                <Card className="h-full border-marigold/10">
                  <CardContent className="pt-6 text-center">
                    <span className="text-4xl mb-4 block">{config.icon}</span>
                    <h3 className="font-serif text-lg font-bold text-burgundy mb-1">
                      {config.type}
                    </h3>
                    <p className="text-marigold font-semibold text-sm mb-2">
                      {config.capacity}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {config.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Trusted By Leading Organizations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are proud to host events for these esteemed organizations
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {clientLogos.map((client, idx) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-xl bg-ivory border border-marigold/15 flex items-center justify-center mx-auto mb-3 hover:border-marigold/40 transition-colors">
                  <client.icon className="w-9 h-9 text-burgundy/60" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Inquiry Form */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 max-w-4xl">
          <EnquiryForm
            prefillEventType="corporate"
            title="Corporate Inquiry"
            subtitle="Tell us about your event requirements and we'll prepare a custom proposal"
          />
        </div>
      </section>
    </div>
  );
}
