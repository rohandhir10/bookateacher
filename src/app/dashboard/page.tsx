import { getServerSession } from "@/lib/session";
import { apiGetSessionsForStudent, apiGetLeads } from "@/lib/api";
import { redirect } from "next/navigation";
import { SUBJECT_LABELS } from "@/lib/utils";

export default async function StudentDashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const userId = session.user.id;
  const [sessionsRes, leadsRes] = await Promise.all([
    apiGetSessionsForStudent(userId),
    apiGetLeads(userId),
  ]);

  const sessions = sessionsRes.sessions ?? [];
  const leads = leadsRes.leads ?? [];
  const activeLead = leads[0];

  return (
    <div className="min-h-screen bg-bg-primary">
      <StudentDashboardLayout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Your dashboard
              </h1>
              <p className="text-foreground-muted mt-1">
                Manage your sessions and track your progress.
              </p>
            </div>
          </div>

          {/* Overview cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Total sessions</div>
              <div className="text-2xl font-bold text-foreground">{sessions.length}</div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Completed</div>
              <div className="text-2xl font-bold text-success">
                {sessions.filter((s) => s.status === "completed").length}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-sm text-foreground-muted mb-1">Upcoming</div>
              <div className="text-2xl font-bold text-accent">
                {sessions.filter(
                  (s) => s.status === "scheduled" &&
                         new Date(s.scheduled_at) > new Date(),
                ).length}
              </div>
            </div>
          </div>

          {/* Matching status card */}
          {activeLead && (
            <a
              href={`/matching-status?leadId=${activeLead.id}`}
              className="block card p-6 sm:p-8 bg-accent-soft border border-accent border-opacity-30 hover:bg-accent-soft hover:border-accent hover:border-opacity-50 transition-all mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-fg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground truncate">
                      Track your match request
                    </h2>
                    <span className={`text-xs font-semibold ${
                      activeLead.status === "new"
                        ? "bg-foreground-subtle/10 text-foreground-muted"
                        : activeLead.status === "contacted"
                        ? "bg-accent-soft text-accent"
                        : "bg-success-soft text-success"
                    } px-2 py-0.5 rounded-full`}>
                      {activeLead.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-muted mt-1">
                    {activeLead.status === "new"
                      ? "A human is reviewing your request. Track progress here."
                      : activeLead.status === "contacted"
                      ? "A tutor is being assigned. See where things stand."
                      : "Your match is confirmed. Check the details."}
                  </p>
                  <p className="text-xs text-foreground-subtle mt-2">
                    Requested {activeLead.created_at ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(activeLead.created_at)) : ""}
                    · {activeLead.subject === "ielts" || activeLead.subject === "toefl"
                      ? activeLead.subject
                      : SUBJECT_LABELS[activeLead.subject] ?? activeLead.subject}
                  </p>
                </div>
              </div>
            </a>
          )}

          {/* Sessions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your sessions
            </h2>

            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-foreground-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-medium text-foreground mb-1">No sessions yet</h3>
                <p className="text-sm text-foreground-muted mb-4">
                  Book your first session to start learning.
                </p>
                <a href="/register?role=student" className="btn btn-primary">
                  Find a tutor
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {session.tutor_name}
                        </span>
                        <span
                          className={`badge ${
                            session.status === "completed"
                              ? "bg-success-soft text-success"
                              : session.status === "scheduled"
                              ? "bg-accent-soft text-accent"
                              : session.status === "cancelled"
                              ? "bg-error-soft text-error"
                              : "bg-bg-tertiary text-foreground-muted"
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>
                      <div className="text-sm text-foreground-muted mt-0.5">
                        {formatDateTime(session.scheduled_at)} ·
                        {formatDuration(session.duration_minutes)}
                      </div>
                      {session.meeting_link && (
                        <a
                          href={session.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:underline mt-1 inline-block"
                        >
                          Join session →
                        </a>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-foreground-muted">
                        {session.payment_status === "paid" ? (
                          <span className="text-success">Paid</span>
                        ) : session.payment_status === "free" ? (
                          <span className="text-foreground-muted">Free</span>
                        ) : (
                          <span className="text-warning">Pending</span>
                        )}
                      </div>
                      {session.rating && (
                        <div className="text-xs text-foreground-subtle mt-0.5">
                          ★ {session.rating}/5
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </StudentDashboardLayout>
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
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

function StudentDashboardLayout({
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
              <rect width="32" height="32" rx="8" fill="#14213D" />
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
            <a href="/register?role=tutor" className="btn btn-ghost btn-sm">
              Become a tutor
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
