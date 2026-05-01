import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Venue Kathmandu",
  description:
    "Host your dream wedding at Marigold Banquet Hall. Hindu, Buddhist, Christian & civil ceremonies. Silver, Gold & Platinum packages. In-house catering & decoration.",
  openGraph: {
    title: "Wedding Venue Kathmandu | Marigold Banquet",
    description:
      "Host your dream wedding at Marigold Banquet Hall. Hindu, Buddhist, Christian & civil ceremonies. Silver, Gold & Platinum packages.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Wedding Venue at Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Venue Kathmandu | Marigold Banquet",
    description:
      "Host your dream wedding at Marigold Banquet Hall. Silver, Gold & Platinum packages.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/weddings",
  },
};

const weddingServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wedding Venue & Planning Services",
  description:
    "Premium wedding venue in Kathmandu offering Hindu, Buddhist, Christian & civil wedding ceremonies with Silver, Gold & Platinum packages. In-house catering and decoration included.",
  provider: {
    "@type": "LocalBusiness",
    name: "Marigold Banquet Hall and Party Palace",
    url: "https://marigoldbanquet.com.np",
  },
  areaServed: {
    "@type": "City",
    name: "Kathmandu",
  },
  url: "https://marigoldbanquet.com.np/weddings",
  serviceType: "Wedding Venue",
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
      name: "Weddings",
      item: "https://marigoldbanquet.com.np/weddings",
    },
  ],
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
