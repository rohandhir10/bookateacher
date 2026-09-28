import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact bookateacher.in",
  description:
    "Contact the bookateacher.in team for help with tutor profiles, learner enquiries, or the platform.",
  alternates: { canonical: "https://bookateacher.in/contact" },
  openGraph: {
    title: "Contact bookateacher.in",
    description: "Get in touch with the bookateacher.in support team.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
  },
};

const ink = "#14213D";
const inkSoft = "#3D4A63";
const muted = "#6B6557";
const paper = "#FAF7F0";
const paper2 = "#F2ECE0";
const line = "#D9D2C5";

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: paper,
        color: ink,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <header style={{ background: inkSoft, borderBottom: `1px solid ${line}` }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            minHeight: 64,
            maxWidth: 1180,
            margin: "0 auto",
            padding: "12px 24px",
          }}
        >
          <Link
            href="/"
            style={{
              color: paper,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            bookateacher.in
          </Link>
          <nav aria-label="Primary navigation" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link href="/tutors" style={{ color: paper, textDecoration: "none" }}>
              Browse tutors
            </Link>
            <Link href="/login" style={{ color: paper, textDecoration: "none" }}>
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, padding: "28px 24px 72px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <article style={{ marginTop: 36 }}>
            <p
              style={{
                color: muted,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              Contact
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
              How can we help?
            </h1>
            <p style={{ color: muted, fontSize: 18, lineHeight: 1.8, maxWidth: 650 }}>
              For help with your account, a tutor profile, or using the platform,
              email our support team. Include the email address linked to your
              account and a short description of the issue; please do not send your
              password or payment details.
            </p>
            <section style={{ borderTop: `1px solid ${line}`, marginTop: 36, paddingTop: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24 }}>
                General support
              </h2>
              <p style={{ color: muted, lineHeight: 1.8 }}>
                <a href="mailto:support@bookateacher.in" style={{ color: ink, fontWeight: 600 }}>
                  support@bookateacher.in
                </a>
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, marginTop: 32 }}>
                Privacy and grievances
              </h2>
              <p style={{ color: muted, lineHeight: 1.8 }}>
                For privacy questions or a formal grievance, email{" "}
                <a href="mailto:grievance@bookateacher.in" style={{ color: ink, fontWeight: 600 }}>
                  grievance@bookateacher.in
                </a>
                . See our <Link href="/privacy" style={{ color: ink }}>Privacy Policy</Link> for more information.
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer style={{ borderTop: `1px solid ${line}`, padding: "20px 24px", background: paper2 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <nav aria-label="Legal and support" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ color: inkSoft, textDecoration: "none" }}>Contact</Link>
            <Link href="/privacy" style={{ color: inkSoft, textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ color: inkSoft, textDecoration: "none" }}>Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
