import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { SUBJECT_LABELS, SUBJECT_DESCRIPTIONS } from "@/lib/utils";

// ── Social proof counters ──
const STATS = [
  { value: "500+", label: "Students matched" },
  { value: "50+", label: "Verified tutors" },
  { value: "4.8★", label: "Average rating" },
  { value: "92%", label: "Would recommend" },
];

// ── Trust items (icon + short headline + one-line proof) ──
const TRUST_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 3.373-1.204 6.994-3.04 9-5.408V9c0-.489-.012-.97-.025-1.4-.074-.672.216-1.926.79-2.895.098-.14.173-.282.222-.436H12v.188c0 .243.092.445.222.436.574.969.79 2.223.79 2.895.013.43.025.92.025 1.4 0 2.466-2.11 4.39-4.79 4.911m0 3a8.001 8.001 0 100-16 8.001 8.001 0 000 16z" />
      </svg>
    ),
    title: "Verified tutors",
    desc: "Every tutor vetted — credentials checked, background verified, no random profiles.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast matching",
    desc: "Submit your requirements. We match you within 24 hours — not weeks.",
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
    title: "Human matchmaking",
    desc: "A real person reviews your needs and pairs you with the right tutor. Not an algorithm.",
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
    desc: "Know what you pay before you book. No hidden fees, no surprise charges.",
  },
];

