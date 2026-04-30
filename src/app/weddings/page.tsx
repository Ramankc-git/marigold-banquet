'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Flower2,
  Church,
  Scale,
  MapPin,
  Check,
  Download,
  Camera,
  Utensils,
  Palette,
  Sparkles,
  Paintbrush,
  Music,
  Heart,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const ceremonyTypes = [
  {
    icon: Flame,
    title: 'Hindu Wedding',
    description: 'Traditional ceremony with sacred fire and rituals',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Flower2,
    title: 'Buddhist Wedding',
    description: 'Serene ceremony with spiritual blessings',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    icon: Church,
    title: 'Christian Wedding',
    description: 'Elegant ceremony in our beautifully decorated hall',
    color: 'from-rose-400 to-pink-600',
  },
  {
    icon: Scale,
    title: 'Civil Wedding',
    description: 'Simple and dignified legal ceremony',
    color: 'from-slate-400 to-slate-600',
  },
  {
    icon: MapPin,
    title: 'Destination Style',
    description: 'Nepal as your wedding destination',
    color: 'from-emerald-400 to-teal-600',
  },
];

const includedItems = [
  'Banquet Hall',
  'Decoration',
  'Catering',
  'AV Equipment',
  'Event Coordination',
  'Parking',
];

const packages = [
  {
    name: 'Silver Package',
    price: 'NPR 1,50,000',
    features: [
      'Basic hall access',
      'Standard decoration',
      'Veg / Non-veg buffet',
      'Basic lighting',
      'Parking for 50 vehicles',
    ],
    highlight: false,
  },
  {
    name: 'Gold Package',
    price: 'NPR 3,00,000',
    features: [
      'Premium hall access',
      'Theme decoration',
      'Multi-cuisine buffet',
      'DJ setup & sound system',
      'Parking for 100 vehicles',
    ],
    highlight: true,
  },
  {
    name: 'Platinum Package',
    price: 'NPR 5,00,000',
    features: [
      'Grand hall access',
      'Luxury decoration',
      'Premium catering',
      'Live music & entertainment',
      'Full event coordination',
      'Valet parking',
    ],
    highlight: false,
  },
];

const testimonials = [
  {
    name: 'Aarav & Priya Sharma',
    date: 'December 2024',
    text: 'Our wedding at Marigold was nothing short of magical. The attention to detail in the decoration, the exquisite food, and the seamless coordination made our special day absolutely perfect. Our guests are still talking about it!',
    rating: 5,
  },
  {
    name: 'Rajan & Sita Maharjan',
    date: 'February 2025',
    text: 'We chose the Platinum package and it was worth every penny. The team went above and beyond to accommodate our traditional Newari wedding rituals while keeping everything modern and elegant. Highly recommend!',
    rating: 5,
  },
];

const vendorCategories = [
  { icon: Camera, label: 'Photographer' },
  { icon: Utensils, label: 'Caterer' },
  { icon: Palette, label: 'Decorator' },
  { icon: Sparkles, label: 'Mehendi' },
  { icon: Paintbrush, label: 'Makeup' },
  { icon: Music, label: 'Band' },
];

const faqs = [
  {
    question: 'How far in advance should I book my wedding?',
    answer:
      'We recommend booking at least 3-6 months in advance, especially for peak wedding season (October-February and April-May). However, we do accommodate shorter timelines when possible — contact us to check availability.',
  },
  {
    question: 'Can I bring my own wedding planner or vendors?',
    answer:
      'Absolutely! While we offer in-house event coordination, you are welcome to bring your own wedding planner, decorator, caterer, or any other vendor. We will work closely with your team to ensure everything runs smoothly.',
  },
  {
    question: 'Is there a dedicated bridal suite or changing room?',
    answer:
      'Yes, we provide a private bridal suite and a separate groom\'s room, both equipped with full-length mirrors, comfortable seating, and refreshment areas. These are included in all our wedding packages.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer:
      'Cancellations made 60+ days before the event receive a full refund minus the booking deposit. 30-60 days receive a 50% refund. Less than 30 days are non-refundable. We are happy to discuss rescheduling options in case of emergencies.',
  },
];

