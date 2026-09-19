import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TOEFL Tutor — Find Certified TOEFL Coaches | bookateacher.in",
  description:
    "Find certified TOEFL iBT tutors for US university applications. Section-by-section coaching — Reading, Listening, Speaking, Writing. Strategy for every question type, full-length mock tests. Book a session.",
  openGraph: {
    title: "TOEFL Tutor — Find Certified TOEFL Coaches | bookateacher.in",
    description: "Certified TOEFL iBT tutors for US university applications. Live 1-on-1 coaching.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/subjects/toefl",
    images: [
      {
        url: "https://bookateacher.in/og-default.svg",
        width: 1200,
        height: 630,
        alt: "TOEFL tutors — bookateacher.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOEFL Tutor — bookateacher.in",
    description: "Certified TOEFL iBT tutors for US university applications. Live 1-on-1 coaching.",
    images: ["https://bookateacher.in/og-default.svg"],
  },
  alternates: {
    canonical: "https://bookateacher.in/subjects/toefl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TOEFL_FAQ = [
  {
    question: "What is a good TOEFL score?",
    answer:
      "It depends on the universities you're applying to. Most US universities require 80–100/120. Top programs often want 100+. Some require minimums per section — for example 26+ in Speaking for teaching assistant positions. Your target depends on the schools you're applying to. A tutor will tell you what each of your target schools requires and how to reach it.",
  },
  {
    question: "How is TOEFL different from IELTS?",
    answer:
      "TOEFL iBT is fully computer-based in most test centres. The Speaking section is recorded into a microphone — there's no live interviewer. IELTS has a live speaking interview with an examiner. TOEFL Reading and Listening are longer. Both test the same underlying English skills, but the format feels very different on test day. A tutor who has taken both can tell you which suits you better.",
  },
  {
    question: "How much does a TOEFL tutor cost?",
    answer:
      "₹800–₹2,500 per hour depending on experience. TOEFL specialists who scored 105+ themselves tend to be in the ₹1,200–₹2,000/hr range. You see the rate before you book. Trial sessions are often discounted.",
  },
  {
    question: "Can I prepare for TOEFL in a month?",
    answer:
      "If you're already near your target — within about 10 points — a focused month of coaching can close the gap, especially if you're targeting a specific section. If you're far from your target, you'll need more time. Tell your tutor your test date upfront — they'll give you an honest assessment of what's realistic.",
  },
  {
    question: "What's the hardest section in TOEFL?",
    answer:
      "For most students, Speaking and Writing are harder to improve because they're the sections you can't study for in isolation — you need feedback. Reading and Listening improve faster with practice because you can self-assess. A tutor who scored high themselves will know exactly where students typically lose points in each section.",
  },
  {
    question: "Do I need TOEFL or IELTS for US universities?",
    answer:
      "Most US universities accept both. Some prefer TOEFL because it's US-based. Some require a minimum TOEFL Speaking score (often 26+) for teaching assistant eligibility. IELTS is more common for UK, Australian, and Canadian applications. Check your target schools' requirements — a tutor can help you decide which test to take if you're unsure.",
  },
];

export const TOEFL_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TOEFL_FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const TOEFL_COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "TOEFL iBT Test Preparation",
  description:
    "Certified 1-on-1 TOEFL iBT coaching for US university applications. Section-by-section strategy for Reading, Listening, Speaking, and Writing. Full-length mock tests under timed conditions.",
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
    "section strategy",
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
      name: "TOEFL iBT Coaching",
      description:
        "Full TOEFL iBT preparation — all four sections. Strategy for every question type, timed practice, and feedback on Speaking and Writing responses.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
    {
      "@type": "Course",
      name: "TOEFL Speaking & Writing Focus",
      description:
        "Targeted coaching for the two hardest sections — Speaking responses and Writing tasks. Recordings reviewed, scored against ETS rubrics, and rewritten until they meet your target.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
  ],
};

export default function ToeflSubjectPage() {
  const INK = "#14213D";
  const INK_SOFT = "#3D4A63";
  const PAPER = "#FAF7F0";
  const PAPER_2 = "#F2ECE0";
  const LINE = "#D9D2C5";
  const MUTED = "#6B6557";
  const GREEN = "#2F5233";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/subjects/toefl#webpage",
        url: "https://bookateacher.in/subjects/toefl",
        name: "TOEFL Tutor — Find Certified TOEFL Coaches | bookateacher.in",
        description:
          "Find certified TOEFL iBT tutors for US university applications. Section-by-section coaching — Reading, Listening, Speaking, Writing.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Subjects", item: "https://bookateacher.in/subjects" },
          { "@type": "ListItem", position: 3, name: "TOEFL", item: "https://bookateacher.in/subjects/toefl" },
        ],
      },
      TOEFL_COURSE_SCHEMA,
      TOEFL_FAQ_SCHEMA,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

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
            <Link href="/subjects/ielts" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", padding: "6px 14px", border: `1px solid ${LINE}`, borderRadius: 6, transition: "all 0.15s" }}>
              IELTS
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

      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto" }}>
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
            <span style={{ color: INK, fontWeight: 500 }}>TOEFL</span>
          </nav >

          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: GREEN,
                marginBottom: 16,
              }}
            >
              <span style={{ display: "block", width: 28, height: 1.5, background: GREEN, margin: "0 auto 8px" }} />
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
              TOEFL
            </h1>
            <p style={{ fontSize: "1.125rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 680 }}>
              Certified TOEFL iBT tutors for US university applications. Section-by-section coaching — Reading, Listening, Speaking, Writing.
              Strategy for every question type. Full-length mock tests. Book a session.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* What TOEFL measures */}
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
                      { icon: "M3 4h18v16M3 4l4-4M17 4l4-4M3 20h18", label: "Reading", sub: "35 min · 20 questions", color: GREEN },
                      { icon: "M4 4h16v16M4 4l4-4M16 4l-4-4M4 20h16", label: "Listening", sub: "36 min · 28 questions", color: GREEN },
                      { icon: "M7 4h10M12 4v6m4-4v4", label: "Speaking", sub: "16 min · 4 tasks", color: GREEN },
                      { icon: "M4 4h16M4 12h10M4 20h16", label: "Writing", sub: "29 min · 2 tasks", color: GREEN },
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
                    Each section is scored 0–30. Your total score is out of 120. Most universities require 80–100. Top programs often want 100+.
                  </p>
                </div>
              </section>

              {/* Section details */}
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
                  How the sections work
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { title: "Reading — 35 minutes, 20 questions", desc: "3–4 passages, 10 questions each. Question types include factual information, inference, sentence insertion, summary, and category matching. A tutor will teach you how to read for the answer without reading the whole passage every time." },
                    { title: "Listening — 36 minutes, 28 questions", desc: "3–4 lectures (6 questions each) and 2–3 conversations (5 questions each). You hear each audio once. Notes are key. A tutor will train you to take notes that actually help you answer — not just transcribe." },
                    { title: "Speaking — 16 minutes, 4 tasks", desc: "1 independent task (your opinion) and 3 integrated tasks (read + listen + speak). You have 15–30 seconds to prepare and 45–60 seconds to speak. Recording yourself and getting scored against the ETS rubric is the only way to improve. That's what a tutor does." },
                    { title: "Writing — 29 minutes, 2 tasks", desc: "1 integrated task (read + listen + write, 20 min) and 1 academic discussion task (10 min). Scoring is on development, organisation, and language use. A tutor will show you what a 26+ writing response looks like and how to get there." },
                  ].map((s) => (
                    <div key={s.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: GREEN,
                          flexShrink: 0,
                          marginTop: 8,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 6, fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {s.title}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.65 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
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
                    { step: "01", title: "Know your current score", desc: "Take a full-length practice test under timed conditions. That tells you which sections are strong and which are holding you back — and gives you and your tutor a starting point." },
                    { step: "02", title: "Target your weak sections", desc: "If your Speaking is 22 and your Reading is 28, every hour of Reading practice is an hour not spent on the thing holding your total down. A tutor will tell you where to focus." },
                    { step: "03", title: "Get feedback on Speaking and Writing", desc: "These are the sections you can't self-assess accurately. You need someone who knows the ETS rubrics to score your responses and tell you what to change." },
                    { step: "04", title: "Learn the question-type strategy", desc: "Each question type has a strategy — how to approach summary questions, how to take notes for integrated tasks, how to structure a speaking response in 45 seconds. That's what a tutor teaches." },
                    { step: "05", title: "Take timed full-length tests", desc: "Full-length practice tests under real conditions — the clock running, no pauses. That's the only way to build the stamina and pace you need for test day." },
                  ].map((s) => (
                    <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: INK,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: PAPER,
                          marginTop: 2,
                        }}
                      >
                        {s.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {s.title}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.6 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 88 }}>
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
                    background: "rgba(47,82,51,0.2)",
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
                  Need a TOEFL tutor?
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "rgba(250,247,240,0.65)", lineHeight: 1.6, marginBottom: 20 }}>
                  Tell us your target score and test date. We'll match you with a certified TOEFL specialist within 24 hours.
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
                    Find my TOEFL tutor
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
                    Become a TOEFL tutor
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
                    { value: "1", label: "certified TOEFL tutor on the platform", sub: "TOEFL iBT 112 scorer" },
                    { value: "112", label: "highest tutor TOEFL score", sub: "Ananya Sharma" },
                    { value: "24h", label: "typical match time", sub: "from your request" },
                  ].map((s) => (
                    <div key={s.value} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: GREEN, letterSpacing: "-0.02em", flexShrink: 0 }}>
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

          {/* FAQ */}
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
                  TOEFL questions
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
                  {TOEFL_FAQ.map(({ question, answer }, i) => (
                    <div key={question} style={{ borderBottom: i < TOEFL_FAQ.length - 1 ? `1px solid ${LINE}` : "none" }}>
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
