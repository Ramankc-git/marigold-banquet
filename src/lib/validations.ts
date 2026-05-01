import { z } from "zod";

// Enquiry validation
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
  referenceNumber: z.string().min(1),
});

// Booking validation
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

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  phone: z.string().min(7, "Phone is required").max(20),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  eventType: z.string().optional(),
});

// Blog post validation
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

// Gallery photo validation
export const galleryPhotoSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  caption: z.string().max(200).optional(),
  category: z.string().min(1, "Category is required"),
  eventDate: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

// Site settings validation
export const settingsSchema = z.object({
  settings: z.record(z.string(), z.string()).refine(
    (obj) => Object.keys(obj).length <= 100,
    "Too many settings at once"
  ),
});

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Booking status update
export const bookingStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  notes: z.string().max(2000).optional(),
});

// Enquiry status update
export const enquiryStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "confirmed", "cancelled"]),
  notes: z.string().max(2000).optional(),
});
