import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banquet Halls & Spaces | Marigold Banquet",
  description:
    "Explore our 3 premium halls: Grand Marigold (500 guests), Rose Garden (300), Golden Terrace (150). State-of-the-art AV, bridal rooms & garden access.",
  openGraph: {
    title: "Banquet Halls & Spaces | Marigold Banquet",
    description:
      "Explore our 3 premium halls: Grand Marigold (500 guests), Rose Garden (300), Golden Terrace (150). State-of-the-art AV & bridal rooms.",
  },
  alternates: {
    canonical: "/spaces",
  },
};

export default function SpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
