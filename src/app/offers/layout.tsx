import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers | Marigold Banquet Hall",
  description:
    "Current deals: early bird wedding discounts, corporate combo packages & weekday specials. Save on your next event at Marigold Banquet.",
  openGraph: {
    title: "Special Offers | Marigold Banquet Hall",
    description:
      "Current deals: early bird wedding discounts, corporate combo packages & weekday specials. Save on your next event at Marigold Banquet.",
  },
  alternates: {
    canonical: "/offers",
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
