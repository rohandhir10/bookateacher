import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" aria-label="bookateacher.in home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h11M4 17h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-word">bookateacher<span>.in</span></span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <Link className="nav-link" href="/tutors">Find a tutor</Link>
          <details className="nav-menu">
            <summary className="nav-link nav-menu-trigger">Subjects</summary>
            <div className="nav-menu-popover">
              <Link href="/subjects">All subjects</Link>
              <Link href="/subjects/ielts">IELTS</Link>
              <Link href="/subjects/toefl">TOEFL</Link>
              <Link href="/subjects/spoken-english">Spoken English</Link>
            </div>
          </details>
          <Link className="nav-link" href="/#how">How it works</Link>
          <Link className="nav-link" href="/about">About</Link>
        </nav>

        <div className="nav-actions">
          <Link className="nav-link" href="/login">Sign in</Link>
          <Link className="btn btn-secondary nav-tutor-cta" href="/register?role=tutor">
            Teach on BookATeacher
          </Link>
          <Link className="btn btn-primary" href="/tutors">
            Find a tutor
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <details className="mobile-nav">
          <summary className="mobile-nav-trigger" aria-label="Open navigation">
            <span></span><span></span><span></span>
          </summary>
          <div className="mobile-nav-panel">
            <Link href="/tutors">Find a tutor</Link>
            <Link href="/subjects">Subjects</Link>
            <Link href="/subjects/ielts">IELTS</Link>
            <Link href="/subjects/toefl">TOEFL</Link>
            <Link href="/subjects/spoken-english">Spoken English</Link>
            <Link href="/#how">How it works</Link>
            <Link href="/about">About</Link>
            <div className="mobile-nav-divider" />
            <Link href="/login">Sign in</Link>
            <Link className="btn btn-primary" href="/register?role=tutor">Teach on BookATeacher</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