const galleryItems = [
  { gradient: 'from-burgundy via-burgundy-light to-rose-gold', label: 'Grand Entrance' },
  { gradient: 'from-marigold via-marigold-dark to-burgundy', label: 'Mandap Setup' },
  { gradient: 'from-rose-gold via-burgundy-light to-burgundy-dark', label: 'Reception Decor' },
  { gradient: 'from-marigold-dark via-marigold to-marigold-light', label: 'Table Setting' },
  { gradient: 'from-burgundy-dark via-burgundy to-marigold', label: 'Bridal Suite' },
  { gradient: 'from-rose-gold-light via-rose-gold to-burgundy', label: 'Outdoor Ceremony' },
];

export default function WeddingsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Weddings at Marigold"
        subtitle="Your dream wedding in the heart of Kathmandu"
        backgroundImage="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236B1D2A'/%3E%3Cstop offset='100%25' style='stop-color:%234A0E1A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='1080'/%3E%3C/svg%3E"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Weddings' }]}
        ctaText="Book a Venue Viewing"
        ctaHref="/booking"
      />

      {/* Wedding Story */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-6">
              Your Dream Wedding, Our Grand Stage
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Marigold Banquet Hall, we believe every love story deserves a
              celebration as unique and beautiful as the couple themselves. Nestled
              in the heart of Kathmandu, our elegant venue provides the perfect
              canvas for your most cherished day — where timeless traditions meet
              modern sophistication.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the moment you step through our grand entrance, you&apos;ll be
              enveloped in an atmosphere of warmth and luxury. Our dedicated team
              of wedding specialists works tirelessly to transform your vision into
              reality, ensuring every detail — from the floral arrangements to the
              last dance — is nothing short of perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ceremony Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Ceremony Types We Host
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Honouring every tradition with grace and grandeur
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ceremonyTypes.map((ceremony, idx) => (
              <motion.div
                key={ceremony.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="luxury-card-hover"
              >
                <Card className="border-marigold/10 overflow-hidden h-full">
                  <div
                    className={`h-3 bg-gradient-to-r ${ceremony.color}`}
                  />
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-14 h-14 rounded-full bg-burgundy/5 flex items-center justify-center mb-3">
                      <ceremony.icon className="w-7 h-7 text-burgundy" />
                    </div>
                    <CardTitle className="font-serif text-xl text-burgundy">
                      {ceremony.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">
                      {ceremony.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              What&apos;s Included
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto">
              Every wedding package comes with these essentials
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {includedItems.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-full bg-marigold flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Tiers */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Wedding Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the package that matches your dream celebration
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

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Wedding Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the magical celebrations at Marigold
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
                  <span className="text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    {item.label}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Testimonials */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              What Our Couples Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real love stories, real celebrations
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card className="h-full border-marigold/10">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-marigold text-marigold"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burgundy to-rose-gold flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-burgundy text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Download Brochure + Book Viewing */}
      <section className="py-20 bg-gradient-to-r from-burgundy via-burgundy-dark to-burgundy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan Your Dream Wedding?
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-10">
              Download our wedding brochure for full details, or book a venue
              viewing to experience Marigold in person.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-marigold hover:bg-marigold-dark text-white rounded-sm px-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-burgundy rounded-sm px-8"
                >
                  Book a Venue Viewing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preferred Vendors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Preferred Vendors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted professionals we recommend for your special day
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {vendorCategories.map((v, idx) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center luxury-card-hover"
              >
                <div className="w-16 h-16 rounded-full bg-ivory border border-marigold/20 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-7 h-7 text-burgundy" />
                </div>
                <p className="font-serif text-sm font-semibold text-burgundy">
                  {v.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about weddings at Marigold
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border-marigold/15"
                >
                  <AccordionTrigger className="text-left font-serif text-burgundy hover:text-burgundy-dark hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <EnquiryForm prefillEventType="wedding" />
        </div>
      </section>
    </div>
  );
}
