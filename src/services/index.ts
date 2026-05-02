// src/services/index.ts

import { enquiries, bookings, blogs, galleryPhotos, galleryVideos, settings } from "@/repositories";
import { db } from "@/lib/db";

// ─── Enquiry Service ──────────────────────────────────
export const EnquiryService = {
  async list(options: { limit?: number; offset?: number; status?: string }) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    if (options.status) {
      return enquiries.findWithStats({ status: options.status, limit, offset });
    }
    return enquiries.findAll({
      orderBy: { createdAt: "desc" as const },
      pagination: { limit, offset },
    });
  },

  async create(data: any) {
    const referenceNumber = data.referenceNumber || `MG-${Date.now().toString(36).toUpperCase()}`;
    return enquiries.create({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      eventType: data.eventType,
      hallPreference: data.hallPreference || null,
      expectedGuests: data.expectedGuests ?? null,
      preferredDate: data.preferredDate || null,
      budgetRange: data.budgetRange || null,
      specialReqs: data.specialReqs || null,
      referenceNumber,
    });
  },

  async updateStatus(id: string, status: string, notes?: string) {
    const exists = await enquiries.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return enquiries.update(id, { status, ...(notes !== undefined ? { notes } : {}) });
  },

  async delete(id: string) {
    const exists = await enquiries.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return enquiries.delete(id);
  },
};

// ─── Booking Service ──────────────────────────────────
export const BookingService = {
  async list(options: { limit?: number; offset?: number; status?: string }) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    if (options.status) {
      return bookings.findWithHall({ status: options.status, limit, offset });
    }
    return bookings.findWithHall({ limit, offset });
  },

  async create(data: any) {
    return bookings.create({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      eventType: data.eventType,
      hallId: data.hallId || null,
      expectedGuests: data.expectedGuests ?? null,
      eventDate: data.eventDate,
      startTime: data.startTime || null,
      endTime: data.endTime || null,
      packageType: data.packageType || null,
      totalAmount: data.totalAmount ?? null,
      notes: data.notes || null,
    });
  },

  async updateStatus(id: string, status: string, notes?: string) {
    const exists = await bookings.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return bookings.update(id, { status, ...(notes !== undefined ? { notes } : {}) });
  },

  async delete(id: string) {
    const exists = await bookings.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return bookings.delete(id);
  },
};

// ─── Blog Service ─────────────────────────────────────
export const BlogService = {
  async list(options: { limit?: number; offset?: number; all?: boolean }) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    if (options.all) {
      return blogs.findAll({
        orderBy: { createdAt: "desc" as const },
        pagination: { limit, offset },
      });
    }
    return blogs.findPublished({ limit, offset });
  },

  async create(data: any) {
    return blogs.create({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      featuredImage: data.featuredImage || null,
      category: data.category,
      author: data.author || null,
      readTime: data.readTime || null,
      seoTitle: data.seoTitle || null,
      seoDesc: data.seoDesc || null,
      isPublished: data.isPublished ?? false,
      publishedAt: data.isPublished ? new Date() : null,
    });
  },

  async update(id: string, data: any) {
    const existing = await blogs.findById(id);
    if (!existing) throw new Error("NOT_FOUND");

    const updateData = { ...data };
    // Auto-set publishedAt when publishing for the first time
    if (updateData.isPublished === true && !(existing as any).publishedAt) {
      updateData.publishedAt = new Date();
    }

    return blogs.update(id, updateData);
  },

  async delete(id: string) {
    const exists = await blogs.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return blogs.delete(id);
  },

  async getBySlug(slug: string) {
    return blogs.findBySlug(slug);
  },
};

// ─── Gallery Service ──────────────────────────────────
export const GalleryService = {
  async list(options: { limit?: number; offset?: number; all?: boolean; category?: string }) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const offset = Math.max(options.offset ?? 0, 0);

    const where: Record<string, unknown> = {};
    if (!options.all) where.isActive = true;
    if (options.category) where.category = options.category;

    const [photos, total] = await Promise.all([
      galleryPhotos.findAll({
        where,
        orderBy: { order: "asc" as const },
        pagination: { limit, offset },
      }),
      (db as any).galleryPhoto.count({ where }),
    ]);

    const videos = await galleryVideos.findActive();

    return { photos: photos.items, videos, total };
  },

  async create(data: any) {
    // Check for duplicate Instagram media
    if (data.instagramMediaId) {
      const existing = await galleryPhotos.findByInstagramMediaId(data.instagramMediaId);
      if (existing) throw new Error("DUPLICATE_INSTAGRAM");
    }

    return galleryPhotos.create({
      url: data.url,
      caption: data.caption || null,
      category: data.category,
      eventDate: data.eventDate || null,
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
      source: data.source || "manual",
      instagramPermalink: data.instagramPermalink || null,
      instagramMediaId: data.instagramMediaId || null,
    });
  },

  async update(id: string, data: any) {
    const exists = await galleryPhotos.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return galleryPhotos.update(id, data);
  },

  async delete(id: string) {
    const exists = await galleryPhotos.exists(id);
    if (!exists) throw new Error("NOT_FOUND");
    return galleryPhotos.delete(id);
  },

  async getInstagramData(limit = 6) {
    const [photos, setting] = await Promise.all([
      galleryPhotos.findInstagramPhotos(limit),
      settings.getByKey("instagram_username"),
    ]);
    return { photos, username: (setting as any)?.value || "" };
  },
};

