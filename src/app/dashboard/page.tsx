import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { getServerSession } from "@/lib/session";
import { getLeadsForStudent, getSessionsForStudent } from "@/lib/db";
import { SUBJECT_LABELS } from "@/lib/utils";

export default async function StudentDashboardPage() {
  const session = await getServerSession();
  if (!session.user) redirect("/login");
  if (session.user.role !== "student") redirect("/tutor/dashboard");

  const [sessions, leads] = await Promise.all([
    getSessionsForStudent(session.user.id),
    getLeadsForStudent(session.user.email),
  ]);

  const upcoming = sessions.filter(
    (item: any) => item.status === "scheduled" && new Date(item.scheduled_at) > new Date(),
  );
  const completed = sessions.filter((item: any) => item.status === "completed");
  const activeLead = leads[0] ?? null;

  return (
    <DashboardShell role="student" userName={session.user.name}>
      <div className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">Student dashboard</span>
          <h1 className="dashboard-title">A clearer view of what comes next.</h1>
          <p className="dashboard-copy">
            Track your tutor search, upcoming sessions and learning history without
            digging through a crowded admin screen.
          </p>
        </div>
        <Link className="btn btn-primary" href="/tutors">
          Find a tutor
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <section className="dashboard-stats" aria-label="Learning overview">
        <article className="dashboard-stat">
          <div className="dashboard-stat-label">Upcoming</div>
          <div className="dashboard-stat-value">{upcoming.length}</div>
        </article>
        <article className="dashboard-stat">
          <div className="dashboard-stat-label">Completed</div>
          <div className="dashboard-stat-value">{completed.length}</div>
        </article>
        <article className="dashboard-stat">
          <div className="dashboard-stat-label">Total sessions</div>
          <div className="dashboard-stat-value">{sessions.length}</div>
        </article>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <h2 className="dashboard-panel-title">Your tutor search</h2>
            <p className="dashboard-panel-copy">
              Keep your current request visible while you compare the directory.
            </p>
          </div>
          {activeLead && (
            <span className="dashboard-pill">{activeLead.status}</span>
          )}
        </div>

        {!activeLead ? (
          <div className="dashboard-empty">
            <h3>Nothing in progress yet.</h3>
            <p>
              Browse current tutor profiles first, then create a request when you
              know what kind of help you need.
            </p>
            <Link href="/tutors" className="btn btn-primary">Browse tutors</Link>
          </div>
        ) : (
          <div className="dashboard-list-item">
            <div>
              <strong>
                {SUBJECT_LABELS[activeLead.subject] ?? activeLead.subject}
              </strong>
              <div style={{ marginTop: 5 }}>
                <span>
                  Requested{" "}
                  {activeLead.created_at
                    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(activeLead.created_at))
                    : ""}
                </span>
              </div>
            </div>
            <Link
              href={`/matching-status?leadId=${activeLead.id}`}
              className="btn btn-secondary"
            >
              View request
            </Link>
          </div>
        )}
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <h2 className="dashboard-panel-title">Upcoming sessions</h2>
            <p className="dashboard-panel-copy">
              Your next lessons, in one calm list.
            </p>
          </div>
        </div>

        {upcoming.length === 0 ? (
          <div className="dashboard-empty">
            <h3>No upcoming sessions.</h3>
            <p>
              Once you book a lesson, the date, tutor and session link will appear here.
            </p>
            <Link href="/tutors" className="btn btn-secondary">Explore tutors</Link>
          </div>
        ) : (
          <div className="dashboard-list">
            {upcoming.map((item: any) => (
              <article className="dashboard-list-item" key={item.id}>
                <div>
                  <strong>{item.tutor_name ?? "Your tutor"}</strong>
                  <div style={{ marginTop: 5 }}>
                    <span>
                      {formatDateTime(item.scheduled_at)} · {formatDuration(item.duration_minutes)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="dashboard-pill">scheduled</span>
                  {item.meeting_link && (
                    <a
                      className="btn btn-primary"
                      href={item.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <h2 className="dashboard-panel-title">Session history</h2>
            <p className="dashboard-panel-copy">
              A simple record of what you have already completed.
            </p>
          </div>
        </div>

        {completed.length === 0 ? (
          <div className="dashboard-empty">
            <h3>Your history will build here.</h3>
            <p>Completed lessons, ratings and feedback will stay together in one place.</p>
          </div>
        ) : (
          <div className="dashboard-list">
            {completed.slice(0, 8).map((item: any) => (
              <article className="dashboard-list-item" key={item.id}>
                <div>
                  <strong>{item.tutor_name ?? "Your tutor"}</strong>
                  <div style={{ marginTop: 5 }}>
                    <span>
                      {formatDateTime(item.scheduled_at)} · {formatDuration(item.duration_minutes)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gap: 5, justifyItems: "end" }}>
                  <span className="dashboard-pill">completed</span>
                  {item.rating ? <span>★ {item.rating}/5</span> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardShell>
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
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours} hr`;
}
