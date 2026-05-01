import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trusted Event Vendors",
  description:
    "Directory of trusted photographers, caterers, decorators, mehendi artists, makeup artists & bands for your event at Marigold Banquet Hall.",
  openGraph: {
    title: "Trusted Event Vendors | Marigold Banquet",
    description:
      "Directory of trusted photographers, caterers, decorators, mehendi artists, makeup artists & bands for your event at Marigold Banquet Hall.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Trusted Event Vendors - Marigold Banquet Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Event Vendors | Marigold Banquet",
    description:
      "Trusted photographers, caterers, decorators & more for your event.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/vendors",
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
      name: "Vendors",
      item: "https://marigoldbanquet.com.np/vendors",
    },
  ],
};

export default function VendorsLayout({
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
