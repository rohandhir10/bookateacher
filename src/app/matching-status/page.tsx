import { Metadata } from "next";
import { getLeadById } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MatchingStatusContent } from "./MatchingStatusContent";

export const metadata: Metadata = {
  title: "Your match request | bookateacher.in",
  description: "Track the status of your tutor match request.",
};

export const dynamic = "force-dynamic";

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
    <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a
          href="/"
          className="flex items-center gap-2 font-semibold text-lg tracking-tight"
        >
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#14213D" />
            <path d="M8 11h16M8 16h12M8 21h8"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span>
            bookateacher
            <span className="text-sm text-foreground-subtle font-normal">.in</span>
          </span>
        </a >
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="btn btn-ghost btn-sm">
            Dashboard
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
  );
}
