'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  CalendarCheck,
  XCircle,
  CreditCard,
  Building2,
  ShieldCheck,
  PenLine,
} from 'lucide-react';
import { SectionHero } from '@/components/shared/section-hero';

const sections = [
  {
    icon: FileText,
    title: 'General Terms',
    paragraphs: [
      'These Terms and Conditions constitute a legally binding agreement between Marigold Banquet Hall & Party Palace ("Marigold", "we", "us", or "our") and the client ("you" or "your") for the use of our venue and services. By making a booking or utilizing any of our services, you acknowledge that you have read, understood, and agree to be bound by these terms.',
      'Marigold Banquet Hall & Party Palace is a premier event venue located in Tokha, Kathmandu, Nepal. We provide banquet hall and party palace facilities for weddings, corporate events, celebrations, and other gatherings. All services are subject to availability and these terms apply to every engagement with our venue.',
      'These terms supersede any prior agreements, representations, or understandings between the parties. If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.',
    ],
  },
  {
    icon: CalendarCheck,
    title: 'Booking Terms',
    paragraphs: [
      'All bookings are subject to availability and require a minimum advance payment of 50% of the total estimated event cost. A booking is only confirmed upon receipt of the advance payment and a signed booking confirmation from Marigold. Verbal agreements or inquiries do not constitute a confirmed booking.',
      'Bookings should be made at least 2–4 weeks in advance for regular events and 2–3 months in advance for weddings and large-scale functions. Marigold reserves the right to decline any booking request at its sole discretion. Any changes to the booking details must be communicated in writing at least 7 days prior to the event.',
      'A confirmation receipt detailing the event date, time, venue, guest count, and services booked will be issued upon successful booking. Clients are responsible for reviewing this confirmation and reporting any discrepancies within 48 hours of receipt.',
    ],
  },
  {
    icon: XCircle,
    title: 'Cancellation Policy',
    paragraphs: [
      'Cancellations must be communicated in writing via email or official letter. The cancellation date is determined by the date we receive the written notice. Refund eligibility is based on the timeline outlined in our Refund & Cancellation Policy page. Cancellation fees are deducted from the advance payment.',
      'Marigold reserves the right to cancel an event in case of unforeseen circumstances including but not limited to natural disasters, government regulations, or safety concerns. In such cases, clients will be offered a full refund or the option to reschedule without additional charges.',
      'No-shows on the event date without prior written cancellation will result in forfeiture of the entire advance payment. Partial cancellations of services on the day of the event are not eligible for refunds.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    paragraphs: [
      'We accept the following payment methods: eSewa, Khalti, Bank Transfer, and Cash. All payments must be made in Nepali Rupees (NPR). A 50% advance is required to confirm the booking, and the remaining balance must be settled at least 7 days before the event date.',
      'For events booked less than 7 days in advance, full payment is required at the time of booking. Additional charges incurred during the event (such as extra guests, additional services, or damages) must be settled on the event day or within 3 business days thereafter. Invoices will be provided for all transactions.',
      'Late payments may incur a surcharge of 2% per month on the outstanding amount. Marigold reserves the right to withhold services for events where payment has not been received as per the agreed schedule.',
    ],
  },
  {
    icon: Building2,
    title: 'Venue Usage',
    paragraphs: [
      'The venue must be used solely for the purpose stated in the booking agreement. Any unauthorized use, including commercial activities not previously agreed upon, may result in immediate termination of the event without refund. Clients are responsible for ensuring all guests comply with venue rules.',
      'Venue access times are as agreed in the booking confirmation. Setup and teardown times must be included in the booking. Extended usage beyond the agreed time will incur additional charges at the rate of NPR 5,000 per hour. All events must conclude by 10:00 PM in compliance with local regulations unless special permission has been obtained.',
      'Smoking is prohibited inside the venue. Decoration materials must be fire-retardant. The use of confetti, glitter, or any materials that may damage the venue requires prior approval. Clients are responsible for any damage to the venue, furniture, equipment, or property caused by them or their guests.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Limitation of Liability',
    paragraphs: [
      'Marigold shall not be liable for any indirect, incidental, or consequential damages arising from the use of our venue or services. Our total liability for any claim shall not exceed the total amount paid by the client for the specific event in question.',
      'Marigold is not responsible for the loss, theft, or damage to personal property brought onto the premises by clients or their guests. We recommend that valuable items be secured at all times. Marigold provides basic security services, but clients are encouraged to arrange additional security for high-profile events.',
      'Marigold shall not be held liable for any failure or delay in performing its obligations due to causes beyond its reasonable control, including acts of God, natural disasters, government actions, pandemics, or other force majeure events.',
    ],
  },
  {
    icon: PenLine,
    title: 'Amendments',
    paragraphs: [
      'Marigold reserves the right to modify these Terms and Conditions at any time without prior notice. Updated terms will be effective immediately upon posting on our website. Continued use of our services after any changes constitutes acceptance of the revised terms.',
      'Clients will be notified of significant changes to these terms via email or a notice on our website. We encourage clients to review these terms periodically. Any amendments to a specific booking agreement must be made in writing and agreed upon by both parties.',
      'In the event of a conflict between these general terms and any specific terms agreed upon for a particular event, the specific terms shall prevail. For any questions regarding these terms, please contact us at info@marigoldbanquet.com.np or call +977-9851111191.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Terms & Conditions"
        subtitle="Please review our terms carefully before booking"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions' },
        ]}
      />

      {/* Content Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isEven = index % 2 === 0;
        return (
          <section
            key={section.title}
            className={`py-16 md:py-20 ${isEven ? 'bg-ivory' : 'bg-white'}`}
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
              <FileText className="w-8 h-8 text-burgundy/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                For questions about these terms, contact us at{' '}
                <a
                  href="mailto:info@marigoldbanquet.com.np"
                  className="text-burgundy hover:text-burgundy-dark underline underline-offset-2"
                >
                  info@marigoldbanquet.com.np
                </a>{' '}
                or call{' '}
                <a
                  href="tel:+9779851111191"
                  className="text-burgundy hover:text-burgundy-dark underline underline-offset-2"
                >
                  +977-9851111191
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
