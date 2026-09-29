import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://bookateacher.in"),
  title: {
    default: "English tutors for IELTS, TOEFL & Spoken English",
    template: "%s | bookateacher.in",
  },
  description:
    "Browse current IELTS, TOEFL and Spoken English tutor profiles, compare subjects and rates, and choose one-to-one English support that fits your goal.",
  authors: [{ name: "bookateacher.in" }],
  creator: "bookateacher.in",
  publisher: "bookateacher.in",
  alternates: {
    canonical: "https://bookateacher.in",
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
  openGraph: {
    title: "English tutors for IELTS, TOEFL & Spoken English",
    description:
      "Browse current tutor profiles and preparation resources for IELTS, TOEFL and Spoken English.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in",
    images: [
      {
        url: "/og-social.png",
        width: 1200,
        height: 630,
        alt: "bookateacher.in — English tutors and preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English tutors for IELTS, TOEFL & Spoken English",
    description:
      "Browse current tutor profiles and preparation resources for IELTS, TOEFL and Spoken English.",
    images: ["/og-social.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
