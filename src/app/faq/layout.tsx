import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Marigold Banquet Hall",
  description:
    "Common questions about booking, catering, decoration, weddings, corporate events & pricing at Marigold Banquet Hall, Kathmandu.",
  openGraph: {
    title: "FAQ | Marigold Banquet Hall",
    description:
      "Common questions about booking, catering, decoration, weddings, corporate events & pricing at Marigold Banquet Hall, Kathmandu.",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
