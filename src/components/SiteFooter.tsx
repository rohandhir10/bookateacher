import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="bookateacher.in home">
              <span className="brand-mark" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h11M4 17h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
              </span>
              <span className="brand-word">bookateacher<span>.in</span></span>
            </Link>
            <p>One-to-one English tutoring for students who want a clearer path from goal to progress.</p>
          </div>

          <div className="footer-column">
            <h2>Learn</h2>
            <Link href="/subjects">All subjects</Link>
            <Link href="/subjects/ielts">IELTS</Link>
            <Link href="/subjects/toefl">TOEFL</Link>
            <Link href="/subjects/spoken-english">Spoken English</Link>
          </div>

          <div className="footer-column">
            <h2>Platform</h2>
            <Link href="/tutors">Find a tutor</Link>
            <Link href="/register?role=tutor">Teach on BookATeacher</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h2>Account &amp; legal</h2>
            <Link href="/login">Sign in</Link>
            <Link href="/register">Create an account</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 bookateacher.in</span>
          <span>Made in India · Built for focused learning</span>
        </div>
      </div>
    </footer>
  );
}
