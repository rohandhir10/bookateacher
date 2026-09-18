import { Metadata } from "next";

export const metadata: Metadata = {
  title: "bookateacher.in — Find Verified IELTS, TOEFL & Spoken English Tutors",
  description:
    "Connect with certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback. Book a session today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
