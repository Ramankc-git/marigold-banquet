import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Marigold Banquet",
  description:
    "Privacy policy for Marigold Banquet Hall & Party Palace. How we collect, use and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Marigold Banquet",
    description:
      "Privacy policy for Marigold Banquet Hall & Party Palace. How we collect, use and protect your personal information.",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
