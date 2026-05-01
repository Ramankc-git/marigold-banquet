import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Marigold Banquet Hall | Enquire Now",
  description:
    "Check availability, make an enquiry or schedule a venue viewing. Call +977-9851111191 or book online for weddings, parties & corporate events.",
  openGraph: {
    title: "Book Marigold Banquet Hall | Enquire Now",
    description:
      "Check availability, make an enquiry or schedule a venue viewing. Call +977-9851111191 or book online.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "Book Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Marigold Banquet Hall | Enquire Now",
    description:
      "Check availability, make an enquiry or schedule a venue viewing. Call +977-9851111191.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/booking",
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
      name: "Booking",
      item: "https://marigoldbanquet.com.np/booking",
    },
  ],
};

export default function BookingLayout({
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
