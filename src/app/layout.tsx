import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/shared/layout-wrapper";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marigold Banquet Hall & Party Palace | Tokha-07 Gairigaun, Kathmandu",
  description:
    "Marigold Banquet Hall and Party Palace in Tokha-07 Gairigaun, Kathmandu. Premium venue for weddings, parties & corporate events. In-house catering & decoration. Call +977-9851111191.",
  keywords: [
    "banquet hall Kathmandu",
    "wedding venue Kathmandu",
    "party palace Tokha",
    "event hall Gairigaun",
    "wedding hall Nepal",
    "corporate event venue Kathmandu",
    "Marigold Banquet",
    "wedding venue Nepal",
    "event venue Kathmandu",
    "bratabandha venue Kathmandu",
    "pasni ceremony venue",
  ],
  authors: [{ name: "Marigold Banquet Hall & Party Palace" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Marigold Banquet Hall & Party Palace | Kathmandu",
    description:
      "Premium venue for weddings, parties & corporate events in Tokha-07, Kathmandu. In-house catering & decoration.",
    type: "website",
    locale: "en_NP",
    siteName: "Marigold Banquet Hall & Party Palace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marigold Banquet Hall & Party Palace",
    description:
      "Premium venue for weddings, parties & corporate events in Kathmandu",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    name: "Marigold Banquet Hall and Party Palace",
    description:
      "Premium banquet hall and party palace in Tokha-07, Gairigaun, Kathmandu. Perfect venue for weddings, parties, and corporate events.",
    url: "https://marigoldbanquet.com.np",
    telephone: "+977-9851111191",
    email: "info@marigoldbanquet.com.np",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gairigaun, Tokha-07",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.7466368,
      longitude: 85.320588,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "22:00",
    },
    priceRange: "$$",
    image: "https://marigoldbanquet.com.np/logo.svg",
    sameAs: [
      "https://www.facebook.com/MarigoldBanquetcafeHealthClub/",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
