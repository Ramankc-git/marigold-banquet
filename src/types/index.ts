// src/types/index.ts

// ─── Auth Types ───────────────────────────────────────
export type AdminRole = "super_admin" | "event_manager" | "content_editor";

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

// ─── Enquiry Types ────────────────────────────────────
export type EnquiryStatus = "new" | "contacted" | "confirmed" | "cancelled";

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  eventType: string;
  hallPreference: string | null;
  expectedGuests: number | null;
  preferredDate: string | null;
  budgetRange: string | null;
  specialReqs: string | null;
  referenceNumber: string;
  status: EnquiryStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Booking Types ────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  eventType: string;
  hallId: string | null;
  hall?: { name: string };
  expectedGuests: number | null;
  eventDate: string;
  startTime: string | null;
  endTime: string | null;
  packageType: string | null;
  totalAmount: number | null;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Gallery Types ────────────────────────────────────
export type GalleryCategory = "weddings" | "parties" | "corporate" | "decoration" | "food" | "venue_spaces";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string | null;
  category: GalleryCategory;
  eventDate: string | null;
  isActive: boolean;
  order: number;
  source: string;
  instagramPermalink: string | null;
  instagramMediaId: string | null;
}

export interface GalleryVideo {
  id: string;
  youtubeUrl: string;
  title: string;
  category: string;
  isActive: boolean;
}

export interface GalleryData {
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
  total: number;
}

export interface InstagramData {
  photos: Pick<GalleryPhoto, "id" | "url" | "caption" | "instagramPermalink">[];
  username: string;
}

// ─── Blog Types ───────────────────────────────────────
export type BlogCategory = "weddings" | "parties" | "corporate" | "tips" | "venue_updates" | "catering" | "decoration";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  category: string;
  author: string | null;
  readTime: number | null;
  seoTitle: string | null;
  seoDesc: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Hall Types ───────────────────────────────────────
export interface HallPhoto {
  id: string;
  hallId: string;
  url: string;
  caption: string | null;
  isDecorated: boolean;
  order: number;
}

export interface Hall {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacityBanquet: number | null;
  capacityTheatre: number | null;
  capacityCocktail: number | null;
  dimensionsSqft: number | null;
  features: string;
  isActive: boolean;
  order: number;
  photos?: HallPhoto[];
}

// ─── Package Types ────────────────────────────────────
export type PackageTier = "silver" | "gold" | "platinum" | "basic" | "premium" | "luxury";

export interface Package {
  id: string;
  name: string;
  slug: string;
  category: string;
  tier: PackageTier;
  description: string;
  price: number | null;
  priceUnit: string | null;
  includes: string;
  isActive: boolean;
  order: number;
}

// ─── Menu Types ───────────────────────────────────────
export type MenuCategory = "nepali_thali" | "indian" | "chinese" | "continental" | "fusion" | "buffet" | "live_counters";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string | null;
  pricePerPlate: number | null;
  isVegetarian: boolean;
  isJain: boolean;
  isHalal: boolean;
  isActive: boolean;
  order: number;
}

// ─── Decoration Types ─────────────────────────────────
export type DecorationCategory = "royal" | "floral" | "minimalist" | "traditional_nepali" | "modern_glam" | "rustic" | "garden";

export interface DecorationPhoto {
  id: string;
  themeId: string;
  url: string;
  caption: string | null;
  isBefore: boolean;
  order: number;
}

export interface DecorationTheme {
  id: string;
  name: string;
  slug: string;
  category: DecorationCategory;
  tier: string;
  description: string;
  includes: string;
  price: number | null;
  isActive: boolean;
  order: number;
  photos?: DecorationPhoto[];
}

// ─── Testimonial Type ─────────────────────────────────
export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  rating: number;
  review: string;
  photo: string | null;
  isActive: boolean;
  order: number;
}

// ─── Offer Type ───────────────────────────────────────
export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
}

// ─── Vendor Types ─────────────────────────────────────
export type VendorCategory = "photographer" | "caterer" | "decorator" | "band" | "mehendi" | "makeup" | "transport";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo: string | null;
  isActive: boolean;
  order: number;
}

// ─── Team Member Type ─────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo: string | null;
  isActive: boolean;
  order: number;
}

// ─── FAQ Types ────────────────────────────────────────
export type FAQCategory = "booking" | "catering" | "decoration" | "weddings" | "corporate" | "pricing";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  isActive: boolean;
  order: number;
}

// ─── Site Settings ────────────────────────────────────
export interface SiteSetting {
  key: string;
  value: string;
}

// ─── Pagination ───────────────────────────────────────
export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

// ─── API Response ─────────────────────────────────────
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}
