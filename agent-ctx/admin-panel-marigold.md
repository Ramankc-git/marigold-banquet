# Admin Panel - Marigold Banquet Hall & Party Palace

## Task Summary
Built a comprehensive admin panel at `/admin/` with its own layout (sidebar navigation), separate from the main site's header/footer.

## Files Created/Modified

### Layout & Infrastructure
- `src/components/shared/conditional-layout.tsx` — Client component that hides Header/Footer on `/admin/*` routes
- `src/app/layout.tsx` — Modified to use ConditionalLayout wrapper
- `src/app/admin/layout.tsx` — Admin layout with collapsible sidebar (Sheet on mobile), top bar, navigation with 15 menu items, marigold/burgundy color scheme

### Admin Pages (5 detailed + 10 placeholder)
- `src/app/admin/page.tsx` — Dashboard with stat cards, recent enquiries table, upcoming bookings, quick actions
- `src/app/admin/enquiries/page.tsx` — Full CRUD: table with search/filter, detail dialog, status update buttons (New → Contacted → Confirmed / Cancelled)
- `src/app/admin/gallery/page.tsx` — Category tabs, photo grid with gradient placeholders, add photo dialog, delete functionality
- `src/app/admin/blog/page.tsx` — Posts table with publish/draft toggle, full create/edit dialog with SEO fields, slug auto-generation
- `src/app/admin/settings/page.tsx` — Business info, social links, SEO defaults, save with success toast
- `src/app/admin/bookings/page.tsx` — Bookings table with stats
- `src/app/admin/halls/page.tsx` — Hall cards with capacity/area info
- `src/app/admin/packages/page.tsx` — Package cards with tier badges
- `src/app/admin/menu/page.tsx` — Menu items with veg/jain badges
- `src/app/admin/decoration/page.tsx` — Decoration themes with tier colors
- `src/app/admin/testimonials/page.tsx` — Star ratings and review cards
- `src/app/admin/offers/page.tsx` — Offers with discount badges and validity
- `src/app/admin/vendors/page.tsx` — Vendor cards with category colors
- `src/app/admin/team/page.tsx` — Team member profiles
- `src/app/admin/faq/page.tsx` — FAQ items with category badges

### API Routes (Enhanced + New)
- `src/app/api/enquiries/route.ts` — Added PATCH (status update) and status filter
- `src/app/api/gallery/route.ts` — Added POST (add photo), DELETE, and `?all=true` param
- `src/app/api/blogs/route.ts` — Added POST, PATCH, DELETE, and `?all=true` param for admin
- `src/app/api/bookings/route.ts` — New: GET, POST, PATCH
- `src/app/api/settings/route.ts` — New: GET, PUT (upsert)

## Color Palette
- Deep burgundy (#6B1D2A) — sidebar, headings, primary actions
- Rose gold (#B76E79) — accents, secondary elements
- Ivory (#FFFFF0) — page backgrounds, table headers
- Marigold gold (#DAA520) — active nav, highlights, accents

## Key Design Decisions
- Admin layout completely separate from main site (no Header/Footer)
- Sidebar collapses to Sheet (hamburger menu) on mobile
- All pages use 'use client' as specified
- Mock data used as fallback when API returns empty
- API routes enhanced with CRUD operations for admin functionality
- All 15 sidebar nav items link to functional pages
