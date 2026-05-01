import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Planning Blog | Marigold Banquet",
  description:
    "Tips for wedding planning, party ideas, corporate events, decoration trends & Nepali event culture. Expert advice from Marigold Banquet Hall.",
  openGraph: {
    title: "Event Planning Blog | Marigold Banquet",
    description:
      "Tips for wedding planning, party ideas, corporate events, decoration trends & Nepali event culture. Expert advice from Marigold Banquet Hall.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