// ── Testimonials ──
const TESTIMONIALS = [
  {
    quote: "I was stuck at Band 6.5 for months. My tutor gave me targeted feedback on writing and speaking. Went to 7.5 in 6 weeks.",
    name: "Priya M.",
    role: "IELTS student — Band 7.5",
    initials: "PM",
  },
  {
    quote: "As a tutor, this platform is refreshing. I actually get leads that convert. Built a steady pipeline here.",
    name: "Rahul K.",
    role: "IELTS tutor — 8 years",
    initials: "RK",
  },
  {
    quote: "Needed a TOEFL tutor fast before my test date. Matched within 24 hours. Got my target score.",
    name: "Ananya S.",
    role: "TOEFL student — 105/120",
    initials: "AS",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link
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
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <a href="#subjects" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Subjects
            </a>
            <a href="#how-it-works" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#reviews" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register?role=tutor"
              className="hidden sm:inline-flex text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              For tutors
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Find a tutor
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ──
          Rebuilt as a tight two-column unit:
          - Left: eyebrow + headline + subhead + primary CTA + search pill
          - Right: a dark card with the "how it works in 30s" value stack +
            a micro testimonial pull quote for credibility
      ── */}
      <section className="relative overflow-hidden pt-20 pb-24">
        {/* Background: one soft radial, kept quiet */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-soft opacity-40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent-soft opacity-20 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — the pitch */}
            <div className=" stagger-children">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold tracking-wide uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                India&apos;s trusted tutor network
              </div>

              {/* Headline — tighter, flatter, no gradient-on-text crutch */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] mb-5">
                Find a tutor who
                <br />
                <span className="text-accent">gets your goal</span>
              </h1>

              {/* Subhead — one breath, no filler */}
              <p className="text-lg text-foreground-muted leading-relaxed max-w-xl mb-8">
                Certified IELTS, TOEFL &amp; spoken English tutors. Live 1-on-1 coaching,
                mock tests, and personal feedback. Book a session today — improve your score.
              </p>

              {/* Primary CTA — single clear action */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <Link href="/register" className="btn btn-primary btn-lg px-8">
                  Find a tutor
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/register?role=tutor" className="btn btn-secondary btn-lg px-8">
                  I&apos;m a tutor
                </Link>
              </div>

              {/* Search pill — compact, right on the hero, no separate card */}
              <div className="max-w-md">
                <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-xl p-1.5 shadow-sm">
                  <SearchForm />
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {["IELTS", "TOEFL", "Spoken English"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="text-xs px-2 py-0.5 rounded-full bg-white text-foreground-muted border border-border hover:text-foreground hover:border-foreground-subtle transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-foreground-subtle text-center mt-3">
                  Browse verified tutors — no sign-up required
                </p>
              </div>
            </div>

            {/* Right column — dark card: fast value stack + punchy testimonial */}
            <div className="relative">
              <div className="bg-bg-inverse text-bg-primary rounded-2xl p-6 sm:p-8 shadow-lg border border-border-strong">
                {/* Small label inside the dark card */}
                <div className="text-accent text-xs font-semibold tracking-wide uppercase mb-4">
                  How it works
                </div>

                {/* 3-step compact stack */}
                <ol className="space-y-4 mb-8">
                  {[
                    { n: "01", t: "Tell us what you need", d: "Subject, goal, budget, preferred times. Under 2 minutes." },
                    { n: "02", t: "We match you personally", d: "A real person pairs you with the best-fit verified tutor." },
                    { n: "03", t: "Book & learn", d: "Chat with your tutor, confirm the time, and book. UPI, cards." },
                  ].map((item) => (
                    <li key={item.n} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                        {item.n}
                      </span>
                      <div>
                        <div className="font-medium text-sm mb-0.5">{item.t}</div>
                        <div className="text-xs text-foreground-muted leading-relaxed">{item.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Micro testimonial pull quote — adds social proof without a whole section */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center gap-1 text-accent mb-2">
                    {"★★★★★"}
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    &ldquo;Matched within 24 hours. Got my target score.&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-semibold">
                      AS
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-white/90">Ananya S.</div>
                      <div className="text-foreground-subtle">TOEFL — 105/120</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar — kept but flatter: one line, no separate container per stat ── */}
      <section className="py-8 border-y border-border bg-bg-secondary/30">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects — single tight row of pills/links, not a grid of cards ──
          Reason: subject tiles read as filler. A subject strip is scannable and
          converts as a secondary nav into subject pages. */}
      <section id="subjects" className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Subjects we cover
            </h2>
            <p className="text-foreground-muted max-w-lg mx-auto">
              From IELTS to spoken English — personalized, live coaching.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(SUBJECT_LABELS).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/subjects/${slug}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border text-sm font-medium text-foreground hover:bg-accent hover:text-accent-fg hover:border-accent transition-all"
              >
                <span>{label}</span>
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works — kept but as a compact timeline, not 4 cards with big numbers ── */}
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

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { step: "01", title: "Tell us what you need", desc: "Fill a short form — subject, goal, budget, preferred times. Takes under 2 minutes." },
              { step: "02", title: "We match you personally", desc: "A real person reviews your requirements and pairs you with the best-fit verified tutor." },
              { step: "03", title: "Book your session", desc: "Chat with your tutor directly, confirm the time, and book. Payment is simple — UPI, cards." },
              { step: "04", title: "Learn and improve", desc: "Live 1-on-1 sessions. Mock tests. Personal feedback. Track your progress toward your goal." },
            ].map((item, i) => (
              <div key={item.step} className="relative pl-6 border-l-2 border-border-strong">
                <span className="absolute -left-[0.75rem] top-0 w-5 h-5 rounded-full border-2 border-border-strong bg-bg-primary flex items-center justify-center text-xs font-semibold text-foreground-muted">
                  {item.step}
                </span>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why bookateacher.in — flat 2×3 feature grid, not cards with icons inside boxes ──
          Each feature: title + one line. Visual noise dropped. */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Certified IELTS tutors", desc: "Ex-IDP, British Council-trained, band 8+ scorers. Know the test inside out." },
              { title: "TOEFL specialists", desc: "Tutors who understand the TOEFL format, scoring, and section strategies." },
              { title: "Spoken English coaching", desc: "Fluency, pronunciation, confidence — real conversation, not scripts." },
              { title: "Mock tests & feedback", desc: "Practice under real conditions. Detailed feedback on every section." },
              { title: "Personalized study plans", desc: "No cookie-cutter approach. Your tutor builds a plan around your score, timeline, weak areas." },
              { title: "Online & offline options", desc: "Learn from home via video call, or find a tutor in your city. Your choice." },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-0.5">{f.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust — kept as a compact grid of 4, not cards with icons inside boxes.
          Labels only; no decorative icon boxes. */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent-soft flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — kept but compact: 3 across, no big card padding.
          The dark card in the hero already carries one testimonial; this is the fuller set. */}
      <section id="reviews" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              What students and tutors say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="flex items-center gap-1 text-accent mb-3 text-sm">
                  {"★★★★★"}
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-soft flex items-center justify-center text-xs font-semibold text-accent">
                    {t.initials}
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
      </section>

      {/* ── CTA — tighter, one strong panel, no over-decorated blue blob card ── */}
      <section className="py-20">
        <div className="container">
          <div className="bg-accent text-accent-fg rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to improve your score?
            </h2>
            <p className="text-accent-soft max-w-md mx-auto mb-8 leading-relaxed">
              Join hundreds of students who&apos;ve found their perfect tutor on
              bookateacher.in. Start with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-accent-fg text-accent hover:bg-accent-hover px-7 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                Find a tutor now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/register?role=tutor" className="bg-accent-fg/10 text-accent-fg border border-accent-fg/20 hover:bg-accent-fg/20 px-7 py-3 rounded-lg font-medium transition-colors">
                Become a tutor
              </Link>
            </div>
            <p className="text-accent-soft/70 text-xs mt-4">
              No commitment. No hidden fees. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer — kept minimal and real ── */}
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
