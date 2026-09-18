import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import null throws from "node:assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load better-sqlite3 dynamically so Turbopack cannot statically trace it.
let _sqlite: any = null;

function getSqlite() {
  if (!_sqlite) {
    _sqlite = require("better-sqlite3");
  }
  return _sqlite;
}

const SQLite = getSqlite();

let _db: any = null;
const dbPath = process.env.DB_PATH ?? path.resolve(__dirname, "../../bookateacher.db");

export function getDb() {
  if (!_db) {
    _db = new SQLite(dbPath);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    _db.pragma("secure_delete = ON");
    initializeSchema(_db);
  }
  return _db;
}

function initializeSchema(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT,
      role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','tutor','admin')),
      avatar_url TEXT,
      phone TEXT,
      credentials TEXT,
      bio TEXT,
      hourly_rate INTEGER,
      subjects TEXT,
      availability TEXT,
      verified INTEGER NOT NULL DEFAULT 0,
      verification_notes TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','inactive')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      tutor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      scheduled_at TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL DEFAULT 60,
      status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','no_show')),
      notes TEXT,
      meeting_link TEXT,
      payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','refunded','free')),
      paid_at TEXT,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      feedback TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      goal TEXT,
      budget_per_hour INTEGER,
      preferred_days TEXT,
      preferred_times TEXT,
      online_or_local TEXT NOT NULL DEFAULT 'online' CHECK (online_or_local IN ('online','local','either')),
      location TEXT,
      current_level TEXT,
      challenge TEXT,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','matched','converted','closed','archived')),
      assigned_tutor_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      contacted_at TEXT,
      matched_at TEXT,
      converted_at TEXT,
      closed_reason TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      session_id TEXT UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
      student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      tutor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      text TEXT NOT NULL,
      visible INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_actions (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL CHECK (target_type IN ('user','session','lead')),
      target_id TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    CREATE INDEX IF NOT EXISTS idx_users_verified ON users(verified);
    CREATE INDEX IF NOT EXISTS idx_sessions_tutor ON sessions(tutor_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_scheduled ON sessions(scheduled_at);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_subject ON leads(subject);
    CREATE INDEX IF NOT EXISTS idx_testimonials_tutor ON testimonials(tutor_id);
  `);
}

export function createUser(data: {
  id: string;
  email: string;
  name: string;
  password_hash?: string | null;
  role?: string;
  phone?: string | null;
  credentials?: Record<string, any> | null;
  bio?: string | null;
  hourly_rate?: number | null;
  subjects?: string[] | null;
  availability?: Record<string, any> | null;
}) {
  const db = getDb();
  db.prepare(`
    INSERT INTO users (id, email, name, password_hash, role, phone, credentials, bio, hourly_rate, subjects, availability)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.id,
    data.email,
    data.name,
    data.password_hash ?? null,
    data.role ?? "student",
    data.phone ?? null,
    data.credentials ? JSON.stringify(data.credentials) : null,
    data.bio ?? null,
    data.hourly_rate ?? null,
    data.subjects ? JSON.stringify(data.subjects) : null,
    data.availability ? JSON.stringify(data.availability) : null,
  );
}

export function getUserByEmail(email: string): any | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function getUserById(id: string): any | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export function updateUser(
  id: string,
  data: Record<string, any>
) {
  const db = getDb();
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "email" || key === "created_at") continue;
    fields.push(`${key} = ?`);
    values.push(
      key === "credentials" || key === "subjects" || key === "availability"
        ? JSON.stringify(value)
        : value,
    );
  }

  if (fields.length === 0) return;
  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}

export function updateUserVerification(
  id: string,
  verified: boolean,
  notes?: string | null
) {
  const db = getDb();
  db.prepare(
    "UPDATE users SET verified = ?, verification_notes = ?, updated_at = datetime('now') WHERE id = ?",
  ).run(verified ? 1 : 0, notes ?? null, id);
}

export function createSession(data: {
  id: string;
  tutor_id: string;
  student_id: string;
  scheduled_at: string;
  duration_minutes?: number;
  meeting_link?: string | null;
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO sessions (id, tutor_id, student_id, scheduled_at, duration_minutes, meeting_link)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    data.id,
    data.tutor_id,
    data.student_id,
    data.scheduled_at,
    data.duration_minutes ?? 60,
    data.meeting_link ?? null,
  );
}

