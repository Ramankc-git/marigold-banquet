'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UtensilsCrossed,
  Leaf,
  Wine,
  Cake,
  Flame,
  Camera,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionHero } from '@/components/shared/section-hero';
import { fadeInUp } from '@/lib/animations';
import { EnquiryForm } from '@/components/shared/enquiry-form';

const menuCategories = [
  {
    id: 'nepali',
    label: 'Nepali Thali',
    icon: '🍛',
    price: 'NPR 800/plate',
    description:
      'Authentic Nepali thali featuring dal, bhat (rice), tarkari (seasonal vegetables), achar (pickle), gundruk, dhido, and traditional sides. A wholesome, home-style meal that celebrates Nepal\'s rich culinary heritage.',
    highlights: ['Dal Bhat Tarkari', 'Achar & Gundruk', 'Dhido / Sel Roti', 'Aila / Raksi (optional)'],
  },
  {
    id: 'indian',
    label: 'Indian',
    icon: '🫕',
    price: 'NPR 900/plate',
    description:
      'A curated selection of North & South Indian cuisine including rich curries, tandoori specialties, dosas, and aromatic biryanis. Prepared by experienced chefs using traditional spice blends.',
    highlights: ['Butter Chicken / Paneer Tikka', 'Biryani (Veg/Non-veg)', 'Masala Dosa', 'Gulab Jamun'],
  },
  {
    id: 'chinese',
    label: 'Chinese',
    icon: '🥡',
    price: 'NPR 850/plate',
    description:
      'A delightful spread of Chinese dishes featuring stir-fries, dim sums, soups, and sizzling platters. From Cantonese classics to Szechuan spice — something for every palate.',
    highlights: ['Kung Pao Chicken', 'Veg Momos & Dim Sums', 'Hot & Sour Soup', 'Fried Rice / Chow Mein'],
  },
  {
    id: 'continental',
    label: 'Continental',
    icon: '🥩',
    price: 'NPR 1,000/plate',
    description:
      'Elegant Western cuisine featuring grilled meats, creamy pastas, fresh salads, and artisanal bread. Perfect for sophisticated events that call for international flavors.',
    highlights: ['Grilled Steak / Herb Chicken', 'Pasta Alfredo', 'Caesar Salad', 'Crème Brûlée'],
  },
  {
    id: 'fusion',
    label: 'Fusion',
    icon: '🌟',
    price: 'NPR 1,100/plate',
    description:
      'An exciting blend of Eastern and Western flavors — our signature fusion menu combines the best of multiple cuisines into creative, unforgettable dishes that surprise and delight.',
    highlights: ['Momo Tacos', 'Tandoori Pizza', 'Sushi Samosa', 'Wasabi Risotto'],
  },
  {
    id: 'buffet',
    label: 'Buffet',
    icon: '🍽️',
    price: 'NPR 1,200/plate',
    description:
      'A lavish buffet spread with unlimited selections from multiple cuisines. Live stations, salad bars, dessert counters, and more — the ultimate feast for large gatherings.',
    highlights: ['Multi-Cuisine Spread', 'Live Counter Options', 'Dessert Station', 'Salad & Soup Bar'],
  },
  {
    id: 'live-counters',
    label: 'Live Counters',
    icon: '🔥',
    price: 'NPR 1,500/plate',
    description:
      'Interactive live cooking stations where our chefs prepare dishes right before your guests. From sizzling tandoors to flambé desserts — a culinary performance that elevates any event.',
    highlights: ['Live Tandoor Station', 'Pasta / Noodle Counter', 'Dessert Flambé', 'Chaamp & Kebab Grill'],
  },
];

const dietaryOptions = [
  {
    name: 'Vegetarian',
    icon: Leaf,
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Full vegetarian menu available across all cuisines. Separate kitchen prep area to avoid cross-contamination.',
  },
  {
    name: 'Jain',
    icon: Leaf,
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Jain-friendly meals prepared without root vegetables, onion, or garlic. Cooked in dedicated utensils.',
  },
  {
    name: 'Halal',
    icon: Star,
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'All non-vegetarian items are Halal-certified. Prepared with strict adherence to Halal guidelines.',
  },
];

const foodGalleryGradients = [
  'from-burgundy to-rose-gold',
  'from-marigold to-marigold-dark',
  'from-rose-gold to-burgundy-light',
  'from-burgundy-dark to-marigold',
  'from-marigold-light to-rose-gold',
  'from-burgundy to-burgundy-dark',
];

