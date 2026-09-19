import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
  description: "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, personal feedback. Book a session today.",
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const RED = "#B23A2E";
const GREEN = "#2F5233";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

import BandScoreTool from "@/components/BandScoreTool";

const VETTING_STEPS = [
  "Credential check — degree, certification, ID verified",
  "Teaching demo — 30-min sample session reviewed before approval",
  "Background check — identity and reference verification",
  "Minimum 2 years teaching experience for test-prep subjects",
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: PAPER, color: INK }}>
      {/* ── Navigation ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: `rgba(${hexToRgb(PAPER)}, 0.92)`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${LINE}` }}>
        <div className="nav-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 24, width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 8, color: INK }}>
            <span style={{ width: 26, height: 26, background: INK, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2" strokeLinecap="round" /></svg>
            </span>
            <span style={{ color: INK }}>bookateacher<span style={{ color: MUTED, fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}>.in</span></span>
          </Link>
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <a href="#for" style={{ fontSize: "0.875rem", color: INK_SOFT, transition: "color 0.15s" }}>Who it's for</a>
            <a href="#how" style={{ fontSize: "0.875rem", color: INK_SOFT, transition: "color 0.15s" }}>How it works</a>
            <a href="#reviews" style={{ fontSize: "0.875rem", color: INK_SOFT, transition: "color 0.15s" }}>Results</a>
          </nav>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href="/login" style={{ fontSize: "0.875rem", color: INK_SOFT, transition: "color 0.15s" }}>Sign in</Link>
            <Link href="/register" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 20px", borderRadius: 6, fontSize: "0.875rem", fontWeight: 500, background: INK, color: PAPER, transition: "all 0.15s", whiteSpace: "nowrap", textDecoration: "none" }}>
              Find a tutor
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero — centered, single column ── */}
        <section style={{ padding: "80px 0 56px", textAlign: "center" }}>
          <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: RED, marginBottom: 20 }}>
              <span style={{ display: "block", width: 28, height: 1.5, background: RED, margin: "0 auto 8px" }}></span>
              IELTS · TOEFL · Spoken English
            </div>
            <h1 style={{ fontSize: "clamp(2.75rem, 4.5vw, 4rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: 20, fontFamily: "'Playfair Display', Georgia, serif" }}>
              From <em style={{ fontStyle: "italic", color: RED, fontWeight: 400 }}>6.5</em> to 7.5.<br />In six weeks.
            </h1>
            <p style={{ fontSize: "1.125rem", color: INK_SOFT, lineHeight: 1.65, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
              Certified tutors for high-stakes English tests. Live 1-on-1 coaching,
              mock tests under real test conditions, and feedback that targets exactly what's
              keeping your score down. Book a session. Move your score.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
              <Link href="/register" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 24px", borderRadius: 6, fontSize: "0.9375rem", fontWeight: 500, background: INK, color: PAPER, transition: "all 0.15s", whiteSpace: "nowrap", textDecoration: "none", cursor: "pointer", border: "none", fontFamily: "inherit" }}>
                Find a tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/register?role=tutor" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 6, fontSize: "0.9375rem", fontWeight: 500, background: "transparent", color: INK, border: `1px solid ${LINE}`, transition: "all 0.15s", whiteSpace: "nowrap", textDecoration: "none", cursor: "pointer", fontFamily: "inherit" }}>
                I'm a tutor
              </Link>
            </div>
            <p style={{ fontSize: "0.875rem", color: MUTED, marginTop: 4 }}>Browse verified tutors — no sign-up required.</p>
          </div>

          {/* ── Band score diagram — centered ── */}
          <div style={{ background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: 14, padding: 32, maxWidth: 720, margin: "40px auto 0", width: "100%" }}>
            <BandScoreTool />
          </div>
        </section>

        {/* ── Proof strip ── */}
        <section style={{ padding: "36px 0", background: INK, color: PAPER }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: 0, borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
              <div style={{ flex: 1, padding: "0 28px", borderRight: `1px solid rgba(255,255,255,0.1)`, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: PAPER }}>
                  6.5<span style={{ color: RED, fontSize: "1rem", fontWeight: 400 }}>→7.5</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(250,247,240,0.6)", marginTop: 6, lineHeight: 1.5 }}>Average IELTS improvement for our students</div>
              </div>
              <div style={{ flex: 1, padding: "0 28px", borderRight: `1px solid rgba(255,255,255,0.1)`, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: PAPER }}>
                  24<span style={{ color: RED, fontSize: "1rem", fontWeight: 400 }}>h</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(250,247,240,0.6)", marginTop: 6, lineHeight: 1.5 }}>We match you within 24 hours of your request</div>
              </div>
              <div style={{ flex: 1, padding: "0 28px", borderRight: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: PAPER }}>
                  100<span style={{ color: RED, fontSize: "1rem", fontWeight: 400 }}>%</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(250,247,240,0.6)", marginTop: 6, lineHeight: 1.5 }}>Every tutor vetted — credentials, background, test experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who this is for ── */}
        <section id="for" style={{ padding: "72px 0" }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(1.875rem, 2.8vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>This is for people at a deadline.</h2>
              <p style={{ fontSize: "1.0625rem", color: INK_SOFT, maxWidth: 540, lineHeight: 1.65, margin: "0 auto" }}>Not for casual learners. For students whose visa, university place, or career plan depends on a score they don't have yet.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: LINE, border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
              {[
                { tag: "IELTS · University admission", title: "You need Band 7+ and you're stuck at 6.5", desc: "Writing and speaking feedback that targets exactly what's keeping your score down — not generic practice.", claim: "6.5 → 7.5", claimSub: "in 6 weeks, on average" },
                { tag: "TOEFL · US university apps", title: "Your test date is weeks away and you're not ready", desc: "Tutors who know the TOEFL format section by section. Strategy for each question type. Mock tests under timed conditions.", claim: "Matched within 24 hours", claimSub: "of your request" },
                { tag: "Spoken English · Confidence", title: "You understand English. You just can't speak it.", desc: "Sessions built around real conversation — not scripts. Pronunciation, fluency, the exact words you need for your situation.", claim: "Live 1-on-1", claimSub: "in India and online" },
                { tag: "Retake · Stuck at the same score", title: "You've taken the test twice. Same score.", desc: "A fresh tutor with a fresh eye on your answers. The things you've stopped noticing — they spot immediately.", claim: "7.0 → 8.0", claimSub: "reported by retake students" },
              ].map((p) => (
                <div key={p.tag} style={{ background: PAPER, padding: 32, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: INK, marginBottom: 8 }}>{p.tag}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.2, fontFamily: "'Playfair Display', Georgia, serif" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.65 }}>{p.desc}</p>
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: GREEN, fontWeight: 500 }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.125rem", color: RED, letterSpacing: "-0.02em" }}>{p.claim}</span>
                    <span>{p.claimSub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How we vet tutors — specific, not vague ── */}
        <section style={{ padding: "56px 0", background: PAPER_2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
              {VETTING_STEPS.map((step, i) => (
                <div key={i}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: PAPER, border: `1.5px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: RED }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: INK, marginBottom: 4, lineHeight: 1.3 }}>
                    {step.split(" — ")[0]}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: INK_SOFT, lineHeight: 1.5 }}>
                    {step.split(" — ")[1]}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "center", marginTop: 24, borderTop: `1px solid ${LINE}`, paddingTop: 16, width: "100%", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Every tutor on bookateacher.in has passed all four. No profiles without the full vetting — if we haven't checked all four boxes, they're not on the platform.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ padding: "72px 0" }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(1.875rem, 2.8vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>Questions people actually ask.</h2>
              <p style={{ fontSize: "1.0625rem", color: INK_SOFT, maxWidth: 540, lineHeight: 1.65, margin: "0 auto" }}>If you're at a deadline, these are probably the things worrying you right now.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { q: "What if I don't get matched with someone good?", a: "You can reject your first match for free — no questions, no wait. We'll send another within 24 hours. If your first session doesn't feel right, message us and we'll re-match you. You're not locked into anyone." },
                { q: "What's your refund policy if I don't like the first session?", a: "If you don't feel the session was worth it, we refund the session fee in full — including any trial session fee, if applicable. Email us within 48 hours. Most students stay after the first session, but the option is there." },
                { q: "How fast can you match me if my test is in 10 days?", a: "We match within 24 hours even on short timelines — we keep a pool of available tutors for exactly this. But be realistic: 10 days is enough for targeted strategy and final polish, not a full overhaul. Tell us your test date upfront and we'll suggest a realistic plan." },
                { q: "How much does it cost?", a: "Tutor rates vary by experience and subject — typically ₹800–₹2,500 per hour for test prep. You see the rate before you book. No hidden fees, no platform commission on the tutor side (at launch). Trial sessions are often free or discounted — check the tutor's profile." },
                { q: "Can I chat with a tutor before booking?", a: "Yes — every tutor profile has a message button. Send a short intro, ask about their approach, and see if it's a fit before you pay. Most tutors reply within a few hours." },
                { q: "What if my English is very basic — is this still for me?", a: "If you're below Band 4, we'll be honest: 1:1 test-prep coaching works best from Band 5+ where there's a foundation to build on. For absolute beginners, we can suggest general English tutors first. Tell us your current level in the form and we'll guide you." },
              ].map(({ q, a }, i) => (
                <div key={q} style={{ borderBottom: `1px solid ${LINE}` }}>
                  <div style={{ padding: "20px 0", borderBottom: i < 5 ? `1px solid ${LINE}` : "none" }}>
                    <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: INK, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>
                      {q}
                    </div>
                    <div style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.6, paddingLeft: 16, borderLeft: `2px solid ${LINE}` }}>
                      {a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="how" style={{ padding: "72px 0", background: PAPER_2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(1.875rem, 2.8vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>Three steps from "I need a tutor" to "I've booked a session."</h2>
              <p style={{ fontSize: "1.0625rem", color: INK_SOFT, maxWidth: 540, lineHeight: 1.65, margin: "0 auto" }}>No long sign-up forms. No waiting weeks for a response. No hidden fees.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
              {[
                { n: "01", title: "Tell us what you need", desc: "Subject, target score, test date, budget, preferred times. Takes under two minutes. Fill it out now — no sign-up required." },
                { n: "02", title: "A real person matches you", desc: "Not an algorithm. A human reviews your requirements and pairs you with the best-fit verified tutor — within 24 hours." },
                { n: "03", title: "Book and start", desc: "Chat with your tutor directly, confirm the time, and book. Payment is simple — UPI, cards. First session is where the real work starts." },
              ].map((s) => (
                <div key={s.n} style={{ position: "relative", paddingLeft: 24, borderLeft: `2px solid ${LINE}`, paddingTop: 4 }}>
                  <span style={{ position: "absolute", left: -12, top: 0, width: 22, height: 22, background: PAPER_2, border: `1.5px solid ${LINE}`, borderRadius: "50%", fontSize: "0.6875rem", fontWeight: 600, color: INK_SOFT, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>{s.n}</span>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, color: INK }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="reviews" style={{ padding: "72px 0" }}>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(1.875rem, 2.8vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>What the score actually did.</h2>
              <p style={{ fontSize: "1.0625rem", color: INK_SOFT, maxWidth: 540, lineHeight: 1.65, margin: "0 auto" }}>Real students. Real score changes. Names and results we can stand behind.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { deltaFrom: "6.5", deltaTo: "7.5", test: "Stuck at Band 6.5 for months. My tutor gave me targeted feedback on writing and speaking — the two things holding me back. Went to 7.5 in six weeks.", name: "Priya M.", role: "IELTS — Band 7.5 · 6 weeks", initials: "PM" },
                { deltaFrom: "TOEFL", deltaTo: "105", test: "Needed a TOEFL tutor fast before my test date. Matched within 24 hours. The tutor was excellent and I got my target score.", name: "Ananya S.", role: "TOEFL — 105/120 · matched in 24h", initials: "AS", isTOEFL: true },
                { deltaFrom: "Tutoring", deltaTo: "Steady", test: "As a tutor, this platform is refreshing. I actually get leads that convert. The students are serious. I've built a steady pipeline here — not just a list of profiles.", name: "Rahul K.", role: "IELTS tutor · 8 years experience", initials: "RK", isTutor: true },
              ].map((r) => (
                <div key={r.name} style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.1, color: INK, textAlign: "center" }}>
                    {r.isTOEFL ? (
                      <><span style={{ fontSize: "1.125rem", fontWeight: 400, color: INK_SOFT }}>TOEFL</span><span style={{ color: RED, fontWeight: 300, margin: "0 4px", fontSize: "1.5rem" }}>·</span><span style={{ fontSize: "1.5rem", color: RED }}>105</span></>
                    ) : r.isTutor ? (
                      <><span style={{ fontSize: "1.25rem", color: INK_SOFT, fontWeight: 500 }}>Tutoring</span><span style={{ color: RED, fontWeight: 300, margin: "0 4px", fontSize: "1.5rem" }}>·</span><span style={{ fontSize: "1.25rem", color: RED }}>Steady</span></>
                    ) : (
                      <><span style={{ color: INK_SOFT, fontWeight: 400 }}>{r.deltaFrom}</span><span style={{ color: RED, fontWeight: 300, margin: "0 4px", fontSize: "1.5rem" }}>→</span><span style={{ color: RED }}>{r.deltaTo}</span></>
                    )}
                  </div>
                  <div style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.6, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", borderLeft: `2px solid ${LINE}`, paddingLeft: 14 }}>{r.test}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, paddingTop: 0 }}>
                    <div style={{ width: 32, height: 32, background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 600, color: INK, flexShrink: 0, fontFamily: "Inter, sans-serif" }}>{r.initials}</div>
                    <div>
                      <div style={{ fontSize: "0.9375rem", fontWeight: 500, color: INK, fontFamily: "Inter, sans-serif" }}>{r.name}</div>
                      <div style={{ fontSize: "0.8125rem", color: MUTED, marginTop: 1, fontFamily: "Inter, sans-serif" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: INK, color: PAPER, padding: "72px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "rgba(178,58,46,0.15)", borderRadius: "50%", pointerEvents: "none" }}></div>
          <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.035em", marginBottom: 14, color: PAPER, lineHeight: 1.15, fontFamily: "'Playfair Display', Georgia, serif" }}>Your score isn't going to move by itself.</h2>
            <p style={{ fontSize: "1.0625rem", color: "rgba(250,247,240,0.6)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.65 }}>A verified tutor. A real plan. A session booked today. That's what changes a number on a score report — and the university offer that depends on it.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" className="btn-white" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px 28px", borderRadius: 6, fontSize: "0.9375rem", fontWeight: 600, background: PAPER, color: INK, textDecoration: "none", cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.15s" }}>
                Find a tutor now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/register?role=tutor" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 28px", borderRadius: 6, fontSize: "0.9375rem", fontWeight: 500, background: "transparent", color: PAPER, border: `1px solid rgba(250,247,240,0.25)`, textDecoration: "none", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                Become a tutor
              </Link>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "rgba(250,247,240,0.4)", marginTop: 20 }}>No commitment. No hidden fees. Cancel anytime.</p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "32px 0", background: PAPER_2 }}>
        <div className="wrap" style={{ width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.125rem", display: "flex", alignItems: "center", gap: 8, color: INK }}>
            <span style={{ width: 26, height: 26, background: INK, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2" strokeLinecap="round" /></svg>
            </span>
            <span style={{ color: INK }}>bookateacher<span style={{ color: MUTED, fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}>.in</span></span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <a href="#" style={{ fontSize: "0.875rem", color: INK_SOFT }}>Privacy</a>
            <a href="#" style={{ fontSize: "0.875rem", color: INK_SOFT }}>Terms</a>
            <a href="#" style={{ fontSize: "0.875rem", color: INK_SOFT }}>Contact</a>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right" }}>© 2026 bookateacher.in — Made in India</p>
        </div>
      </footer>

      {/* ── Motion ── */}
      <style>{`
        @keyframes slide-right { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
