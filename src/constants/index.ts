// src/constants/index.ts

// ─── Business Constants ───────────────────────────────
export const ENQUIRY_STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;
export const BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const;
export const GALLERY_CATEGORIES = ["weddings", "parties", "corporate", "decoration", "food", "venue_spaces"] as const;
export const MENU_CATEGORIES = ["nepali_thali", "indian", "chinese", "continental", "fusion", "buffet", "live_counters"] as const;
export const DECORATION_CATEGORIES = ["royal", "floral", "minimalist", "traditional_nepali", "modern_glam", "rustic", "garden"] as const;
export const VENDOR_CATEGORIES = ["photographer", "caterer", "decorator", "band", "mehendi", "makeup", "transport"] as const;
export const FAQ_CATEGORIES = ["booking", "catering", "decoration", "weddings", "corporate", "pricing"] as const;
export const PACKAGE_TIERS = ["silver", "gold", "platinum", "basic", "premium", "luxury"] as const;
export const PACKAGE_CATEGORIES = ["wedding", "party", "corporate"] as const;

// ─── Auth Constants ───────────────────────────────────
export const COOKIE_NAME = "marigold_admin_token";
export const JWT_EXPIRY_HOURS = 24;
export const ROLE_HIERARCHY: Record<string, number> = {
  super_admin: 3,
  event_manager: 2,
  content_editor: 1,
};

// ─── Business Info ────────────────────────────────────
export const BUSINESS = {
  name: "Marigold Banquet Hall & Party Palace",
  shortName: "Marigold",
  phone: "+977-9851111191",
  whatsapp: "9779851111191",
  email: "info@marigoldbanquet.com.np",
  website: "https://marigoldbanquet.com.np",
  address: "Gairigaun, Tokha-07, Kathmandu",
  coordinates: { lat: 27.7466368, lng: 85.320588 },
  hours: "6:00 AM – 10:00 PM",
  social: {
    facebook: "https://www.facebook.com/MarigoldBanquetcafeHealthClub/",
    instagram: "https://www.instagram.com/marigoldbanquet/",
  },
} as const;

// ─── Navigation ───────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Weddings", href: "/weddings" },
  {
    label: "Events",
    href: "#",
    children: [
      { label: "Private Parties", href: "/parties" },
      { label: "Corporate Events", href: "/corporate" },
    ],
  },
  { label: "Spaces", href: "/spaces" },
  { label: "Food & Drinks", href: "/food" },
  { label: "Decoration", href: "/decoration" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "Mail" },
  { label: "Bookings", href: "/admin/bookings", icon: "Calendar" },
  { label: "Halls/Spaces", href: "/admin/halls", icon: "Building" },
  { label: "Packages", href: "/admin/packages", icon: "Package" },
  { label: "Menu/Food", href: "/admin/menu", icon: "UtensilsCrossed" },
  { label: "Decoration", href: "/admin/decoration", icon: "Palette" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image" },
  { label: "Blog", href: "/admin/blog", icon: "FileText" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "Offers", href: "/admin/offers", icon: "Tag" },
  { label: "Vendors", href: "/admin/vendors", icon: "Users" },
  { label: "Team", href: "/admin/team", icon: "UserCircle" },
  { label: "FAQ", href: "/admin/faq", icon: "HelpCircle" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;

// ─── Pagination Defaults ─────────────────────────────
export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 100;
export const MAX_SETTINGS_PER_UPDATE = 50;
