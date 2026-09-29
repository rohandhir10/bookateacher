export const SITE_URL = "https://bookateacher.in";

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "bookateacher.in",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [
    "https://www.instagram.com/bookateacher_in",
    "https://www.linkedin.com/company/bookateacher-in",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "bookateacher.in",
  description:
    "One-to-one English tutoring and preparation resources for IELTS, TOEFL, and Spoken English.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export function breadcrumbSchema(items: { name: string; url: string }[]): object {
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
  type = "WebPage",
): object {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function profilePageSchema({
  url,
  name,
  description,
  image,
  identifier,
  dateCreated,
  dateModified,
  sameAs = [],
}: {
  url: string;
  name: string;
  description?: string;
  image?: string | null;
  identifier?: string;
  dateCreated?: string | null;
  dateModified?: string | null;
  sameAs?: string[];
}): object {
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    url,
    identifier,
  };

  if (description) person.description = description;
  if (image) person.image = image;
  if (sameAs.length) person.sameAs = sameAs;

  return {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    ...(dateCreated ? { dateCreated } : {}),
    ...(dateModified ? { dateModified } : {}),
    mainEntity: person,
  };
}

export function homepageJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      {
        ...webpageSchema(
          "English preparation & tutor directory",
          "Explore IELTS, TOEFL, and Spoken English preparation and browse current tutor profiles.",
          SITE_URL,
        ),
        "@id": `${SITE_URL}/#webpage`,
      },
    ],
  });
}
