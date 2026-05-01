import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ─── Enquiry ─────────────────────────────────────────────
export const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(7, "Phone number is required").max(20),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  eventType: z.string().min(1, "Event type is required"),
  hallPreference: z.string().optional(),
  expectedGuests: z.number().int().positive().optional().nullable(),
  preferredDate: z.string().optional(),
  budgetRange: z.string().optional(),
  specialReqs: z.string().max(2000).optional(),
  referenceNumber: z.string().optional(),
});

export const enquiryStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "confirmed", "cancelled"]),
  notes: z.string().max(2000).optional(),
});

// ─── Booking ─────────────────────────────────────────────
export const bookingSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  eventType: z.string().min(1, "Event type is required"),
  hallId: z.string().optional(),
  expectedGuests: z.number().int().positive().optional().nullable(),
  eventDate: z.string().min(1, "Event date is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  packageType: z.string().optional(),
  totalAmount: z.number().nonnegative().optional().nullable(),
  notes: z.string().max(2000).optional(),
});

export const bookingStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  notes: z.string().max(2000).optional(),
});

// ─── Contact ─────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  phone: z.string().min(7, "Phone is required").max(20),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  eventType: z.string().optional(),
});

// ─── Blog ────────────────────────────────────────────────
export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, "Content is required").max(100000),
  featuredImage: z.string().url().optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  author: z.string().optional(),
  readTime: z.number().int().positive().optional(),
  seoTitle: z.string().max(60).optional(),
  seoDesc: z.string().max(160).optional(),
  isPublished: z.boolean().optional(),
});

// ─── Gallery ─────────────────────────────────────────────
export const galleryPhotoSchema = z.object({
  url: z.string().min(1, "URL is required"),
  caption: z.string().max(500).optional(),
  category: z.string().min(1, "Category is required"),
  eventDate: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  source: z.string().optional(),
  instagramPermalink: z.string().optional(),
  instagramMediaId: z.string().optional(),
});

export const galleryVideoSchema = z.object({
  youtubeUrl: z.string().min(1, "YouTube URL is required"),
  title: z.string().min(1, "Title is required").max(200),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Hall ────────────────────────────────────────────────
export const hallSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(1, "Description is required"),
  capacityBanquet: z.number().int().positive().optional().nullable(),
  capacityTheatre: z.number().int().positive().optional().nullable(),
  capacityCocktail: z.number().int().positive().optional().nullable(),
  dimensionsSqft: z.number().int().positive().optional().nullable(),
  features: z.string().optional(), // JSON string
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Package ─────────────────────────────────────────────
export const packageSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  category: z.string().min(1, "Category is required"),
  tier: z.string().min(1, "Tier is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative().optional().nullable(),
  priceUnit: z.string().optional(),
  includes: z.string().optional(), // JSON string
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Menu Item ───────────────────────────────────────────
export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  pricePerPlate: z.number().nonnegative().optional().nullable(),
  isVegetarian: z.boolean().optional(),
  isJain: z.boolean().optional(),
  isHalal: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Decoration Theme ────────────────────────────────────
export const decorationThemeSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  category: z.string().min(1, "Category is required"),
  tier: z.string().min(1, "Tier is required"),
  description: z.string().min(1, "Description is required"),
  includes: z.string().optional(), // JSON string
  price: z.number().nonnegative().optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Testimonial ─────────────────────────────────────────
export const testimonialSchema = z.object({
  clientName: z.string().min(1, "Client name is required").max(200),
  eventType: z.string().min(1, "Event type is required"),
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().min(1, "Review is required").max(5000),
  photo: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Offer ───────────────────────────────────────────────
export const offerSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  discount: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
});

// ─── Vendor ──────────────────────────────────────────────
export const vendorSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().optional(),
  logo: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Team Member ─────────────────────────────────────────
export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().min(1, "Role is required").max(200),
  bio: z.string().optional(),
  photo: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── FAQ ─────────────────────────────────────────────────
export const faqSchema = z.object({
  question: z.string().min(1, "Question is required").max(1000),
  answer: z.string().min(1, "Answer is required").max(5000),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// ─── Site Settings ───────────────────────────────────────
export const settingsSchema = z.object({
  settings: z.record(z.string(), z.string()).refine(
    (obj) => Object.keys(obj).length <= 100,
    "Too many settings at once"
  ),
});

// ─── Generic ID param for DELETE/PATCH ───────────────────
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
