import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | bookateacher.in",
  description: "Terms of Service for bookateacher.in — the IELTS, TOEFL, and Spoken English tutoring platform.",
  openGraph: {
    title: "Terms of Service | bookateacher.in",
    description: "Terms of Service for bookateacher.in — the IELTS, TOEFL, and Spoken English tutoring platform.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | bookateacher.in",
    description: "Terms of Service for bookateacher.in — the IELTS, TOEFL, and Spoken English tutoring platform.",
  },
  alternates: {
    canonical: "https://bookateacher.in/terms",
  },
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";

export default function TermsPage() {
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
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid ${LINE}`,
              fontSize: "0.8125rem",
              color: MUTED,
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>Terms of Service</span>
          </nav>

          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: INK,
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Terms of Service
            </h1>
            <p style={{ fontSize: "0.9375rem", color: MUTED }}>
              Last updated: 19 September 2026
            </p>
          </div>

          {/* Content — serif section headings, parchment card */}
          <div
            style={{
              background: PAPER_2,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "32px 36px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { n: "1", title: "Overview", body: "Welcome to bookateacher.in (\"we,\" \"our,\" or \"us\"). These Terms of Service (\"Terms\") govern your use of our platform, including any website, mobile application, and services provided by bookateacher.in. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not access or use the platform." },
                { n: "2", title: "Definitions", body: "<strong>Student:</strong> A user who accesses the platform to find and book tutors. <strong>Tutor:</strong> A user who lists their teaching services on the platform and receives booking requests from students. <strong>Session:</strong> A scheduled 1-on-1 coaching session between a student and a tutor. <strong>Lead:</strong> A student's match request submitted through the platform." },
                { n: "3", title: "Eligibility", body: "You must be at least 18 years old to create an account as a tutor. Students under 18 may use the platform only with the consent of a parent or guardian who agrees to be bound by these Terms. You must have a valid email address and phone number to register. We may request additional verification for tutors." },
                { n: "4", title: "Account Registration", body: "To use certain features of the platform, you must create an account. You agree to: provide accurate, current, and complete information during registration; keep your account credentials confidential; notify us immediately of any unauthorized use of your account; accept responsibility for all activities under your account. We reserve the right to suspend or terminate accounts that violate these Terms or applicable law." },
                { n: "5", title: "Tutor Requirements", body: "Tutors must meet the following minimum requirements: minimum 2 years of teaching experience for test-prep subjects (IELTS, TOEFL, etc.); valid credentials (degree, certification) verified by bookateacher.in; successful completion of a 30-minute sample teaching session reviewed by us; identity and background verification. Tutors are responsible for the accuracy of their profile information, availability, and hourly rates." },
                { n: "6", title: "Sessions and Bookings", body: "Sessions are scheduled between the student and tutor. Both parties agree to: attend the session at the scheduled time; provide at least 24 hours' notice for cancellations, where possible; use the agreed communication method. <strong>Cancellation policy:</strong> If a student cancels within 24 hours of the session, they may be charged the full session fee. Tutors who cancel within 24 hours may have their account reviewed. Repeated no-shows may result in account suspension." },
                { n: "7", title: "Payments", body: "Session fees are paid by the student directly to the tutor or through the platform, depending on the payment method agreed. bookateacher.in does not currently charge a platform commission on tutor earnings at launch. We accept payments via UPI, credit/debit cards, and other payment methods supported by our payment partners. All payments are processed securely. Refunds: If a student is not satisfied with a session, they may request a full refund within 48 hours of the session." },
                { n: "8", title: "User Content", body: "Tutors may publish profiles, descriptions, and other content on the platform. You retain ownership of your content but grant us a license to display it on the platform. You agree not to post content that is false, misleading, or violates these Terms; infringes on someone else's intellectual property; is harmful, discriminatory, or harassing; or violates applicable law." },
                { n: "9", title: "Privacy", body: "Your use of the platform is also governed by our <Link href=\"/privacy\" style={{ color: INK_SOFT, textDecoration: \"underline\" }}>Privacy Policy</Link>, which describes how we collect, use, and protect your information." },
                { n: "10", title: "Disclaimer", body: "The platform and its services are provided \"as is\" and \"as available\" without warranties of any kind. We do not guarantee that any particular tutor will be available or suitable for your needs; that you will achieve a specific test score or outcome; or that the platform will be uninterrupted or error-free. Your test scores and results depend on many factors, including your own effort and preparation." },
                { n: "11", title: "Limitation of Liability", body: "To the maximum extent permitted by law, bookateacher.in shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or any tutor's services. You are responsible for your own decisions regarding tutor selection, session scheduling, and payment." },
                { n: "12", title: "Changes to These Terms", body: "We may update these Terms from time to time. We'll notify you of material changes by posting the updated Terms on the platform with a new \"last updated\" date. Your continued use of the platform after changes constitutes acceptance of the updated Terms." },
                { n: "13", title: "Governing Law", body: "These Terms shall be governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India." },
                { n: "14", title: "Contact", body: "If you have questions about these Terms, contact us at <a href=\"mailto:support@bookateacher.in\" style={{ color: INK_SOFT, textDecoration: \"underline\" }}>support@bookateacher.in</a>." },
              ].map((section) => (
                <div key={section.n}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: INK,
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {section.n}. {section.title}
                  </h2>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      color: INK_SOFT,
                      lineHeight: 1.7,
                    }}
                    dangerouslySetInnerHTML={{ __html: section.body }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: `1px solid ${LINE}`,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.6 }}>
              By using bookateacher.in, you agree to these Terms of Service and our Privacy Policy.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginTop: 16,
              }}
            >
              <Link href="/" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}>
                Back to homepage
              </Link>
              <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}>
                Privacy Policy
              </Link>
            </div>
          </div>
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
