import { Metadata } from "next";
import Link from "next/link";
import { getTutors, type TutorData } from "@/lib/tutor-data";
import { SUBJECT_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tutor Directory — IELTS, TOEFL & Spoken English",
  description:
    "Browse current tutor profiles for IELTS, TOEFL, and Spoken English. Check availability, credentials, and rates before requesting a match.",
  openGraph: {
    title: "Tutor Directory — IELTS, TOEFL & Spoken English",
    description: "Browse current IELTS, TOEFL, and Spoken English tutor profiles and check availability.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/tutors",
    images: [
      {
        url: "https://bookateacher.in/og-social.png",
        width: 1200,
        height: 630,
        alt: "bookateacher.in — English preparation guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://bookateacher.in/og-social.png"],
    title: "Tutor Directory — IELTS, TOEFL & Spoken English",
    description: "Current IELTS, TOEFL, and Spoken English tutor profiles and availability.",
  },
  alternates: {
    canonical: "https://bookateacher.in/tutors",
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

function buildJsonLd(tutors: TutorData[]): string {
  if (tutors.length === 0) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [],
      numberOfItems: 0,
    });
  }

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

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject: requestedSubject } = await searchParams;
  const subject = requestedSubject && SUBJECT_LABELS[requestedSubject] ? requestedSubject : "";
  const allTutors = await getTutors();
  const tutors = subject
    ? allTutors.filter((tutor) => tutor.subjects?.includes(subject))
    : allTutors;
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
      {/* Main */}
      <main id="main-content" tabIndex={-1} style={{ flex: 1, padding: "48px 24px" }}>
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
              Tutor directory
            </h1>
            <p style={{ fontSize: "1.0625rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
              {subject
                ? `Showing ${SUBJECT_LABELS[subject]} tutors. Compare current profiles and choose who to contact.`
                : "Browse current IELTS, TOEFL, and Spoken English tutor profiles. Review credentials and rates before requesting a match."}
            </p>
            <form method="get" action="/tutors" className="directory-filter" aria-label="Filter tutors by subject">
              <label htmlFor="directory-subject">Filter by subject</label>
              <select id="directory-subject" name="subject" defaultValue={subject}>
                <option value="">All subjects</option>
                {Object.entries(SUBJECT_LABELS).filter(([value]) => value !== "other").map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button type="submit">Show tutors</button>
              {subject && <Link href="/tutors">Clear filter</Link>}
            </form>
          </div>

          {/* Tutor cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {tutors.length === 0 ? (
              <section
                role="status"
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: "28px 32px",
                  textAlign: "center",
                }}
              >
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, margin: "0 0 10px" }}>
                  No tutor profiles are listed yet
                </h2>
                <p style={{ color: INK_SOFT, lineHeight: 1.6, margin: "0 0 18px" }}>
                  We are adding tutors to the directory. If you teach IELTS, TOEFL, or Spoken English, you can create a profile.
                </p>
                <p style={{ color: INK_SOFT, lineHeight: 1.6, margin: "0 0 18px" }}>
                  Looking for a tutor? <Link href="/contact" style={{ color: INK, fontWeight: 600, textDecoration: "underline" }}>Contact us about availability</Link>.
                </p>
                <Link
                  href="/register?role=tutor"
                  style={{ color: INK, fontWeight: 600, textDecoration: "underline" }}
                >
                  Create a tutor profile
                </Link>
              </section>
            ) : tutors.map((tutor) => (
              <div
                key={tutor.id}
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: "28px 32px",
                  display: "grid",
                  className: "tutor-directory-card",
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
                        {tutor.reviews || 0}+
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
                  className="tutor-directory-side"
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
              Need help with tutor availability?
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(250, 247, 240, 0.8)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Have a question about current profiles or availability? Contact us and tell us what you are looking for.
            </p>
            <Link
              href="/contact"
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
              Contact us
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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
