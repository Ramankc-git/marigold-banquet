import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about booking, catering, decoration, weddings, corporate events & pricing at Marigold Banquet Hall, Kathmandu.",
  openGraph: {
    title: "FAQ | Marigold Banquet Hall",
    description:
      "Common questions about booking, catering, decoration, weddings, corporate events & pricing at Marigold Banquet Hall, Kathmandu.",
    images: [
      {
        url: "https://marigoldbanquet.com.np/og-image.png",
        width: 1152,
        height: 864,
        alt: "FAQ - Marigold Banquet Hall, Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Marigold Banquet Hall",
    description:
      "Common questions about booking, catering, weddings & pricing at Marigold Banquet Hall.",
    images: ["https://marigoldbanquet.com.np/og-image.png"],
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
