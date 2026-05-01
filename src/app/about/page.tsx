'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHero } from '@/components/shared/section-hero';

const teamMembers = [
  {
    name: 'Ramesh Shrestha',
    role: 'Manager',
    bio: 'With 15+ years in hospitality, Ramesh ensures every event runs flawlessly.',
    gradient: 'from-burgundy/70 to-rose-gold/50',
  },
  {
    name: 'Sita Maharjan',
    role: 'Event Coordinator',
    bio: "Sita's attention to detail transforms every celebration into a seamless experience.",
    gradient: 'from-rose-gold/70 to-marigold/50',
  },
  {
    name: 'Bikash Tamang',
    role: 'Head Chef',
    bio: 'Chef Bikash brings authentic flavors and innovative cuisine to every menu.',
    gradient: 'from-marigold/70 to-marigold-light/50',
  },
  {
    name: 'Anita Rai',
    role: 'Decoration Head',
    bio: "Anita's creative vision brings each theme to life with stunning precision.",
    gradient: 'from-burgundy-dark/70 to-burgundy/50',
  },
];

const awards = [
  {
    title: 'Best Banquet Hall Kathmandu 2024',
    icon: Award,
  },
  {
    title: 'Excellence in Hospitality Award',
    icon: Star,
  },
  {
    title: 'Top Rated Venue on Google',
    icon: Sparkles,
  },
];

const facilityPhotos = [
  { title: 'Grand Ballroom', gradient: 'from-burgundy/80 to-rose-gold/50' },
  { title: 'Garden Terrace', gradient: 'from-marigold/70 to-marigold-light/40' },
  { title: 'VIP Lounge', gradient: 'from-rose-gold/70 to-burgundy/50' },
  { title: 'Entrance Foyer', gradient: 'from-burgundy-dark/70 to-marigold/40' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="About Marigold"
        subtitle="Our story, our passion, your celebrations"
        backgroundImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Our Story */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-6">
                Our Story
              </h2>
              <div className="section-divider !ml-0 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a vision to create Kathmandu&apos;s most beloved
                celebration destination, Marigold Banquet Hall &amp; Party Palace
                opened its doors to bring world-class event hosting to the heart
                of Tokha. Named after the sacred marigold flower — a symbol of
                joy, prosperity, and new beginnings in Nepali culture — our venue
                embodies the warmth and vibrancy of our traditions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                What began as a dream to offer families in Kathmandu a venue that
                matches international standards while honoring our rich cultural
                heritage has grown into one of the city&apos;s most trusted names
                in celebrations. From intimate family gatherings to grand wedding
                receptions, every event at Marigold is treated with the same
                dedication and attention to detail.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Marigold stands as a testament to the belief that every
                celebration deserves a venue as special as the occasion itself.
                Our commitment to excellence, authentic hospitality, and
                personalized service continues to make us the first choice for
                families and businesses across Kathmandu Valley.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-burgundy/80 to-rose-gold/50 overflow-hidden shadow-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-marigold/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-gold/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-burgundy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-marigold rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Heart className="w-10 h-10 text-marigold mx-auto mb-6" />
            <p className="font-serif text-2xl md:text-4xl text-white font-bold leading-relaxed mb-6">
              &ldquo;Creating unforgettable celebrations for every family in
              Kathmandu&rdquo;
            </p>
            <div className="section-divider" />
            <p className="text-ivory/70 mt-6 text-lg">Our Mission</p>
          </motion.blockquote>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Meet Our Team
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind your perfect celebrations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 luxury-card-hover text-center"
              >
                {/* Photo placeholder */}
                <div
                  className={`h-56 bg-gradient-to-br ${member.gradient} relative`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white/30" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-burgundy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-marigold-dark text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister Brand */}
      <section className="py-16 bg-gradient-to-br from-rose-gold/10 to-marigold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 md:p-12 shadow-lg text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-serif text-2xl font-bold">
                  M
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-burgundy mb-4">
                Our Sister Brand
              </h2>
              <h3 className="font-serif text-xl text-marigold-dark mb-4">
                Marigold Swimming Pool &amp; Sauna
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Extend your Marigold experience with our sister brand — offering
                a premium swimming pool, sauna, and wellness facilities. The
                perfect complement to your event, or a rejuvenating escape any
                day of the week.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-dark font-medium transition-colors"
              >
                Visit Marigold Swimming Pool &amp; Sauna
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Awards &amp; Recognition
            </h2>
            <div className="section-divider mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-marigold/10 flex items-center justify-center mx-auto mb-4">
                  <award.icon className="w-8 h-8 text-marigold-dark" />
                </div>
                <h3 className="font-serif text-lg font-bold text-burgundy">
                  {award.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-20 bg-ivory-dark/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
              Our Facilities
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the spaces where memories are made
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityPhotos.map((photo, index) => (
              <motion.div
                key={photo.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden luxury-card-hover"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="font-serif text-white font-bold">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/gallery">
              <Button className="bg-burgundy hover:bg-burgundy-dark text-white px-8 py-3 rounded-sm">
                View Full Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Celebrate?
            </h2>
            <p className="text-ivory/80 max-w-2xl mx-auto mb-8">
              Experience the Marigold difference. Let us help you create
              unforgettable memories.
            </p>
            <Link href="/booking">
              <Button className="bg-marigold hover:bg-marigold-dark text-white px-8 py-6 rounded-sm text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                Book a Viewing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
