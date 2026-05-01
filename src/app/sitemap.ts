import { MetadataRoute } from "next";

const baseUrl = "https://marigoldbanquet.com.np";

// Known blog post slugs with their publish dates
const blogPosts = [
  {
    slug: "how-to-plan-the-perfect-wedding-in-kathmandu",
    lastModified: "2025-01-15",
    priority: 0.7,
  },
  {
    slug: "complete-bratabandha-planning-guide",
    lastModified: "2025-01-20",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/weddings`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/parties`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spaces`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/food`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/decoration`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2025-01-20",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: "2025-01-01",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: "2025-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: "2025-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog post URLs
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: post.priority,
  }));

  return [...staticPages, ...blogPages];
}
