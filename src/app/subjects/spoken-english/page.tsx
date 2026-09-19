import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spoken English Tutor — Find Conversation Coaches | bookateacher.in",
  description:
    "Find spoken English tutors for confidence, fluency, and real conversation. Live 1-on-1 sessions — not scripts. Pronunciation, vocabulary for your situation, and the exact words you need. Book a session.",
  openGraph: {
    title: "Spoken English Tutor — Find Conversation Coaches | bookateacher.in",
    description: "Spoken English tutors for confidence, fluency, and real conversation. Live 1-on-1 sessions.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/subjects/spoken-english",
    images: [
      {
        url: "https://bookateacher.in/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Spoken English tutors — bookateacher.in",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spoken English Tutor — bookateacher.in",
    description: "Spoken English tutors for confidence, fluency, and real conversation. Live 1-on-1 sessions.",
    images: ["https://bookateacher.in/og-default.svg"],
  },
  alternates: {
    canonical: "https://bookateacher.in/subjects/spoken-english",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SPOKEN_FAQ = [
  {
    question: "Is spoken English coaching for beginners?",
    answer:
      "Yes. If you understand English but struggle to speak it — that's exactly what we help with. The most common student is someone who reads and writes fine but freezes when they have to speak in a meeting, interview, or conversation. If you're below basic comprehension, we'll suggest a general English course first and tell you honestly.",
  },
  {
    question: "How is a tutor different from an app?",
    answer:
      "Apps give you words, phrases, and grammar rules. A tutor listens to how you actually speak, corrects your pronunciation in real time, builds your confidence to use English in real situations — interviews, meetings, presentations, daily conversation. Apps can't do the live feedback part. That's what makes the difference.",
  },
  {
    question: "How much does spoken English coaching cost?",
    answer:
      "₹800–₹2,000 per hour. Tutors who specialise in spoken English and conversation practice typically charge ₹800–₹1,500/hr. You see the rate before you book. Trial sessions are often discounted.",
  },
  {
    question: "How many sessions before I notice a difference?",
    answer:
      "Most students notice a difference in confidence and fluency within 2–4 weeks of regular sessions. Pronunciation work takes longer — 8–12 weeks for significant change. Your tutor will set realistic expectations in the first session based on where you are now and what you want to achieve.",
  },
  {
    question: "Can you help with English for interviews?",
    answer:
      "Yes. This is one of the most common requests. We coach you on the specific language you need for your interview — how to introduce yourself, how to answer common questions, how to handle the ones you don't know, and how to sound confident even when you're nervous. Your tutor will do mock interview practice with you.",
  },
  {
    question: "What if I'm preparing for a specific situation — presentation, meeting, trip?",
    answer:
      "Tell your tutor what you're preparing for. They'll build the sessions around it. If it's a presentation, you'll rehearse it live and get feedback on your language, pacing, and confidence. If it's a trip, you'll practise the exact conversations you'll have. If it's a meeting, you'll practise contributing and handling questions. The sessions are built around your situation, not a generic curriculum.",
  },
];

export const SPOKEN_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SPOKEN_FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const SPOKEN_COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Spoken English Coaching",
  description:
    "Spoken English coaching for confidence, fluency, and real conversation. Live 1-on-1 sessions — not scripts. Pronunciation, vocabulary for your situation, and the exact words you need.",
  provider: {
    "@type": "Organization",
    name: "bookateacher.in",
    url: "https://bookateacher.in",
  },
  courseMode: "online",
  courseType: [
    "one-on-one tutoring",
    "live conversation practice",
    "pronunciation coaching",
    "confidence building",
  ],
  learningResourceType: [
    "online course",
    "personal tuition",
    "language coaching",
  ],
  typicalAgeRange: "16-45",
  inLanguage: "en",
};

export default function SpokenEnglishSubjectPage() {
  const INK = "#14213D";
  const INK_SOFT = "#3D4A63";
  const PAPER = "#FAF7F0";
  const PAPER_2 = "#F2ECE0";
  const LINE = "#D9D2C5";
  const MUTED = "#6B6557";
  const RED = "#B23A2E";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/subjects/spoken-english#webpage",
        url: "https://bookateacher.in/subjects/spoken-english",
        name: "Spoken English Tutor — Find Conversation Coaches | bookateacher.in",
        description:
          "Find spoken English tutors for confidence, fluency, and real conversation. Live 1-on-1 sessions — not scripts.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Subjects", item: "https://bookateacher.in/subjects" },
          { "@type": "ListItem", position: 3, name: "Spoken English", item: "https://bookateacher.in/subjects/spoken-english" },
        ],
      },
      SPOKEN_COURSE_SCHEMA,
      SPOKEN_FAQ_SCHEMA,
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
            <Link href="/subjects/toefl" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", padding: "6px 14px", border: `1px solid ${LINE}`, borderRadius: 6, transition: "all 0.15s" }}>
              TOEFL
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
            <span style={{ color: INK, fontWeight: 500 }}>Spoken English</span>
          </nav >

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
              Spoken English
            </h1>
            <p style={{ fontSize: "1.125rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 680 }}>
              Spoken English tutors for confidence, fluency, and real conversation — not scripts.
              Pronunciation, vocabulary for your situation, and the exact words you need. Live 1-on-1 sessions. Book a session.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {/* What it's for */}
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
                  Who this is for
                </h2>
                <div
                  style={{
                    background: PAPER_2,
                    border: `1px solid ${LINE}`,
                    borderRadius: 14,
                    padding: 28,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { title: "You understand English. You just can't speak it.", desc: "You read and write fine but freeze when you have to speak — in a meeting, interview, or conversation. This is the most common student, and this is exactly what we help with." },
                      { title: "You want confidence, not just words.", desc: "Knowing the words isn't the problem. Using them under pressure is. Sessions are built around real conversation — not scripts — so you practise the thing that's actually hard." },
                      { title: "You need English for a specific situation.", desc: "A job interview. A presentation. A meeting. A trip. A move to an English-speaking country. Tell your tutor what you're preparing for and the sessions will be built around it." },
                      { title: "You want pronunciation that doesn't get in the way.", desc: "Pronunciation work is slow but real. A tutor will identify the specific sounds you're mispronouncing and coach you on them until they stop being a barrier." },
                    ].map((s) => (
                      <div key={s.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: RED, flexShrink: 0, marginTop: 8 }} />
                        <div>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
                            {s.title}
                          </div>
                          <div style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.65 }}>
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* How sessions work */}
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
                  How the sessions work
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "01", title: "Your tutor listens first", desc: "The first session is mostly your tutor listening to how you actually speak — your fluency, pronunciation, the situations you struggle in, and what you want to be able to do. That's how they build your plan." },
                    { step: "02", title: "Real conversation, not scripts", desc: "Sessions are built around real conversation — the situations you'll actually be in. Job interviews. Meetings. Presentations. Daily conversation. Your tutor will put you in them and coach you through them." },
                    { step: "03", title: "Feedback in real time", desc: "Your tutor corrects you as you go — pronunciation, word choice, phrasing, confidence. This is the thing apps can't do. Real-time correction is what changes how you speak." },
                    { step: "04", title: "Targeted pronunciation work", desc: "If specific sounds are mispronounced, your tutor will identify them and coach you on them between conversations. This is slow but real — and it compounds." },
                    { step: "05", title: "Progress you can feel", desc: "Most students feel a difference in confidence within 2–4 weeks. Fluency builds over 4–8 weeks. Pronunciation over 8–12. Your tutor will keep you honest about the timeline." },
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
                  Need a spoken English tutor?
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "rgba(250,247,240,0.65)", lineHeight: 1.6, marginBottom: 20 }}>
                  Tell us what you want to be able to do in English. We'll match you with a tutor who can get you there within 24 hours.
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
                    Find my spoken English tutor
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
                    Become a spoken English tutor
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
                    { value: "2", label: "spoken English tutors on the platform", sub: "conversation-focused" },
                    { value: "2–4 wk", label: "typical confidence improvement", sub: "with regular sessions" },
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
                  Spoken English questions
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
                  {SPOKEN_FAQ.map(({ question, answer }, i) => (
                    <div key={question} style={{ borderBottom: i < SPOKEN_FAQ.length - 1 ? `1px solid ${LINE}` : "none" }}>
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
