import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getServerSession, requireAuth } from "@/lib/session";
import {
  apiGetSessionsForTutor,
  apiGetTestimonialsForTutor,
  apiGetTestimonialRequests,
  apiGetTutorProfile,
  apiGetLeads,
  apiGetLead,
  apiAcceptLead,
  apiDeclineLead,
  apiUpdateSession as apiUpdateSessionApi,
  apiCreateSession as apiCreateSessionApi,
  apiRequestTestimonial,
  apiSubmitTestimonial,
} from "@/lib/api";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const RED = "#B23A2E";
const AMBER = "#8A5A00";

import { apiSignOut } from "@/lib/api";

export default async function TutorDashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = session.user as unknown as { id: string; role: string; verified?: number };
  if (user.role !== "tutor") redirect("/dashboard");

  const tutorId = user.id;
  const [leadsRes, sessionsRes, testimonialsRes, requestsRes, profileRes] =
    await Promise.all([
      apiGetLeads(undefined, tutorId),
      apiGetSessionsForTutor(tutorId),
      apiGetTestimonialsForTutor(tutorId),
      apiGetTestimonialRequests(tutorId),
      apiGetTutorProfile(tutorId),
    ]);

  const leads = leadsRes.leads ?? [];
  const sessions = sessionsRes.sessions ?? [];
  const testimonials = testimonialsRes.testimonials ?? [];
  const pendingRequests = requestsRes.requests ?? [];
  const profile = profileRes.profile ?? null;

  return (
    <div style={{ minHeight: "100vh", background: PAPER, color: INK }}>
      {/* Header */}
      <header
        style={{
          background: INK,
          color: PAPER,
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${LINE}`,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: PAPER,
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "Playfair Display, Georgia, serif",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill={PAPER} />
              <rect x="4" y="13" width="28" height="3" rx="1.5" fill={INK} />
              <rect x="4" y="18" width="22" height="3" rx="1.5" fill={INK_SOFT} opacity="0.7" />
              <rect x="4" y="23" width="26" height="3" rx="1.5" fill={INK_SOFT} opacity="0.5" />
            </svg>
            bookateacher
            <span
              style={{
                color: "rgba(250,247,240,0.6)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              .in
            </span>
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: "13px",
              color: "rgba(250,247,240,0.7)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Tutor dashboard
          </span>
          <form action="/api/auth/signout" method="POST" style={{ display: "inline" }}>
            <button
              type="submit"
              style={{
                background: "transparent",
                border: "1px solid rgba(250,247,240,0.25)",
                color: PAPER,
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 450,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(250,247,240,0.1)";
                e.currentTarget.style.borderColor = "rgba(250,247,240,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(250,247,240,0.25)";
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Page title */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "28px",
                fontWeight: 600,
                color: INK,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Your dashboard
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: INK_SOFT,
                marginTop: 6,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {profile?.name || "Tutor"}{" "}
              <span style={{ color: MUTED }}>·</span> Manage your leads, sessions, and
              reviews in one place.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {user.verified ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "rgba(47,82,51,0.1)",
                  border: `1px solid rgba(47,82,51,0.25)`,
                  borderRadius: 20,
                  fontSize: "12px",
                  color: GREEN,
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified tutor
              </span>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: `rgba(138,90,0,0.08)`,
                  border: `1px solid rgba(138,90,0,0.2)`,
                  borderRadius: 20,
                  fontSize: "12px",
                  color: AMBER,
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2">
                  <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                  <path d="M10.7 10.7l2.8-2.8M17.3 7.3l-2.8 2.8" strokeLinecap="round" />
                </svg>
                Pending verification
              </span>
            )}
            <a
              href="/tutor/profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: INK,
                color: PAPER,
                borderRadius: 6,
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 1px 2px rgba(20,33,61,0.15)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = INK_SOFT;
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(20,33,61,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = INK;
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(20,33,61,0.15)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit profile
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <StatCard
            label="New leads"
            value={leads.filter((l) => l.status === "new").length}
            sub="Awaiting your response"
            color={INK}
          />
          <StatCard
            label="Active sessions"
            value={sessions.filter((s) => s.status === "scheduled").length}
            sub="Upcoming this week"
            color={INK_SOFT}
          />
          <StatCard
            label="Completed"
            value={sessions.filter((s) => s.status === "completed").length}
            sub="This month"
            color={GREEN}
          />
          <StatCard
            label="Avg rating"
            value={testimonials.length > 0 ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1) : "—"}
            sub={`${testimonials.length} review${testimonials.length !== 1 ? "s" : ""}`}
            color={INK}
          />
        </div>

        {/* Two-column layout: leads + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
          {/* Leads section */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: INK,
                  margin: 0,
                }}
              >
                Leads
              </h2>
              <span
                style={{
                  fontSize: "13px",
                  color: MUTED,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {leads.length} total
              </span>
            </div>

            {/* Filter tabs */}
            <div
              style={{
                display: "flex",
                gap: 4,
                marginBottom: 16,
                borderBottom: `1px solid ${LINE}`,
                paddingBottom: 0,
                overflowX: "auto",
              }}
            >
              {(["new", "contacted", "matched", "archived"] as const).map((status) => {
                const count = leads.filter((l) => l.status === status).length;
                if (count === 0 && status !== "new") return null;
                return (
                  <button
                    key={status}
                    style={{
                      padding: "6px 14px",
                      border: "none",
                      borderBottom: "2px solid transparent",
                      background: "transparent",
                      color: status === "new" ? INK : MUTED,
                      fontSize: "13px",
                      fontWeight: status === "new" ? 600 : 450,
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "capitalize",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onClick={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      document.querySelectorAll(".lead-filter-btn").forEach((b) => {
                        const el = b as HTMLElement;
                        el.style.color = MUTED;
                        el.style.fontWeight = "450";
                        el.style.borderBottomColor = "transparent";
                      });
                      btn.style.color = INK;
                      btn.style.fontWeight = "600";
                      btn.style.borderBottomColor = INK;
                    }}
                    className="lead-filter-btn"
                  >
                    {status === "archived" ? "Archived" : status}
                    <span
                      style={{
                        marginLeft: 6,
                        padding: "1px 6px",
                        background: LINE,
                        borderRadius: 10,
                        fontSize: "11px",
                        color: INK_SOFT,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lead cards */}
            {leads.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  border: `1px dashed ${LINE}`,
                  borderRadius: 8,
                  background: PAPER_2,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: LINE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK_SOFT} strokeWidth="1.5">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    color: INK_SOFT,
                    fontWeight: 500,
                    margin: "0 0 6px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  No leads yet
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: MUTED,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  New student inquiries will appear here. When a lead matches your
                  subjects, you can accept or decline it.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    tutorId={tutorId}
                    pendingRequests={pendingRequests}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Profile card */}
            <div
              style={{
                background: PAPER_2,
                border: `1px solid ${LINE}`,
                borderRadius: 8,
                padding: 20,
              }}
            >
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: MUTED,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: "0 0 14px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Your profile
              </h3>
              {profile && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: INK,
                        color: PAPER,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 600,
                        fontFamily: "Playfair Display, Georgia, serif",
                        flexShrink: 0,
                      }}
                    >
                      {(profile.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: INK,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {profile.name}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: MUTED,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {profile.email}
                      </div>
                      {profile.hourly_rate && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: INK_SOFT,
                            fontFamily: "Inter, sans-serif",
                            marginTop: 2,
                          }}
                        >
                          ₹{profile.hourly_rate}/hr
                        </div>
                      )}
                    </div>
                  </div>
                  {profile.subjects && (() => {
                    let subjects: string[] = [];
                    try { subjects = JSON.parse(profile.subjects); } catch {}
                    if (subjects.length === 0) return null;
                    return (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {subjects.slice(0, 6).map((s: string) => (
                          <span
                            key={s}
                            style={{
                              padding: "3px 8px",
                              background: PAPER,
                              border: `1px solid ${LINE}`,
                              borderRadius: 12,
                              fontSize: "11px",
                              color: INK_SOFT,
                              textTransform: "capitalize",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {s.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    );
                  })()}
                  {user.verified && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: GREEN,
                        fontWeight: 500,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      ✓ Verified tutor
                    </div>
                  )}
                  <a
                    href="/tutor/profile"
                    style={{
                      display: "block",
                      padding: "8px 0",
                      fontSize: "13px",
                      color: INK,
                      textDecoration: "none",
                      fontWeight: 500,
                      borderTop: `1px solid ${LINE}`,
                      marginTop: 4,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Edit profile
                  </a>
                </div>
              )}
            </div>

            {/* Pending testimonial requests */}
            {pendingRequests.length > 0 && (
              <div
                style={{
                  background: PAPER_2,
                  border: `1px solid ${LINE}`,
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 12px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Pending testimonials
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {pendingRequests.slice(0, 4).map((req: any) => (
                    <TestimonialRequestCard key={req.id} request={req} tutorId={tutorId} />
                  ))}
                </div>
                {pendingRequests.length > 4 && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: MUTED,
                      margin: "12px 0 0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    +{pendingRequests.length - 4} more
                  </p>
                )}
              </div>
            )}

            {/* Recent reviews */}
            {testimonials.length > 0 && (
              <div
                style={{
                  background: PAPER,
                  border: `1px solid ${LINE}`,
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 12px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Recent reviews
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {testimonials.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 6,
                        background: PAPER_2,
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          marginBottom: 4,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill={star <= t.rating ? INK : "none"}
                            stroke={star <= t.rating ? INK : MUTED}
                            strokeWidth="2"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ))}
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: INK_SOFT,
                          margin: "0 0 6px",
                          lineHeight: 1.5,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {t.text}
                      </p>
                      <div
                        style={{
                          fontSize: "12px",
                          color: MUTED,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        — {t.student_name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming sessions */}
            {(() => {
              const upcoming = sessions
                .filter((s) => s.status === "scheduled" && new Date(s.scheduled_at) > new Date())
                .slice(0, 4);
              if (upcoming.length === 0) return null;
              return (
                <div
                  style={{
                    background: PAPER,
                    border: `1px solid ${LINE}`,
                    borderRadius: 8,
                    padding: 20,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: MUTED,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      margin: "0 0 12px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Upcoming sessions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {upcoming.map((s) => (
                      <div
                        key={s.id}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 6,
                          background: PAPER_2,
                          border: `1px solid ${LINE}`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "11px",
                            color: MUTED,
                            fontFamily: "Inter, sans-serif",
                            marginBottom: 2,
                          }}
                        >
                          {new Date(s.scheduled_at).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: INK,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {formatDateTime(s.scheduled_at)}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: INK_SOFT,
                            marginTop: 2,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {formatDuration(s.duration_minutes)}
                          {s.meeting_link && (
                            <span style={{ marginLeft: 8, color: MUTED }}>· Online</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          background: PAPER_2,
          padding: "20px 32px",
          fontSize: "12px",
          color: MUTED,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>© {new Date().getFullYear()} bookateacher.in — Made in India</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/privacy" style={{ color: INK_SOFT, textDecoration: "none" }}>Privacy</a>
          <a href="/terms" style={{ color: INK_SOFT, textDecoration: "none" }}>Terms</a>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `.lead-card-accepted { opacity: 0.6; }
.lead-card-accepted .lead-actions { pointer-events: none; }
.lead-filter-btn { border-bottom: 2px solid transparent; }`,
        }}
      />
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: PAPER_2,
        border: `1px solid ${LINE}`,
        borderRadius: 8,
        padding: "16px 18px",
      }}
    >
      <div style={{ fontSize: "12px", color: MUTED, fontFamily: "Inter, sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: "26px", fontWeight: 700, color, fontFamily: "Inter, sans-serif", lineHeight: 1.1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: "12px", color: MUTED, fontFamily: "Inter, sans-serif" }}>
        {sub}
      </div>
    </div>
  );
}

function LeadCard({
  lead,
  tutorId,
  pendingRequests,
}: {
  lead: any;
  tutorId: string;
  pendingRequests: any[];
}) {
  const wasAccepted = lead.assigned_tutor_id === tutorId && (lead.status === "contacted" || lead.status === "matched");
  const wasDeclined = lead.status === "archived" && lead.closed_reason && lead.closed_reason.includes("Declined by tutor");
  const isMine = lead.assigned_tutor_id === tutorId;

  return (
    <div
      className={wasAccepted ? "lead-card-accepted" : ""}
      style={{
        background: PAPER_2,
        border: `1px solid ${LINE}`,
        borderRadius: 8,
        padding: "16px 18px",
        opacity: wasAccepted ? 0.7 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: INK,
                color: PAPER,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "Playfair Display, Georgia, serif",
                flexShrink: 0,
              }}
            >
              {(lead.name || "?").charAt(0).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: INK,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {lead.name}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
                {lead.status !== "new" && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: "11px",
                      fontWeight: 500,
                      fontFamily: "Inter, sans-serif",
                      background:
                        lead.status === "contacted"
                          ? "rgba(20,33,61,0.08)"
                          : lead.status === "matched"
                          ? "rgba(47,82,51,0.1)"
                          : "rgba(138,90,0,0.08)",
                      color:
                        lead.status === "contacted"
                          ? INK
                          : lead.status === "matched"
                          ? GREEN
                          : AMBER,
                      border: "1px solid " +
                        (lead.status === "contacted"
                          ? "rgba(20,33,61,0.15)"
                          : lead.status === "matched"
                          ? "rgba(47,82,51,0.2)"
                          : "rgba(138,90,0,0.15)"),
                    }}
                  >
                    {lead.status}
                  </span>
                )}
                {lead.subject && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: "11px",
                      fontWeight: 500,
                      fontFamily: "Inter, sans-serif",
                      background: PAPER,
                      border: `1px solid ${LINE}`,
                      color: INK_SOFT,
                      textTransform: "capitalize",
                    }}
                  >
                    {lead.subject.replace(/-/g, " ")}
                  </span>
                )}
                {lead.online_or_local && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontSize: "11px",
                      fontFamily: "Inter, sans-serif",
                      color: MUTED,
                      background: PAPER,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    {lead.online_or_local === "online" ? "Online" : lead.online_or_local === "local" ? "In-person" : "Either"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "13px",
              color: INK_SOFT,
              fontFamily: "Inter, sans-serif",
              marginBottom: 2,
              lineHeight: 1.5,
            }}
          >
            {lead.goal || "No goal specified"}
          </div>

          {lead.challenge && (
            <div
              style={{
                fontSize: "12px",
                color: MUTED,
                fontFamily: "Inter, sans-serif",
                marginBottom: 6,
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              "{lead.challenge}"
            </div>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: "12px", color: MUTED, fontFamily: "Inter, sans-serif" }}>
            {lead.budget_per_hour && (
              <span>Budget: <strong>₹{lead.budget_per_hour}/hr</strong></span>
            )}
            {lead.location && (
              <span>📍 {lead.location}</span>
            )}
            <span>
              {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            {isMine && (
              <span style={{ color: GREEN, fontWeight: 500 }}>· Your lead</span>
            )}
          </div>

          {lead.email && (
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${LINE}`, fontSize: "12px", color: MUTED, fontFamily: "Inter, sans-serif" }}>
              <a
                href={`mailto:${lead.email}`}
                style={{ color: INK_SOFT, textDecoration: "none" }}
              >
                {lead.email}
              </a>
              {" · "}
              <a
                href={`tel:${lead.phone}`}
                style={{ color: INK_SOFT, textDecoration: "none" }}
              >
                {lead.phone}
              </a>
            </div>
          )}
        </div>

        <div style={{ flexShrink: 0 }}>
          <LeadActions
            lead={lead}
            tutorId={tutorId}
            pendingRequests={pendingRequests}
          />
        </div>
      </div>
    </div>
  );
}

