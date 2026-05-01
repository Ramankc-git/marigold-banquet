import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trusted Event Vendors | Marigold Banquet",
  description:
    "Directory of trusted photographers, caterers, decorators, mehendi artists, makeup artists & bands for your event at Marigold Banquet Hall.",
  openGraph: {
    title: "Trusted Event Vendors | Marigold Banquet",
    description:
      "Directory of trusted photographers, caterers, decorators, mehendi artists, makeup artists & bands for your event at Marigold Banquet Hall.",
  },
  alternates: {
    canonical: "/vendors",
  },
};

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
