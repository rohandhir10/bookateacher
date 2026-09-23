import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "@/lib/validations";
import { verifyPassword } from "@/lib/auth-utils";
import { createUser, getUserByEmail, getUserById } from "@/lib/db";
import { generateId } from "@/lib/utils";
import { consumeRateLimit } from "@/lib/rate-limit";

const normalizeEmail = (value: string) => value.trim().toLowerCase();

declare module "next-auth" {
  interface User {
    id: string;
    role: "student" | "tutor" | "admin";
    verified?: number | boolean;
    name: string;
    email: string;
    image?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role: "student" | "tutor" | "admin";
      verified?: number | boolean;
      name: string;
      email: string;
      image?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: { params: { prompt: "select_account" } },
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

        const email = normalizeEmail(parsed.data.email);
        const limit = consumeRateLimit("auth:" + email, { limit: 8, windowMs: 10 * 60 * 1000 });
        if (!limit.allowed) return null;

        const user = await getUserByEmail(email);
        if (!user?.password_hash || user.status !== "active") return null;

        const valid = await verifyPassword(parsed.data.password, user.password_hash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          verified: user.verified,
          image: user.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        let dbUser = user;

        if (account?.provider === "google" && user.email) {
          const email = normalizeEmail(user.email);
          const existing = await getUserByEmail(email);

          if (existing) {
            dbUser = {
              id: existing.id,
              email: existing.email,
              name: existing.name,
              role: existing.role,
              verified: existing.verified,
              image: existing.avatar_url,
            } as typeof user;
          } else {
            const id = generateId();
            await createUser({
              id,
              email,
              name: user.name?.trim() || email.split("@")[0],
              avatar_url: user.image ?? undefined,
              role: "student",
            });
            const created = await getUserById(id);
            if (created) {
              dbUser = {
                id: created.id,
                email: created.email,
                name: created.name,
                role: created.role,
                verified: created.verified,
                image: created.avatar_url,
              } as typeof user;
            }
          }
        }

        token.id = dbUser.id;
        token.role = dbUser.role;
        token.verified = dbUser.verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "student" | "tutor" | "admin";
        session.user.verified = token.verified as number | boolean | undefined;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
});