export function getSessionsForTutor(
  tutorId: string,
  opts?: { status?: string; limit?: number }
): any[] {
  const db = getDb();
  let sql = "SELECT * FROM sessions WHERE tutor_id = ?";
  const params: any[] = [tutorId];
  if (opts?.status) {
    sql += " AND status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY scheduled_at DESC";
  if (opts?.limit) {
    sql += " LIMIT ?";
    params.push(opts.limit);
  }
  return db.prepare(sql).all(...params);
}

export function getSessionsForStudent(studentId: string): any[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT s.*, u.name as tutor_name, u.email as tutor_email, u.phone as tutor_phone
       FROM sessions s
       JOIN users u ON u.id = s.tutor_id
       WHERE s.student_id = ?
       ORDER BY s.scheduled_at DESC`,
    )
    .all(studentId);
}

export function updateSession(
  id: string,
  data: Record<string, any>
) {
  const db = getDb();
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "created_at") continue;
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) return;
  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE sessions SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}

export function createLead(data: {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  subject: string;
  goal?: string | null;
  budget_per_hour?: number | null;
  preferred_days?: string[] | null;
  preferred_times?: string[] | null;
  online_or_local?: string;
  location?: string | null;
  current_level?: string | null;
  challenge?: string | null;
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO leads (id, name, email, phone, subject, goal, budget_per_hour, preferred_days, preferred_times, online_or_local, location, current_level, challenge)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    data.id,
    data.name,
    data.email ?? null,
    data.phone,
    data.subject,
    data.goal ?? null,
    data.budget_per_hour ?? null,
    data.preferred_days ? JSON.stringify(data.preferred_days) : null,
    data.preferred_times ? JSON.stringify(data.preferred_times) : null,
    data.online_or_local ?? "online",
    data.location ?? null,
    data.current_level ?? null,
    data.challenge ?? null,
  );
}

export function getLeads(opts?: { status?: string; limit?: number }): any[] {
  const db = getDb();
  let sql = "SELECT * FROM leads";
  const params: any[] = [];
  if (opts?.status) {
    sql += " WHERE status = ?";
    params.push(opts.status);
  }
  sql += " ORDER BY created_at DESC";
  if (opts?.limit) {
    sql += " LIMIT ?";
    params.push(opts.limit);
  }
  return db.prepare(sql).all(...params);
}

export function getLeadById(id: string): any | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM leads WHERE id = ?").get(id);
}

export function updateLead(
  id: string,
  data: Record<string, any>
) {
  const db = getDb();
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "created_at" || key === "name" || key === "phone" || key === "subject") continue;
    fields.push(`${key} = ?`);
    values.push(
      key === "preferred_days" || key === "preferred_times"
        ? JSON.stringify(value)
        : value,
    );
  }

  if (fields.length === 0) return;
  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE leads SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}

export function createTestimonial(data: {
  id: string;
  session_id: string;
  student_id: string;
  tutor_id: string;
  rating: number;
  text: string;
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO testimonials (id, session_id, student_id, tutor_id, rating, text)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(data.id, data.session_id, data.student_id, data.tutor_id, data.rating, data.text);
}

export function getTestimonialsForTutor(tutorId: string): any[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT t.*, u.name as student_name
       FROM testimonials t
       JOIN users u ON u.id = t.student_id
       WHERE t.tutor_id = ? AND t.visible = 1
       ORDER BY t.created_at DESC`,
    )
    .all(tutorId);
}

export function recordAdminAction(
  adminId: string,
  action: string,
  targetType: string,
  targetId: string,
  details?: Record<string, any> | null
) {
  const db = getDb();
  db.prepare(
    `INSERT INTO admin_actions (admin_id, action, target_type, target_id, details)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(adminId, action, targetType, targetId, details ? JSON.stringify(details) : null);
}

export function searchTutors(
  query?: string,
  opts?: { subject?: string; verified?: boolean; limit?: number }
): any[] {
  const db = getDb();
  let sql = "SELECT * FROM users WHERE role = 'tutor' AND status = 'active'";
  const params: any[] = [];

  if (query) {
    sql += " AND (name LIKE ? OR bio LIKE ? OR email LIKE ?)";
    const q = `%${query}%`;
    params.push(q, q, q);
  }
  if (opts?.subject) {
    sql += " AND subjects LIKE ?";
    params.push(`%"${opts.subject}"%`);
  }
  if (opts?.verified !== undefined) {
    sql += ` AND verified = ${opts.verified ? 1 : 0}`;
  }

  sql += " ORDER BY verified DESC, created_at DESC";
  if (opts?.limit) {
    sql += " LIMIT ?";
    params.push(opts.limit);
  }

  const rows = db.prepare(sql).all(...params);
  return rows.map((row: any) => ({
    ...row,
    credentials: row.credentials ? JSON.parse(row.credentials) : null,
    subjects: row.subjects ? JSON.parse(row.subjects) : null,
    availability: row.availability ? JSON.parse(row.availability) : null,
  }));
}
