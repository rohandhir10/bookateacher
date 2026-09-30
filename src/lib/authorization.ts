import type { Session } from "next-auth";

export type Actor = {
  id: string;
  email: string;
  role: "student" | "tutor" | "admin";
};

export function toActor(sessionUser: Session["user"]): Actor {
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    role: sessionUser.role,
  };
}

export function canReadLead(actor: Actor, lead: any): boolean {
  if (actor.role === "admin") return true;
  if (actor.role === "tutor") {
    return lead.assigned_tutor_id === actor.id || lead.status === "new";
  }
  return lead.student_id === actor.id ||
    (actor.role === "student" &&
      !lead.student_id &&
      typeof lead.email === "string" &&
      lead.email.toLowerCase() === actor.email.toLowerCase());
}

export function canUpdateLead(actor: Actor, lead: any): boolean {
  if (actor.role === "admin") return true;
  if (actor.role === "tutor") return lead.assigned_tutor_id === actor.id;
  return lead.student_id === actor.id && !["matched", "converted", "closed", "archived"].includes(lead.status);
}

export function canCreateSession(
  actor: Actor,
  lead: any,
  tutorId: string,
  studentId: string,
): boolean {
  if (actor.role === "admin") return true;
  if (lead.assigned_tutor_id !== tutorId) return false;
  if (actor.role === "tutor") return actor.id === tutorId;
  if (actor.role === "student") {
    const ownsLead =
      lead.student_id === studentId ||
      (!lead.student_id &&
        typeof lead.email === "string" &&
        lead.email.toLowerCase() === actor.email.toLowerCase());
    return ownsLead && actor.id === studentId;
  }
  return false;
}

export function canUpdateSession(actor: Actor, session: any): boolean {
  return actor.role === "admin" || (actor.role === "tutor" && session.tutor_id === actor.id);
}

export function canCompleteSession(actor: Actor, session: any): boolean {
  return actor.role === "admin" || (actor.role === "tutor" && session.tutor_id === actor.id);
}

export function canRequestTestimonial(actor: Actor, session: any): boolean {
  return actor.role === "tutor" && session.tutor_id === actor.id && session.status === "completed";
}

export function canPublishTestimonial(actor: Actor, request: any): boolean {
  return actor.role === "tutor" && request.tutor_id === actor.id && request.status === "received";
}

export function sanitizeLeadUpdates(actor: Actor, updates: Record<string, unknown>): Record<string, unknown> {
  const allowedByRole: Record<Actor["role"], Set<string>> = {
    admin: new Set([
      "student_id", "email", "goal", "budget_per_hour", "preferred_days", "preferred_times",
      "online_or_local", "location", "current_level", "challenge", "status",
      "assigned_tutor_id", "contacted_at", "matched_at", "converted_at", "closed_reason",
    ]),
    tutor: new Set([
      "status", "contacted_at", "matched_at", "converted_at", "closed_reason",
    ]),
    student: new Set([
      "goal", "budget_per_hour", "preferred_days", "preferred_times",
      "online_or_local", "location", "current_level", "challenge",
    ]),
  };

  const allowed = allowedByRole[actor.role];
  return Object.fromEntries(Object.entries(updates).filter(([key]) => allowed.has(key)));
}

export function sanitizeSessionUpdates(actor: Actor, updates: Record<string, unknown>): Record<string, unknown> {
  const allowedByRole: Record<Actor["role"], Set<string>> = {
    admin: new Set([
      "tutor_id", "student_id", "scheduled_at", "duration_minutes", "status",
      "notes", "meeting_link", "payment_status", "paid_at", "rating", "feedback",
    ]),
    tutor: new Set([
      "scheduled_at", "duration_minutes", "status", "notes", "meeting_link",
    ]),
    student: new Set(),
  };

  const allowed = allowedByRole[actor.role];
  return Object.fromEntries(Object.entries(updates).filter(([key]) => allowed.has(key)));
}
