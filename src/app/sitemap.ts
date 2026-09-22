import { MetadataRoute } from "next";

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

function getTutorProfileUrls(baseUrl: string, now: Date): SitemapEntry[] {
  // Prefer DB (works locally and on Vercel when Turso is connected)
  try {
    const { query } = require("@/lib/db") as { query: (sql: string, params?: any[]) => any[] };
    const rows = query(
      'SELECT id, name FROM users WHERE role = "tutor" AND status = "active" ORDER BY created_at ASC',
    ) as any[];
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        url: `${baseUrl}/tutors/${row.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85 as const,
      }));
    }
  } catch {
    // Fallback: try static tutor data
  }
  try {
    const { TUTOR_DATA } = require("@/lib/tutor-data") as { TUTOR_DATA: any[] };
    if (TUTOR_DATA && TUTOR_DATA.length > 0) {
      return TUTOR_DATA.map((tutor) => ({
        url: `${baseUrl}/tutors/${tutor.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85 as const,
      }));
    }
  } catch {
    // No tutor data available
  }
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bookateacher.in";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/subjects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subjects/ielts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/subjects/toefl`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/subjects/spoken-english`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/register?role=tutor`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const tutorPages = getTutorProfileUrls(baseUrl, now);

  return [...staticRoutes, ...tutorPages] as MetadataRoute.Sitemap;
}
