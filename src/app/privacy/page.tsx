import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | bookateacher.in",
  description: "Privacy Policy for bookateacher.in — how we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy | bookateacher.in",
    description: "Privacy Policy for bookateacher.in — how we collect, use, and protect your information.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
    url: "https://bookateacher.in/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | bookateacher.in",
    description: "Privacy Policy for bookateacher.in — how we collect, use, and protect your information.",
  },
  alternates: {
    canonical: "https://bookateacher.in/privacy",
  },
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";

export default function PrivacyPage() {
  const sections = [
    { n: "1", title: "Introduction", body: "bookateacher.in (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By using bookateacher.in, you consent to the collection and use of information in accordance with this policy." },
    { n: "2", title: "Information We Collect", body: "<strong>Registration information:</strong> When you create an account, we collect your name, email address, password, and phone number. For tutors, we also collect additional profile information such as credentials, teaching experience, subjects, hourly rate, and availability. <strong>Lead request information:</strong> When you submit a match request (lead), we collect your name, email, phone number, subject, goal, budget, preferred days and times, location, current level, and any challenges you describe. <strong>Session information:</strong> When you book a session, we collect the scheduled time, duration, meeting link (if applicable), payment status, and any notes or feedback exchanged between student and tutor. <strong>Payment information:</strong> Payment details are processed by our payment partners. We do not store full card numbers or UPI PINs on our servers. <strong>Usage data:</strong> We may collect information about how you use the platform through cookies and similar technologies." },
    { n: "3", title: "How We Use Your Information", body: "We use the information we collect to: provide and maintain the platform and its services; match students with appropriate tutors based on their requirements; process sessions, bookings, and payments; communicate with you about your account, bookings, and platform updates; improve the platform and develop new features; verify tutor credentials and maintain platform quality; comply with legal obligations and protect our rights." },
    { n: "4", title: "Information Sharing", body: "We do not sell, rent, or trade your personal information to third parties. We may share information in the following circumstances: <strong>With tutors:</strong> When a student submits a lead request, the tutor assigned to that lead may see the student's name, contact information, subject, goal, budget, and other request details necessary to provide the service. <strong>With payment partners:</strong> To process payments, we share the information required by our payment providers (e.g., Razorpay, card networks). <strong>With service providers:</strong> We may share information with vendors who perform services on our behalf, subject to confidentiality agreements. <strong>As required by law:</strong> We may disclose information if required by applicable law, regulation, or legal process. Student and tutor contact information is shared only when a lead is matched and both parties have consented to communicate directly." },
    { n: "5", title: "Data Security", body: "We implement reasonable technical and organizational measures to protect your personal information, including: encryption of data in transit and at rest; secure password storage using industry-standard hashing; access controls limiting who can view personal information; regular security reviews and updates. While we strive to protect your information, no method of transmission over the internet is 100% secure." },
    { n: "6", title: "Data Retention", body: "We retain your personal information for as long as your account is active or as needed to provide our services. When you close your account or when we no longer need your information for the purposes described in this policy, we will delete or anonymize it, subject to any legal retention requirements. Session and transaction records may be retained for a period for dispute resolution and legal compliance." },
    { n: "7", title: "Your Rights", body: "Depending on your jurisdiction, you may have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion of your personal information; opt out of certain communications from us; withdraw consent where we rely on consent to process your data. To exercise these rights, contact us at <a href=\"mailto:support@bookateacher.in\" style={{ color: INK_SOFT, textDecoration: \"underline\" }}>support@bookateacher.in</a>." },
    { n: "8", title: "Cookies", body: "We use cookies and similar technologies to operate the platform, improve user experience, and analyze usage. You can set your browser to refuse cookies, but some features of the platform may not function properly without them. We use Google Analytics (GA4) to understand how visitors use our website. You can opt out of Google Analytics tracking by visiting <a href=\"https://tools.google.com/dlpage/gaoptout\" target=\"_blank\" rel=\"noopener noreferrer\" style={{ color: INK_SOFT, textDecoration: \"underline\" }}>https://tools.google.com/dlpage/gaoptout</a>." },
    { n: "9", title: "Third-Party Links", body: "Our platform may contain links to third-party websites or services that are not owned or controlled by bookateacher.in. We are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party services you use." },
    { n: "10", title: "Children's Privacy", body: "Our platform is not intended for children under 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child without parental consent, we will take steps to delete that information." },
    { n: "11", title: "Changes to This Policy", body: "We may update this Privacy Policy from time to time. We'll notify you of material changes by posting the updated policy on the platform with a new \"last updated\" date. Your continued use of the platform after changes constitutes acceptance of the updated policy." },
    { n: "12", title: "Contact", body: "If you have questions or concerns about this Privacy Policy or our data practices, contact us at <a href=\"mailto:support@bookateacher.in\" style={{ color: INK_SOFT, textDecoration: \"underline\" }}>support@bookateacher.in</a>." },
  ];

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
            <span style={{ color: INK, fontWeight: 500 }}>Privacy Policy</span>
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
              Privacy Policy
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
              {sections.map((section) => (
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
              By using bookateacher.in, you agree to this Privacy Policy and our Terms of Service.
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
              <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "underline" }}>
                Terms of Service
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
