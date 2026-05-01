import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Party Venue Kathmandu | Marigold Banquet",
  description:
    "Birthday, engagement, anniversary, bratabandha, pasni & cultural celebrations. Flexible packages with in-house catering at Marigold Banquet Hall, Tokha.",
  openGraph: {
    title: "Private Party Venue Kathmandu | Marigold Banquet",
    description:
      "Birthday, engagement, anniversary, bratabandha, pasni & cultural celebrations at Marigold Banquet Hall, Tokha.",
  },
  alternates: {
    canonical: "/parties",
  },
};

export default function PartiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
