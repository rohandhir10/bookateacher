"use client";

import { SUBJECT_LABELS } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export type Lead = {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  subject: string;
  goal?: string | null;
  budget_per_hour?: number | null;
  preferred_days?: string[] | null;
  preferred_times?: string[] | null;
  online_or_local?: string | null;
  location?: string | null;
  current_level?: string | null;
  challenge?: string | null;
  status: string;
  assigned_tutor_id?: string | null;
  contacted_at?: string | null;
  matched_at?: string | null;
  converted_at?: string | null;
  closed_reason?: string | null;
  created_at?: string;
  updated_at?: string;
};

export function leadName(l: Lead): string { return l.name; }
export function leadEmail(l: Lead): string | null { return l.email ?? null; }
export function leadPhone(l: Lead): string { return l.phone; }

type Props = {
  lead: Lead;
  userEmail: string;
};

const STATUS_LABELS: Record<string, { title: string; subtitle: string; tone: "pending" | "active" | "done" }> = {
  new: {
    title: "We've received your request",
    subtitle: "A human is reviewing your requirements and finding the best fit.",
    tone: "pending",
  },
  contacted: {
    title: "A tutor is being assigned to you",
    subtitle: "We've identified a match. You'll hear from them shortly.",
    tone: "active",
  },
  matched: {
    title: "You're matched!",
    subtitle: "Your tutor has been confirmed. Check your session details below.",
    tone: "done",
  },
  converted: {
    title: "Session completed",
    subtitle: "Your session with this tutor is done. Book another or leave feedback.",
    tone: "done",
  },
  closed: {
    title: "Request closed",
    subtitle: "This match request has been closed.",
    tone: "pending",
  },
  archived: {
    title: "Archived",
    subtitle: "This request is archived.",
    tone: "pending",
  },
};

function StatusTone({ tone }: { tone: "pending" | "active" | "done" }) {
  if (tone === "done") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-soft text-success text-xs font-semibold">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Complete
      </div>
    );
  }
  if (tone === "active") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        In progress
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground-subtle/10 text-foreground-muted text-xs font-semibold">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Pending
    </div>
  );
}

