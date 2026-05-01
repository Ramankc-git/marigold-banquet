'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  Download,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionHero } from '@/components/shared/section-hero';
import { EnquiryForm } from '@/components/shared/enquiry-form';
import { toast } from 'sonner';
import { trackWhatsAppClick, trackPhoneClick, trackCTAClick, trackBookingStarted } from '@/lib/analytics';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Some "booked" dates - simulate by marking certain days
  const bookedDates = useMemo(() => {
    const booked = new Set<string>();
    const now = new Date();
    // Mark some dates in the current and next month as booked
    const seed = year * 12 + month;
    for (let i = 0; i < 8; i++) {
      const day = ((seed * 7 + i * 5 + 3) % 28) + 1;
      booked.add(`${year}-${month}-${day}`);
    }
    return booked;
  }, [year, month]);

  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // 0=Sun
  const totalDays = lastDay.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const cells: { day: number | null; dateKey: string; isToday: boolean }[] = [];
  // Empty cells before the first day
  for (let i = 0; i < startDay; i++) {
    cells.push({ day: null, dateKey: '', isToday: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    const dateKey = `${year}-${month}-${d}`;
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    cells.push({ day: d, dateKey, isToday });
  }

  return (
    <Card className="border-marigold/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-burgundy to-burgundy-dark text-white pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <CardTitle className="font-serif text-xl">
            {monthNames[month]} {year}
          </CardTitle>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((name) => (
            <div key={name} className="text-center text-xs font-medium text-muted-foreground py-1">
              {name}
            </div>
          ))}
        </div>
        {/* Date cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (cell.day === null) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }
            const isBooked = bookedDates.has(cell.dateKey);
            const isPast =
              new Date(year, month, cell.day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return (
              <div
                key={cell.dateKey}
                className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium relative
                  ${isPast ? 'text-gray-300' : ''}
                  ${cell.isToday ? 'ring-2 ring-burgundy' : ''}
                  ${isBooked && !isPast ? 'bg-red-100 text-red-700' : ''}
                  ${!isBooked && !isPast ? 'bg-green-50 text-green-700' : ''}
                `}
                title={isBooked ? 'Booked' : isPast ? 'Past' : 'Available'}
              >
                {cell.day}
                {isBooked && !isPast && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
                {!isBooked && !isPast && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-marigold/20">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Available
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Booked
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full ring-2 ring-burgundy" />
            Today
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VenueViewingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          eventType: 'venue_viewing',
          preferredDate: data.get('date'),
          specialReqs: `Preferred time: ${data.get('time')}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        trackBookingStarted('venue_viewing');
      } else {
        toast.error('Failed to submit. Please try again or contact us on WhatsApp.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl text-burgundy mb-3">Viewing Requested!</h3>
        <p className="text-muted-foreground">
          We&apos;ll confirm your venue viewing within 2 hours. Check your phone for a confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="viewName">Name *</Label>
          <Input id="viewName" name="name" required placeholder="Your name" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="viewPhone">Phone *</Label>
          <Input id="viewPhone" name="phone" required placeholder="+977-XXXXXXXXXX" className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="viewEmail">Email</Label>
        <Input id="viewEmail" name="email" type="email" placeholder="your@email.com" className="mt-1.5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="viewDate">Preferred Date *</Label>
          <Input id="viewDate" name="date" type="date" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="viewTime">Preferred Time *</Label>
          <Input id="viewTime" name="time" type="time" required className="mt-1.5" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-burgundy hover:bg-burgundy-dark text-white rounded-sm"
      >
        {loading ? 'Requesting...' : 'Request Site Visit'}
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Booking & Enquiry"
        subtitle="Let's plan your perfect event"
        backgroundImage="linear-gradient(135deg, #4A0E1A 0%, #6B1D2A 30%, #8B3A4A 60%, #DAA520 100%)"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Booking' }]}
        ctaText="Book a Viewing"
        ctaHref="#viewing-form"
      />

      {/* Availability Calendar */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-2xl">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Check Availability
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See which dates are available for your event at Marigold Banquet Hall
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <motion.div {...fadeInUp}>
            <AvailabilityCalendar />
          </motion.div>
        </div>
      </section>

      {/* Main Enquiry Form */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp}>
            <EnquiryForm
              title="Make an Enquiry"
              subtitle="Fill in the details below and we'll get back to you within 24 hours"
            />
          </motion.div>
        </div>
      </section>

      {/* Venue Viewing Form */}
      <section id="viewing-form" className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-2xl">
          <motion.div {...fadeInUp}>
            <Card className="border-marigold/20 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-burgundy via-rose-gold to-marigold" />
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-7 h-7 text-burgundy" />
                </div>
                <CardTitle className="font-serif text-2xl md:text-3xl text-burgundy">
                  Book a Venue Viewing
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Visit us in person before making your decision. A free, no-obligation site visit.
                </p>
              </CardHeader>
              <CardContent className="pt-2">
                <VenueViewingForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Download Brochure & WhatsApp */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Download Brochure */}
              <Card className="border-marigold/20 luxury-card-hover">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-marigold/10 flex items-center justify-center mb-4">
                    <Download className="w-8 h-8 text-marigold-dark" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-burgundy mb-3">
                    Download Brochure
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Get our complete venue brochure with pricing, packages, floor plans, and service details.
                  </p>
                  <Button
                    className="bg-marigold hover:bg-marigold-dark text-white rounded-sm px-8"
                    onClick={() => {
                      toast.info('Brochure download will be available soon!');
                      trackCTAClick('download_brochure', 'booking');
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure (PDF)
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="border-marigold/20 luxury-card-hover">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-burgundy mb-3">
                    Prefer to Chat?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Skip the form — reach out to us directly on WhatsApp for instant responses and quick booking confirmations.
                  </p>
                  <a
                    href="https://wa.me/9779851111191?text=Hello%20Marigold%20Banquet%2C%20I%20would%20like%20to%20enquire%20about%20booking%20your%20venue."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('booking_page')}
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-sm px-8">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us Directly
                    </Button>
                  </a>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      +977-9851111191
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      info@marigoldbanquet.com.np
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
