import type { Metadata } from "next";
import Link from "next/link";
import { homepageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "English preparation & tutor directory",
  description:
    "Find tutors for IELTS, TOEFL, and Spoken English. Browse tutor profiles and compare subjects, rates, and teaching approaches.",
  openGraph: {
    title: "English preparation & tutor directory",
    description:
      "Find tutors for IELTS, TOEFL, and Spoken English. Browse profiles and compare subjects, rates, and teaching approaches.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in",
    images: [{ url: "https://bookateacher.in/og-social.png", width: 1200, height: 630, alt: "BookATeacher — English tutor directory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "English preparation & tutor directory",
    description: "Find tutors for IELTS, TOEFL, and Spoken English.",
    images: ["https://bookateacher.in/og-social.png"],
  },
  alternates: { canonical: "https://bookateacher.in" },
};

const faqs = [
  {
    q: "Can I browse without creating an account?",
    a: "Yes. Tutor profiles are publicly browsable, so you can compare the available options before signing up.",
  },
  {
    q: "How much does tutoring cost?",
    a: "Rates vary by tutor, subject, and experience. Review the rate shown on a tutor's profile before you contact them.",
  },
  {
    q: "What if I don't see a suitable tutor?",
    a: "Tutor availability depends on current listings. Contact us and tell us what subject and schedule you need.",
  },
];

const subjects = [
  { value: "ielts", label: "IELTS", detail: "Test strategy, section practice, and feedback" },
  { value: "toefl", label: "TOEFL", detail: "Format-focused practice for the TOEFL test" },
  { value: "spoken-english", label: "Spoken English", detail: "Fluency, pronunciation, and confidence" },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero">
          <div className="wrap home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-overline">English tutoring, made easier to choose</p>
              <h1>Find the right help for <span>your next step.</span></h1>
              <p className="home-intro">
                Compare tutors for IELTS, TOEFL, and Spoken English by what they teach,
                how they work, and what they charge.
              </p>
              <form className="tutor-search" action="/tutors" method="get">
                <label htmlFor="home-subject">What do you want to work on?</label>
                <div className="tutor-search-row">
                  <select id="home-subject" name="subject" defaultValue="">
                    <option value="">All subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>{subject.label}</option>
                    ))}
                  </select>
                  <button className="btn btn-primary" type="submit">
                    Find tutors <span aria-hidden="true">→</span>
                  </button>
                </div>
                <p className="tutor-search-note">Browse public profiles first. No account needed.</p>
              </form>
            </div>
            <aside className="home-subject-panel" aria-label="Browse by learning goal">
              <p className="home-panel-label">Choose your focus</p>
              <ul>
                {subjects.map((subject) => (
                  <li key={subject.value}>
                    <Link href={`/tutors?subject=${subject.value}`}>
                      <span><strong>{subject.label}</strong><small>{subject.detail}</small></span>
                      <span className="home-subject-arrow" aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="home-panel-foot">Start with a subject. Compare tutors at your own pace.</p>
            </aside>
          </div>
        </section>

        <section className="home-how" aria-labelledby="home-how-heading">
          <div className="wrap home-how-wrap">
            <div className="home-how-heading">
              <h2 id="home-how-heading">A clearer way to choose.</h2>
              <p>See what matters before you decide who to contact.</p>
            </div>
            <ol className="home-steps">
              <li><span>01</span><div><strong>Pick your goal</strong><p>Choose an exam or the kind of English support you need.</p></div></li>
              <li><span>02</span><div><strong>Compare profiles</strong><p>Review each tutor's subjects, approach, experience, and rate.</p></div></li>
              <li><span>03</span><div><strong>Decide when ready</strong><p>Browse first. Create an account when you want to take the next step.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="home-faq" aria-labelledby="home-faq-heading">
          <div className="wrap home-faq-wrap">
            <div>
              <p className="home-overline">Before you start</p>
              <h2 id="home-faq-heading">Good to know.</h2>
            </div>
            <div className="home-faq-list">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="home-bottom-cta">
          <div className="wrap home-bottom-cta-inner">
            <div><h2>Ready to find your tutor?</h2><p>Browse current profiles and see who fits your goal.</p></div>
            <Link className="btn btn-light" href="/tutors">Browse tutors <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homepageJsonLd() }} />
    </div>
  );
}
