import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Event Venue Kathmandu",
  description:
    "Host seminars, conferences, team dinners & award nights. Full AV equipment, flexible seating & corporate packages at Marigold Banquet Hall.",
  openGraph: {
    title: "Corporate Event Venue Kathmandu | Marigold Banquet",
    description:
      "Host seminars, conferences, team dinners & award nights. Full AV equipment & corporate packages at Marigold Banquet Hall.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Corporate Event Venue at Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Event Venue Kathmandu | Marigold Banquet",
    description:
      "Host seminars, conferences & award nights at Marigold Banquet Hall.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/corporate",
  },
};

const corporateServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Event Venue Services",
  description:
    "Professional corporate event venue in Kathmandu for seminars, conferences, product launches, and award nights. Full AV equipment and corporate catering packages.",
  provider: {
    "@type": "LocalBusiness",
    name: "Marigold Banquet Hall and Party Palace",
    url: "https://marigoldbanquet.com.np",
  },
  areaServed: {
    "@type": "City",
    name: "Kathmandu",
  },
  url: "https://marigoldbanquet.com.np/corporate",
  serviceType: "Corporate Event Venue",
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
      name: "Corporate Events",
      item: "https://marigoldbanquet.com.np/corporate",
    },
  ],
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
