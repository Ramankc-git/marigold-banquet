import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Party Venue Kathmandu",
  description:
    "Birthday, engagement, anniversary, bratabandha, pasni & cultural celebrations. Flexible packages with in-house catering at Marigold Banquet Hall, Tokha.",
  openGraph: {
    title: "Private Party Venue Kathmandu | Marigold Banquet",
    description:
      "Birthday, engagement, anniversary, bratabandha, pasni & cultural celebrations at Marigold Banquet Hall, Tokha.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Private Party Venue at Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Party Venue Kathmandu | Marigold Banquet",
    description:
      "Birthday, engagement, bratabandha, pasni & cultural celebrations at Marigold Banquet Hall.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/parties",
  },
};

const partyServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Party Venue Services",
  description:
    "Venue for birthday, engagement, anniversary, bratabandha, pasni and cultural celebrations in Kathmandu. Flexible packages with in-house catering and decoration.",
  provider: {
    "@type": "LocalBusiness",
    name: "Marigold Banquet Hall and Party Palace",
    url: "https://marigoldbanquet.com.np",
  },
  areaServed: {
    "@type": "City",
    name: "Kathmandu",
  },
  url: "https://marigoldbanquet.com.np/parties",
  serviceType: "Party Venue",
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
      name: "Private Parties",
      item: "https://marigoldbanquet.com.np/parties",
    },
  ],
};

export default function PartiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partyServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
