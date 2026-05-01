import { getGalleryData, getInstagramData } from "@/lib/server-data";
import { GalleryClient } from "@/components/gallery/gallery-client";

// ISR: Revalidate gallery every 60 seconds
export const revalidate = 60;

export default async function GalleryPage() {
  // Fetch data server-side — no client-side API roundtrip on initial load
  const [galleryData, instagramData] = await Promise.all([
    getGalleryData(100),
    getInstagramData(6),
  ]);

  return <GalleryClient initialGallery={galleryData} initialInstagram={instagramData} />;
}
