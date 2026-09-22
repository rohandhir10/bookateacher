import { Metadata } from "next";
import Link from "next/link";
import { getTutors, type TutorData } from "@/lib/tutor-data";
import { SUBJECT_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tutors — Certified IELTS, TOEFL & Spoken English Coaches | bookateacher.in",
  description:
    "Find certified tutors for IELTS, TOEFL, and Spoken English across India. Live 1-on-1 coaching, verified profiles, transparent pricing. Browse tutors and book a session.",
  openGraph: {
    title: "Tutors — Certified IELTS, TOEFL & Spoken English Coaches | bookateacher.in",
    description: "Find certified tutors for IELTS, TOEFL, and Spoken English across India. Browse profiles and book a session.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/tutors",
    images: [
      {
        url: "https://bookateacher.in/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Tutors — bookateacher.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutors — bookateacher.in",
    description: "Certified IELTS, TOEFL, and Spoken English tutors across India.",
  },
  alternates: {
    canonical: "https://bookateacher.in/tutors",
  },
  robots: { index: true, follow: true },
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";
const GREEN = "#2F5233";

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

function buildJsonLd(tutors: TutorData[]): string {
  const itemListItems = tutors.map(
    (t) =>
      `{
        "@type": "ListItem",
        "position": ${tutors.indexOf(t) + 1},
        "url": "https://bookateacher.in/tutors/${t.id}",
        "name": "${t.name}",
        "description": "${t.bio?.slice(0, 160).replace(/"/g, '\\"')}"
      }`
  );

  const offers = tutors
    .map(
      (t) =>
        `{
          "@type": "Offer",
          "name": "${t.name} — ${SUBJECT_LABELS[t.subjects?.[0] || "tutor"]} Coaching",
          "description": "${t.bio?.slice(0, 160).replace(/"/g, '\\"')}",
          "price": "${t.hourly_rate.toString()}",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://bookateacher.in/tutors/${t.id}"
        }`
    )
    .join(",\n        ");

  return `{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "itemListElement": [
          ${itemListItems.join(",\n          ")}
        ],
        "numberOfItems": ${tutors.length}
      },
      {
        "@type": "AggregateOffer",
        "lowPrice": "${Math.min(...tutors.map(t => t.hourly_rate)).toString()}",
        "highPrice": "${Math.max(...tutors.map(t => t.hourly_rate)).toString()}",
        "priceCurrency": "INR",
        "offer": [
          ${offers}
        ]
      }
    ]
  }`;
}

export default async function TutorsPage() {
  const tutors = await getTutors();
  const jsonLd = buildJsonLd(tutors);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        color: INK,
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `rgba(${hexToRgb(INK_SOFT)}, 0.92)`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            gap: 24,
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </Link>
          <Link
            href="/register?role=tutor"
            style={{
              fontSize: "0.875rem",
              color: INK_SOFT,
              transition: "color 0.15s",
              textDecoration: "none",
            }}
          >
            Become a tutor
          </Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid ${LINE}`,
              fontSize: "0.8125rem",
              color: MUTED,
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>Tutors</span>
          </nav>

          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: INK,
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Certified Tutors
            </h1>
            <p style={{ fontSize: "1.0625rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
              Verified IELTS, TOEFL, and Spoken English coaches across India. Review their profiles, credentials, and rates — then book a session.
            </p>
          </div>

          {/* Tutor cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: "28px 32px",
                  display: "grid",
                  gridTemplateColumns: "1fr 280px",
                  gap: 24,
                  alignItems: "start",
                }}
              >
                {/* Left: profile */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 50,
                        background: INK,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: PAPER,
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        flexShrink: 0,
                      }}
                    >
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.375rem",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          color: INK,
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {tutor.name}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: INK_SOFT,
                          marginTop: 2,
                        }}
                      >
                        {SUBJECT_LABELS[tutor.subjects?.[0] || "tutor"]} Coach
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: INK_SOFT,
                      lineHeight: 1.65,
                      marginBottom: 16,
                      maxWidth: 560,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: tutor.bio?.replace(/\n/g, "<br />") || "Experienced coach helping students achieve their target scores.",
                    }}
                  />

                  {/* Credentials */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    {(() => {
                      const creds: string[] = [];
                      creds.push(
                        ...(tutor.qualifications || []),
                      );
                      if (tutor.credentials?.ielts_score && tutor.subjects?.includes("ielts")) {
                        creds.push(`IELTS ${tutor.credentials.ielts_score}`);
                      }
                      if (tutor.credentials?.toefl_score && tutor.subjects?.includes("toefl")) {
                        creds.push(`TOEFL ${tutor.credentials.toefl_score}`);
                      }
                      return creds
                        .filter(Boolean)
                        .slice(0, 4)
                        .map((cred) => (
                          <span
                            key={cred as string}
                            style={{
                              background: PAPER,
                              border: `1px solid ${LINE}`,
                              borderRadius: 6,
                              padding: "4px 10px",
                              fontSize: "0.8125rem",
                              color: INK_SOFT,
                            }}
                          >
                            {cred}
                          </span>
                        ));
                    })()}
                  </div>

                  {/* Stats row */}
                  <div
                    style={{
                      display: "flex",
                      gap: 24,
                      flexWrap: "wrap",
                      paddingTop: 16,
                      borderTop: `1px solid ${LINE}`,
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: INK,
                        }}
                      >
                        {tutor.rating.toFixed(1)}
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: MUTED }}> / 5.0</span>
                      <div
                        style={{
                          marginTop: 4,
                          color: "#B8860B",
                          letterSpacing: "2px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {"★".repeat(Math.round(tutor.rating))}
                        {"★".repeat(5 - Math.round(tutor.rating)).replace(/★/g, "☆")}
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: INK,
                        }}
                      >
                        {tutor.reviews?.length || 0}+
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: MUTED }}> reviews</span>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: INK,
                        }}
                      >
                        {tutor.credentials.experience_years}
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: MUTED }}> years exp.</span>
                    </div>
                  </div>
                </div>

                {/* Right: rate + CTA */}
                <div
                  style={{
                    borderLeft: `1px solid ${LINE}`,
                    paddingLeft: 24,
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      paddingBottom: 20,
                      borderBottom: `1px solid ${LINE}`,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "2rem",
                        fontWeight: 600,
                        color: INK,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ₹{tutor.hourly_rate}
                    </span>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}> / hour</span>
                    <p style={{ fontSize: "0.8125rem", color: MUTED, marginTop: 8 }}>
                      First session free — no commitment
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Link
                      href={`/tutors/${tutor.id}`}
                      className="tutor-view-profile"
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: INK,
                        color: PAPER,
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 20px",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      View profile
                    </Link>
                    <Link
                      href="/register?role=student"
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "transparent",
                        color: INK_SOFT,
                        border: `1px solid ${LINE}`,
                        borderRadius: 8,
                        padding: "10px 20px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Book a session
                    </Link>
                  </div>
                </div
                >
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: 40,
              padding: "32px",
              background: INK,
              borderRadius: 14,
              textAlign: "center",
              color: PAPER,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: PAPER,
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              Don't see the right tutor?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(250, 247, 240, 0.8)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Tell us your goal. We'll match you with the right person within 24 hours.
            </p>
            <Link
              href="/register?role=student"
              style={{
                display: "inline-block",
                background: PAPER,
                color: INK,
                border: "none",
                borderRadius: 8,
                padding: "14px 28px",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Get matched now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "24px 0",
          background: PAPER_2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.125rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Terms
            </Link>
            <Link href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>
              Contact
            </Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>

      {/* JSON-LD structured data — body-level script for reliable rendering */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <style>{`
        .tutor-view-profile:hover { background: #3D4A63 !important; }
      `}</style>
    </div>
  );
}
