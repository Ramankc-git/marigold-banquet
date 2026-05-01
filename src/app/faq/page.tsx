'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/whatsapp-icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHero } from '@/components/shared/section-hero';

const faqCategories = [
  'All',
  'Booking',
  'Catering',
  'Decoration',
  'Weddings',
  'Corporate',
  'Pricing',
];

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Booking
  {
    question: 'How do I book Marigold Banquet Hall?',
    answer:
      'You can book by calling us at +977-9851111191, filling out our online enquiry form, or visiting us in person. We recommend booking at least 2-3 months in advance for weddings and large events.',
    category: 'Booking',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations made 30+ days before the event receive a full refund minus processing fees. Cancellations within 30 days are subject to our cancellation policy. Please refer to our Refund & Cancellation Policy page for complete details.',
    category: 'Booking',
  },
  {
    question: 'Can I schedule a venue viewing?',
    answer:
      'Absolutely! We encourage venue viewings before booking. You can schedule a viewing through our website or by calling us directly.',
    category: 'Booking',
  },
  // Catering
  {
    question: 'Do you provide in-house catering?',
    answer:
      'Yes, we offer comprehensive in-house catering with a wide range of menu options including Nepali, Indian, Chinese, Continental, and Fusion cuisine. All food is freshly prepared in our kitchen.',
    category: 'Catering',
  },
  {
    question: 'Can I bring my own caterer?',
    answer:
      'While we recommend our in-house catering for the best experience, external caterers may be permitted with prior approval and applicable charges.',
    category: 'Catering',
  },
  // Decoration
  {
    question: 'Is decoration included in the package?',
    answer:
      'Basic decoration is included in our Silver package. Premium and luxury decoration options are available with our Gold and Platinum packages. Custom decoration can also be arranged.',
    category: 'Decoration',
  },
  // Weddings
  {
    question: 'What types of wedding ceremonies do you host?',
    answer:
      'We host all types of wedding ceremonies including Hindu, Buddhist, Christian, Civil, and destination-style weddings. Our team is experienced in accommodating diverse cultural traditions.',
    category: 'Weddings',
  },
  // Corporate
  {
    question: 'Do you provide AV equipment for corporate events?',
    answer:
      'Yes, we provide comprehensive AV equipment including LED screens, projectors, microphone systems, DJ consoles, and stage lighting. All equipment is included in our corporate packages.',
    category: 'Corporate',
  },
  // Pricing
  {
    question: 'What are your payment methods?',
    answer:
      'We accept payments via eSewa, Khalti, bank transfer, and cash. A 50% advance is required to confirm your booking, with the balance due 7 days before the event.',
    category: 'Pricing',
  },
  // Additional FAQs to reach 12
  {
    question: 'What is the capacity of your venue?',
    answer:
      'Our venue can accommodate events ranging from 50 to 1000+ guests across different halls. The Grand Ballroom seats up to 800 guests in banquet style, while our smaller halls are perfect for intimate gatherings of 50-200 guests.',
    category: 'Booking',
  },
  {
    question: 'Is parking available at the venue?',
    answer:
      'Yes, we provide ample parking space for up to 100 vehicles. Valet parking can also be arranged for premium events upon request.',
    category: 'Booking',
  },
  {
    question: 'Do you offer event planning services?',
    answer:
      'Yes, our dedicated event coordinators work with you from start to finish. They assist with everything from vendor coordination and timeline management to decoration setup and day-of coordination.',
    category: 'Booking',
  },
];

const categoryIcons: Record<string, string> = {
  Booking: '📋',
  Catering: '🍽️',
  Decoration: '🎨',
  Weddings: '💍',
  Corporate: '🏢',
  Pricing: '💰',
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  // FAQPage structured data for Google rich results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://marigoldbanquet.com.np",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://marigoldbanquet.com.np/faq",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* FAQPage Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <SectionHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      {/* Category Filter */}
      <section className="py-12 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-burgundy mb-4">
              Browse by Category
            </h2>
            <div className="section-divider mb-6" />
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === category
                    ? 'bg-burgundy text-white shadow-md'
                    : 'bg-white text-burgundy hover:bg-burgundy/10 border border-burgundy/20'
                }`}
              >
                {category !== 'All' && (
                  <span className="text-base">
                    {categoryIcons[category]}
                  </span>
                )}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-burgundy/30 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-burgundy mb-2">
                  No FAQs in this category
                </h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or contact us directly.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-white rounded-xl px-6 shadow-sm border-0 hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-serif text-burgundy hover:no-underline text-base md:text-lg py-5">
                        <span className="flex items-start gap-3">
                          <span className="text-marigold-dark font-bold text-sm mt-1 shrink-0">
                            Q
                          </span>
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        <span className="flex items-start gap-3">
                          <span className="text-burgundy font-bold text-sm mt-0.5 shrink-0">
                            A
                          </span>
                          <span>{faq.answer}</span>
                        </span>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions? */}
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
            <MessageCircle className="w-12 h-12 text-marigold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Don&apos;t hesitate to reach out. Our team is here to help you with
              any questions about our venue, services, or packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-marigold hover:bg-marigold-dark text-white px-8 py-6 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <a
                href="https://wa.me/9779851111191?text=Hello%20Marigold%20Banquet%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-ivory/30 text-ivory hover:bg-ivory/10 px-8 py-6 rounded-sm text-lg"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
