import { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "English preparation & tutor directory",
    template: "%s | bookateacher.in",
  },
  description:
    "Explore IELTS, TOEFL, and Spoken English preparation guides, then check current tutor availability in the directory.",
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
    title: "English preparation & tutor directory",
    description:
      "Explore preparation guides for IELTS, TOEFL, and Spoken English, and check current tutor availability.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in",
    images: [{ url: "https://bookateacher.in/og-social.png", width: 1200, height: 630, alt: "bookateacher.in — English preparation guides" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://bookateacher.in/og-social.png"],
    title: "English preparation & tutor directory",
    description: "English preparation guides and current tutor listings for IELTS, TOEFL, and Spoken English.",
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
          "Online platform with English preparation resources and a directory for IELTS, TOEFL, and Spoken English.",
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
          "Explore preparation guides for IELTS, TOEFL, and Spoken English, and check current tutor availability.",
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
        name: "English preparation & tutor directory",
        description:
          "Explore preparation guides for IELTS, TOEFL, and Spoken English, and check current tutor availability.",
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
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
