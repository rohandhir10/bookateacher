import type { MetadataRoute } from "next";
import { query } from "@/lib/db";

async function getActiveTutorUrls(baseUrl: string, lastModified: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const tutors = await query(
      'SELECT id FROM users WHERE role = "tutor" AND status = "active" ORDER BY created_at ASC',
    ) as Array<{ id: string }>;
    return tutors.map(({ id }) => ({
      url: `${baseUrl}/tutors/${id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Keep the public sitemap available if the optional tutor database is unavailable.
    return [];
  }
}

/** Only public, canonical content belongs here; account and app routes are excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bookateacher.in";
  const lastModified = new Date();

  const publicPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/subjects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/subjects/ielts`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/subjects/toefl`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/subjects/spoken-english`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tutors`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/site-map`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];
  return [...publicPages, ...(await getActiveTutorUrls(baseUrl, lastModified))];
}
