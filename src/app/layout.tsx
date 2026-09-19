import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
    template: "%s | bookateacher.in",
  },
  description:
    "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests under real test conditions, and personal feedback. Book a session today.",
  keywords: [
    "IELTS tutor India",
    "TOEFL coaching India",
    "Spoken English classes",
    "IELTS preparation",
    "TOEFL preparation",
    "English tutoring online",
    "Band 7 IELTS",
    "IELTS writing feedback",
    "IELTS speaking practice",
    "test prep India",
  ],
  authors: [{ name: "bookateacher.in" }],
  creator: "bookateacher.in",
  publisher: "bookateacher.in",
  openGraph: {
    title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
    description:
      "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, and personal feedback.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
    description: "Certified IELTS, TOEFL, and Spoken English tutors across India.",
    creator: "@bookateacher_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://bookateacher.in",
    languages: {
      "en-IN": "https://bookateacher.in",
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Delhi, India",
    "ICBM": "28.6139, 77.2090",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bookateacher.in/#organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
        description:
          "Online platform connecting students with certified IELTS, TOEFL, and Spoken English tutors across India.",
        logo: "https://bookateacher.in/favicon.svg",
        sameAs: [
          "https://www.instagram.com/bookateacher_in",
          "https://www.linkedin.com/company/bookateacher-in",
        ],
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        foundingDate: "2026",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9876543210",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://bookateacher.in/#website",
        url: "https://bookateacher.in",
        name: "bookateacher.in",
        description:
          "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, and personal feedback.",
        publisher: { "@id": "https://bookateacher.in/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://bookateacher.in/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/#webpage",
        url: "https://bookateacher.in",
        name: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
        description:
          "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, and personal feedback.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
    ],
  });

  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#14213D" />
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
