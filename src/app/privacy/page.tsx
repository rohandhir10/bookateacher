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
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          >
            <span className="w-8 h-8 rounded bg-[#14213D] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              bookateacher<span className="text-foreground-subtle font-normal">.in</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex gap-2 mb-4 text-xs text-foreground-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Privacy Policy</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-foreground-muted">Last updated: 19 September 2026</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground-muted">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">1. Introduction</h2>
              <p>
                bookateacher.in (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our platform.
              </p>
              <p>
                By using bookateacher.in, you consent to the collection and use of information in
                accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">2. Information We Collect</h2>
              <p>
                <strong>Registration information:</strong> When you create an account, we collect your
                name, email address, password, and phone number. For tutors, we also collect
                additional profile information such as credentials, teaching experience, subjects,
                hourly rate, and availability.
              </p>
              <p>
                <strong>Lead request information:</strong> When you submit a match request (lead), we
                collect your name, email, phone number, subject, goal, budget, preferred days and
                times, location, current level, and any challenges you describe.
              </p>
              <p>
                <strong>Session information:</strong> When you book a session, we collect the scheduled
                time, duration, meeting link (if applicable), payment status, and any notes or
                feedback exchanged between student and tutor.
              </p>
              <p>
                <strong>Payment information:</strong> Payment details are processed by our payment
                partners. We do not store full card numbers or UPI PINs on our servers. We may store
                tokenized payment references for transaction history.
              </p>
              <p>
                <strong>Usage data:</strong> We may collect information about how you use the platform,
                including pages visited, features used, and referral sources, through cookies and
                similar technologies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide and maintain the platform and its services.</li>
                <li>Match students with appropriate tutors based on their requirements.</li>
                <li>Process sessions, bookings, and payments.</li>
                <li>Communicate with you about your account, bookings, and platform updates.</li>
                <li>Improve the platform and develop new features.</li>
                <li>Verify tutor credentials and maintain platform quality.</li>
                <li>Comply with legal obligations and protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">4. Information Sharing</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may
                share information in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>With tutors:</strong> When a student submits a lead request, the tutor
                  assigned to that lead may see the student's name, contact information, subject,
                  goal, budget, and other request details necessary to provide the service.</li>
                <li><strong>With payment partners:</strong> To process payments, we share the
                  information required by our payment providers (e.g., Razorpay, card networks).</li>
                <li><strong>With service providers:</strong> We may share information with vendors who
                  perform services on our behalf, such as hosting, email delivery, and analytics,
                  subject to confidentiality agreements.</li>
                <li><strong>As required by law:</strong> We may disclose information if required by
                  applicable law, regulation, or legal process.</li>
              </ul>
              <p>
                Student and tutor contact information is shared only when a lead is matched and both
                parties have consented to communicate directly. You can opt out of direct contact at
                any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">5. Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your personal
                information, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption of data in transit and at rest.</li>
                <li>Secure password storage using industry-standard hashing.</li>
                <li>Access controls limiting who can view personal information.</li>
                <li>Regular security reviews and updates.</li>
              </ul>
              <p>
                While we strive to protect your information, no method of transmission over the
                internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed
                to provide our services. When you close your account or when we no longer need your
                information for the purposes described in this policy, we will delete or anonymize it,
                subject to any legal retention requirements.
              </p>
              <p>
                Session and transaction records may be retained for a period for dispute resolution
                and legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">7. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your personal information.</li>
                <li>Opt out of certain communications from us.</li>
                <li>Withdraw consent where we rely on consent to process your data.</li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a href="mailto:support@bookateacher.in" className="underline text-accent">
                  support@bookateacher.in
                </a>. We will respond to your request within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">8. Cookies</h2>
              <p>
                We use cookies and similar technologies to operate the platform, improve user experience,
                and analyze usage. You can set your browser to refuse cookies, but some features of the
                platform may not function properly without them.
              </p>
              <p>
                We use Google Analytics (GA4) to understand how visitors use our website. Google
                Analytics uses cookies to collect anonymous usage data. You can opt out of Google
                Analytics tracking by visiting{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-accent"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">9. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites or services that are not owned
                or controlled by bookateacher.in. We are not responsible for the privacy practices or
                content of those third parties. We encourage you to review the privacy policies of any
                third-party services you use.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">10. Children's Privacy</h2>
              <p>
                Our platform is not intended for children under 18. We do not knowingly collect
                personal information from children. If we learn that we have collected information
                from a child without parental consent, we will take steps to delete that information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We'll notify you of material
                changes by posting the updated policy on the platform with a new &quot;last updated&quot;
                date. Your continued use of the platform after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">12. Contact</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our data practices,
                contact us at{" "}
                <a href="mailto:support@bookateacher.in" className="underline text-accent">
                  support@bookateacher.in
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-foreground-subtle">
              By using bookateacher.in, you agree to this Privacy Policy and our Terms of Service.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/" className="text-sm text-foreground hover:text-accent">
                Back to homepage
              </Link>
              <Link href="/terms" className="text-sm text-foreground hover:text-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
