import type { Session } from "next-auth";

export type Actor = {
  id: string;
  role: "student" | "tutor" | "admin";
};

export function toActor(sessionUser: Session["user"]): Actor {
  return {
    id: sessionUser.id,
    role: sessionUser.role,
  };
}

export function canReadLead(actor: Actor, lead: any): boolean {
  if (actor.role === "admin") return true;
  if (actor.role === "tutor") {
    return lead.assigned_tutor_id === actor.id || lead.status === "new";
  }
  return lead.student_id === actor.id;
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
  if (lead.assigned_tutor_id !== tutorId || lead.student_id !== studentId) return false;
  if (actor.role === "tutor") return actor.id === tutorId;
  if (actor.role === "student") return actor.id === studentId;
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