export default function FoodPage() {
  const [barToggle, setBarToggle] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionHero
        title="Food & Drinks"
        subtitle="Culinary excellence for every celebration"
        backgroundImage="linear-gradient(135deg, #6B1D2A 0%, #4A0E1A 40%, #8B3A4A 70%, #B76E79 100%)"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Food & Drinks' }]}
        ctaText="Book a Viewing"
        ctaHref="/booking"
      />

      {/* Menu Categories */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Our Menu Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From authentic Nepali cuisine to international flavors — choose the perfect menu for your celebration
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <Tabs defaultValue="nepali" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-8">
              {menuCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-burgundy data-[state=active]:text-white px-4 py-2 rounded-full border border-marigold/30 text-sm font-medium transition-all data-[state=active]:shadow-lg"
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-marigold/20 overflow-hidden">
                    <div className="grid md:grid-cols-5 gap-0">
                      {/* Image placeholder */}
                      <div className={`md:col-span-2 min-h-[250px] bg-gradient-to-br ${cat.id === 'nepali' ? 'from-burgundy to-rose-gold' : cat.id === 'indian' ? 'from-marigold to-burgundy' : cat.id === 'chinese' ? 'from-rose-gold to-marigold-dark' : cat.id === 'continental' ? 'from-burgundy-dark to-rose-gold-light' : cat.id === 'fusion' ? 'from-marigold-light to-burgundy' : cat.id === 'buffet' ? 'from-burgundy-light to-marigold' : 'from-marigold-dark to-burgundy-dark'} flex items-center justify-center`}>
                        <span className="text-7xl">{cat.icon}</span>
                      </div>
                      {/* Content */}
                      <div className="md:col-span-3 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-burgundy">
                            {cat.label}
                          </h3>
                          <Badge className="bg-marigold text-white text-sm px-3 py-1 border-0">
                            {cat.price}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {cat.description}
                        </p>
                        <div className="mb-6">
                          <h4 className="font-serif text-sm font-semibold text-burgundy uppercase tracking-wider mb-3">
                            Highlights
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {cat.highlights.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-marigold flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Link href="/booking">
                          <Button className="bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                            Book This Menu
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Dietary Options */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Dietary Accommodations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We cater to all dietary requirements with care and respect
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {dietaryOptions.map((option, i) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="luxury-card-hover border-marigold/20 text-center h-full">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${option.color}`}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <Badge className={`mb-3 ${option.color} border`}>{option.name}</Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar & Beverages */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <Card className="border-marigold/20 overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Wine className="w-8 h-8 text-burgundy" />
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy">
                        Bar & Beverages
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our premium beverage service includes a curated selection of mocktails, fresh juices,
                      traditional drinks, and a full bar setup for events that call for it. Our experienced
                      bartenders craft signature cocktails tailored to your event theme.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-burgundy">Show bar packages</span>
                      <Switch
                        checked={barToggle}
                        onCheckedChange={setBarToggle}
                        className="data-[state=checked]:bg-burgundy"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48 h-48 bg-gradient-to-br from-burgundy to-rose-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wine className="w-16 h-16 text-white/80" />
                  </div>
                </div>

                {barToggle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 pt-6 border-t border-marigold/20"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-marigold/20">
                        <h4 className="font-serif font-bold text-burgundy mb-1">Basic Bar</h4>
                        <p className="text-sm text-muted-foreground">Soft drinks, juices, lassi, tea & coffee</p>
                        <p className="text-marigold font-bold mt-2">NPR 300/person</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-marigold/20">
                        <h4 className="font-serif font-bold text-burgundy mb-1">Premium Bar</h4>
                        <p className="text-sm text-muted-foreground">Mocktails, fresh juices, signature drinks</p>
                        <p className="text-marigold font-bold mt-2">NPR 600/person</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-marigold/20">
                        <h4 className="font-serif font-bold text-burgundy mb-1">Full Service Bar</h4>
                        <p className="text-sm text-muted-foreground">Complete bar with premium spirits & cocktails</p>
                        <p className="text-marigold font-bold mt-2">NPR 1,200/person</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Custom Cakes */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-72 md:h-96 bg-gradient-to-br from-marigold via-rose-gold-light to-burgundy-light rounded-lg flex items-center justify-center">
                <Cake className="w-24 h-24 text-white/80" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
                  Custom Cakes & Desserts
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Make your celebration sweeter with our bespoke cake and dessert service. From elegant
                  multi-tiered wedding cakes to themed birthday creations, our pastry chefs bring your
                  sweetest dreams to life.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Custom-designed wedding & event cakes',
                    'Dessert tables with assorted pastries',
                    'Theme-matching cake decorations',
                    'Eggless & vegan options available',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-marigold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button className="bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                    Order Custom Cake
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Cooking Stations */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-5xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-4">
                  Live Cooking Stations
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Turn your meal into a spectacle with our live cooking stations. Watch as our expert chefs
                  prepare sizzling dishes right before your eyes — adding drama, aroma, and unforgettable
                  flavor to your event.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { name: 'Tandoor Station', icon: '🔥' },
                    { name: 'Pasta Counter', icon: '🍝' },
                    { name: 'Sushi Bar', icon: '🍣' },
                    { name: 'Dessert Flambé', icon: '🍰' },
                    { name: 'Chaamp Grill', icon: '🥩' },
                    { name: 'Chalet Counter', icon: '☕' },
                  ].map((station) => (
                    <div
                      key={station.name}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-marigold/20 text-sm"
                    >
                      <span className="text-lg">{station.icon}</span>
                      <span className="font-medium text-burgundy">{station.name}</span>
                    </div>
                  ))}
                </div>
                <Link href="/booking">
                  <Button className="bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                    Book a Viewing
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2 w-full h-72 md:h-96 bg-gradient-to-br from-burgundy-dark via-burgundy to-marigold-dark rounded-lg flex items-center justify-center">
                <Flame className="w-24 h-24 text-marigold-light/80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Food Photo Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-burgundy mb-4">
              Food Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A feast for the eyes — glimpse the artistry behind our culinary creations
            </p>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {foodGalleryGradients.map((gradient, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`aspect-square bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center luxury-card-hover cursor-pointer`}
              >
                <Camera className="w-10 h-10 text-white/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Custom Menu */}
      <section className="py-20 px-4 bg-ivory">
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <EnquiryForm
              prefillEventType="other"
              title="Request Custom Menu"
              subtitle="Tell us your preferences and our chefs will craft a bespoke menu for your event"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
