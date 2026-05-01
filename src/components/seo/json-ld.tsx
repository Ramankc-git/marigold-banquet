/**
 * Reusable JSON-LD structured data component for SEO.
 * Injects structured data into the page head for search engine rich results.
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Generate BreadcrumbList structured data
 */
interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `https://marigoldbanquet.com.np${item.href}`,
    })),
  };
}

/**
 * Generate Service structured data for service pages
 */
interface ServiceData {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}

export function generateServiceJsonLd(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Marigold Banquet Hall and Party Palace",
      url: "https://marigoldbanquet.com.np",
    },
    areaServed: {
      "@type": "City",
      name: service.areaServed || "Kathmandu",
    },
    url: service.url.startsWith("http")
      ? service.url
      : `https://marigoldbanquet.com.np${service.url}`,
  };
}

/**
 * Generate Event structured data for event-type pages
 */
interface EventData {
  name: string;
  description: string;
  url: string;
  eventType: string;
}

export function generateEventJsonLd(event: EventData) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Marigold Banquet Hall and Party Palace",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gairigaun, Tokha-07",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati",
        postalCode: "44600",
        addressCountry: "NP",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Marigold Banquet Hall and Party Palace",
      url: "https://marigoldbanquet.com.np",
    },
    url: event.url.startsWith("http")
      ? event.url
      : `https://marigoldbanquet.com.np${event.url}`,
  };
}
