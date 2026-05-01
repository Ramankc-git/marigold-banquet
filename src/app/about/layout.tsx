import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Marigold Banquet Hall & Party Palace",
  description:
    "Learn about Marigold Banquet Hall in Tokha-07, Kathmandu. Our story, team, awards & sister brand. Premium venue since 2018.",
  openGraph: {
    title: "About Us | Marigold Banquet Hall & Party Palace",
    description:
      "Learn about Marigold Banquet Hall in Tokha-07, Kathmandu. Our story, team, awards & sister brand. Premium venue since 2018.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