function Timeline({ lead }: { lead: Lead }) {
  const steps: { key: string; label: string; description: string; time?: string | null; done: boolean }[] = [
    {
      key: "requested",
      label: "Request received",
      description: `${lead.name} submitted a request to find a ${SUBJECT_LABELS[lead.subject] ?? lead.subject} tutor.`,
      time: lead.created_at,
      done: true,
    },
    {
      key: "reviewing",
      label: "Being reviewed",
      description: "A human is checking your requirements and looking for available tutors.",
      time: null,
      done: lead.status !== "new",
    },
    {
      key: "contacted",
      label: "Tutor assigned",
      description: "A tutor has been matched to your request. You'll hear from them.",
      time: lead.contacted_at,
      done: lead.status === "contacted" || lead.status === "matched" || lead.status === "converted",
    },
    {
      key: "matched",
      label: "Matched & confirmed",
      description: "Your tutor is confirmed. Session details are shared with you.",
      time: lead.matched_at,
      done: lead.status === "matched" || lead.status === "converted",
    },
    {
      key: "converted",
      label: "Session completed",
      description: "The session happened. You can leave feedback or book again.",
      time: lead.converted_at,
      done: lead.status === "converted",
    },
  ];

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">Where your request is</h2>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    step.done
                      ? "bg-accent text-accent-fg"
                      : step.key === "reviewing" && lead.status === "new"
                      ? "bg-accent-soft text-accent border-2 border-accent"
                      : "bg-bg-tertiary text-foreground-muted"
                  }`}
                >
                  {step.done ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{i + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`text-sm font-medium ${step.done ? "text-foreground" : "text-foreground-muted"}`}>
                    {step.label}
                  </div>
                  {step.done && step.time && (
                    <span className="text-xs text-foreground-subtle">{formatDate(step.time)}</span>
                  )}
                </div>
                <p className="text-sm text-foreground-muted">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RequestSummary({ lead }: { lead: Lead }) {
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Your request</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Subject", value: SUBJECT_LABELS[lead.subject] ?? lead.subject },
          { label: "Name", value: lead.name },
          { label: "Goal", value: lead.goal ?? "—" },
          { label: "Budget", value: lead.budget_per_hour
            ? `₹${lead.budget_per_hour.toLocaleString("en-IN")}/hr`
            : "Not specified" },
          { label: "Current level", value: lead.current_level ?? "Not specified" },
          { label: "Online or local", value: lead.online_or_local === "online"
            ? "Online"
            : lead.online_or_local === "local"
            ? "In-person"
            : "Either" },
          { label: "Location", value: lead.location ?? "Not specified" },
          { label: "Preferred days", value: lead.preferred_days && lead.preferred_days.length > 0
            ? lead.preferred_days.map((d: string) => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(", ")
            : "Any day" },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-xs text-foreground-muted mb-0.5">{label}</div>
            <div className="text-sm text-foreground">{value}</div>
          </div>
        ))}
      </div>
      {lead.challenge && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-foreground-muted mb-1">What you're struggling with</div>
          <p className="text-sm text-foreground">{lead.challenge}</p>
        </div>
      )}
    </div>
  );
}

function WhatHappensNext({ lead }: { lead: Lead }) {
  const status = lead.status;

  const items = [
    {
      title: "We review your request",
      description: "A human checks your subject, goal, budget, and timing — not an algorithm.",
      active: status === "new",
    },
    {
      title: "We find the best fit",
      description: "We look at available tutors and pair you with the one whose experience matches what you need.",
      active: status === "new" || status === "contacted",
    },
    {
      title: "You hear from your tutor",
      description: "Your matched tutor reaches out to confirm the time and get started.",
      active: status === "contacted" || status === "matched",
    },
    {
      title: "You book and start",
      description: "Chat with your tutor, confirm the session, and book. Payment is simple — UPI, cards.",
      active: status === "matched" || status === "converted",
    },
  ];

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">What happens next</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className={`flex gap-3 p-3 rounded-lg ${
              item.active
                ? "bg-accent-soft/40 border border-accent border-opacity-30"
                : "bg-bg-secondary/40 border border-transparent"
            }`}
          >
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
              item.active ? "bg-accent text-accent-fg" : "bg-bg-tertiary text-foreground-muted"
            }`}>
              {item.active ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              <div className="text-xs text-foreground-muted mt-0.5">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTABand({ lead, userEmail }: Props) {
  const status = lead.status;
  return (
    <div className="card p-6 sm:p-8 bg-accent text-accent-fg rounded-2xl text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-3">
        {status === "new" || status === "contacted"
          ? "Want to skip the wait?"
          : "Ready for your next session?"}
      </h2>
      <p className="text-accent-soft max-w-md mx-auto mb-6 leading-relaxed text-sm sm:text-base">
        {status === "new" || status === "contacted"
          ? "Browse verified tutors and book directly — no waiting for a match."
          : "Your matched tutor is confirmed. Chat, book, and start learning."}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {status === "matched" || status === "converted" ? (
          <a
            href="/dashboard"
            className="bg-accent-fg text-accent hover:bg-accent-hover px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            Go to dashboard
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        ) : (
          <a
            href="/register?role=student"
            className="bg-accent-fg text-accent hover:bg-accent-hover px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            Browse tutors now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
        <a
          href="/dashboard"
          className="bg-accent-fg/10 text-accent-fg border border-accent-fg/20 hover:bg-accent-fg/20 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          My dashboard
        </a>
      </div>
      <p className="text-accent-soft/70 text-xs mt-4">
        No commitment. No hidden fees. Cancel anytime.
      </p>
    </div>
  );
}

export function MatchingStatusContent({ lead, userEmail }: Props) {
  const statusMeta = STATUS_LABELS[lead.status] ?? {
    title: "Your request",
    subtitle: "",
    tone: "pending",
  };

  return (
    <div className="container py-8 max-w-3xl">
      {/* Status header */}
      <div className="mb-8 text-center">
        <StatusTone tone={statusMeta.tone} />
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-4 mb-2 tracking-tight">
          {statusMeta.title}
        </h1>
        <p className="text-foreground-muted max-w-md mx-auto">
          {statusMeta.subtitle}
        </p>
        <p className="text-xs text-foreground-subtle mt-3">
          Request ID: {lead.id} · {lead.email ?? userEmail}
        </p>
      </div>

      {/* Request summary */}
      <RequestSummary lead={lead} />

      {/* Timeline */}
      <Timeline lead={lead} />

      {/* What happens next */}
      <WhatHappensNext lead={lead} />

      {/* CTA */}
      <div className="mt-8">
        <CTABand lead={lead} userEmail={userEmail} />
      </div>
    </div>
  );
}
