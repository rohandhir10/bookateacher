import type { Metadata } from "next";
import Link from "next/link";
import { homepageJsonLd } from "@/lib/seo";
import BandScoreTool from "@/components/BandScoreTool";

export const metadata: Metadata = {
  title: "English preparation & tutor directory",
  description:
    "Explore IELTS, TOEFL, and Spoken English preparation guides, then check current tutor profiles and availability.",
  openGraph: {
    title: "English preparation & tutor directory",
    description:
      "Explore preparation guides for IELTS, TOEFL, and Spoken English, then check current tutor profiles and availability.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in",
    images: [
      {
        url: "https://bookateacher.in/og-social.png",
        width: 1200,
        height: 630,
        alt: "bookateacher.in — English preparation and tutor directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "English preparation & tutor directory",
    description:
      "English preparation guides and current tutor profiles for IELTS, TOEFL, and Spoken English.",
    images: ["https://bookateacher.in/og-social.png"],
  },
  alternates: { canonical: "https://bookateacher.in" },
};

const focusAreas = [
  {
    tag: "IELTS",
    title: "Target the score you actually need.",
    copy: "Use focused practice for writing, speaking, reading and listening, then compare tutors who teach the test you are preparing for.",
  },
  {
    tag: "TOEFL",
    title: "Prepare for the test format, not generic English.",
    copy: "Find tutors who work with TOEFL-style tasks, timed practice and section-specific feedback.",
  },
  {
    tag: "Spoken English",
    title: "Build confidence through real conversation.",
    copy: "Work on fluency, pronunciation and everyday communication with one-to-one practice.",
  },
  {
    tag: "Retakes",
    title: "Get a fresh pair of eyes.",
    copy: "Coming back for another attempt? A new tutor can help you identify the specific patterns holding your score back.",
  },
];

const vetting = [
  ["01", "Identity & credentials", "Profiles can be reviewed against the information provided during onboarding."],
  ["02", "Teaching approach", "Tutors can explain their experience, subjects and session style before you book."],
  ["03", "Profile transparency", "Rates, subjects and other public details are shown before you decide."],
];

const testimonials = [
  {
    score: "6.5 → 7.5",
    quote:
      "My tutor focused on the two skills I was struggling with instead of making me repeat the whole syllabus.",
    name: "Priya M.",
    role: "IELTS student",
    initials: "PM",
  },
  {
    score: "TOEFL · 105",
    quote:
      "I wanted structured practice around the test format and a tutor I could speak to before committing to sessions.",
    name: "Ananya S.",
    role: "TOEFL student",
    initials: "AS",
  },
  {
    score: "Tutor perspective",
    quote:
      "The useful part is being able to understand the student's goal before a session starts.",
    name: "Rahul K.",
    role: "English tutor",
    initials: "RK",
  },
];

const faqs = [
  {
    q: "What if I don't see a suitable tutor?",
    a: "Tutor availability depends on the current public listings. Browse the directory first, then use the contact or profile flow if you need help.",
  },
  {
    q: "How much does tutoring cost?",
    a: "Rates vary by tutor, subject and experience. Review the price shown on a tutor's profile before you book.",
  },
  {
    q: "Can I browse without creating an account?",
    a: "Yes. The tutor directory is designed to be publicly browsable so you can compare profiles before signing up.",
  },
  {
    q: "Can I speak with a tutor before booking?",
    a: "Use the messaging or contact option shown on an eligible tutor profile to ask questions about fit and availability.",
  },
];

export default function HomePage() {
  return (
    <div>
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">IELTS · TOEFL · Spoken English</span>
              <h1 className="hero-title">
                Find a teacher who makes <em>progress</em> feel possible.
              </h1>
              <p>
                Browse current tutor profiles, compare how they teach and choose
                one-to-one English support that fits your goal.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-primary" href="/tutors">
                  Find a tutor
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link className="btn btn-secondary" href="/register?role=tutor">
                  Teach on BookATeacher
                </Link>
              </div>
              <p className="hero-note">
                Public tutor profiles are available before you create an account.
              </p>
            </div>

            <div className="hero-panel" aria-label="IELTS score improvement example">
              <div className="hero-panel-inner">
                <div className="panel-topline">
                  <div className="panel-kicker">Example learning snapshot</div>
                  <div className="panel-status">One-to-one</div>
                </div>
                <div className="panel-body">
                  <div className="panel-score">
                    <strong>7.5</strong>
                    <span>target band</span>
                  </div>

                  <div className="panel-bars">
                    <div className="panel-bar">
                      <span>Speaking</span>
                      <div className="panel-bar-track"><div className="panel-bar-fill" style={{ width: "76%" }} /></div>
                      <strong>7.0</strong>
                    </div>
                    <div className="panel-bar">
                      <span>Writing</span>
                      <div className="panel-bar-track"><div className="panel-bar-fill" style={{ width: "66%" }} /></div>
                      <strong>6.5</strong>
                    </div>
                    <div className="panel-bar">
                      <span>Reading</span>
                      <div className="panel-bar-track"><div className="panel-bar-fill" style={{ width: "84%" }} /></div>
                      <strong>7.5</strong>
                    </div>
                    <div className="panel-bar">
                      <span>Listening</span>
                      <div className="panel-bar-track"><div className="panel-bar-fill" style={{ width: "88%" }} /></div>
                      <strong>8.0</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: 28 }}>
                    <BandScoreTool />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Platform highlights">
          <div className="wrap trust-grid">
            <div className="trust-item">
              <div className="trust-label">Browse first</div>
              <div className="trust-value">See profiles before signing up</div>
            </div>
            <div className="trust-item">
              <div className="trust-label">Focused learning</div>
              <div className="trust-value">IELTS · TOEFL · Spoken English</div>
            </div>
            <div className="trust-item">
              <div className="trust-label">Make the choice</div>
              <div className="trust-value">Compare fit, subjects and rates</div>
            </div>
          </div>
        </section>

        <section id="for" className="section">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Built around your goal</span>
              <h2 className="section-title">Start with the reason you need a teacher.</h2>
              <p className="section-copy">
                A good tutor match starts with a clear goal. Whether you are
                chasing a test score or simply want to speak with more confidence,
                start from the outcome.
              </p>
            </div>

            <div className="intent-grid">
              {focusAreas.map((item) => (
                <article className="intent-card" key={item.tag}>
                  <div className="intent-tag">{item.tag}</div>
                  <h3 className="intent-title">{item.title}</h3>
                  <p className="intent-copy">{item.copy}</p>
                  <Link href="/tutors" className="intent-link">
                    Explore tutors
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section vetting">
          <div className="wrap vetting-grid">
            <div>
              <span className="eyebrow">A calmer way to choose</span>
              <h2 className="section-title">Know what you are looking at before you book.</h2>
              <p className="section-copy">
                The goal of the directory is simple: make it easier to compare
                teachers without making you fight through a maze of forms.
              </p>
            </div>

            <div className="vetting-list">
              {vetting.map(([number, title, copy]) => (
                <div className="vetting-item" key={number}>
                  <div className="vetting-number">{number}</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Three simple steps</span>
              <h2 className="section-title">From “I need help” to “let&apos;s start”.</h2>
            </div>

            <div className="steps">
              {[
                ["01", "Tell us what you need", "Share the subject, goal, level and timing that matter to you."],
                ["02", "Compare tutor profiles", "Review current profiles, subjects, rates and the tutor's approach."],
                ["03", "Book with confidence", "Ask questions, confirm the fit and then move into a session."],
              ].map(([number, title, copy]) => (
                <article className="step" key={number}>
                  <div className="step-number">{number}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Student stories</span>
              <h2 className="section-title">Keep the proof human.</h2>
              <p className="section-copy">
                Real experiences should explain the value without turning the
                homepage into a wall of marketing claims.
              </p>
            </div>

            <div className="testimonials">
              {testimonials.map((item) => (
                <article className="testimonial" key={item.name}>
                  <div className="testimonial-score">{item.score}</div>
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <div className="testimonial-author">
                    <div className="avatar" aria-hidden="true">{item.initials}</div>
                    <div>
                      <div className="author-name">{item.name}</div>
                      <div className="author-role">{item.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="wrap" style={{ maxWidth: 800 }}>
            <div className="section-head">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title">The useful answers, up front.</h2>
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <div className="faq-item" key={item.q}>
                  <div className="faq-q">{item.q}</div>
                  <p className="faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="wrap">
            <div className="final-cta-inner">
              <h2>Take the first step without overthinking it.</h2>
              <p>
                Browse current tutor profiles, see what fits your goal and decide
                from there.
              </p>
              <div className="final-cta-actions">
                <Link className="btn btn-light" href="/tutors">Browse tutors</Link>
                <Link className="btn btn-ghost-light" href="/register?role=tutor">Become a tutor</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
            ],
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
    </div>
  );
}
