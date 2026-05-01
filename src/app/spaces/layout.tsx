import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banquet Halls & Spaces",
  description:
    "Explore our 3 premium halls: Grand Marigold (500 guests), Rose Garden (300), Golden Terrace (150). State-of-the-art AV, bridal rooms & garden access.",
  openGraph: {
    title: "Banquet Halls & Spaces | Marigold Banquet",
    description:
      "Explore our 3 premium halls: Grand Marigold (500 guests), Rose Garden (300), Golden Terrace (150). State-of-the-art AV & bridal rooms.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Banquet Halls & Spaces at Marigold Banquet, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banquet Halls & Spaces | Marigold Banquet",
    description:
      "Grand Marigold (500 guests), Rose Garden (300), Golden Terrace (150). Premium halls in Kathmandu.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/spaces",
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
      name: "Our Spaces",
      item: "https://marigoldbanquet.com.np/spaces",
    },
  ],
};

export default function SpacesLayout({
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
