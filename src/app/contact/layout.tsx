import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch: Call +977-9851111191, WhatsApp, or visit us at Tokha-07, Gairigaun, Kathmandu. Open 6AM-10PM, 7 days.",
  openGraph: {
    title: "Contact Us | Marigold Banquet Hall",
    description:
      "Get in touch: Call +977-9851111191, WhatsApp, or visit us at Tokha-07, Gairigaun, Kathmandu. Open 6AM-10PM, 7 days.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Contact Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Marigold Banquet Hall",
    description:
      "Call +977-9851111191, WhatsApp, or visit us at Tokha-07, Gairigaun, Kathmandu.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
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
      name: "Contact",
      item: "https://marigoldbanquet.com.np/contact",
    },
  ],
};

export default function ContactLayout({
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
