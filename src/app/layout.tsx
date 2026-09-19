import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
  description:
    "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback. Book a session today.",
  keywords: ["IELTS", "TOEFL", "Spoken English", "tutor", "coaching", "India"],
  authors: [{ name: "bookateacher.in" }],
  openGraph: {
    title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
    description:
      "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
  },
  twitter: {
    card: "summary",
    title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
    description:
      "Certified IELTS, TOEFL, and Spoken English tutors across India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