// ─── Settings Service ─────────────────────────────────
export const SettingsService = {
  async getAll() {
    return settings.getAllAsMap();
  },

  async upsert(data: Record<string, string>) {
    const entries = Object.entries(data);
    if (entries.length > 50) throw new Error("TOO_MANY_SETTINGS");
    await settings.upsertMany(entries);
    return { updated: entries.length };
  },
};

// ─── Generic CRUD Service (for simpler entities) ─────────
export function createCrudService<EntityName extends string>(
  entityName: EntityName,
  defaults?: Record<string, unknown>
) {
  return {
    async list(options: {
      limit?: number;
      offset?: number;
      all?: boolean;
      category?: string;
      tier?: string;
      orderBy?: Record<string, string>;
      include?: Record<string, unknown>;
    }) {
      // Import dynamically to avoid circular deps
      const { halls, packages: pkgs, menuItems, decorations, testimonials, offers, vendors, team: teamRepo, faqs } = await import("@/repositories");

      const repoMap: Record<string, any> = {
        hall: halls, package: pkgs, menuItem: menuItems,
        decorationTheme: decorations, testimonial: testimonials,
        offer: offers, vendor: vendors, teamMember: teamRepo, fAQ: faqs,
      };

      const repo = repoMap[entityName];
      if (!repo) throw new Error(`Unknown entity: ${entityName}`);

      const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
      const offset = Math.max(options.offset ?? 0, 0);
      const where: Record<string, unknown> = {};

      if (!options.all) where.isActive = true;
      if (options.category) where.category = options.category;
      if (options.tier) where.tier = options.tier;

      return repo.findAll({
        where,
        orderBy: options.orderBy || { order: "asc" as const },
        pagination: { limit, offset },
        include: options.include,
      });
    },

    async create(data: any) {
      const { halls, packages: pkgs, menuItems, decorations, testimonials, offers, vendors, team: teamRepo, faqs } = await import("@/repositories");

      const repoMap: Record<string, any> = {
        hall: halls, package: pkgs, menuItem: menuItems,
        decorationTheme: decorations, testimonial: testimonials,
        offer: offers, vendor: vendors, teamMember: teamRepo, fAQ: faqs,
      };

      const repo = repoMap[entityName];
      if (!repo) throw new Error(`Unknown entity: ${entityName}`);

      return repo.create({ ...defaults, ...data });
    },

    async update(id: string, data: any) {
      const { halls, packages: pkgs, menuItems, decorations, testimonials, offers, vendors, team: teamRepo, faqs } = await import("@/repositories");

      const repoMap: Record<string, any> = {
        hall: halls, package: pkgs, menuItem: menuItems,
        decorationTheme: decorations, testimonial: testimonials,
        offer: offers, vendor: vendors, teamMember: teamRepo, fAQ: faqs,
      };

      const repo = repoMap[entityName];
      if (!repo) throw new Error(`Unknown entity: ${entityName}`);

      const exists = await repo.exists(id);
      if (!exists) throw new Error("NOT_FOUND");
      return repo.update(id, data);
    },

    async delete(id: string) {
      const { halls, packages: pkgs, menuItems, decorations, testimonials, offers, vendors, team: teamRepo, faqs } = await import("@/repositories");

      const repoMap: Record<string, any> = {
        hall: halls, package: pkgs, menuItem: menuItems,
        decorationTheme: decorations, testimonial: testimonials,
        offer: offers, vendor: vendors, teamMember: teamRepo, fAQ: faqs,
      };

      const repo = repoMap[entityName];
      if (!repo) throw new Error(`Unknown entity: ${entityName}`);

      const exists = await repo.exists(id);
      if (!exists) throw new Error("NOT_FOUND");
      return repo.delete(id);
    },
  };
}

// Pre-built services for each entity
export const HallService = createCrudService("hall", { features: "[]", isActive: true, order: 0 });
export const PackageService = createCrudService("package", { includes: "[]", isActive: true, order: 0 });
export const MenuService = createCrudService("menuItem", { isVegetarian: false, isJain: false, isHalal: false, isActive: true, order: 0 });
export const DecorationService = createCrudService("decorationTheme", { includes: "[]", isActive: true, order: 0 });
export const TestimonialService = createCrudService("testimonial", { rating: 5, isActive: true, order: 0 });
export const OfferService = createCrudService("offer", { isActive: true });
export const VendorService = createCrudService("vendor", { isActive: true, order: 0 });
export const TeamService = createCrudService("teamMember", { isActive: true, order: 0 });
export const FAQService = createCrudService("fAQ", { isActive: true, order: 0 });
