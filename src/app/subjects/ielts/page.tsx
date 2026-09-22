import { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, webpageSchema } from "@/lib/page-seo";
import { FAQ_SCHEMA as HOME_FAQ_SCHEMA } from "@/lib/seo";
import IeltsIllustration from "@/components/IeltsIllustration";

export const metadata: Metadata = {
  title: "IELTS Tutor — Find Certified IELTS Coaches | bookateacher.in",
  description:
    "Find certified IELTS tutors across India. Live 1-on-1 coaching for IELTS Academic and General Training — writing, speaking, reading, listening. Book a session today.",
  openGraph: {
    title: "IELTS Tutor — Find Certified IELTS Coaches | bookateacher.in",
    description: "Find certified IELTS tutors across India. Live 1-on-1 coaching for IELTS Academic and General Training.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/subjects/ielts",
    images: [
      {
        url: "https://bookateacher.in/og-default.svg",
        width: 1200,
        height: 630,
        alt: "IELTS tutors — bookateacher.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Tutor — bookateacher.in",
    description: "Certified IELTS tutors across India. Live 1-on-1 coaching.",
    images: ["https://bookateacher.in/og-default.svg"],
  },
  alternates: {
    canonical: "https://bookateacher.in/subjects/ielts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const IELTS_FAQ = [
  {
    question: "What is a good IELTS score?",
    answer:
      "It depends on your goal. Most universities require Band 6.5–7.5 for admission. Immigration programs (Canada, Australia, UK) often require Band 6.0–7.0. Band 8+ is excellent and opens more doors. You should target the score your institution or visa program requires — a tutor can tell you what that is and how to get there.",
  },
  {
    question: "How long does it take to improve from Band 6.5 to 7.5?",
    answer:
      "Typically 6–12 weeks with focused 1-on-1 coaching 2–3 times per week. The timeline depends on which sections are holding you back. Writing and speaking usually take longer to improve than reading and listening. A tutor will assess your current level in the first session and give you a realistic plan.",
  },
  {
    question: "IELTS Academic or General Training — which do I need?",
    answer:
      "IELTS Academic is for university admission and professional registration. IELTS General Training is for immigration, work, and secondary education. The Listening and Speaking sections are the same in both. Reading and Writing differ. Your tutor will know which version you need and prepare you accordingly.",
  },
  {
    question: "How much does an IELTS tutor cost?",
    answer:
      "₹800–₹2,500 per hour depending on experience. Experienced tutors (5+ years) typically charge ₹800–₹1,200/hr. Specialists with high personal scores or niche expertise charge ₹1,200–₹2,500/hr. You see the rate before you book. Trial sessions are often discounted.",
  },
  {
    question: "Can I prepare for IELTS in 4 weeks?",
    answer:
      "It depends on your starting point. If you're at Band 6.0–6.5 and need 7.0, 4 weeks of focused coaching can get you there. If you're below Band 5.5, 4 weeks is probably not enough for a large jump. Tell your tutor your test date upfront — they'll give you an honest assessment of what's realistic and what to focus on.",
  },
  {
    question: "What's the difference between self-study and a tutor?",
    answer:
      "Self-study works for familiarising yourself with the format and doing practice questions. A tutor adds three things: targeted feedback on your writing and speaking (the sections that are hardest to self-assess), a personalised plan based on your weak areas, and accountability. Most students who stall at the same score for months do so because they're practising what they're already good at instead of fixing what's holding them back.",
  },
];

export const IELTS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: IELTS_FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const IELTS_COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IELTS Test Preparation",
  description:
    "Certified 1-on-1 IELTS Academic and General Training coaching across India. Live sessions, mock tests under real test conditions, and targeted feedback on writing and speaking.",
  provider: {
    "@type": "Organization",
    name: "bookateacher.in",
    url: "https://bookateacher.in",
  },
  courseMode: "online",
  courseType: [
    "one-on-one tutoring",
    "live coaching",
    "mock tests",
    "writing feedback",
    "speaking practice",
  ],
  learningResourceType: [
    "online course",
    "personal tuition",
    "test prep",
  ],
  typicalAgeRange: "16-35",
  inLanguage: "en",
  hasCourse: [
    {
      "@type": "Course",
      name: "IELTS Academic Coaching",
      description:
        "Targeted 1-on-1 coaching for IELTS Academic — Writing Task 1 and 2, Speaking Parts 1–3, Reading, and Listening. Mock tests under timed conditions.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
    {
      "@type": "Course",
      name: "IELTS General Training Coaching",
      description:
        "IELTS General Training preparation — Writing Task 1 (letter) and Task 2 (essay), Speaking, Reading, and Listening. For immigration and work purposes.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
  ],
};

export default function IeltsSubjectPage() {
  const INK = "#14213D";
  const INK_SOFT = "#3D4A63";
  const PAPER = "#FAF7F0";
  const PAPER_2 = "#F2ECE0";
  const LINE = "#D9D2C5";
  const MUTED = "#6B6557";
  const RED = "#B23A2E";
  const GREEN = "#2F5233";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/subjects/ielts#webpage",
        url: "https://bookateacher.in/subjects/ielts",
        name: "IELTS Tutor — Find Certified IELTS Coaches | bookateacher.in",
        description:
          "Find certified IELTS tutors across India. Live 1-on-1 coaching for IELTS Academic and General Training — writing, speaking, reading, listening.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Subjects", item: "https://bookateacher.in/subjects" },
          { "@type": "ListItem", position: 3, name: "IELTS", item: "https://bookateacher.in/subjects/ielts" },
        ],
      },
      IELTS_COURSE_SCHEMA,
      IELTS_FAQ_SCHEMA,
    ],
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        color: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* SEO schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `rgba(${parseInt(INK_SOFT.slice(1,3),16)}, ${parseInt(INK_SOFT.slice(3,5),16)}, ${parseInt(INK_SOFT.slice(5,7),16)}, 0.92)`,
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
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
              textDecoration: "none",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
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
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href="/subjects/toefl" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", padding: "6px 14px", border: `1px solid ${LINE}`, borderRadius: 6, transition: "all 0.15s" }}>
              TOEFL
            </Link>
            <Link href="/subjects/spoken-english" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", padding: "6px 14px", border: `1px solid ${LINE}`, borderRadius: 6, transition: "all 0.15s" }}>
              Spoken English
            </Link>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 6, fontSize: "0.875rem", fontWeight: 500, background: INK, color: PAPER, textDecoration: "none", transition: "all 0.15s" }}>
              Find a tutor
            </Link>
          </div>
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
              marginBottom: 32,
              fontSize: "0.8125rem",
              color: MUTED,
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/subjects" style={{ color: INK_SOFT, textDecoration: "none" }}>Subjects</Link>
            <span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>IELTS</span>
          </nav >

          {/* Subject heading */}
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: RED,
                marginBottom: 16,
              }}
            >
              <span style={{ display: "block", width: 28, height: 1.5, background: RED, margin: "0 auto 8px" }} />
              Subject
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                color: INK,
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              IELTS
            </h1>
            <p style={{ fontSize: "1.125rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 680 }}>
              Certified IELTS tutors across India. Live 1-on-1 coaching for Academic and General Training — writing, speaking, reading, and listening.
              Book a session. Move your score.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
            {/* Left column — content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* What IELTS measures */}
              <section>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: INK,
                    marginBottom: 16,
                    lineHeight: 1.2,
                  }}
                >
                  What the test measures
                </h2>
                <div
                  style={{
                    background: PAPER_2,
                    border: `1px solid ${LINE}`,
                    borderRadius: 14,
                    padding: 28,
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
                    {[
                      { icon: "M2 6h20M2 12h20M2 18h20", label: "Listening", sub: "30 min · 40 questions", color: RED },
                      { icon: "M4 6h16v12M4 6l4-4M16 6l-4-4M4 18h16", label: "Reading", sub: "60 min · 40 questions", color: RED },
                      { icon: "M4 6h16M4 12h10M4 18h16", label: "Writing", sub: "60 min · 2 tasks", color: RED },
                      { icon: "M8 6h8M8 12l4 4M12 12l4-4", label: "Speaking", sub: "11–14 min · 3 parts", color: RED },
                    ].map((s) => (
                      <div key={s.label} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            margin: "0 auto 12px",
                            borderRadius: 12,
                            background: INK,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={s.icon} />
                          </svg>
                        </div>
                        <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontSize: "0.8125rem", color: MUTED }}>{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.65, borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
                    Each section is scored 0–9. Your overall Band Score is the average of the four, rounded to the nearest half or whole band.
                  </p>
                </div>
              </section>

              {/* Band score guide */}
              <section>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: INK,
                    marginBottom: 16,
                  }}
                >
                  Band score guide
                </h2>
                <div
                  style={{
                    background: PAPER_2,
                    border: `1px solid ${LINE}`,
                    borderRadius: 14,
                    padding: 24,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { band: "9", label: "Expert user", desc: "Fully operational command of the language." },
                      { band: "8", label: "Very good user", desc: "Fully operational with only occasional unsystematic inaccuracies." },
                      { band: "7", label: "Good user", desc: "Operational command with occasional inaccuracies and misunderstandings." },
                      { band: "6", label: "Competent user", desc: "Generally effective command despite some inaccuracies and misunderstandings." },
                      { band: "5", label: "Modest user", desc: "Partial command — copes with overall meaning in most situations." },
                      { band: "4", label: "Limited user", desc: "Basic competence in familiar situations — frequent problems." },
                    ].map((b) => (
                      <div key={b.band} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid " + LINE }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: PAPER }}>
                          {b.band}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 2 }}>{b.label}</div>
                          <div style={{ fontSize: "0.8125rem", color: MUTED, lineHeight: 1.4 }}>{b.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* How to prepare */}
              <section>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: INK,
                    marginBottom: 16,
                  }}
                >
                  How to prepare
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "01", title: "Know your current level", desc: "Take a diagnostic mock test under timed conditions. That gives you and your tutor a starting point — and tells you exactly which sections need work." },
                    { step: "02", title: "Fix your weak sections first", desc: "If your Writing is 6.0 and Speaking is 7.0, every hour spent on Listening is an hour not spent on the thing holding your score down. A tutor will tell you where to focus." },
                    { step: "03", title: "Get feedback on writing", desc: "Writing is the hardest section to self-assess. You need someone who knows the band descriptors to tell you why you're at 6.5 and what to change to reach 7.0." },
                    { step: "04", title: "Practice speaking out loud", desc: "Speaking is a live performance. Reading model answers doesn't help. You need to speak, get corrected in real time, and do it again under timed conditions." },
                    { step: "05", title: "Take timed mock tests", desc: "Full-length mock tests under real test conditions — no pauses, no dictionary, the clock running. That's the only way to know what test day actually feels like." },
                  ].map((s) => (
                    <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: PAPER, marginTop: 2 }}>
                        {s.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.title}</div>
                        <div style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.6 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column — CTA + tutor list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 88 }}>
              {/* Subject illustration */}
              <div style={{ width: "100%", aspectRatio: "3 / 4", borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <IeltsIllustration />
              </div>

              {/* CTA card */}
              <div
                style={{
                  background: INK,
                  color: PAPER,
                  borderRadius: 14,
                  padding: 28,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    background: "rgba(178,58,46,0.2)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: PAPER,
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  Need an IELTS tutor?
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "rgba(250,247,240,0.65)", lineHeight: 1.6, marginBottom: 20 }}>
                  Tell us your target score and test date. We'll match you with a certified IELTS specialist within 24 hours.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link
                    href="/register?role=student"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "12px 20px",
                      borderRadius: 6,
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      background: PAPER,
                      color: INK,
                      textDecoration: "none",
                      transition: "all 0.15s",
                    }}
                  >
                    Find my IELTS tutor
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    href="/register?role=tutor"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 20px",
                      borderRadius: 6,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: "transparent",
                      color: PAPER,
                      border: `1px solid rgba(250,247,240,0.25)`,
                      textDecoration: "none",
                      transition: "all 0.15s",
                    }}
                  >
                    Become an IELTS tutor
                  </Link>
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(250,247,240,0.4)", marginTop: 14 }}>
                  No commitment. No hidden fees.
                </p>
              </div>

              {/* Trust stats */}
              <div
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { value: "3", label: "certified IELTS tutors on the platform", sub: "IDP-certified, Band 8.5 scorers" },
                    { value: "8.5", label: "highest tutor IELTS score", sub: "Vikram Singh" },
                    { value: "24h", label: "typical match time", sub: "from your request" },
                  ].map((s) => (
                    <div key={s.value} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: RED, letterSpacing: "-0.02em", flexShrink: 0 }}>
                        {s.value}
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: INK_SOFT, lineHeight: 1.4 }}>
                        <div style={{ color: INK, fontWeight: 500 }}>{s.label}</div>
                        <div style={{ color: MUTED, fontSize: "0.75rem" }}>{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAq section */}
          <section
            style={{
              marginTop: 56,
              paddingTop: 40,
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div style={{ marginBottom: 32, textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    color: INK,
                    marginBottom: 8,
                  }}
                >
                  IELTS questions
                </h2>
                <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.6, margin: "0 auto" }}>
                  The things students ask before booking.
                </p>
              </div>
              <div
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {IELTS_FAQ.map(({ question, answer }, i) => (
                    <div key={question} style={{ borderBottom: i < IELTS_FAQ.length - 1 ? `1px solid ${LINE}` : "none" }}>
                      <div style={{ padding: "16px 0", display: "flex", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 6, lineHeight: 1.3 }}>
                            {question}
                          </div>
                          <div style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.65, paddingLeft: 12, borderLeft: `2px solid ${LINE}` }}>
                            {answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
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
            <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Terms</Link>
            <Link href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Contact</Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
