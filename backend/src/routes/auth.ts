// bookateacher backend — Auth routes (register, login, session)
import { Hono } from "hono";
import { z } from "zod";
import {
  query,
  queryOne,
  execute,
  uid,
} from "../db.js";
import { hashPassword, verifyPassword, generateSessionToken } from "../auth-utils.js";

const app = new Hono();

// ─── Validation schemas ────────────────────────────────────────────────────────

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["student", "tutor"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ─── Session cookie name ───────────────────────────────────────────────────────

const SESSION_COOKIE = "bookateacher_session";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken();
  await execute(
    `INSERT INTO sessions (id, student_id, status, created_at)
     VALUES ($1, $2, 'active', NOW())`,
    [token, userId],
  );
  return token;
}

async function getSessionUser(token: string): Promise<any> {
  const session = await queryOne<{ student_id: string }>(
    `SELECT student_id FROM sessions WHERE id = $1 AND status = 'active'`,
    [token],
  );
  if (!session) return null;

  const user = await queryOne<{
    id: string;
    email: string;
    name: string | null;
    role: string;
    status: string;
    verified: boolean;
  }>(
    `SELECT id, email, name, role, status, verified
     FROM users WHERE id = $1`,
    [session.student_id],
  );
  if (!user || user.status !== "active") return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? "",
    role: user.role,
    verified: user.verified,
  };
}

async function deleteSession(token: string): Promise<void> {
  await execute(`DELETE FROM sessions WHERE id = $1`, [token]);
}

// ─── Register ──────────────────────────────────────────────────────────────────

app.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const shape = body as { action?: string; data?: any };
    const { action, data } = shape;

    if (action !== "register" || !data) {
      return c.json({ error: "Invalid request" }, 400);
    }

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      return c.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        400,
      );
    }

    const { name, email, password, role } = parsed.data;

    const existing = await queryOne<{ id: string }>(
      `SELECT id FROM users WHERE email = $1`,
      [email],
    );
    if (existing) {
      return c.json({ error: "Email already registered" }, 409);
    }

    const id = uid();
    const passwordHash = await hashPassword(password);

    await execute(
      `INSERT INTO users (id, email, password_hash, name, role, status, verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [id, email, passwordHash, name, role, "active", role === "student",],
    );

    if (role === "tutor") {
      await execute(
        `INSERT INTO tutor_profiles (user_id, updated_at) VALUES ($1, NOW())`,
        [id],
      );
    }

    const token = await createSession(id);

    return c.json(
      {
        ok: true,
        user: { id, email, name, role, verified: role === "student" },
        session_token: token,
      },
      201,
    );
  } catch (err) {
    console.error("Register error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ─── Login ──────────────────────────────────────────────────────────────────────

app.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const shape = body as { action?: string; data?: any };
    const { action, data } = shape;

    if (action !== "login" || !data) {
      return c.json({ error: "Invalid request" }, 400);
    }

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return c.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        400,
      );
    }

    const { email, password } = parsed.data;

    const user = await queryOne<{
      id: string;
      email: string;
      password_hash: string | null;
      name: string | null;
      role: string;
      status: string;
    }>(
      `SELECT id, email, password_hash, name, role, status
       FROM users WHERE email = $1`,
      [email],
    );

    if (!user || user.status !== "active" || !user.password_hash) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const token = await createSession(user.id);

    return c.json(
      {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name ?? "",
          role: user.role,
          verified: true,
        },
        session_token: token,
      },
      200,
    );
  } catch (err) {
    console.error("Login error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ─── Verify credentials ─────────────────────────────────────────────────────────

app.post("/verify-credentials", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return c.json({ error: "Missing credentials" }, 400);
    }

    const user = await queryOne<{
      id: string;
      email: string;
      password_hash: string | null;
      status: string;
    }>(
      `SELECT id, email, password_hash, status FROM users WHERE email = $1`,
      [email],
    );

    if (!user || user.status !== "active" || !user.password_hash) {
      return c.json({ error: "Verification failed" }, 401);
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return c.json({ error: "Verification failed" }, 401);
    }

    return c.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Verify credentials error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ─── Session check ─────────────────────────────────────────────────────────────

app.get("/session", async (c) => {
  const cookieHeader = c.req.header("Cookie");
  let token: string | undefined;

  if (cookieHeader) {
    for (const part of cookieHeader.split(";")) {
      const [key, ...valueParts] = part.trim().split("=");
      if (key === SESSION_COOKIE) {
        token = valueParts.join("=");
        break;
      }
    }
  }

  if (!token) {
    return c.json({ user: null });
  }

  const user = await getSessionUser(token);
  if (!user) {
    return c.json({ user: null });
  }

  return c.json({ user });
});

// ─── Sign out ───────────────────────────────────────────────────────────────────

app.post("/signout", async (c) => {
  const cookieHeader = c.req.header("Cookie");
  let token: string | undefined;

  if (cookieHeader) {
    for (const part of cookieHeader.split(";")) {
      const [key, ...valueParts] = part.trim().split("=");
      if (key === SESSION_COOKIE) {
        token = valueParts.join("=");
        break;
      }
    }
  }

  if (token) {
    await deleteSession(token);
  }

  return c.json({ ok: true });
});

export default app;
