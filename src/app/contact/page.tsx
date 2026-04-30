'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Navigation,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHero } from '@/components/shared/section-hero';

function BusinessHoursIndicator() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Nepal timezone is UTC+5:45
      const nepalOffset = 5.75 * 60 * 60 * 1000;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const nepalTime = new Date(utcTime + nepalOffset);

      const hours = nepalTime.getHours();
      const minutes = nepalTime.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Open from 6:00 AM to 10:00 PM
      setIsOpen(totalMinutes >= 360 && totalMinutes < 1320);

      setCurrentTime(
        nepalTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}
      />
      <span
        className={`font-bold text-lg ${isOpen ? 'text-green-600' : 'text-red-600'}`}
      >
        {isOpen === null ? 'CHECKING...' : isOpen ? 'OPEN' : 'CLOSED'}
      </span>
      {currentTime && (
        <span className="text-muted-foreground text-sm ml-2">
          (Nepal Time: {currentTime})
        </span>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Contact Info Cards */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow luxury-card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Phone
              </h3>
              <a
                href="tel:+9779851111191"
                className="text-marigold-dark hover:text-marigold-dark/80 font-medium text-lg transition-colors"
              >
                +977-9851111191
              </a>
              <p className="text-muted-foreground text-sm mt-2">
                Click to call directly
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow luxury-card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Email
              </h3>
              <a
                href="mailto:info@marigoldbanquet.com.np"
                className="text-marigold-dark hover:text-marigold-dark/80 font-medium transition-colors break-all"
              >
                info@marigoldbanquet.com.np
              </a>
              <p className="text-muted-foreground text-sm mt-2">
                We reply within 24 hours
              </p>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow luxury-card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Address
              </h3>
              <p className="text-muted-foreground">
                Tokha-07, Gairigaun
                <br />
                Kathmandu, Nepal
              </p>
              <a
                href="https://maps.google.com/?q=27.7466368,85.320588"
                target="_blank"
                rel="noopener noreferrer"
                className="text-marigold-dark hover:text-marigold-dark/80 text-sm font-medium inline-flex items-center gap-1 mt-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-ivory-dark/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-burgundy" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-burgundy mb-2">
                Business Hours
              </h2>
              <BusinessHoursIndicator />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-burgundy/5">
                    <th className="text-left p-3 text-burgundy font-medium text-sm">
                      Day
                    </th>
                    <th className="text-right p-3 text-burgundy font-medium text-sm">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ].map((day) => (
                    <tr
                      key={day}
                      className="border-t last:border-t-0"
                    >
                      <td className="p-3 text-sm font-medium">{day}</td>
                      <td className="p-3 text-sm text-right text-muted-foreground">
                        6:00 AM – 10:00 PM
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
                Send Us a Message
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-muted-foreground">
                Have a question or want to learn more? Fill out the form below
                and we&apos;ll get back to you promptly.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6 bg-white rounded-xl shadow-sm"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-burgundy mb-3">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-2">
                  Thank you for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  For urgent inquiries, call us at{' '}
                  <a
                    href="tel:+9779851111191"
                    className="text-marigold-dark font-medium"
                  >
                    +977-9851111191
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-8 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      placeholder="+977-XXXXXXXXXX"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your event or inquiry..."
                    className="mt-1.5"
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-burgundy hover:bg-burgundy-dark text-white px-8 py-3 rounded-sm w-full sm:w-auto"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-ivory-dark/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl font-bold text-burgundy mb-4">
              Find Us
            </h2>
            <div className="section-divider mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2!2d85.320588!3d27.7466368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ0JzQ3LjkiTiA4NcKwMTknMTQuMSJF!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Marigold Banquet Hall Location"
              className="w-full"
            />
          </motion.div>

          <div className="text-center mt-6">
            <a
              href="https://maps.google.com/?q=27.7466368,85.320588"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-burgundy hover:bg-burgundy-dark text-white px-8 py-3 rounded-sm">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-marigold rounded-full translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
              Follow Us on Social Media
            </h2>
            <p className="text-ivory/80 mb-8 max-w-lg mx-auto">
              Stay updated with our latest events, offers, and behind-the-scenes
              moments
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.facebook.com/MarigoldBanquetcafeHealthClub/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-full px-6 py-3 transition-colors"
              >
                <Facebook className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-full px-6 py-3 transition-colors"
              >
                <Instagram className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
