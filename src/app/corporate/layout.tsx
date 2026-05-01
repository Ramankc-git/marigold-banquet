import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Event Venue Kathmandu | Marigold Banquet",
  description:
    "Host seminars, conferences, team dinners & award nights. Full AV equipment, flexible seating & corporate packages at Marigold Banquet Hall.",
  openGraph: {
    title: "Corporate Event Venue Kathmandu | Marigold Banquet",
    description:
      "Host seminars, conferences, team dinners & award nights. Full AV equipment & corporate packages at Marigold Banquet Hall.",
  },
  alternates: {
    canonical: "/corporate",
  },
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
