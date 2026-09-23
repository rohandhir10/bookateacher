import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | bookateacher.in",
  description: "Sign in to your bookateacher.in account to track your tutor match, manage sessions, and continue your IELTS, TOEFL, or Spoken English preparation.",
  openGraph: {
    title: "Sign in | bookateacher.in",
    description: "Sign in to your bookateacher.in account to track your tutor match and manage your sessions.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
  },
  alternates: {
    canonical: "https://bookateacher.in/login",
  },
};

export const dynamic = "force-dynamic";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        color: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `rgba(${parseInt(INK_SOFT.slice(1,3),16)}, ${parseInt(INK_SOFT.slice(3,5),16)}, ${parseInt(INK_SOFT.slice(5,7),16)}, 0.92)`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            gap: 24,
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </Link>
          <Link
            href="/"
            style={{
              fontSize: "0.875rem",
              color: PAPER,
              opacity: 0.85,
              transition: "opacity 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* Main — centered auth card on parchment */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Card */}
          <div
            style={{
              background: PAPER,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "32px 28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Headline */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 1.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: INK,
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                {typeof window !== "undefined" &&
                window.location.pathname.includes("register") ? (
                  "Create your account"
                ) : (
                  "Welcome back"
                )}
              </h1>
              <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.55 }}>
                {typeof window !== "undefined" &&
                window.location.pathname.includes("register") ? (
                  "Join bookateacher.in — find verified IELTS, TOEFL &amp; Spoken English tutors, or become a tutor yourself."
                ) : (
                  "Sign in to access your dashboard and track your progress."
                )}
              </p>
            </div>

            <LoginForm />
          </div>

          {/* Trust note */}
          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontSize: "0.8125rem",
              color: MUTED,
              lineHeight: 1.5,
            }}
          >
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              style={{
                color: INK_SOFT,
                textDecoration: "underline",
                fontSize: "0.8125rem",
              }}
            >
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link
              href="/privacy"
              style={{
                color: INK_SOFT,
                textDecoration: "underline",
                fontSize: "0.8125rem",
              }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Footer — matches landing page footer style */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "24px 0",
          background: PAPER_2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.125rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                background: INK,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ color: INK }}>
              bookateacher
              <span
                style={{
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                }}
              >
                .in
              </span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Terms</Link>
            <Link href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Contact</Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
