import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Gallery | Marigold Banquet",
  description:
    "Browse photos from weddings, parties, corporate events & decorated venues at Marigold Banquet Hall, Kathmandu.",
  openGraph: {
    title: "Event Gallery | Marigold Banquet",
    description:
      "Browse photos from weddings, parties, corporate events & decorated venues at Marigold Banquet Hall, Kathmandu.",
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
