import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Marigold Banquet Hall | Enquire Now",
  description:
    "Check availability, make an enquiry or schedule a venue viewing. Call +977-9851111191 or book online for weddings, parties & corporate events.",
  openGraph: {
    title: "Book Marigold Banquet Hall | Enquire Now",
    description:
      "Check availability, make an enquiry or schedule a venue viewing. Call +977-9851111191 or book online.",
  },
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
