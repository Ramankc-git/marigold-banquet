import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutWrapper } from "@/components/shared/layout-wrapper";
import { BUSINESS } from "@/constants";

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

const SITE_URL = BUSINESS.website;
const SITE_NAME = BUSINESS.name;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marigold Banquet Hall & Party Palace | Tokha-07 Gairigaun, Kathmandu",
    template: "%s | Marigold Banquet Hall",
  },
  description:
    "Marigold Banquet Hall and Party Palace in Tokha-07 Gairigaun, Kathmandu. Premium venue for weddings, parties & corporate events. In-house catering & decoration. Call +977-9851111191.",
  keywords: [
    "banquet hall Kathmandu",
    "wedding venue Kathmandu",
    "party palace Kathmandu",
    "party palace Tokha",
    "event hall Gairigaun",
    "wedding hall Nepal",
    "corporate event venue Kathmandu",
    "Marigold Banquet",
    "wedding venue Nepal",
    "event venue Kathmandu",
    "bratabandha venue Kathmandu",
    "pasni ceremony venue",
    "banquet hall Nepal",
    "party venue Kathmandu",
    "event space Kathmandu",
    "wedding reception Kathmandu",
    "conference venue Kathmandu",
    "best banquet hall Kathmandu",
    "marriage hall Kathmandu",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Marigold Banquet Hall & Party Palace | Kathmandu",
    description:
      "Premium venue for weddings, parties & corporate events in Tokha-07, Kathmandu. In-house catering & decoration.",
    type: "website",
    locale: "en_NP",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1152,
        height: 864,
        alt: "Marigold Banquet Hall & Party Palace - Premium Event Venue in Kathmandu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marigold Banquet Hall & Party Palace",
    description:
      "Premium venue for weddings, parties & corporate events in Kathmandu",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "theme-color": "#7B2D3F",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue", "WeddingVenue"],
    name: BUSINESS.name,
    description:
      "Premium banquet hall and party palace in Tokha-07, Gairigaun, Kathmandu. Perfect venue for weddings, parties, and corporate events with in-house catering and decoration.",
    url: BUSINESS.website,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address,
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.coordinates.lat,
      longitude: BUSINESS.coordinates.lng,
    },
    openingHoursSpecification: [
      {
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
    ],
    priceRange: "$$",
    image: [
      `${BUSINESS.website}/og-image.png`,
      `${BUSINESS.website}/logo.svg`,
    ],
    sameAs: [
      BUSINESS.social.facebook,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Package",
            description: "Complete wedding venue package with catering and decoration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Event Package",
            description: "Professional corporate event venue with AV equipment and catering",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Party Package",
            description: "Birthday, engagement, bratabandha, and celebration venue packages",
          },
        },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS.website}/booking`,
        inLanguage: "en",
      },
      result: {
        "@type": "Reservation",
        name: "Book Marigold Banquet Hall",
      },
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Marigold Banquet Hall & Party Palace",
    url: BUSINESS.website,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS.website}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <meta name="theme-color" content="#7B2D3F" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-burgundy focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
        {/* Google Analytics 4 - add NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel env vars */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {/* Vercel Analytics - tracks Web Vitals automatically, no config needed */}
        <Analytics />
        {/* Vercel Speed Insights - tracks Core Web Vitals performance */}
        <SpeedInsights />
      </body>
    </html>
  );
}
