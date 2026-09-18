import { SUBJECT_LABELS, SUBJECT_DESCRIPTIONS } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 3.373-1.204 6.994-3.04 9-5.408V9c0-.489-.012-.97-.025-1.4-.074-.672.216-1.926.79-2.895.098-.14.173-.282.222-.436H12v.188c0 .243.092.445.222.436.574.969.79 2.223.79 2.895.013.43.025.92.025 1.4 0 2.466-2.11 4.39-4.79 4.911m0 3a8.001 8.001 0 100-16 8.001 8.001 0 000 16z" />
      </svg>
    ),
    title: "Verified tutors",
    desc: "Every tutor is vetted. Credentials checked. Background verified. No random profiles.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast matching",
    desc: "Submit your requirements. We match you within 24 hours. No waiting weeks for a response.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 7v2m0 0v2m0-2h2m-2 0H7" />
      </svg>
    ),
    title: "Personal matchmaking",
    desc: "A real person reviews your requirements and matches you with the right tutor. Not an algorithm.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 5v2m0 0v2m0-2h2m-2 0H9" />
      </svg>
    ),
    title: "Transparent pricing",
    desc: "Know what you pay before you book. No hidden fees. No surprise charges. What you see is what you pay.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us what you need",
    desc: "Fill a short form — subject, goal, budget, preferred times. Takes under 2 minutes.",
  },
  {
    step: "02",
    title: "We match you personally",
    desc: "A real person reviews your requirements and pairs you with the best-fit verified tutor.",
  },
  {
    step: "03",
    title: "Book your session",
    desc: "Chat with your tutor directly, confirm the time, and book. Payment is simple — UPI, cards.",
  },
  {
    step: "04",
    title: "Learn and improve",
    desc: "Live 1-on-1 sessions. Mock tests. Personal feedback. Track your progress toward your goal.",
  },
];

const FEATURES = [
  {
    title: "Certified IELTS tutors",
    desc: "Ex-IDP, British Council-trained, band 8+ scorers. Professionals who know the test inside out.",
  },
  {
    title: "TOEFL specialists",
    desc: "Tutors who understand the TOEFL format, scoring, and strategies for each section.",
  },
  {
    title: "Spoken English coaching",
    desc: "Fluency, pronunciation, confidence. Sessions designed around real conversation, not scripts.",
  },
  {
    title: "Mock tests & feedback",
    desc: "Practice under real conditions. Detailed feedback on every section. Know exactly where you stand.",
  },
  {
    title: "Personalized study plans",
    desc: "No cookie-cutter approach. Your tutor builds a plan around your target score, timeline, and weak areas.",
  },
  {
    title: "Online & offline options",
    desc: "Learn from home via video call, or find a tutor in your city. You choose what works.",
  },
];

