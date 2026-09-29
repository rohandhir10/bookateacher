import Link from "next/link";

export function DashboardShell({
  role,
  userName,
  verified,
  children,
}: {
  role: "student" | "tutor";
  userName: string;
  verified?: boolean;
  children: React.ReactNode;
}) {
  const firstName = userName.split(" ")[0] || "there";

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link href="/" className="brand dashboard-brand" aria-label="bookateacher.in home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h11M4 17h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-word">bookateacher<span>.in</span></span>
        </Link>

        <div className="dashboard-sidebar-copy">
          <span className="dashboard-kicker">{role === "tutor" ? "Tutor workspace" : "Learning workspace"}</span>
          <strong>Hi, {firstName}.</strong>
          <span>{role === "tutor" ? "Manage your teaching business." : "Keep your learning moving."}</span>
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <Link href={role === "tutor" ? "/tutor/dashboard" : "/dashboard"} className="dashboard-nav-link">
            <span aria-hidden="true">↗</span>
            Overview
          </Link>
          {role === "student" ? (
            <>
              <Link href="/tutors" className="dashboard-nav-link">
                <span aria-hidden="true">⌕</span>
                Find a tutor
              </Link>
              <Link href="/matching-status" className="dashboard-nav-link">
                <span aria-hidden="true">◷</span>
                Match request
              </Link>
            </>
          ) : (
            <>
              <Link href="/tutor/profile" className="dashboard-nav-link">
                <span aria-hidden="true">◎</span>
                My profile
              </Link>
              <Link href="/tutors" className="dashboard-nav-link">
                <span aria-hidden="true">↗</span>
                Public directory
              </Link>
            </>
          )}
        </nav>

        <div className="dashboard-sidebar-bottom">
          {role === "tutor" && verified !== undefined && (
            <span className={verified ? "dashboard-status dashboard-status-success" : "dashboard-status dashboard-status-warning"}>
              <span className="dashboard-status-dot" />
              {verified ? "Profile verified" : "Verification pending"}
            </span>
          )}
          <Link href="/" className="dashboard-home-link">Back to website</Link>
          <form action="/api/auth/signout" method="POST">
            <input type="hidden" name="callbackUrl" value="/" />
            <button type="submit" className="dashboard-signout">Sign out</button>
          </form>
        </div>
      </aside>

      <main id="main-content" className="dashboard-main">
        <div className="dashboard-mobile-top">
          <Link href="/" className="brand" aria-label="bookateacher.in home">
            <span className="brand-mark" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h11M4 17h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
              </svg>
            </span>
            <span className="brand-word">bookateacher<span>.in</span></span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <input type="hidden" name="callbackUrl" value="/" />
            <button type="submit" className="dashboard-mobile-signout">Sign out</button>
          </form>
        </div>

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
