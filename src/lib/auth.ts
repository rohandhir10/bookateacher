import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "@/lib/validations";
import { verifyPassword } from "@/lib/auth-utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

declare module "next-auth" {
  interface User {
    id: string;
    role: "student" | "tutor" | "admin";
    verified?: number;
    name: string;
    email: string;
    image?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role: "student" | "tutor" | "admin";
      verified?: number;
      name: string;
      email: string;
      image?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  basePath: process.env.NEXTAUTH_URL ? "/api/auth" : undefined,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: { prompt: "select_account" },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // Verify against the DB — done here is fine since auth.ts is NOT
        // called from middleware on the edge. Middleware calls auth() which
        // uses the JWT session strategy, so no DB access happens at the edge.
        //
        // This server-side authorize() is only invoked during the login POST
        // to /api/auth/callback/credentials, which runs on a Node.js server.
        try {
          const res = await fetch(
            `${SITE_URL}/api/auth/verify-credentials`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: parsed.data.email.toLowerCase(),
                password: parsed.data.password,
              }),
            }
          );
          const user = await res.json();
          if (!res.ok || !user) return null;
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.verified = (user as { verified?: number }).verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "student" | "tutor" | "admin";
        session.user.verified = token.verified as number | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
