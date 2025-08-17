import { allPages, allProjects } from "contentlayer/generated";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/projects`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/profile`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjects
    .filter((p) => p.published !== false)
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastmod: p.date ? new Date(p.date) : undefined,
      changefreq: "monthly",
      priority: 0.6,
    }));

  const pageRoutes: MetadataRoute.Sitemap = allPages    
    .map((p) => ({
      url: `${BASE_URL}/${p.slug}`,
      changefreq: "yearly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...projectRoutes, ...pageRoutes];
}