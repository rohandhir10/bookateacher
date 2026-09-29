import type { MetadataRoute } from "next";
import { query } from "@/lib/db";

async function getActiveTutorUrls(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  try {
    const tutors = await query(
      "SELECT id, updated_at FROM users WHERE role = 'tutor' AND status = 'active' ORDER BY updated_at DESC",
    ) as Array<{ id: string; updated_at?: string | null }>;

    return tutors.map(({ id, updated_at }) => ({
      url: `${baseUrl}/tutors/${id}`,
      ...(updated_at ? { lastModified: new Date(updated_at) } : {}),
    }));
  } catch {
    return [];
  }
}

/** Only public, canonical content belongs in the sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bookateacher.in";

  const publicPages: MetadataRoute.Sitemap = [
    { url: baseUrl },
    { url: `${baseUrl}/subjects` },
    { url: `${baseUrl}/subjects/ielts` },
    { url: `${baseUrl}/subjects/toefl` },
    { url: `${baseUrl}/subjects/spoken-english` },
    { url: `${baseUrl}/tutors` },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];

  return [...publicPages, ...(await getActiveTutorUrls(baseUrl))];
}
