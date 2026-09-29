// bookateacher — unified server-side auth session helper
// Prefer NextAuth (the primary app auth layer). The legacy backend cookie remains
// as a fallback while the backend migration is being retired.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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
  // Primary auth: NextAuth JWT session.
  try {
    const nextAuthSession = await auth();
    if (nextAuthSession?.user) {
      return {
        user: {
          id: nextAuthSession.user.id,
          email: nextAuthSession.user.email,
          name: nextAuthSession.user.name,
          role: nextAuthSession.user.role,
          verified: Boolean(nextAuthSession.user.verified),
        },
      };
    }
  } catch {
    // Fall through to the legacy backend session during migration.
  }

  // Legacy backend session fallback.
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bookateacher_session")?.value;
  if (!sessionCookie) return { user: null };

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        Cookie: `bookateacher_session=${sessionCookie}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return { user: null };

    const data = (await res.json()) as ServerSession;
    return data;
  } catch {
    return { user: null };
  }
}

export function requireAuth(role?: "student" | "tutor" | "admin") {
  return async function checkAuth() {
    const session = await getServerSession();
    if (!session.user) redirect("/login");
    if (role && session.user.role !== role) redirect("/dashboard");
    return session;
  };
}
