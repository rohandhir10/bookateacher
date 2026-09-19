import { Metadata } from "next";
import { getLeadById } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MatchingStatusContent } from "./MatchingStatusContent";

export const metadata: Metadata = {
  title: "Your match request | bookateacher.in",
  description: "Track the status of your tutor match request.",
  openGraph: {
    title: "Your match request | bookateacher.in",
    description: "Track the status of your tutor match request.",
    type: "website",
    locale: "en_IN",
    siteName: "bookateacher.in",
  },
  alternates: {
    canonical: "https://bookateacher.in/matching-status",
  },
};

export const dynamic = "force-dynamic";

const SERVICE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "IELTS, TOEFL & Spoken English Tutoring",
  description: "Certified 1-on-1 IELTS, TOEFL, and Spoken English tutoring across India. Live coaching sessions, mock tests under real test conditions, and targeted feedback on writing and speaking.",
  provider: { "@type": "Organization", name: "bookateacher.in", url: "https://bookateacher.in" },
  areaServed: { "@type": "Country", name: "India" },
  offeredBy: { "@type": "Organization", name: "bookateacher.in", url: "https://bookateacher.in" },
});

export default async function MatchingStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { leadId } = await searchParams;
  if (!leadId) redirect("/dashboard?error=no-lead-id");

  const lead = getLeadById(leadId);
  if (!lead) redirect("/dashboard?error=lead-not-found");

  // Verify the lead belongs to this user (by email match)
  if (lead.email && lead.email !== session.user.email) {
    redirect("/dashboard?error=lead-not-mine");
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <MatchingStatusHeader />
      <main className="flex-1">
        <MatchingStatusContent lead={lead} userEmail={session.user.email} />
      </main>
    </div>
  );
}

function MatchingStatusHeader() {
  return (
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
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#14213D",
            textDecoration: "none",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              background: "#14213D",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 8h18M3 12h13M3 16h9" stroke="#FAF7F0" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            bookateacher
            <span
              style={{
                color: "#6B6557",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 400,
              }}
            >
              .in
            </span>
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/dashboard"
            style={{
              fontSize: "0.875rem",
              color: "#3D4A63",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: 6,
              border: "1px solid #D9D2C5",
              transition: "all 0.15s",
            }}
          >
            Dashboard
          </a>
          <form action="/api/auth/signout" method="POST" style={{ display: "inline" }}>
            <button
              type="submit"
              style={{
                fontSize: "0.875rem",
                color: "#3D4A63",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #D9D2C5",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
  );
}
