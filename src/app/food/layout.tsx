import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering & Menu | Marigold Banquet",
  description:
    "Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet, live counters & bar packages. Vegetarian, Jain & Halal options available.",
  openGraph: {
    title: "Catering & Menu | Marigold Banquet",
    description:
      "Nepali, Indian, Chinese, Continental & Fusion cuisine. Buffet, live counters & bar packages. Vegetarian, Jain & Halal options available.",
  },
  alternates: {
    canonical: "/food",
  },
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
