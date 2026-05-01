'use client';

import { motion } from 'framer-motion';
import {
  UserCheck,
  Database,
  Lock,
  Share2,
  Cookie,
  Scale,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { SectionHero } from '@/components/shared/section-hero';

const sections = [
  {
    icon: UserCheck,
    title: 'Information We Collect',
    paragraphs: [
      'We collect personal information that you provide when making a booking, submitting an enquiry, or interacting with our website. This includes your full name, email address, phone number, mailing address, and any other details you choose to share with us. We also collect information about your event preferences, such as event type, date, guest count, and special requirements.',
      'When you make a booking, we collect booking details including event date, venue preference, menu selections, decoration choices, and any additional service requests. Payment information such as transaction IDs and payment method details are collected for processing, though we do not store complete credit card or bank account numbers on our servers.',
      'We may also collect information you provide through feedback forms, surveys, WhatsApp messages, email correspondence, and social media interactions. This information helps us improve our services and tailor our offerings to your needs.',
    ],
  },
  {
    icon: Database,
    title: 'How We Use Information',
    paragraphs: [
      'We use the information we collect primarily to process your bookings, provide the services you have requested, and communicate with you about your event. This includes sending booking confirmations, event reminders, and any updates or changes related to your reservation. We may also use your information to personalize your experience and offer recommendations based on your preferences.',
      'Your data helps us improve our services by analyzing trends, understanding client needs, and enhancing our venue offerings. We may use aggregated, non-personal data for analytical purposes to understand how our services are being used and to make informed business decisions.',
      'With your consent, we may also use your contact information to send you promotional materials, special offers, and updates about our services. You can opt out of marketing communications at any time by contacting us or clicking the unsubscribe link in our emails.',
    ],
  },
  {
    icon: Lock,
    title: 'Data Protection',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL/TLS encryption to secure data transmitted between your browser and our servers. All payment transactions are processed through secure, PCI-compliant payment gateways.',
      'Access to your personal information is restricted to authorized personnel who need it to perform their duties, such as event coordinators and management staff. We regularly review our security practices and update them to address emerging threats. Physical access to our servers and data storage facilities is also tightly controlled.',
      'While we strive to protect your personal information, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest reasonable standards of data protection in accordance with applicable Nepali laws and regulations.',
    ],
  },
  {
    icon: Share2,
    title: 'Third-Party Sharing',
    paragraphs: [
      'We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your information with trusted service providers who assist us in operating our business, such as payment processors (eSewa, Khalti), email service providers, and IT support services — but only to the extent necessary for them to perform their functions.',
      'We may disclose your information if required by law, regulation, or legal process, or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others. This includes responding to court orders, subpoenas, or government requests.',
      'In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of the transaction. We will notify you via email of any such change in ownership and the choices available to you regarding your information.',
    ],
  },
  {
    icon: Cookie,
    title: 'Cookies',
    paragraphs: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences, understand how you use our website, and improve our services. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain until they expire or you delete them).',
      'We use essential cookies that are necessary for the website to function properly, such as maintaining your session and remembering items in your enquiry cart. We also use analytics cookies (such as Google Analytics) to understand website traffic and usage patterns. These help us identify which pages are most popular and how visitors navigate our site.',
      'You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or alert you when a cookie is being set. Please note that disabling certain cookies may affect the functionality of our website. For more information on managing cookies, refer to your browser\'s help documentation.',
    ],
  },
  {
    icon: Scale,
    title: 'Your Rights',
    paragraphs: [
      'You have the right to access the personal information we hold about you. You may request a copy of your data at any time by contacting us. We will provide the information within 30 days of receiving your request, free of charge. If you find any inaccuracies, you have the right to request corrections to ensure your data is accurate and up to date.',
      'You have the right to request the deletion of your personal information, subject to certain exceptions such as where we are required to retain data for legal or regulatory purposes. You may also request that we restrict the processing of your data or object to certain types of processing, such as direct marketing.',
      'To exercise any of these rights, please contact us using the details provided below. We will respond to your request within a reasonable timeframe and may require verification of your identity before processing your request. We will not discriminate against you for exercising your privacy rights.',
    ],
  },
  {
    icon: Phone,
    title: 'Contact Us About Privacy',
    paragraphs: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please do not hesitate to contact us. We are committed to addressing your concerns promptly and transparently.',
      'You can reach our privacy team through the following channels:',
    ],
    hasContact: true,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Privacy Policy"
        subtitle="How we protect and handle your personal information"
        backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
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

                  {/* Contact details for the last section */}
                  {section.hasContact && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      <a
                        href="tel:+9779851111191"
                        className="flex items-center gap-3 bg-burgundy/5 rounded-xl p-4 hover:bg-burgundy/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0 group-hover:bg-burgundy/20 transition-colors">
                          <Phone className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="text-sm font-medium text-burgundy">
                            +977-9851111191
                          </p>
                        </div>
                      </a>
                      <a
                        href="mailto:info@marigoldbanquet.com"
                        className="flex items-center gap-3 bg-burgundy/5 rounded-xl p-4 hover:bg-burgundy/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0 group-hover:bg-burgundy/20 transition-colors">
                          <Mail className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium text-burgundy">
                            info@marigoldbanquet.com
                          </p>
                        </div>
                      </a>
                      <div className="flex items-center gap-3 bg-burgundy/5 rounded-xl p-4">
                        <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-burgundy" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Address</p>
                          <p className="text-sm font-medium text-burgundy">
                            Tokha, Kathmandu
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
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
              <Lock className="w-8 h-8 text-burgundy/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Last updated: January 2025
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                This policy may be updated periodically. We encourage you to review it regularly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
