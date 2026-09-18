import { Metadata } from "next";

export const metadata: Metadata = {
  title: "bookateacher.in — Find Verified IELTS, TOEFL & Spoken English Tutors",
  description:
    "Connect with certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback. Book a session today.",
  openGraph: {
    title: "bookateacher.in — Find Verified IELTS, TOEFL & Spoken English Tutors",
    description:
      "Connect with certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback.",
    type: "website",
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
