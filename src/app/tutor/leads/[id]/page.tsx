import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";
import { apiGetLead, apiUpdateLead } from "@/lib/api";
import { redirect, notFound } from "next/navigation";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";
const GREEN = "#2F5233";
const ACCENT = "#B23A2E";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const { lead } = await apiGetLead(id);

  if (!lead) notFound();

  const user = session.user as { role: string };
  if (user.role !== "tutor") redirect("/dashboard");

  await apiUpdateLead(id, { status: "contacted" });

  const subjectLabels: Record<string, string> = {
    ielts: "IELTS",
    toefl: "TOEFL",
    "spoken-english": "Spoken English",
    gre: "GRE",
    gmat: "GMAT",
    sat: "SAT",
    ptet: "PTE",
    other: "Other",
  };

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
          {/* Brand — navy logo + Playfair serif, matching landing page */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: INK,
              textDecoration: "none",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
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
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="/tutor/dashboard"
              style={{
                fontSize: "0.875rem",
                color: INK_SOFT,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${LINE}`,
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
                  color: INK_SOFT,
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${LINE}`,
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
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
          {/* Back link */}
          <a
            href="/tutor/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.875rem",
              color: INK_SOFT,
              textDecoration: "none",
              marginBottom: 20,
              transition: "color 0.15s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </a>

          {/* Page heading */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: INK,
                marginBottom: 6,
                lineHeight: 1.15,
              }}
            >
              Lead details
            </h1>
            <p style={{ fontSize: "0.875rem", color: MUTED }}>
              Lead submitted {new Date(lead.created_at).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Lead card */}
          <div
            style={{
              background: PAPER,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "28px 24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "inline-block",
                marginBottom: 20,
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {lead.status === "new" && (
                <span style={{ background: "#F2ECE0", color: RED, border: `1px solid ${LINE}` }}>
                  {lead.status}
                </span>
              )}
              {lead.status === "contacted" && (
                <span style={{ background: "#E8F0E4", color: GREEN, border: `1px solid #C8D8C0` }}>
                  {lead.status}
                </span>
              )}
              {lead.status !== "new" && lead.status !== "contacted" && (
                <span style={{ background: PAPER_2, color: MUTED, border: `1px solid ${LINE}` }}>
                  {lead.status}
                </span>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Contact information */}
              <div
                style={{
                  padding: 20,
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                }}
              >
                <h2
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: MUTED,
                    marginBottom: 14,
                  }}
                >
                  Contact information
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}>Name</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, textAlign: "right" }}>{lead.student_name}</span>
                  </div>
                  {lead.student_email && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.875rem", color: MUTED }}>Email</span>
                      <a
                        href={`mailto:${lead.student_email}`}
                        style={{ fontSize: "0.875rem", fontWeight: 500, color: RED, textDecoration: "underline" }}
                      >
                        {lead.student_email}
                      </a>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}>Phone</span>
                    <a
                      href={`tel:${lead.student_phone}`}
                      style={{ fontSize: "0.875rem", fontWeight: 500, color: RED, textDecoration: "underline" }}
                    >
                      {lead.student_phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* What they're looking for */}
              <div
                style={{
                  padding: 20,
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                }}
              >
                <h2
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: MUTED,
                    marginBottom: 14,
                  }}
                >
                  What they&apos;re looking for
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}>Subject</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, textAlign: "right" }}>
                      {subjectLabels[lead.subject] || lead.subject}
                    </span>
                  </div>
                  {lead.goal && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontSize: "0.875rem", color: MUTED, paddingTop: 2 }}>Goal:</span>
                      <span style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.5 }}>{lead.goal}</span>
                    </div>
                  )}
                  {lead.current_level && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.875rem", color: MUTED }}>Level</span>
                      <span style={{ fontSize: "0.875rem", color: INK, textAlign: "right" }}>{lead.current_level}</span>
                    </div>
                  )}
                  {lead.challenge && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontSize: "0.875rem", color: MUTED, paddingTop: 2 }}>Challenge:</span>
                      <span style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.5 }}>{lead.challenge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div
                style={{
                  padding: 20,
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 10,
                }}
              >
                <h2
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: MUTED,
                    marginBottom: 14,
                  }}
                >
                  Preferences
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}>Budget</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, textAlign: "right" }}>
                      {lead.budget_per_hour
                        ? `₹${lead.budget_per_hour.toLocaleString("en-IN")}/hr`
                        : "Not specified"}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", color: MUTED }}>Mode</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, textAlign: "right", textTransform: "capitalize" }}>
                      {lead.online_or_local}
                    </span>
                  </div>
                  {lead.location && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.875rem", color: MUTED }}>Location</span>
                      <span style={{ fontSize: "0.875rem", color: INK, textAlign: "right" }}>{lead.location}</span>
                    </div>
                  )}
                  {(lead.preferred_days || lead.preferred_times) && (
                    <>
                      {lead.preferred_days && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.875rem", color: MUTED }}>Days</span>
                          <span style={{ fontSize: "0.875rem", color: INK, textAlign: "right", textTransform: "capitalize" }}>
                            {typeof preferredDays === "string"
                              ? preferredDays
                              : preferredDays
                                ? preferredDays.map((d: string) => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(", ")
                                : ""}
                          </span>
                        </div>
                      )}
                      {lead.preferred_times && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.875rem", color: MUTED }}>Times</span>
                          <span style={{ fontSize: "0.875rem", color: INK, textAlign: "right", textTransform: "capitalize" }}>
                            {typeof preferredTimes === "string"
                            ? preferredTimes
                            : preferredTimes
                              ? preferredTimes.join(", ")
                              : ""}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  paddingTop: 20,
                  borderTop: `1px solid ${LINE}`,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={`tel:${lead.phone}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    borderRadius: 6,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    background: INK,
                    color: PAPER,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.227 1.11A3 3 0 016 18c0 1.1-.9 2-2 2h-1.28a1 1 0 01-.948-.684L3.498 9.21A1 1 0 013 8.21V5z" />
                  </svg>
                  Call now
                </a>
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "10px 20px",
                      borderRadius: 6,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: "transparent",
                      color: INK,
                      border: `1px solid ${LINE}`,
                      textDecoration: "none",
                      transition: "all 0.15s",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                )}
              </div>
            </div>
          </div >
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "20px 0",
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
            <a href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Privacy</a>
            <a href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Terms</a>
            <a href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Contact</a>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>
            © {new Date().getFullYear()} bookateacher.in — Made in India
          </p>
        </div>
      </footer>
    </div>
  );
}
