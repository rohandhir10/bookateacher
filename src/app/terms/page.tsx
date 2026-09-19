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
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
            <span className="text-foreground font-medium">Terms of Service</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-foreground-muted">Last updated: 19 September 2026</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground-muted">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">1. Overview</h2>
              <p>
                Welcome to bookateacher.in (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service
                (&quot;Terms&quot;) govern your use of our platform, including any website, mobile
                application, and services provided by bookateacher.in.
              </p>
              <p>
                By accessing or using our platform, you agree to be bound by these Terms and
                our Privacy Policy. If you do not agree, you may not access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">2. Definitions</h2>
              <p>
                <strong>Student:</strong> A user who accesses the platform to find and book tutors.
              </p>
              <p>
                <strong>Tutor:</strong> A user who lists their teaching services on the platform and
                receives booking requests from students.
              </p>
              <p>
                <strong>Session:</strong> A scheduled 1-on-1 coaching session between a student and a
                tutor.
              </p>
              <p>
                <strong>Lead:</strong> A student's match request submitted through the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">3. Eligibility</h2>
              <p>
                You must be at least 18 years old to create an account as a tutor. Students under
                18 may use the platform only with the consent of a parent or guardian who agrees to
                be bound by these Terms.
              </p>
              <p>
                You must have a valid email address and phone number to register. We may request
                additional verification for tutors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">4. Account Registration</h2>
              <p>
                To use certain features of the platform, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Keep your account credentials confidential.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Accept responsibility for all activities under your account.</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">5. Tutor Requirements</h2>
              <p>
                Tutors must meet the following minimum requirements:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Minimum 2 years of teaching experience for test-prep subjects (IELTS, TOEFL, etc.).</li>
                <li>Valid credentials (degree, certification) verified by bookateacher.in.</li>
                <li>Successful completion of a 30-minute sample teaching session reviewed by us.</li>
                <li>Identity and background verification.</li>
              </ul>
              <p>
                Tutors are responsible for the accuracy of their profile information, availability,
                and hourly rates. Tutors must conduct sessions professionally and in accordance with
                these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">6. Sessions and Bookings</h2>
              <p>
                Sessions are scheduled between the student and tutor. Both parties agree to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Attend the session at the scheduled time.</li>
                <li>Provide at least 24 hours' notice for cancellations, where possible.</li>
                <li>Use the agreed communication method (video call, in-person, etc.).</li>
              </ul>
              <p>
                <strong>Cancellation policy:</strong> If a student cancels within 24 hours of the
                session, they may be charged the full session fee. Tutors who cancel within 24 hours
                may have their account reviewed. Repeated no-shows may result in account suspension.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">7. Payments</h2>
              <p>
                Session fees are paid by the student directly to the tutor or through the platform,
                depending on the payment method agreed. bookateacher.in does not currently charge a
                platform commission on tutor earnings at launch.
              </p>
              <p>
                We accept payments via UPI, credit/debit cards, and other payment methods supported
                by our payment partners. All payments are processed securely. You are responsible for
                providing accurate payment information.
              </p>
              <p>
                Refunds: If a student is not satisfied with a session, they may request a full refund
                within 48 hours of the session. Refund requests are reviewed on a case-by-case basis.
                Tutors agree to honor valid refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">8. User Content</h2>
              <p>
                Tutors may publish profiles, descriptions, and other content on the platform. You
                retain ownership of your content but grant us a license to display it on the platform
                for the purpose of providing our services.
              </p>
              <p>
                You agree not to post content that:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Is false, misleading, or violates these Terms.</li>
                <li>Infringes on someone else's intellectual property.</li>
                <li>Is harmful, discriminatory, or harassing.</li>
                <li>Violates applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">9. Privacy</h2>
              <p>
                Your use of the platform is also governed by our{" "}
                <Link href="/privacy" className="underline text-accent">Privacy Policy</Link>, which
                describes how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">10. Disclaimer</h2>
              <p>
                The platform and its services are provided &quot;as is&quot; and &quot;as available&quot;
                without warranties of any kind, either express or implied. We do not guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>That any particular tutor will be available or suitable for your needs.</li>
                <li>That you will achieve a specific test score or outcome.</li>
                <li>That the platform will be uninterrupted or error-free.</li>
              </ul>
              <p>
                Your test scores and results depend on many factors, including your own effort,
                preparation, and the quality of instruction you receive. bookateacher.in does not
                guarantee any specific score improvement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, bookateacher.in shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the platform or any tutor's services.
              </p>
              <p>
                You are responsible for your own decisions regarding tutor selection, session
                scheduling, and payment. bookateacher.in acts as a platform connecting students and
                tutors and is not a party to any individual session agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">12. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. We'll notify you of material changes by
                posting the updated Terms on the platform with a new &quot;last updated&quot; date.
                Your continued use of the platform after changes constitutes acceptance of the updated
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">13. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of India. Any disputes arising from these
                Terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">14. Contact</h2>
              <p>
                If you have questions about these Terms, contact us at{" "}
                <a href="mailto:support@bookateacher.in" className="underline text-accent">
                  support@bookateacher.in
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-foreground-subtle">
              By using bookateacher.in, you agree to these Terms of Service and our Privacy Policy.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/" className="text-sm text-foreground hover:text-accent">
                Back to homepage
              </Link>
              <Link href="/privacy" className="text-sm text-foreground hover:text-accent">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
