// bookateacher — API client for Railway backend
// All frontend calls to the backend go through here.
//
// BACKEND_URL env var must be set to the Railway backend URL, e.g.
//   https://bookateacher-xxx.railway.app
//
// Legacy mode: if BACKEND_URL is not set, calls go to the local Next.js
// API routes (/api/*). Set BACKEND_URL to migrate to Railway.

const BACKEND_URL =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "tutor" | "admin";
  verified: boolean;
}

// ─── Cookie helpers ────────────────────────────────────────────────────────────

export function getSessionCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  for (const c of cookies) {
    if (c.startsWith("bookateacher_session=")) {
      return c;
    }
  }
  return undefined;
}

export function setSessionCookie(token: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `bookateacher_session=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
}

export function clearSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = "bookateacher_session=; path=/; max-age=0; SameSite=Lax";
}

// ─── Fetch wrapper ─────────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${BACKEND_URL}/api${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> ?? {}),
  };

  // Attach session cookie on client side
  if (typeof document !== "undefined") {
    const sessionCookie = getSessionCookie();
    if (sessionCookie) {
      headers["Cookie"] = sessionCookie;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error as string ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

export async function apiRegister(
  data: { name: string; email: string; password: string; role: "student" | "tutor" },
): Promise<{ ok: boolean; user: ApiUser; session_token: string }> {
  const result = await apiFetch<{ ok: boolean; user: ApiUser; session_token: string }>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ action: "register", data }),
    },
  );
  if (result.ok && result.session_token) {
    setSessionCookie(result.session_token);
  }
  return result;
}

export async function apiLogin(
  data: { email: string; password: string },
): Promise<{ ok: boolean; user: ApiUser; session_token: string }> {
  const result = await apiFetch<{ ok: boolean; user: ApiUser; session_token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ action: "login", data }),
    },
  );
  if (result.ok && result.session_token) {
    setSessionCookie(result.session_token);
  }
  return result;
}

export async function apiVerifyCredentials(
  email: string,
  password: string,
): Promise<{ ok: boolean; user: { id: string; email: string } }> {
  return apiFetch("/auth/verify-credentials", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiGetSession(): Promise<{ user: ApiUser | null }> {
  return apiFetch("/auth/session", { method: "GET" });
}

export async function apiSignOut(): Promise<{ ok: boolean }> {
  await apiFetch("/auth/signout", { method: "POST" });
  clearSessionCookie();
  return { ok: true };
}

// ─── Leads ─────────────────────────────────────────────────────────────────────

export interface Lead {
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
}

// Convenience accessors — keep lead.name/lead.email/lead.phone working
// in pages that destructure from the old schema
export function leadName(lead: Lead): string | null { return lead.student_name; }
export function leadEmail(lead: Lead): string | null { return lead.student_email; }
export function leadPhone(lead: Lead): string | null { return lead.student_phone; }

export async function apiCreateLead(data: {
  student_id: string;
  subject: string;
  budget_per_hour?: number;
  requirements?: string;
  experience_level?: string;
  preferred_language?: string;
}): Promise<{ ok: boolean; id: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "create-lead", data }),
  });
}

export async function apiAcceptLead(
  id: string,
  tutorId: string,
): Promise<{ ok: boolean; message: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "accept-lead", data: { id, tutor_id: tutorId } }),
  });
}

export async function apiDeclineLead(
  id: string,
  tutorId: string,
): Promise<{ ok: boolean; message: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "decline-lead", data: { id, tutor_id: tutorId } }),
  });
}

export async function apiCreateSession(data: {
  lead_id: string;
  tutor_id: string;
  scheduled_at?: string;
  subject?: string;
  topic?: string;
  meeting_link?: string;
}): Promise<{ ok: boolean; session_id: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "create-session", data }),
  });
}

export async function apiUpdateSession(
  id: string,
  data: {
    status?: string;
    started_at?: string;
    completed_at?: string;
    rating?: number;
    feedback?: string;
    feedback_by?: "student" | "tutor";
  },
): Promise<{ ok: boolean }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "update-session", data: { id, ...data } }),
  });
}

export async function apiRequestTestimonial(data: {
  session_id: string;
  recipient_id: string;
  requester_id: string;
}): Promise<{ ok: boolean; id: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "request-testimonial", data }),
  });
}

export async function apiSubmitTestimonial(data: {
  session_id: string;
  author_id: string;
  recipient_id: string;
  rating: number;
  content?: string;
  is_public?: boolean;
}): Promise<{ ok: boolean; id: string }> {
  return apiFetch("/leads", {
    method: "POST",
    body: JSON.stringify({ action: "submit-testimonial", data }),
  });
}

export async function apiGetLeads(
  studentId?: string,
  tutorId?: string,
): Promise<{ leads: Lead[] }> {
  const params = new URLSearchParams();
  if (studentId) params.set("student_id", studentId);
  if (tutorId) params.set("tutor_id", tutorId);
  const qs = params.toString();
  return apiFetch(`/leads${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export async function apiGetLead(id: string): Promise<{ lead: Lead }> {
  return apiFetch(`/leads/${id}`, { method: "GET" });
}

// Update lead status (contacted, accepted, rejected, etc.)
export async function apiUpdateLead(
  id: string,
  data: { status?: string; tutor_id?: string },
): Promise<{ ok: boolean; lead: Lead }> {
  return apiFetch(`/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function apiGetSessionsForTutor(
  tutorId: string,
): Promise<{ sessions: any[] }> {
  return apiFetch(`/leads/sessions/${tutorId}`, { method: "GET" });
}

export async function apiGetSessionsForStudent(
  studentId: string,
): Promise<{ sessions: any[] }> {
  return apiFetch(`/leads/sessions/student/${studentId}`, { method: "GET" });
}

export async function apiGetTestimonialsForTutor(
  recipientId: string,
): Promise<{ testimonials: any[] }> {
  return apiFetch(`/leads/testimonials/${recipientId}`, { method: "GET" });
}

export async function apiGetTestimonialRequests(
  recipientId: string,
): Promise<{ requests: any[] }> {
  return apiFetch(`/leads/testimonial-requests/${recipientId}`, { method: "GET" });
}

// ─── Tutor profile ─────────────────────────────────────────────────────────────

export async function apiUpdateTutorProfile(
  userId: string,
  profile: any,
): Promise<{ ok: boolean; profile: any }> {
  return apiFetch("/tutor/profile", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, ...profile }),
  });
}

export async function apiGetTutorProfile(
  userId: string,
): Promise<{ profile: any }> {
  return apiFetch(`/tutor/profile/${userId}`, { method: "GET" });
}

// ─── Health ────────────────────────────────────────────────────────────────────

export async function apiHealth(): Promise<{ ok: boolean }> {
  return apiFetch("/health", { method: "GET" });
}
