import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found" tabIndex={-1}>
      <div className="not-found-mark">404</div>
      <span className="eyebrow">That page moved</span>
      <h1>Let&apos;s get you back on track.</h1>
      <p>
        The page you tried to open is unavailable or no longer part of the
        public site. Start from the tutor directory or explore a subject.
      </p>
      <div className="not-found-actions">
        <Link className="btn btn-primary" href="/tutors">Find a tutor</Link>
        <Link className="btn btn-secondary" href="/subjects">Explore subjects</Link>
      </div>
    </main>
  );
}
