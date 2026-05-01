# 🌸 Marigold Banquet Hall & Party Palace

Premium event venue website for **Marigold Banquet Hall & Party Palace**, located at Tokha-07, Gairigaun, Kathmandu, Nepal. Built with Next.js, Tailwind CSS, and Prisma ORM with a luxury design inspired by Charlton Hall UK.

## ✨ Features

### Public Website
- **Homepage** — Cinematic hero section, featured spaces, testimonials, Google Maps
- **Weddings** — Hindu/Buddhist/Christian/Civil/Destination ceremony packages
- **Private Parties** — Birthday, Engagement, Anniversary, Bratabandha, Pasni, Baby Shower, Farewell, Cultural events
- **Corporate Events** — AV equipment, seating configurations, corporate packages
- **Explore Spaces** — 3 halls (Marigold Grand, Rose Gold, Garden Terrace) with capacity details
- **Food & Drinks** — 7 menu categories (Nepali, Indian, Chinese, Continental, Fusion, Buffet, Live Counters)
- **Decoration & Themes** — 7 theme galleries with 3 package tiers
- **Booking & Enquiry** — Availability calendar, enquiry form, venue viewing form
- **Gallery** — Masonry grid with lightbox, video section
- **Blog** — Category filters, individual post pages with rich content
- **About Us** — Story, team, awards, sister brand connection
- **Contact** — Contact form, map, business hours with live indicator
- **FAQ** — Accordion by category
- **Offers** — Seasonal and special offers
- **Vendor Directory** — Trusted event vendors
- **Terms / Privacy / Refund** — Legal pages

### Admin Panel
- Dashboard with stats and analytics
- Enquiry management
- Booking management
- Gallery management
- Blog management
- Testimonial management
- Package management
- Hall/Space management
- Menu management
- Decoration theme management
- Vendor management
- Offer management
- FAQ management
- Team management
- Settings management

### Technical
- Server-Side Rendering (SSR) for SEO
- JSON-LD structured data (LocalBusiness + EventVenue)
- Dynamic sitemap.xml and robots.txt
- WhatsApp integration with pre-filled messages
- Responsive design (mobile-first)
- Framer Motion animations
- Type-safe API routes with Zod validation
- Role-based admin access (Super Admin, Event Manager, Content Editor)

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Database | Prisma ORM (SQLite dev / MongoDB prod) |
| Animations | Framer Motion |
| Validation | Zod |
| State | Zustand |
| Icons | Lucide React |
| Image Uploads | Cloudinary (planned) |
| Payments | eSewa + Khalti (planned) |
| Email | Nodemailer (planned) |
| Auth | JWT + bcrypt (planned) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/marigold-banquet.git
cd marigold-banquet

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
bun run db:generate

# Push database schema
bun run db:push

# Seed the database with sample data
bunx prisma db seed

# Start development server
bun dev
```

The site will be available at `http://localhost:3000`.

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key variables:
- `DATABASE_URL` — Database connection string
- `JWT_SECRET` — Secret for admin JWT tokens
- `CLOUDINARY_*` — Cloudinary image upload credentials
- `ESEWA_*` / `KHALTI_*` — Payment gateway credentials

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (Header + Footer)
│   ├── globals.css           # Global styles + luxury theme
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── about/                # About Us page
│   ├── weddings/             # Weddings page
│   ├── parties/              # Private Parties page
│   ├── corporate/            # Corporate Events page
│   ├── spaces/               # Explore Spaces page
│   ├── food/                 # Food & Drinks page
│   ├── decoration/           # Decoration & Themes page
│   ├── booking/              # Booking & Enquiry page
│   ├── gallery/              # Gallery page
│   ├── blog/                 # Blog listing + [slug] pages
│   ├── contact/              # Contact page
│   ├── faq/                  # FAQ page
│   ├── offers/               # Offers page
│   ├── vendors/              # Vendor Directory page
│   ├── terms/                # Terms & Conditions
│   ├── privacy/              # Privacy Policy
│   ├── refund/               # Refund Policy
│   ├── admin/                # Admin panel pages
│   └── api/                  # API routes
├── components/
│   ├── shared/               # Header, Footer, WhatsApp, etc.
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom React hooks
└── lib/                      # Utilities, DB client, animations
prisma/
├── schema.prisma             # Database schema (17+ models)
└── seed.ts                   # Seed data script
public/                       # Static assets
```

## 🎨 Design

**Color Palette:**
- Deep Burgundy `#6B1D2A`
- Rose Gold `#B76E79`
- Ivory `#FFFFF0`
- Warm Marigold Gold `#D4A843`
- Rich Black `#0A0A0A`

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter / System sans-serif

## 📞 Business Info

- **Address:** Tokha-07, Gairigaun, Kathmandu, Nepal
- **Phone:** +977-01-4963111
- **WhatsApp:** +977-9851111191
- **Email:** info@marigoldbanquet.com.np
- **Hours:** Mon–Sat 9:00 AM – 8:00 PM | Sunday 10:00 AM – 6:00 PM
- **Coordinates:** 27.7466368, 85.320588

## 📄 License

Private — All rights reserved.
