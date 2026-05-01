import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Current deals: early bird wedding discounts, corporate combo packages & weekday specials. Save on your next event at Marigold Banquet.",
  openGraph: {
    title: "Special Offers | Marigold Banquet Hall",
    description:
      "Current deals: early bird wedding discounts, corporate combo packages & weekday specials. Save on your next event at Marigold Banquet.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Special Offers - Marigold Banquet Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Special Offers | Marigold Banquet Hall",
    description:
      "Early bird wedding discounts, corporate combo packages & weekday specials.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/offers",
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
      name: "Offers",
      item: "https://marigoldbanquet.com.np/offers",
    },
  ],
};

export default function OffersLayout({
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
