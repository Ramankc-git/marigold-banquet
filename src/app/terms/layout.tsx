import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Marigold Banquet",
  description:
    "Terms and conditions for booking and using Marigold Banquet Hall & Party Palace services in Kathmandu, Nepal.",
  openGraph: {
    title: "Terms & Conditions | Marigold Banquet",
    description:
      "Terms and conditions for booking and using Marigold Banquet Hall & Party Palace services in Kathmandu, Nepal.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
