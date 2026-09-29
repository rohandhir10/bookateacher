import { LoginForm } from "@/components/LoginForm";
import { DemoAccess } from "@/components/DemoAccess";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your bookateacher.in account to manage tutoring sessions and continue your English preparation.",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="bookateacher.in home">
      <span className="brand-mark" aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h11M4 17h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      </span>
      <span className="brand-word">bookateacher<span>.in</span></span>
    </Link>
  );
}

export default function LoginPage() {
  return (
    <div className="account-shell">
      <header className="account-header">
        <div className="wrap account-header-inner">
          <Brand />
          <Link className="account-header-link" href="/">
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="account-main">
        <div className="account-wrap narrow">
          <div className="account-intro">
            <span className="eyebrow">Welcome back</span>
            <h1>Good to see you.</h1>
            <p>
              Sign in to manage your sessions, messages and tutor activity.
            </p>
          </div>

          <div className="account-card">
            <LoginForm />
          </div>
          {process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV !== "production" ? (
            <DemoAccess />
          ) : null}

          <p className="account-legal">
            By continuing, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <footer className="account-footer">
        <div className="wrap footer-inner">
          <Brand />
          <div className="footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-copy">© 2026 bookateacher.in</div>
        </div>
      </footer>
    </div>
  );
}
