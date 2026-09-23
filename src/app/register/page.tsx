import { RegisterForm } from "@/components/RegisterForm";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign up | bookateacher.in",
  description:
    "Create your account to find verified IELTS, TOEFL, and Spoken English tutors, or to become a tutor on bookateacher.in",
  openGraph: {
    title: "Sign up | bookateacher.in",
    description: "Create your account to find verified IELTS, TOEFL, and Spoken English tutors, or to become a tutor on bookateacher.in",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
  },
  alternates: {
    canonical: "https://bookateacher.in/register",
  },
};

export const dynamic = "force-dynamic";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";

export default function RegisterPage() {
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
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link
              href="/login"
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
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          {/* Headline */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: RED,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 28,
                  height: 1.5,
                  background: RED,
                  margin: "0 auto 8px",
                }}
              />
              Join bookateacher.in
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                color: INK,
                marginBottom: 12,
                lineHeight: 1.1,
              }}
            >
              Create your account
            </h1>
            <p style={{ fontSize: "1.0625rem", color: INK_SOFT, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
              Join bookateacher.in to find verified tutors or start earning as a tutor.
            </p>
          </div>

          {/* Form card — parchment background, navy border */}
          <div
            style={{
              background: PAPER,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "32px 28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
              <RegisterForm />
            </Suspense>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 3.373-1.204 6.994-3.04 9-5.408V9c0-.489-.012-.97-.025-1.4-.074-.672.216-1.926.79-2.895.098-.14.173-.282.222-.436H12v.188c0 .243.092.445.222.436.574.969.79 2.223.79 2.895.013.43.025.92.025 1.4 0 2.466-2.11 4.39-4.79 4.911m0 3a8.001 8.001 0 100-16 8.001 8.001 0 000 16z" />
                  </svg>
                ),
                title: "Verified tutors",
                desc: "Every tutor vetted and verified",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fast matching",
                desc: "Matched within 24 hours",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM11 5.835h-.019a60.45 60.45 0 00-3.827.397 1 1 0 10-1.087-1.714 11.96 11.96 0 006.553 6.487A9.96 9.96 0 0111 5.835z" />
                  </svg>
                ),
                title: "Secure payments",
                desc: "Safe, encrypted transactions",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                  padding: 16,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: INK,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: INK, textAlign: "center" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: MUTED, lineHeight: 1.4, textAlign: "center" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontSize: "0.8125rem",
              color: MUTED,
              lineHeight: 1.5,
            }}
          >
            By creating an account, you agree to our{" "}
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

      {/* Footer */}
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
