// src/repositories/index.ts

import { BaseRepository } from "./base";

// ─── Enquiry Repository ───────────────────────────────
export class EnquiryRepository extends BaseRepository<"enquiry", any, any> {
  constructor() {
    super("enquiry");
  }

  async findWithStats(options: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const { status, limit = 50, offset = 0 } = options;
    const where = status ? { status } : {};

    const [items, total] = await Promise.all([
      (this.model as any).findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Math.min(Math.max(limit, 1), 100),
        skip: Math.max(offset, 0),
      }),
      (this.model as any).count({ where }),
    ]);

    return { items, total };
  }
}

// ─── Booking Repository ───────────────────────────────
export class BookingRepository extends BaseRepository<"booking", any, any> {
  constructor() {
    super("booking");
  }

  async findWithHall(options: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const { status, limit = 50, offset = 0 } = options;
    const where = status ? { status } : {};

    const [items, total] = await Promise.all([
      (this.model as any).findMany({
        where,
        orderBy: { eventDate: "asc" },
        take: Math.min(Math.max(limit, 1), 100),
        skip: Math.max(offset, 0),
        include: { hall: { select: { name: true } } },
      }),
      (this.model as any).count({ where }),
    ]);

    return { items, total };
  }
}

// ─── Blog Repository ──────────────────────────────────
export class BlogRepository extends BaseRepository<"blogPost", any, any> {
  constructor() {
    super("blogPost");
  }

  async findPublished(options: { limit?: number; offset?: number }) {
    const { limit = 50, offset = 0 } = options;

    const [items, total] = await Promise.all([
      (this.model as any).findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: Math.min(Math.max(limit, 1), 100),
        skip: Math.max(offset, 0),
      }),
      (this.model as any).count({ where: { isPublished: true } }),
    ]);

    return { items, total };
  }

  async findBySlug(slug: string) {
    return (this.model as any).findUnique({
      where: { slug, isPublished: true },
    });
  }
}

// ─── Gallery Repository ───────────────────────────────
export class GalleryPhotoRepository extends BaseRepository<"galleryPhoto", any, any> {
  constructor() {
    super("galleryPhoto");
  }

  async findInstagramPhotos(limit = 6) {
    return (this.model as any).findMany({
      where: { isActive: true, source: "instagram" },
      orderBy: { order: "asc" },
      take: limit,
      select: { id: true, url: true, caption: true, instagramPermalink: true },
    });
  }

  async findByInstagramMediaId(mediaId: string) {
    return (this.model as any).findFirst({
      where: { instagramMediaId: mediaId },
    });
  }
}

export class GalleryVideoRepository extends BaseRepository<"galleryVideo", any, any> {
  constructor() {
    super("galleryVideo");
  }

  async findActive() {
    return (this.model as any).findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  }
}

// ─── Settings Repository ──────────────────────────────
export class SettingsRepository extends BaseRepository<"siteSetting", any, any> {
  constructor() {
    super("siteSetting");
  }

  async getAllAsMap(): Promise<Record<string, string>> {
    const settings = await (this.model as any).findMany();
    const map: Record<string, string> = {};
    settings.forEach((s: any) => { map[s.key] = s.value; });
    return map;
  }

  async upsertMany(entries: [string, string][]) {
    const upserts = entries.map(([key, value]) =>
      (this.model as any).upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    await Promise.all(upserts);
  }

  async getByKey(key: string) {
    return (this.model as any).findUnique({ where: { key } });
  }
}

// ─── Singleton Instances ──────────────────────────────
export const enquiries = new EnquiryRepository();
export const bookings = new BookingRepository();
export const blogs = new BlogRepository();
export const galleryPhotos = new GalleryPhotoRepository();
export const galleryVideos = new GalleryVideoRepository();
export const settings = new SettingsRepository();

// Generic instances for simpler entities
export const halls = new BaseRepository<"hall", any, any>("hall");
export const packages = new BaseRepository<"package", any, any>("package");
export const menuItems = new BaseRepository<"menuItem", any, any>("menuItem");
export const decorations = new BaseRepository<"decorationTheme", any, any>("decorationTheme");
export const testimonials = new BaseRepository<"testimonial", any, any>("testimonial");
export const offers = new BaseRepository<"offer", any, any>("offer");
export const vendors = new BaseRepository<"vendor", any, any>("vendor");
export const team = new BaseRepository<"teamMember", any, any>("teamMember");
export const faqs = new BaseRepository<"fAQ", any, any>("fAQ");
