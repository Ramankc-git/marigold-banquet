import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post | Marigold Banquet Hall",
  description:
    "Read expert tips and advice on wedding planning, party ideas, corporate events, decoration trends & Nepali event culture from Marigold Banquet Hall.",
  openGraph: {
    title: "Blog Post | Marigold Banquet Hall",
    description:
      "Read expert tips and advice on wedding planning, party ideas, corporate events & Nepali event culture from Marigold Banquet Hall.",
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
