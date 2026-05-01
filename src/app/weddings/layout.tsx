import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Venue Kathmandu | Marigold Banquet",
  description:
    "Host your dream wedding at Marigold Banquet Hall. Hindu, Buddhist, Christian & civil ceremonies. Silver, Gold & Platinum packages. In-house catering & decoration.",
  openGraph: {
    title: "Wedding Venue Kathmandu | Marigold Banquet",
    description:
      "Host your dream wedding at Marigold Banquet Hall. Hindu, Buddhist, Christian & civil ceremonies. Silver, Gold & Platinum packages.",
  },
  alternates: {
    canonical: "/weddings",
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
