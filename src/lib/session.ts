// bookateacher — Server-side session management for Railway backend
// Used in RSC pages to check auth state before rendering.
//
// Reads the bookateacher_session cookie from the incoming request and
// validates it against the Railway backend.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3001");

export interface ServerSessionUser {
  id: string;
  email: string;
  name: string;
  role: "student" | "tutor" | "admin";
  verified: boolean;
}

export interface ServerSession {
  user: ServerSessionUser | null;
}

export async function getServerSession(): Promise<ServerSession> {
  if (typeof process === "undefined") {
    // Never runs in browser
    return { user: null };
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bookateacher_session")?.value;

  if (!sessionCookie) {
    return { user: null };
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        Cookie: `bookateacher_session=${sessionCookie}`,
        Accept: "application/json",
      },
      // Don't follow redirects — if the session is invalid the backend
      // may redirect to login, which we don't want in an RSC fetch
      redirect: "manual",
    });

    if (!res.ok) {
      return { user: null };
    }

    const data = (await res.json()) as ServerSession;
    return data;
  } catch {
    return { user: null };
  }
}

export function requireAuth(role?: "student" | "tutor" | "admin") {
  return async function checkAuth() {
    const session = await getServerSession();
    if (!session.user) {
      redirect("/login");
    }
    if (role && session.user.role !== role) {
      redirect("/dashboard");
    }
    return session;
  };
}
