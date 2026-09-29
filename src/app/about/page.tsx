import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how bookateacher.in helps students find tutors for IELTS, TOEFL, and Spoken English.",
  alternates: { canonical: "https://bookateacher.in/about" },
  openGraph: {
    title: "About",
    description:
      "A straightforward way to find a tutor for IELTS, TOEFL, or Spoken English.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/about",
    images: [{ url: "https://bookateacher.in/og-social.png", width: 1200, height: 630, alt: "bookateacher.in — English preparation guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description: "About bookateacher.in and its English preparation resources.",
    images: ["https://bookateacher.in/og-social.png"],
  },
};

const ink = "#14213D";
const muted = "#6B6557";
const paper = "#FAF7F0";
const line = "#D9D2C5";

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}
      style={{
        minHeight: "100vh",
        background: paper,
        color: ink,
        fontFamily: "Inter, system-ui, sans-serif",
        padding: "28px 24px 72px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link href="/" style={{ color: ink, fontWeight: 600, textDecoration: "none" }}>
          bookateacher.in
        </Link>
        <article style={{ marginTop: 64 }}>
          <p
            style={{
              color: muted,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            About us
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              letterSpacing: "-.035em",
              lineHeight: 1.12,
              margin: "12px 0 20px",
            }}
          >
            Find the right teacher for your next step.
          </h1>
          <p style={{ color: muted, fontSize: 18, lineHeight: 1.8, maxWidth: 650 }}>
            bookateacher.in helps learners connect with tutors for IELTS, TOEFL,
            and Spoken English. The aim is simple: make it easier to compare your
            options, ask questions, and find support that fits your goals.
          </p>
          <section style={{ borderTop: `1px solid ${line}`, marginTop: 40, paddingTop: 28 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24 }}>
              How it works
            </h2>
            <ol style={{ color: muted, lineHeight: 1.9, paddingLeft: 24 }}>
              <li>Choose the subject you want help with.</li>
              <li>Explore tutor profiles and contact a tutor to discuss your needs.</li>
              <li>Agree on your lessons and schedule directly with your tutor.</li>
            </ol>
            <p style={{ color: muted, lineHeight: 1.8 }}>
              Tutors and learners should discuss lesson format, availability, and
              fees before starting. If you need help using the site, contact us at{" "}
              <a href="mailto:support@bookateacher.in" style={{ color: ink }}>
                support@bookateacher.in
              </a>
              .
            </p>
          </section>
          <nav aria-label="Explore bookateacher.in" style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/tutors" style={{ color: ink, fontWeight: 600 }}>Browse tutors</Link>
            <Link href="/subjects" style={{ color: ink, fontWeight: 600 }}>Explore subjects</Link>
            <Link href="/contact" style={{ color: ink, fontWeight: 600 }}>Contact us</Link>
            <Link href="/site-map" style={{ color: ink, fontWeight: 600 }}>Site map</Link>
          </nav>
        </article>
      </div>
    </main>
  );
}
