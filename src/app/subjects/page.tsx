import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subjects — IELTS, TOEFL & Spoken English Preparation",
  description: "Explore IELTS, TOEFL, and Spoken English preparation guides. Check the live tutor directory for current profiles and availability.",
  openGraph: {
    title: "Subjects — IELTS, TOEFL & Spoken English Preparation",
    description: "Explore preparation guides and check the live tutor directory for current profiles and availability.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/subjects",
    images: [{ url: "https://bookateacher.in/og-social.png", width: 1200, height: 630, alt: "Subjects — bookateacher.in" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subjects — IELTS, TOEFL & Spoken English Preparation",
    images: ["https://bookateacher.in/og-social.png"],
    description: "IELTS, TOEFL, and Spoken English preparation guides with current tutor availability in the directory.",
  },
  alternates: {
    canonical: "https://bookateacher.in/subjects",
  },
  robots: { index: true, follow: true },
};

const SUBJECTS = [
  {
    slug: "ielts",
    name: "IELTS",
    description: "IELTS Academic and General Training preparation for Writing, Speaking, Reading, and Listening. Check the live directory for current tutor profiles.",
    tags: ["IELTS Academic", "IELTS General Training", "Band 7+", "Writing Task 2", "Speaking"],
    color: "#B23A2E",

    faq: [
      { q: "What is a good IELTS score?", a: "Most universities require Band 6.5–7.5. Immigration programs often need Band 6.0–7.0. Band 8+ opens more doors. Your tutor will tell you your target and how to reach it." },
      { q: "How long to go from 6.5 to 7.5?", a: "Typically 6–12 weeks with focused 1-on-1 coaching 2–3× per week. Writing and speaking usually take longer. A tutor assesses you in session 1 and sets a realistic plan." },
      { q: "Academic or General Training?", a: "Academic for university admission and professional registration. General Training for immigration and work. Listening and Speaking are the same; Reading and Writing differ. Your tutor knows which you need." },
      { q: "How much does an IELTS tutor cost?", a: "₹800–₹2,500/hr. Experienced tutors (5+ yrs) charge ₹800–₹1,200/hr. Specialists with high personal scores charge ₹1,200–₹2,500/hr. You see the rate before you book." },
    ],
  },
  {
    slug: "toefl",
    name: "TOEFL",
    description: "TOEFL iBT preparation for US university applications, with guidance for all four sections. Check the live directory for current tutor profiles.",
    tags: ["TOEFL iBT", "US universities", "100+", "Speaking", "Writing"],
    color: "#2F5233",

    faq: [
      { q: "What is a good TOEFL score?", a: "Most US universities require 80–100/120. Top schools often want 100+. Some programs require minimums per section (e.g. 26+ in Speaking for teaching assistants). Your target depends on the schools you're applying to." },
      { q: "How is TOEFL different from IELTS?", a: "TOEFL is fully computer-based (in most centres). The Speaking section is recorded, not live. IELTS has a live speaking interview. TOEFL Reading and Listening are longer. Both test the same underlying skills — a good tutor will know which test suits you better." },
      { q: "How much does a TOEFL tutor cost?", a: "₹800–₹2,500/hr. TOEFL specialists who scored 105+ themselves tend to be in the ₹1,200–₹2,000/hr range. You see the rate before you book." },
      { q: "Can I prepare in a month?", a: "If you're already near your target (within ~10 points), a focused month of coaching can close the gap. If you're far from your target, you'll need more time. Tell your tutor your test date — they'll tell you what's realistic." },
    ],
  },
  {
    slug: "spoken-english",
    name: "Spoken English",
    description: "Spoken English preparation for confidence, fluency, pronunciation, and real conversation. Check the live directory for current tutor profiles.",
    tags: ["Fluency", "Pronunciation", "Confidence", "Conversation", "Interviews"],
    color: "#B23A2E",

    faq: [
      { q: "Is this for beginners?", a: "Yes. If you understand English but struggle to speak it, this is exactly what we help with. If you're below basic comprehension, we'll suggest a general English course first." },
      { q: "How is this different from an app?", a: "Apps give you words and phrases. A tutor listens to how you actually speak, corrects your pronunciation in real time, and builds your confidence to use English in real situations — interviews, meetings, conversations." },
      { q: "How much does spoken English coaching cost?", a: "₹800–₹2,000/hr. Tutors who specialise in spoken English and conversation practice typically charge ₹800–₹1,500/hr." },
      { q: "How many sessions before I notice a difference?", a: "Most students notice a difference in confidence and fluency within 2–4 weeks of regular sessions. Pronunciation work takes longer — 8–12 weeks for significant change. Your tutor will set realistic expectations in the first session." },
    ],
  },
];

export default function SubjectsPage() {
  const INK = "#14213D";
  const INK_SOFT = "#3D4A63";
  const PAPER = "#FAF7F0";
  const PAPER_2 = "#F2ECE0";
  const LINE = "#D9D2C5";
  const MUTED = "#6B6557";


  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/subjects#webpage",
        url: "https://bookateacher.in/subjects",
        name: "Subjects — IELTS, TOEFL & Spoken English Preparation",
        description: "Explore preparation guides and check the live tutor directory for current profiles and availability.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Subjects", item: "https://bookateacher.in/subjects" },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: SUBJECTS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://bookateacher.in/subjects/${s.slug}`,
          name: `${s.name} Preparation Guide`,
        })),
      },
      ...SUBJECTS.map((s) => ({
        "@context": "https://schema.org",
        "@type": "Course",
        name: `${s.name} Test Preparation`,
        description: s.description,
        provider: { "@type": "Organization", name: "bookateacher.in", url: "https://bookateacher.in" },
        courseMode: "online",
        courseType: ["one-on-one tutoring", "live coaching", "mock tests"],
        typicalAgeRange: "16-35",
        inLanguage: "en",
        ...(s.slug === "ielts" ? {
          hasCourse: [
            { "@type": "Course", name: "IELTS Academic Coaching", provider: { "@type": "Organization", name: "bookateacher.in", url: "https://bookateacher.in" } },
            { "@type": "Course", name: "IELTS General Training Coaching", provider: { "@type": "Organization", name: "bookateacher.in", url: "https://bookateacher.in" } },
          ],
        } : undefined),
      })),
    ],
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: PAPER, color: INK, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main id="main-content" tabIndex={-1} style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto" }}>
          <nav style={{ display: "flex", gap: 8, marginBottom: 32, fontSize: "0.8125rem", color: MUTED }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>Home</Link><span>/</span><span style={{ color: INK, fontWeight: 500 }}>Subjects</span>
          </nav>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.035em", color: INK, marginBottom: 16, lineHeight: 1.1 }}>
              Subjects
            </h1>
            <p style={{ fontSize: "1.0625rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 560 }}>
              Explore preparation guides for each subject and check the live directory for current tutor profiles and availability.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {SUBJECTS.map((s) => (
              <div key={s.slug} style={{ background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: 14, padding: 32, display: "grid", gridTemplateColumns: "1fr 240px", gap: 32, alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.875rem", fontWeight: 700, color: "white", fontFamily: "'Playfair Display', Georgia, serif" }}>{s.name.slice(0,2)}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.02em", color: INK, lineHeight: 1.15 }}>{s.name} Preparation</h2>
                  </div>
                  <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.65, flex: 1 }}>{s.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {s.tags.map((t) => (
                      <span key={t} style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 500, background: PAPER, border: `1px solid ${LINE}`, color: INK_SOFT }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <Link href={`/subjects/${s.slug}`} style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 0" }}>View {s.name} guide →</Link>
                    <Link href="/subjects" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>All subjects</Link>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, background: PAPER, border: `1px solid ${LINE}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK }}>Current availability</div>
                  <p style={{ fontSize: "0.8125rem", color: INK_SOFT, lineHeight: 1.5, margin: 0 }}>See current tutor profiles in the live directory.</p>
                  <Link href="/tutors" style={{ fontSize: "0.875rem", fontWeight: 600, color: INK, textDecoration: "underline" }}>View tutor directory →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
  );
}
