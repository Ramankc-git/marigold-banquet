import { db } from "@/lib/db";
import type { GalleryData, InstagramData, GalleryCategory } from "@/types";

export type { GalleryData, InstagramData };

/**
 * Fetch gallery data server-side for ISR.
 * This eliminates the client-side API roundtrip on initial page load.
 */
export async function getGalleryData(limit = 100): Promise<GalleryData> {
  try {
    const [photos, total, videos] = await Promise.all([
      db.galleryPhoto.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        take: limit,
      }),
      db.galleryPhoto.count({ where: { isActive: true } }),
      db.galleryVideo.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
    ]);

    return {
      photos: photos.map((p) => ({
        id: p.id,
        url: p.url,
        caption: p.caption,
        category: p.category as GalleryCategory,
        eventDate: p.eventDate ?? null,
        isActive: p.isActive,
        order: p.order,
        source: p.source,
        instagramPermalink: p.instagramPermalink,
        instagramMediaId: p.instagramMediaId,
      })),
      videos: videos.map((v) => ({
        id: v.id,
        youtubeUrl: v.youtubeUrl,
        title: v.title,
        category: v.category,
        isActive: v.isActive,
      })),
      total,
    };
  } catch {
    return { photos: [], videos: [], total: 0 };
  }
}

/**
 * Fetch Instagram section data server-side for ISR.
 */
export async function getInstagramData(limit = 6): Promise<InstagramData> {
  try {
    const [photos, settings] = await Promise.all([
      db.galleryPhoto.findMany({
        where: {
          isActive: true,
          source: "instagram",
        },
        orderBy: { order: "asc" },
        take: limit,
        select: {
          id: true,
          url: true,
          caption: true,
          instagramPermalink: true,
        },
      }),
      db.siteSetting.findUnique({ where: { key: "instagram_username" } }),
    ]);

    return {
      photos,
      username: settings?.value || "",
    };
  } catch {
    return { photos: [], username: "" };
  }
}
