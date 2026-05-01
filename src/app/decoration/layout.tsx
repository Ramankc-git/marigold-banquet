import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding & Event Decoration",
  description:
    "7 decoration themes: Royal, Floral, Minimalist, Traditional Nepali, Modern Glam, Rustic & Garden. Basic, Premium & Luxury packages.",
  openGraph: {
    title: "Wedding & Event Decoration | Marigold Banquet",
    description:
      "7 decoration themes: Royal, Floral, Minimalist, Traditional Nepali, Modern Glam, Rustic & Garden. Basic, Premium & Luxury packages.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Wedding & Event Decoration at Marigold Banquet Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding & Event Decoration | Marigold Banquet",
    description:
      "7 decoration themes. Royal, Floral, Minimalist, Traditional Nepali & more.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/decoration",
  },
};

const decorationServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Event Decoration Services",
  description:
    "7 decoration themes including Royal, Floral, Minimalist, Traditional Nepali, Modern Glam, Rustic & Garden. Basic, Premium & Luxury packages available.",
  provider: {
    "@type": "LocalBusiness",
    name: "Marigold Banquet Hall and Party Palace",
    url: "https://marigoldbanquet.com.np",
  },
  areaServed: {
    "@type": "City",
    name: "Kathmandu",
  },
  url: "https://marigoldbanquet.com.np/decoration",
  serviceType: "Decoration",
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
      name: "Decoration",
      item: "https://marigoldbanquet.com.np/decoration",
    },
  ],
};

export default function DecorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(decorationServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
