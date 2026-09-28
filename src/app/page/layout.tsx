import { Metadata } from "next";

export const metadata: Metadata = {
  title: "English preparation & tutor directory",
  description:
    "Explore English preparation guides for IELTS, TOEFL, and Spoken English, then check current tutor availability in the directory.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
