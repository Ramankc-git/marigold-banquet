import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Marigold Banquet Hall in Tokha-07, Kathmandu. Our story, team, awards & sister brand. Premium venue since 2018.",
  openGraph: {
    title: "About Us | Marigold Banquet Hall & Party Palace",
    description:
      "Learn about Marigold Banquet Hall in Tokha-07, Kathmandu. Our story, team, awards & sister brand. Premium venue since 2018.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "About Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Marigold Banquet Hall",
    description:
      "Marigold Banquet Hall in Tokha-07, Kathmandu. Premium venue since 2018.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/about",
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
      name: "About Us",
      item: "https://marigoldbanquet.com.np/about",
    },
  ],
};

export default function AboutLayout({
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
