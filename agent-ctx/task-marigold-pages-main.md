# Marigold Banquet Hall - 5 Informational Pages

## Summary
Built 5 complete informational pages for the Marigold Banquet Hall & Party Palace website, plus updated the home page and shared SectionHero component.

## Files Created/Modified

### Updated
- `src/components/shared/section-hero.tsx` — Updated breadcrumb to use full array prop instead of hardcoded "Home" item
- `src/app/page.tsx` — Replaced placeholder with a full landing page for the site

### Created
1. **`src/app/blog/page.tsx`** — Blog page with:
   - SectionHero with breadcrumb
   - Category filter buttons (All, Wedding Tips, Party Ideas, Corporate Events, etc.)
   - 8 blog post cards in responsive grid (1/2/3 cols)
   - Each card: gradient placeholder, category badge, title, excerpt, read time, "Read More →"
   - CTA section for event planning

2. **`src/app/about/page.tsx`** — About page with:
   - SectionHero with breadcrumb + CTA
   - Our Story section (2-3 paragraphs)
   - Mission Statement quote box on burgundy background
   - 4 team member cards (Ramesh, Sita, Bikash, Anita)
   - Sister Brand section for Marigold Swimming Pool & Sauna
   - 3 award badges
   - Facility Gallery with 4 placeholder photos

3. **`src/app/contact/page.tsx`** — Contact page with:
   - SectionHero with breadcrumb + CTA
   - 3 contact info cards (Phone, Email, Address)
   - Business Hours table with OPEN/CLOSED indicator (Nepal timezone UTC+5:45)
   - Contact form (POSTs to /api/contact)
   - Google Map embed iframe
   - Social Media section (Facebook, Instagram)

4. **`src/app/faq/page.tsx`** — FAQ page with:
   - SectionHero with breadcrumb
   - Category filter buttons (All, Booking, Catering, Decoration, Weddings, Corporate, Pricing)
   - Accordion with 12 FAQs using @/components/ui/accordion
   - "Still Have Questions?" CTA with WhatsApp link

5. **`src/app/offers/page.tsx`** — Offers page with:
   - SectionHero with breadcrumb + CTA
   - 3 current offer cards with discount badges
   - Package Overview with 3 categories (Wedding, Party, Corporate) and tiers
   - EnquiryForm component with "Enquire About Offers" title
   - CTA section

## Technical Details
- All pages use 'use client'
- framer-motion animations (motion, initial, animate, viewport)
- lucide-react icons throughout
- Custom color palette: burgundy (#6B1D2A), rose-gold (#B76E79), ivory (#FFFFF0), marigold (#DAA520)
- Font-serif (Playfair Display) for headings
- Fully responsive designs
- ESLint passes cleanly
- All pages compile and return 200 status
