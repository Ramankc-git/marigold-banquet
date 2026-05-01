import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding & Event Decoration | Marigold Banquet",
  description:
    "7 decoration themes: Royal, Floral, Minimalist, Traditional Nepali, Modern Glam, Rustic & Garden. Basic, Premium & Luxury packages.",
  openGraph: {
    title: "Wedding & Event Decoration | Marigold Banquet",
    description:
      "7 decoration themes: Royal, Floral, Minimalist, Traditional Nepali, Modern Glam, Rustic & Garden. Basic, Premium & Luxury packages.",
  },
  alternates: {
    canonical: "/decoration",
  },
};

export default function DecorationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
