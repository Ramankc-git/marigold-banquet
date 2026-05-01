import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Marigold Banquet Hall",
  description:
    "Get in touch: Call +977-9851111191, WhatsApp, or visit us at Tokha-07, Gairigaun, Kathmandu. Open 6AM-10PM, 7 days.",
  openGraph: {
    title: "Contact Us | Marigold Banquet Hall",
    description:
      "Get in touch: Call +977-9851111191, WhatsApp, or visit us at Tokha-07, Gairigaun, Kathmandu. Open 6AM-10PM, 7 days.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
