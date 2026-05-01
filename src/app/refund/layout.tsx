import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Marigold Banquet",
  description:
    "Refund and cancellation policy for Marigold Banquet Hall bookings. Understand our cancellation timelines and refund process.",
  openGraph: {
    title: "Refund & Cancellation Policy | Marigold Banquet",
    description:
      "Refund and cancellation policy for Marigold Banquet Hall bookings. Understand our cancellation timelines and refund process.",
  },
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
