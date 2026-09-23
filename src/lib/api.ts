import { signIn, signOut } from "next-auth/react";

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "tutor" | "admin";
  verified: boolean;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch("/api" + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    credentials: "same-origin",
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof body?.error === "string" ? body.error : "Request failed");
  }
  return body as T;
}

export async function apiRegister(
  data: { name: string; email: string; password: string; role: "student" | "tutor"; phone?: string },
): Promise<{ ok: boolean; user: ApiUser }> {
  const result = await apiFetch<{ success: boolean; user: ApiUser }>("/auth/general", {
    method: "POST",
    body: JSON.stringify({ action: "register", data }),
  });
  return { ok: result.success, user: result.user };
}

export async function apiLogin(data: { email: string; password: string }): Promise<{ ok: boolean }> {
  const result = await signIn("credentials", { ...data, redirect: false });
  if (!result?.ok) throw new Error("Invalid email or password");
  return { ok: true };
}

export async function apiGetSession(): Promise<{ user: ApiUser | null }> {
  const res = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
  return res.json();
}

export async function apiSignOut(): Promise<{ ok: boolean }> {
  await signOut({ redirect: false });
  return { ok: true };
}

export type Lead = {
  id: string;
  student_id: string;
  student_name: string | null;
  student_email: string | null;
  student_phone: string | null;
  subject: string;
  goal: string | null;
  current_level: string | null;
  challenge: string | null;
  budget_per_hour: number | null;
  requirements: string | null;
  experience_level: string | null;
  preferred_language: string | null;
  online_or_local: string | null;
  location: string | null;
  preferred_days: string | null;
  preferred_times: string | null;
  status: string;
  assigned_tutor_id: string | null;
  contacted_at: string | null;
  matched_at: string | null;
  rejected_at: string | null;
  created_at: string;
};

export function leadName(lead: Lead): string | null { return lead.student_name; }
export function leadEmail(lead: Lead): string | null { return lead.student_email; }
export function leadPhone(lead: Lead): string | null { return lead.student_phone; }

export async function apiCreateLead(data: Record<string, unknown>): Promise<{ ok: boolean; leadId: string }> {
  const result = await apiFetch<{ success: boolean; leadId: string }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "create-lead", data }),
  });
  return { ok: result.success, leadId: result.leadId };
}

export async function apiAcceptLead(id: string, _tutorId?: string): Promise<{ ok: boolean; message: string }> {
  const result = await apiFetch<{ success: boolean }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "accept-lead", data: { id } }),
  });
  return { ok: result.success, message: result.success ? "Lead accepted" : "Unable to accept lead" };
}

export async function apiDeclineLead(id: string, _tutorId?: string, reason?: string): Promise<{ ok: boolean; message: string }> {
  const result = await apiFetch<{ success: boolean }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "decline-lead", data: { id, reason } }),
  });
  return { ok: result.success, message: result.success ? "Lead declined" : "Unable to decline lead" };
}

export async function apiCreateSession(data: Record<string, unknown>): Promise<{ ok: boolean; session_id: string }> {
  const result = await apiFetch<{ success: boolean; sessionId: string }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "create-session", data }),
  });
  return { ok: result.success, session_id: result.sessionId };
}

export async function apiUpdateSession(id: string, data: Record<string, unknown>): Promise<{ ok: boolean }> {
  const result = await apiFetch<{ success: boolean }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "update-session", data: { id, ...data } }),
  });
  return { ok: result.success };
}

export async function apiGetLeads(_studentId?: string, _tutorId?: string): Promise<{ leads: Lead[] }> {
  return apiFetch("/leads", { method: "GET" });
}

export async function apiGetLead(id: string): Promise<{ lead: Lead }> {
  return apiFetch("/leads?id=" + encodeURIComponent(id), { method: "GET" });
}

export async function apiUpdateLead(id: string, data: Record<string, unknown>): Promise<{ ok: boolean; lead: Lead }> {
  const result = await apiFetch<{ success: boolean }>("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "update-lead", data: { id, ...data } }),
  });
  const current = await apiGetLead(id);
  return { ok: result.success, lead: current.lead };
}

export async function apiGetSessionsForTutor(_tutorId?: string): Promise<{ sessions: any[] }> {
  return apiFetch("/leads?resource=sessions", { method: "GET" });
}

export async function apiGetSessionsForStudent(_studentId?: string): Promise<{ sessions: any[] }> {
  return apiFetch("/leads?resource=sessions", { method: "GET" });
}

export async function apiGetTestimonialsForTutor(_recipientId?: string): Promise<{ testimonials: any[] }> {
  return apiFetch("/leads?resource=testimonials", { method: "GET" });
}

export async function apiGetTestimonialRequests(_recipientId?: string): Promise<{ requests: any[] }> {
  return apiFetch("/leads?resource=testimonial-requests", { method: "GET" });
}

export async function apiUpdateTutorProfile(_userId: string, profile: Record<string, unknown>): Promise<{ ok: boolean; profile: any }> {
  return apiFetch("/tutor/profile", { method: "POST", body: JSON.stringify(profile) });
}

export async function apiGetTutorProfile(): Promise<{ profile: any }> {
  return apiFetch("/tutor/profile", { method: "GET" });
}

export async function apiHealth(): Promise<{ ok: boolean }> {
  return apiFetch("/health", { method: "GET" });
}
