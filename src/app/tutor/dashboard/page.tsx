import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { getServerSession } from "@/lib/session";
import {
  getLeads,
  getSessionsForTutor,
  getTestimonialsForTutor,
  getPendingTestimonialRequests,
  getUserById,
} from "@/lib/db";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const RED = "#B23A2E";
const AMBER = "#8A5A00";

export default async function TutorDashboardPage() {
  const session = await getServerSession();
  if (!session.user) redirect("/login");
  if (session.user.role !== "tutor") redirect("/dashboard");

  const tutorId = session.user.id;
  const [allLeads, sessions, testimonials, pendingRequests, profile] = await Promise.all([
    getLeads(),
    getSessionsForTutor(tutorId),
    getTestimonialsForTutor(tutorId),
    getPendingTestimonialRequests(tutorId),
    getUserById(tutorId),
  ]);

  const leads = allLeads.filter(
    (lead: any) =>
      lead.status === "new" ||
      lead.assigned_tutor_id === tutorId,
  );

  const user = {
    id: tutorId,
    role: "tutor",
    verified: session.user.verified,
  };

  return (
    <DashboardShell
      role="tutor"
      userName={session.user.name}
      verified={session.user.verified}
    >

        <div className="dashboard-hero">
          <div>
            <span className="dashboard-eyebrow">Tutor dashboard</span>
            <h1 className="dashboard-title">Run your teaching workspace from one place.</h1>
            <p className="dashboard-copy">
              See new leads, upcoming sessions and learner feedback without the
              visual clutter of a traditional admin dashboard.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span className={user.verified ? "dashboard-status dashboard-status-success" : "dashboard-status dashboard-status-warning"}>
              <span className="dashboard-status-dot" />
              {user.verified ? "Profile verified" : "Verification pending"}
            </span>
            <a href="/tutor/profile" className="btn btn-primary">Edit profile <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <section className="dashboard-stats" aria-label="Tutor overview">
          <article className="dashboard-stat">
            <div className="dashboard-stat-label">New leads</div>
            <div className="dashboard-stat-value">{leads.filter((l) => l.status === "new").length}</div>
            <div className="dashboard-panel-copy">Awaiting your response</div>
          </article>
          <article className="dashboard-stat">
            <div className="dashboard-stat-label">Upcoming</div>
            <div className="dashboard-stat-value">{sessions.filter((s) => s.status === "scheduled").length}</div>
            <div className="dashboard-panel-copy">Scheduled sessions</div>
          </article>
          <article className="dashboard-stat">
            <div className="dashboard-stat-label">Completed</div>
            <div className="dashboard-stat-value">{sessions.filter((s) => s.status === "completed").length}</div>
            <div className="dashboard-panel-copy">Lessons completed</div>
          </article>
          <article className="dashboard-stat">
            <div className="dashboard-stat-label">Average rating</div>
            <div className="dashboard-stat-value">
              {testimonials.length ? (testimonials.reduce((sum, item) => sum + Number(item.rating || 0), 0) / testimonials.length).toFixed(1) : "—"}
            </div>
            <div className="dashboard-panel-copy">{testimonials.length} review{testimonials.length === 1 ? "" : "s"}</div>
          </article>
        </section>

        {/* Two-column layout: leads + sidebar */}
        <div className="dashboard-two-column">
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
                  <span
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
                  </span>
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
    </DashboardShell>
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
