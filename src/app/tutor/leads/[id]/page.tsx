import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLeadById, updateLead, getUserById, recordAdminAction } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const lead = getLeadById(id);

  if (!lead) notFound();

  const user = session.user as { role: string };
  if (user.role !== "tutor") redirect("/dashboard");

  updateLead(id, { status: "contacted", contacted_at: new Date().toISOString() });
  recordAdminAction(session.user.id, "viewed_lead", "lead", id, { leadId: id });

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
    <div className="min-h-screen bg-bg-primary">
      <TutorDashboardLayout>
        <div className="container py-8 max-w-3xl">
          <a
            href="/tutor/dashboard"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </a>

          <div className="card p-6">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-xl font-bold text-foreground">Lead details</h1>
              <p className="text-sm text-foreground-muted mt-1">
                Lead submitted {new Date(lead.created_at).toLocaleString("en-IN")}
              </p>
              <span
                className={`badge ${
                  lead.status === "new"
                    ? "bg-accent-soft text-accent"
                    : lead.status === "contacted"
                    ? "bg-success-soft text-success"
                    : "bg-bg-tertiary text-foreground-muted"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-bg-secondary border border-border">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Contact information
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Name</span>
                    <span className="text-sm font-medium text-foreground">{lead.name}</span>
                  </div>
                  {lead.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Email</span>
                      <a href={`mailto:${lead.email}`} className="text-sm text-accent hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Phone</span>
                    <a href={`tel:${lead.phone}`} className="text-sm text-accent hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-bg-secondary border border-border">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  What they&apos;re looking for
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Subject</span>
                    <span className="text-sm font-medium text-foreground">
                      {subjectLabels[lead.subject] || lead.subject}
                    </span>
                  </div>
                  {lead.goal && (
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-foreground-muted mt-0.5">Goal:</span>
                      <span>{lead.goal}</span>
                    </div>
                  )}
                  {lead.current_level && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Level</span>
                      <span className="text-sm text-foreground">{lead.current_level}</span>
                    </div>
                  )}
                  {lead.challenge && (
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-foreground-muted mt-0.5">Challenge:</span>
                      <span>{lead.challenge}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-bg-secondary border border-border">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Preferences
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Budget</span>
                    <span className="text-sm font-medium text-foreground">
                      {lead.budget_per_hour
                        ? `₹${lead.budget_per_hour.toLocaleString("en-IN")}/hr`
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Mode</span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {lead.online_or_local}
                    </span>
                  </div>
                  {lead.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground-muted">Location</span>
                      <span className="text-sm text-foreground">{lead.location}</span>
                    </div>
                  )}
                  {(lead.preferred_days || lead.preferred_times) && (
                    <>
                      {lead.preferred_days && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground-muted">Days</span>
                          <span className="text-sm text-foreground capitalize">
                            {lead.preferred_days
                              .map(
                                (d: string) =>
                                  d.charAt(0).toUpperCase() + d.slice(1, 3),
                              )
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      {lead.preferred_times && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground-muted">Times</span>
                          <span className="text-sm text-foreground capitalize">
                            {lead.preferred_times.join(", ")}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <a href={`tel:${lead.phone}`} className="btn btn-primary flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.227 1.11A3 3 0 016 18c0 1.1-.9 2-2 2h-1.28a1 1 0 01-.948-.684L3.498 9.21A1 1 0 013 8.21V5z" />
                  </svg>
                  Call now
                </a>
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="btn btn-secondary flex items-center gap-2 ml-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </TutorDashboardLayout>
    </div>
  );
}

function TutorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 font-semibold text-lg">
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
            <a href="/tutor/dashboard" className="btn btn-ghost btn-sm">Dashboard</a>
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
