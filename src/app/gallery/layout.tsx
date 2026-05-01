import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Gallery",
  description:
    "Browse photos from weddings, parties, corporate events & decorated venues at Marigold Banquet Hall, Kathmandu.",
  openGraph: {
    title: "Event Gallery | Marigold Banquet",
    description:
      "Browse photos from weddings, parties, corporate events & decorated venues at Marigold Banquet Hall, Kathmandu.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Event Gallery - Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Gallery | Marigold Banquet",
    description:
      "Browse photos from weddings, parties & corporate events at Marigold Banquet Hall.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://marigoldbanquet.com.np",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: "https://marigoldbanquet.com.np/gallery",
    },
  ],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
