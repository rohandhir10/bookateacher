import { RegisterForm } from "@/components/RegisterForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a learner or tutor account on bookateacher.in.",
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

const benefits = [
  ["01", "Browse before you commit", "See current tutor profiles and public details first."],
  ["02", "Choose your path", "Create a student account or join as a tutor."],
  ["03", "Keep it focused", "Start with the subject and goal that matter to you."],
];

export default function RegisterPage() {
  return (
    <div className="account-shell">
      <header className="account-header">
        <div className="wrap account-header-inner">
          <Brand />
          <Link className="account-header-link" href="/login">
            Already have an account? Sign in
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="account-main">
        <div className="account-wrap">
          <div className="account-intro">
            <span className="eyebrow">Join BookATeacher</span>
            <h1>Create an account that fits your goal.</h1>
            <p>
              Start as a student or tutor. You can browse the public directory
              before deciding what comes next.
            </p>
          </div>

          <div className="account-card">
            <RegisterForm />
          </div>

          <div className="account-benefits">
            {benefits.map(([number, title, copy]) => (
              <div className="account-benefit" key={number}>
                <div className="account-benefit-icon" aria-hidden="true">{number}</div>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>

          <p className="account-legal">
            By creating an account, you agree to our{" "}
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
