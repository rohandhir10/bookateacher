import { auth } from "@/lib/auth";
import { getLeads, getSessionsForTutor, getTestimonialsForTutor, getUserById } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function TutorDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = session.user as { id: string; role: string; verified?: number };
  if (user.role !== "tutor") redirect("/dashboard");

  const leads = getLeads({ status: "new", limit: 10 });
  const sessions = getSessionsForTutor(user.id, { limit: 10 });
  const testimonials = getTestimonialsForTutor(user.id);
  const profile = getUserById(user.id);

  const newLeadsCount = getLeads({ status: "new" }).length;
  const activeSessionsCount = sessions.filter((s) => s.status === "scheduled").length;
  const completedSessionsCount = sessions.filter((s) => s.status === "completed").length;
  const avgRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : null;

  return (
    <div className="min-h-screen bg-bg-primary">
      <TutorDashboardLayout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tutor dashboard
              </h1>
              <p className="text-foreground-muted mt-1">
                Manage your leads, sessions, and profile.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {user.verified ? (
                <span className="badge bg-success-soft text-success">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified tutor
                </span>
              ) : (
                <span className="badge bg-warning-soft text-warning">
                  Pending verification
                </span>
              )}
              <a href="/tutor/profile" className="btn btn-secondary btn-sm">
                Edit profile
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">New leads</div>
              <div className="text-2xl font-bold text-accent">{newLeadsCount}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Active sessions</div>
              <div className="text-2xl font-bold text-foreground">{activeSessionsCount}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Completed</div>
              <div className="text-2xl font-bold text-success">{completedSessionsCount}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Avg rating</div>
              <div className="text-2xl font-bold text-foreground">
                {avgRating !== null ? `${avgRating.toFixed(1)}★` : "—"}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Leads */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  New leads
                </h2>
                <span className="text-sm text-foreground-muted">
                  {newLeadsCount} waiting
                </span>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-foreground-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 7v2m0 0v2m0-2h2m-2 0H7" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">No new leads</h3>
                  <p className="text-sm text-foreground-muted">
                    New student inquiries will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-lg bg-bg-secondary border border-border"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-foreground">
                            {lead.name}
                          </div>
                          <div className="text-sm text-foreground-muted mt-0.5">
                            {lead.subject} · {lead.online_or_local}
                            {lead.location ? ` · ${lead.location}` : ""}
                          </div>
                          <div className="text-xs text-foreground-subtle mt-1">
                            {lead.challenge || "No specific challenge mentioned"}
                          </div>
                          {lead.budget_per_hour && (
                            <div className="text-xs text-foreground-subtle mt-1">
                              Budget: ₹{lead.budget_per_hour}/hr
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-foreground-subtle">
                            {new Date(lead.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        <a
                          href={`/tutor/leads/${lead.id}`}
                          className="btn btn-primary btn-sm flex-1"
                        >
                          View lead
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile summary */}
              <div className="card p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Your profile
                </h3>
                {profile && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-sm font-semibold text-accent">
                        {profile.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {profile.name}
                        </div>
                        <div className="text-xs text-foreground-muted">
                          {profile.email}
                        </div>
                      </div>
                    </div>
                    {profile.hourly_rate && (
                      <div className="text-sm text-foreground-muted">
                        ₹{profile.hourly_rate}/hr
                      </div>
                    )}
                    {profile.subjects && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(() => {
                          try {
                            const subjects: string[] = JSON.parse(profile.subjects || "[]");
                            return subjects.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="badge bg-bg-tertiary text-foreground-muted text-xs"
                              >
                                {s}
                              </span>
                            ));
                          } catch {
                            return null;
                          }
                        })()}
                      </div>
                    )}
                    {user.verified && (
                      <div className="mt-2 text-xs text-success font-medium">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                )}
                <a
                  href="/tutor/profile"
                  className="btn btn-ghost btn-sm w-full mt-3"
                >
                  Edit profile
                </a>
              </div>

              {/* Recent testimonials */}
              {testimonials.length > 0 && (
                <div className="card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Recent reviews
                  </h3>
                  <div className="space-y-3">
                    {testimonials.slice(0, 3).map((t) => (
                      <div key={t.id} className="p-3 rounded-lg bg-bg-secondary">
                        <div className="flex items-center gap-1 text-accent mb-1">
                          {"★".repeat(t.rating)}
                          {"★".repeat(5 - t.rating)}
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {t.text}
                        </p>
                        <div className="text-xs text-foreground-subtle mt-1">
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
                  .filter(
                    (s) =>
                      s.status === "scheduled" &&
                      new Date(s.scheduled_at) > new Date(),
                  )
                  .slice(0, 3);
                return upcoming.length > 0 ? (
                  <div className="card p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Upcoming sessions
                    </h3>
                    <div className="space-y-2">
                      {upcoming.map((s) => (
                        <div
                          key={s.id}
                          className="p-2 rounded bg-bg-secondary"
                        >
                          <div className="text-xs text-foreground-subtle">
                            {new Date(s.scheduled_at).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                          <div className="text-sm font-medium text-foreground">
                            {formatDateTime(s.scheduled_at)}
                          </div>
                          <div className="text-xs text-foreground-muted">
                            {formatDuration(s.duration_minutes)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}

              {/* View all sessions */}
              <a
                href="/tutor/sessions"
                className="card p-4 block hover:shadow-md transition-shadow"
              >
                <div className="text-sm font-semibold text-foreground mb-1">
                  All sessions
                </div>
                <div className="text-xs text-foreground-muted">
                  {sessions.length} total ·{" "}
                  {completedSessionsCount} completed
                </div>
                <svg className="w-4 h-4 text-foreground-subtle mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </TutorDashboardLayout>
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hr`;
}

function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 11h16M8 16h12M8 21h8"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">
              bookateacher
              <span className="text-sm text-foreground-subtle font-normal">.in</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="btn btn-ghost btn-sm">
              Home
            </a>
            <form action="/api/auth/signout" method="POST" className="inline">
              <button
                type="submit"
                className="btn btn-ghost btn-sm text-foreground-muted hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
