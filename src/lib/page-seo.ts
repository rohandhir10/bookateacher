// Shared SEO helpers — structured data + metadata for topic + tutor pages
import { Metadata } from "next";

// Tutor profile publicly visible data
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
  ielts_score?: string | null; // e.g. "8.5"
  toefl_score?: string | null;  // e.g. "112"
};

export function tutorProfileMetadata(tutor: TutorProfile, subjectLabel: string): Metadata {
  const initial = tutor.name.charAt(0).toUpperCase();
  const priceRange = tutor.hourly_rate
    ? `₹${tutor.hourly_rate.toLocaleString("en-IN")}/hr`
    : "From ₹800/hr";

  return {
    title: `${tutor.name} — ${subjectLabel} Tutor | bookateacher.in`,
    description: `${tutor.name}, ${subjectLabel.toLowerCase()} tutor on bookateacher.in. ${tutor.bio ? tutor.bio.slice(0, 155) + "…" : `Certified ${subjectLabel} coaching, live 1-on-1 sessions.`} Hourly rate: ${priceRange}. Book a session.`,
    openGraph: {
      title: `${tutor.name} — ${subjectLabel} Tutor | bookateacher.in`,
      description: `${tutor.name} is a verified ${subjectLabel.toLowerCase()} tutor on bookateacher.in. Live 1-on-1 coaching, ₹${tutor.hourly_rate?.toLocaleString("en-IN") ?? "800"}/hr.`,
      type: "profile",
      locale: "en_IN",
      siteName: "bookateacher.in",
      url: `https://bookateacher.in/tutors/${tutor.id}`,
      images: [
        {
          url: tutor.avatar_url || `https://bookateacher.in/og-default.svg`,
          width: 1200,
          height: 630,
          alt: `${tutor.name} — ${subjectLabel} tutor`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tutor.name} — ${subjectLabel} Tutor`,
      description: `Verified ${subjectLabel.toLowerCase()} tutor on bookateacher.in. ₹${tutor.hourly_rate?.toLocaleString("en-IN") ?? "800"}/hr.`,
      images: [tutor.avatar_url || "https://bookateacher.in/og-default.svg"],
    },
    alternates: {
      canonical: `https://bookateacher.in/tutors/${tutor.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function subjectPageMetadata(subject: string, subjectLabel: string, subjectDescription: string): Metadata {
  return {
    title: `${subjectLabel} Tutor — Find Certified ${subjectLabel} Coaches | bookateacher.in`,
    description: subjectDescription,
    openGraph: {
      title: `${subjectLabel} Tutor — Find Certified ${subjectLabel} Coaches | bookateacher.in`,
      description: subjectDescription,
      type: "website",
      locale: "en_IN",
      siteName: "bookateacher.in",
      url: `https://bookateacher.in/subjects/${subject}`,
      images: [
        {
          url: `https://bookateacher.in/og-default.svg`,
          width: 1200,
          height: 630,
          alt: `${subjectLabel} tutors — bookateacher.in`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${subjectLabel} Tutor — bookateacher.in`,
      description: subjectDescription.slice(0, 155),
      images: ["https://bookateacher.in/og-default.svg"],
    },
    alternates: {
      canonical: `https://bookateacher.in/subjects/${subject}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// BreadcrumbList schema builder
export function breadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// WebPage schema
export function webpageSchema(title: string, description: string, url: string, pageType: string = "WebPage"): object {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://bookateacher.in/#website",
    },
    about: {
      "@id": "https://bookateacher.in/#organization",
    },
  };
}
