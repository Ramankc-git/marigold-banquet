'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  RefreshCcw,
  CalendarClock,
  AlertTriangle,
  Scissors,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight,
} from 'lucide-react';
import { SectionHero } from '@/components/shared/section-hero';

const cancellationTiers = [
  {
    timeline: '30+ days before event',
    refund: 'Full refund minus 5% processing fee',
    refundPercent: 95,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    icon: CheckCircle2,
    description:
      'Cancellations made 30 or more days before the scheduled event date are eligible for a near-full refund. A 5% processing fee is retained to cover administrative and transaction costs.',
  },
  {
    timeline: '15–30 days before event',
    refund: '50% refund',
    refundPercent: 50,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: MinusCircle,
    description:
      'Cancellations made between 15 and 30 days before the event will receive a 50% refund of the advance payment. The remaining 50% is retained to cover committed costs and venue reservation losses.',
  },
  {
    timeline: '7–15 days before event',
    refund: '25% refund',
    refundPercent: 25,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    icon: MinusCircle,
    description:
      'Cancellations made 7 to 15 days before the event qualify for a 25% refund. By this stage, significant preparation and resource allocation have already been committed on your behalf.',
  },
  {
    timeline: 'Less than 7 days before event',
    refund: 'No refund',
    refundPercent: 0,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    icon: XCircle,
    description:
      'Cancellations made less than 7 days before the event are not eligible for any refund. At this stage, all arrangements and resources have been fully committed and cannot be recovered.',
  },
];

const sections = [
  {
    icon: RefreshCcw,
    title: 'Refund Process',
    paragraphs: [
      'All refunds are processed within 7–14 business days from the date of cancellation confirmation. Refunds are issued using the same payment method used for the original booking. If you paid via eSewa or Khalti, the refund will be credited to your digital wallet. Bank transfer refunds may take additional time depending on your bank\'s processing schedule.',
      'A refund confirmation will be sent to your registered email address once the refund has been initiated. Please note that any bank charges or transaction fees associated with the refund process are the responsibility of the client. Marigold is not liable for delays caused by third-party payment processors or banking institutions.',
      'If you have not received your refund within 14 business days, please contact our finance team at billing@marigoldbanquet.com.np or call +977-9851111191 with your booking reference number for assistance.',
    ],
  },
  {
    icon: CalendarClock,
    title: 'Date Changes & Rescheduling',
    paragraphs: [
      'Clients may request a date change for their event at no additional charge if the request is made at least 15 days before the original event date, subject to venue availability. The new date must be within 6 months of the original booking date. Only one complimentary date change is permitted per booking.',
      'Date change requests made less than 15 days before the event will be treated as a cancellation and new booking, subject to the cancellation policy outlined above. A rescheduling fee of 10% of the total booking amount will apply for changes within this period.',
      'All date change requests must be submitted in writing via email to info@marigoldbanquet.com. The new booking is subject to availability and current pricing at the time of rescheduling. Any price difference will be adjusted accordingly — either as an additional charge or a credit toward services.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Force Majeure',
    paragraphs: [
      'In the event of cancellations due to force majeure — including but not limited to natural disasters, pandemics, government-imposed restrictions, civil unrest, or other circumstances beyond the reasonable control of either party — Marigold will offer clients the option to reschedule their event to a mutually agreeable date at no additional cost, or receive a full refund minus a 2% administrative fee.',
      'Force majeure claims must be supported by relevant documentation or official announcements. Marigold will assess each claim on a case-by-case basis and communicate the available options within 5 business days of receiving the claim.',
      'If a force majeure event occurs after the rescheduled date has been confirmed, the standard cancellation policy will apply to the new date. We strongly recommend that clients consider event insurance for added protection against unforeseen circumstances.',
    ],
  },
  {
    icon: Scissors,
    title: 'Partial Cancellations',
    paragraphs: [
      'If you wish to reduce the number of guests or remove specific services from your booking, a partial adjustment may be possible. Guest count reductions must be communicated at least 7 days before the event. A reduction of more than 25% of the originally booked guest count will be treated as a partial cancellation, and refund for the reduced portion will follow a prorated version of the cancellation policy.',
      'Removal of individual services (such as decoration, catering add-ons, or AV equipment) can be done up to 5 days before the event. Refunds for cancelled services are subject to a 10% administrative fee. Services that have already been procured or prepared specifically for your event are non-refundable.',
      'All partial cancellation requests must be made in writing. The revised booking confirmation will be issued within 2 business days reflecting the updated services and any applicable refund amounts.',
    ],
  },
];

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Refund & Cancellation Policy"
        subtitle="Transparent policies for your peace of mind"
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Refund & Cancellation Policy' },
        ]}
      />

      {/* Cancellation Timeline */}
      <section className="py-16 md:py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-burgundy mb-4">
              Cancellation Timeline
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The refund you receive depends on how far in advance you cancel your booking
            </p>
          </motion.div>

          {/* Visual Timeline */}
          <div className="max-w-5xl mx-auto">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-4 gap-0 rounded-xl overflow-hidden shadow-lg"
              >
                {cancellationTiers.map((tier, index) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={index}
                      className={`${tier.lightColor} p-6 relative border-r last:border-r-0 ${tier.borderColor}`}
                    >
                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="h-2 rounded-full bg-white/50 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tier.refundPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
                            className={`h-full rounded-full ${tier.color}`}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-5 h-5 ${tier.textColor}`} />
                        <span className={`text-sm font-bold ${tier.textColor}`}>
                          {tier.refundPercent}% Refund
                        </span>
                      </div>
                      <h3 className={`font-serif text-lg font-bold ${tier.textColor} mb-2`}>
                        {tier.timeline}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {cancellationTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${tier.lightColor} border ${tier.borderColor} rounded-xl p-5`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`font-serif text-lg font-bold ${tier.textColor}`}
                          >
                            {tier.timeline}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-2xl font-bold ${tier.textColor}`}
                          >
                            {tier.refundPercent}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            refund
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/50 overflow-hidden mb-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${tier.refundPercent}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.15,
                            }}
                            className={`h-full rounded-full ${tier.color}`}
                          />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isEven = index % 2 === 0;
        return (
          <section
            key={section.title}
            className={`py-16 md:py-20 ${isEven ? 'bg-white' : 'bg-ivory'}`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-burgundy/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-burgundy" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-burgundy">
                      {section.title}
                    </h2>
                  </div>
                  <div className="section-divider !ml-0 mb-8" />
                  <div className="space-y-5">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: pIndex * 0.1 }}
                        className="text-muted-foreground leading-relaxed text-base md:text-lg"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Contact for Cancellations */}
      <section className="py-16 md:py-20 bg-burgundy relative overflow-hidden">
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
            <Clock className="w-12 h-12 text-marigold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Need to Cancel or Reschedule?
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Contact our team as early as possible. The sooner we know, the better we can
              assist you with refunds or rescheduling options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+9779851111191"
                className="inline-flex items-center gap-2 bg-marigold hover:bg-marigold-dark text-white px-8 py-4 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                +977-9851111191
              </a>
              <a
                href="mailto:info@marigoldbanquet.com"
                className="inline-flex items-center gap-2 border-2 border-ivory/30 text-ivory hover:bg-ivory/10 px-8 py-4 rounded-sm text-lg font-medium transition-all"
              >
                <Mail className="w-5 h-5" />
                info@marigoldbanquet.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-10 bg-ivory-dark/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-burgundy/5 border border-burgundy/10 rounded-xl p-6 md:p-8 text-center"
            >
              <ArrowRight className="w-8 h-8 text-burgundy/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                This policy is subject to change. Please review before making a booking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
