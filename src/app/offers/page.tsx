'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Gift,
  Calendar,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle,
  Crown,
  Sparkles,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/shared/section-hero';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const currentOffers = [
  {
    title: 'Early Bird Wedding Discount',
    description:
      'Book your 2025 wedding before March 31 and save 15% on all packages',
    validity: 'Valid until March 31, 2025',
    icon: Calendar,
    badge: '15% OFF',
    gradient: 'from-burgundy/80 to-rose-gold/50',
    isActive: true,
  },
  {
    title: 'Corporate Combo Deal',
    description:
      'Book 3+ corporate events and get the 4th at 50% off',
    validity: 'Ongoing',
    icon: Building2,
    badge: '50% OFF',
    gradient: 'from-marigold/70 to-marigold-light/50',
    isActive: true,
  },
  {
    title: 'Weekday Special',
    description:
      '20% off on all events booked for Monday–Thursday',
    validity: 'Ongoing',
    icon: Clock,
    badge: '20% OFF',
    gradient: 'from-rose-gold/70 to-burgundy/50',
    isActive: true,
  },
];

const packageTiers = [
  {
    category: 'Wedding',
    icon: Crown,
    tiers: [
      {
        name: 'Silver',
        description: 'Essential wedding package with basics covered',
        price: 'NPR 1,50,000+',
      },
      {
        name: 'Gold',
        description: 'Premium wedding with enhanced decoration & catering',
        price: 'NPR 3,00,000+',
      },
      {
        name: 'Platinum',
        description: 'Luxury wedding with full-service experience',
        price: 'NPR 5,00,000+',
      },
    ],
  },
  {
    category: 'Party',
    icon: Sparkles,
    tiers: [
      {
        name: 'Basic',
        description: 'Venue + basic setup for small gatherings',
        price: 'NPR 50,000+',
      },
      {
        name: 'Premium',
        description: 'Venue + decoration + catering included',
        price: 'NPR 1,50,000+',
      },
      {
        name: 'Luxury',
        description: 'Full-service party with custom themes',
        price: 'NPR 3,00,000+',
      },
    ],
  },
  {
    category: 'Corporate',
    icon: Building2,
    tiers: [
      {
        name: 'Half Day',
        description: 'Up to 4 hours with AV equipment',
        price: 'NPR 75,000+',
      },
      {
        name: 'Full Day',
        description: 'Full-day access with catering',
        price: 'NPR 1,50,000+',
      },
      {
        name: 'Multi-Day',
        description: 'Conference or seminar spanning multiple days',
        price: 'Custom',
      },
    ],
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Offers & Packages"
        subtitle="Special deals for your celebrations"
        backgroundImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Offers' },
        ]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Current Offers */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Gift className="w-10 h-10 text-marigold mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Current Offers
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take advantage of our limited-time deals and ongoing promotions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 luxury-card-hover relative"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-marigold text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {offer.badge}
                  </span>
                </div>

                {/* Gradient header */}
                <div
                  className={`h-40 bg-gradient-to-br ${offer.gradient} flex items-center justify-center relative`}
                >
                  <offer.icon className="w-16 h-16 text-white/40" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-burgundy mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-marigold-dark">
                    <Clock className="w-4 h-4" />
                    <span>{offer.validity}</span>
                  </div>
                  <Link href="/booking">
                    <Button className="w-full mt-5 bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                      Claim This Offer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Overview */}
      <section className="py-20 bg-ivory-dark/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Star className="w-10 h-10 text-marigold mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Package Overview
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package for your event type and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packageTiers.map((pkg, index) => (
              <motion.div
                key={pkg.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                {/* Category header */}
                <div className="bg-burgundy p-6 text-center">
                  <pkg.icon className="w-8 h-8 text-marigold mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold text-white">
                    {pkg.category}
                  </h3>
                </div>

                {/* Tiers */}
                <div className="divide-y">
                  {pkg.tiers.map((tier) => (
                    <div key={tier.name} className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif font-bold text-burgundy">
                          {tier.name}
                        </h4>
                        <span className="text-marigold-dark font-bold text-sm">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {tier.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Enquire for details</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 pt-0">
                  <Link href="/booking">
                    <Button
                      variant="outline"
                      className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-white rounded-sm"
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <EnquiryForm title="Enquire About Offers" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-burgundy relative overflow-hidden">
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
              Don&apos;t Miss Out
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Our offers are updated regularly. Contact us to learn about the
              latest deals and secure the best package for your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="bg-marigold hover:bg-marigold-dark text-white px-8 py-6 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  Book a Viewing
                </Button>
              </Link>
              <a href="tel:+9779851111191">
                <Button
                  variant="outline"
                  className="border-ivory/30 text-ivory hover:bg-ivory/10 px-8 py-6 rounded-sm text-lg"
                >
                  Call +977-9851111191
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
