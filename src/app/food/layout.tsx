import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering & Menu",
  description:
    "Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet, live counters & bar packages. Vegetarian, Jain & Halal options available.",
  openGraph: {
    title: "Catering & Menu | Marigold Banquet",
    description:
      "Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet, live counters & bar packages.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Catering & Menu at Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering & Menu | Marigold Banquet",
    description:
      "Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet & live counters.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/food",
  },
};

const foodServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Event Catering Services",
  description:
    "Full-service event catering offering Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet, live counters & bar packages with vegetarian, Jain & Halal options.",
  provider: {
    "@type": "LocalBusiness",
    name: "Marigold Banquet Hall and Party Palace",
    url: "https://marigoldbanquet.com.np",
  },
  areaServed: {
    "@type": "City",
    name: "Kathmandu",
  },
  url: "https://marigoldbanquet.com.np/food",
  serviceType: "Catering",
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
      name: "Catering & Menu",
      item: "https://marigoldbanquet.com.np/food",
    },
  ],
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foodServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