const STATS = [
  { value: "500+", label: "Students matched" },
  { value: "50+", label: "Verified tutors" },
  { value: "4.8★", label: "Average rating" },
  { value: "92%", label: "Satisfaction rate" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          >
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 11h16M8 16h12M8 21h8"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>
              bookateacher
              <span className="text-sm text-foreground-subtle font-normal">.in</span>
            </span>
          </a >

          <nav className="hidden md:flex items-center gap-8">
            <a href="#subjects" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Subjects
            </a>
            <a href="#how-it-works" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#features" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#trust" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Trust
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden sm:inline-flex text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Sign in
            </a>
            <a
              href="/register?role=tutor"
              className="hidden sm:inline-flex text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              For tutors
            </a>
            <a
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Find a tutor
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-soft opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent-soft opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-soft opacity-[0.03] blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              India&apos;s trusted tutor network
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Find a{" "}
              <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                verified tutor
              </span>{" "}
              for IELTS, TOEFL &{" "}
              <br className="sm:hidden" />
              Spoken English
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed max-w-2xl mx-auto mb-10">
              Connect with certified tutors for live 1-on-1 coaching, mock tests,
              and personal feedback. Book a session in minutes. Improve your score.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/register" className="btn btn-primary btn-lg px-8">
                Find a tutor
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/register?role=tutor" className="btn btn-secondary btn-lg px-8">
                I&apos;m a tutor
              </a>
            </div>

            {/* Search bar — primary conversion element */}
            <div className="max-w-xl mx-auto">
              <div className="card p-2">
                <form
                  className="flex items-center gap-2 px-3 py-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <svg className="w-5 h-5 text-foreground-subtle flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="What do you want to learn? e.g. IELTS, spoken English..."
                    className="flex-1 bg-transparent border-0 text-sm text-foreground placeholder-foreground-subtle focus:outline-none focus:ring-0 py-2"
                    aria-label="What do you want to learn?"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm px-4"
                    disabled
                  >
                    Search
                  </button>
                </form>
                <div className="flex flex-wrap gap-2 px-3 pb-2 pt-1">
                  {["IELTS", "TOEFL", "Spoken English", "GRE", "GMAT"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="text-xs px-2.5 py-1 rounded-full bg-bg-secondary text-foreground-muted hover:text-foreground hover:bg-border-strong transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-foreground-subtle text-center mt-3">
                Browse verified tutors in these subjects — no sign-up required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-10 border-y border-border bg-bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section id="subjects" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Subjects we cover
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto">
              From IELTS to spoken English, our tutors help you achieve your goals
              with personalized, live coaching.
            </p>
          </div>

          <div className="card-grid">
            {Object.entries(SUBJECT_LABELS).map(([slug, label]) => (
              <a
                key={slug}
                href={`/subjects/${slug}`}
                className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="badge bg-accent-soft text-accent">Popular</span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-accent transition-colors">
                  {label}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {SUBJECT_DESCRIPTIONS[slug]}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm text-accent group-hover:translate-x-1 transition-transform">
                  Find tutors
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 bg-bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              How it works
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto">
              Four simple steps from finding a tutor to improving your score.
              No complex sign-ups. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative">
                {item.step !== "01" && (
                  <div className="hidden md:block absolute top-4 left-0 w-8 h-px bg-border-strong" />
                )}
                <div className="card p-5 text-center h-full">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Why bookateacher.in
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto">
              We&apos;re different from the platforms you&apos;ve tried. Here&apos;s why.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card p-5 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section id="trust" className="py-20 bg-bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Built on trust
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto">
              Every decision we make puts trust first — for students, for tutors, for the quality of education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-12">
            <h3 className="text-center font-semibold text-foreground mb-8">
              What students and tutors say
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "I was stuck at Band 6.5 for months. My tutor at bookateacher.in gave me targeted feedback on my writing and speaking. Went to 7.5 in 6 weeks.",
                  name: "Priya M.",
                  role: "IELTS student — Band 7.5",
                  avatar: "PM",
                },
                {
                  quote: "As a tutor, this platform is refreshing. I actually get leads that convert. The students are serious. I&apos;ve built a steady pipeline here.",
                  name: "Rahul K.",
                  role: "IELTS tutor — 8 years experience",
                  avatar: "RK",
                },
                {
                  quote: "I needed a TOEFL tutor quickly before my test date. bookateacher.in matched me within 24 hours. The tutor was excellent and I got my target score.",
                  name: "Ananya S.",
                  role: "TOEFL student — 105/120",
                  avatar: "AS",
                },
              ].map((t) => (
                <div key={t.name} className="card p-5">
                  <div className="flex items-center gap-1 text-accent mb-3">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent-soft flex items-center justify-center text-xs font-semibold text-accent">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-foreground-subtle">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="container">
          <div className="card p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent-soft opacity-40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-soft opacity-20 blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Ready to improve your score?
              </h2>
              <p className="text-foreground-muted max-w-md mx-auto mb-8">
                Join hundreds of students who&apos;ve found their perfect tutor on
                bookateacher.in. Start with a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/register" className="btn btn-primary btn-lg px-8">
                  Find a tutor now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="/register?role=tutor" className="btn btn-secondary btn-lg px-8">
                  Become a tutor
                </a>
              </div>
              <p className="text-xs text-foreground-subtle mt-4">
                No commitment. No hidden fees. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-bg-secondary/30 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 11h16M8 16h12M8 21h8"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>
              bookateacher
              <span className="text-sm font-normal text-foreground-subtle">.in</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-foreground-muted">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