function LeadActions({
  lead,
  tutorId,
  pendingRequests,
}: {
  lead: any;
  tutorId: string;
  pendingRequests: any[];
}) {
  const isMine =
    (lead.status === "new") ||
    (lead.assigned_tutor_id === tutorId && ["contacted", "matched"].includes(lead.status));
  const isArchived = lead.status === "archived";
  const hasResponse = pendingRequests.some((r) => r.session_id === lead.id || r.lead_id === lead.id);

  if (isArchived) {
    return (
      <div style={{ textAlign: "right", fontSize: "11px", color: MUTED, fontFamily: "Inter, sans-serif" }}>
        Declined
      </div>
    );
  }

  if (!isMine && lead.status !== "new") {
    return (
      <div style={{ textAlign: "right", fontSize: "11px", color: MUTED, fontFamily: "Inter, sans-serif" }}>
        Assigned to another tutor
      </div>
    );
  }

  if (lead.status === "new" && isMine) {
    return (
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <form method="POST" action="/api/leads" style={{ display: "inline" }}>
          <input type="hidden" name="action" value="decline-lead" />
          <input type="hidden" name="data" value={JSON.stringify({ id: lead.id })} />
          <button
            type="submit"
            style={{
              padding: "7px 12px",
              border: `1px solid ${RED}`,
              background: "transparent",
              color: RED,
              borderRadius: 6,
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${RED}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Decline
          </button>
        </form>
        <form method="POST" action="/api/leads" style={{ display: "inline" }}>
          <input type="hidden" name="action" value="accept-lead" />
          <input type="hidden" name="data" value={JSON.stringify({ id: lead.id })} />
          <button
            type="submit"
            style={{
              padding: "7px 14px",
              background: GREEN,
              color: PAPER,
              border: "none",
              borderRadius: 6,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 1px 2px rgba(47,82,51,0.2)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#25432a";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(47,82,51,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GREEN;
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(47,82,51,0.2)";
            }}
          >
            Accept
          </button>
        </form>
      </div>
    );
  }

  if (lead.status === "contacted" && isMine) {
    return (
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <a
          href={`/tutor/leads/${lead.id}`}
          style={{
            padding: "7px 14px",
            background: INK,
            color: PAPER,
            border: "none",
            borderRadius: 6,
            fontSize: "12px",
            fontWeight: 500,
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 1px 2px rgba(20,33,61,0.15)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = INK_SOFT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = INK;
          }}
        >
          View lead
        </a>
        {!hasResponse && (
          <span
            style={{
              fontSize: "11px",
              color: MUTED,
              fontFamily: "Inter, sans-serif",
              alignSelf: "center",
            }}
          >
            No testimonial requested yet
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
      <a
        href={`/tutor/leads/${lead.id}`}
        style={{
          padding: "7px 14px",
          background: INK,
          color: PAPER,
          border: "none",
          borderRadius: 6,
          fontSize: "12px",
          fontWeight: 500,
          textDecoration: "none",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 1px 2px rgba(20,33,61,0.15)",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = INK_SOFT;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = INK;
        }}
      >
        View lead
      </a>
    </div>
  );
}

function TestimonialRequestCard({
  request,
  tutorId,
}: {
  request: any;
  tutorId: string;
}) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 6,
        background: PAPER,
        border: `1px solid ${LINE}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: INK,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {request.student_name}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: MUTED,
              fontFamily: "Inter, sans-serif",
              marginTop: 1,
            }}
          >
            {request.session_status} · {new Date(request.scheduled_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </div>
          {request.student_email && (
            <div
              style={{
                fontSize: "11px",
                color: MUTED,
                fontFamily: "Inter, sans-serif",
                marginTop: 2,
              }}
            >
              <a href={`mailto:${request.student_email}`} style={{ color: INK_SOFT, textDecoration: "none" }}>
                {request.student_email}
              </a>
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: 10,
              fontSize: "10px",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              background: "rgba(138,90,0,0.08)",
              color: AMBER,
              border: `1px solid rgba(138,90,0,0.15)`,
            }}
          >
            Pending
          </span>
        </div>
      </div>
      {request.message && (
        <p
          style={{
            fontSize: "12px",
            color: INK_SOFT,
            margin: "8px 0 0",
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          "{request.message}"
        </p>
      )}
      <a
        href={`/tutor/leads/${request.session_id}`}
        style={{
          display: "block",
          marginTop: 8,
          fontSize: "12px",
          color: INK,
          textDecoration: "none",
          fontWeight: 500,
          fontFamily: "Inter, sans-serif",
        }}
      >
        View session →
      </a>
    </div>
  );
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hr`;
}
