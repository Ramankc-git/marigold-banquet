import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Planning Blog",
  description:
    "Tips for wedding planning, party ideas, corporate events, decoration trends & Nepali event culture. Expert advice from Marigold Banquet Hall.",
  openGraph: {
    title: "Event Planning Blog | Marigold Banquet",
    description:
      "Tips for wedding planning, party ideas, corporate events, decoration trends & Nepali event culture. Expert advice from Marigold Banquet Hall.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Event Planning Blog - Marigold Banquet Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Planning Blog | Marigold Banquet",
    description:
      "Tips for wedding planning, party ideas & Nepali event culture from Marigold Banquet Hall.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/blog",
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
      name: "Blog",
      item: "https://marigoldbanquet.com.np/blog",
    },
  ],
};

export default function BlogLayout({
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
