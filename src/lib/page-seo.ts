import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export type TutorProfile = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  hourly_rate: number | null;
  subjects: string[] | null;
  credentials: {
    certification?: string;
    experience_years?: number;
    teaching_style?: string;
    background?: string;
  } | null;
  verified: number;
  avatar_url: string | null;
  ielts_score?: string | null;
  toefl_score?: string | null;
};

function cleanDescription(value: string, fallback: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, 160);
}

export function tutorProfileMetadata(
  tutor: TutorProfile,
  subjectLabel: string,
): Metadata {
  const description = cleanDescription(
    tutor.bio || "",
    `${tutor.name} is a ${subjectLabel.toLowerCase()} tutor on bookateacher.in. View their public profile, subjects and current rate.`,
  );

  return {
    title: `${tutor.name} — ${subjectLabel} Tutor`,
    description,
    openGraph: {
      title: `${tutor.name} — ${subjectLabel} Tutor`,
      description,
      type: "profile",
      locale: "en_IN",
      siteName: "bookateacher.in",
      url: `${SITE_URL}/tutors/${tutor.id}`,
      images: tutor.avatar_url
        ? [
            {
              url: tutor.avatar_url,
              width: 1200,
              height: 1200,
              alt: `${tutor.name} — ${subjectLabel} tutor`,
            },
          ]
        : [
            {
              url: "/og-social.png",
              width: 1200,
              height: 630,
              alt: "bookateacher.in — tutor directory",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutor.name} — ${subjectLabel} Tutor`,
      description,
      images: [tutor.avatar_url || "/og-social.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/tutors/${tutor.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function subjectPageMetadata(
  subject: string,
  subjectLabel: string,
  subjectDescription: string,
): Metadata {
  const description = cleanDescription(
    subjectDescription,
    `${subjectLabel} preparation resources and current tutor profiles on bookateacher.in.`,
  );

  return {
    title: `${subjectLabel} Preparation — Tutor Directory`,
    description,
    openGraph: {
      title: `${subjectLabel} Preparation — Tutor Directory`,
      description,
      type: "website",
      locale: "en_IN",
      siteName: "bookateacher.in",
      url: `${SITE_URL}/subjects/${subject}`,
      images: [
        {
          url: "/og-social.png",
          width: 1200,
          height: 630,
          alt: `${subjectLabel} preparation and tutor directory`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${subjectLabel} Preparation — Tutor Directory`,
      description,
      images: ["/og-social.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/subjects/${subject}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webpageSchema(
  title: string,
  description: string,
  url: string,
  pageType = "WebPage",
): object {
  return {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}
