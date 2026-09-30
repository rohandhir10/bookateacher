// bookateacher DB layer
// Uses @libsql/client (Turso) in production (when TURSO_DATABASE_URL is set),
// falls back to better-sqlite3 for local development.
//
// All query functions are async when using Turso, sync when using local SQLite.
// Code that calls these must be async-aware (RSC Server Actions handle this).

import { createClient } from "@libsql/client";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ----------------------------------------------------------------------
// Turso client (production)
// ----------------------------------------------------------------------
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

let _tursoClient: any = null;

export function getTursoClient() {
  if (!_tursoClient) {
    _tursoClient = createClient({
      url: tursoUrl || "libsql://localhost.local",
      authToken: tursoToken || "",
    });
  }
  return _tursoClient;
}

// ----------------------------------------------------------------------
// Local SQLite (development)
// ----------------------------------------------------------------------
let _sqlite: any = null;
function getSqlite() {
  if (!_sqlite) {
    _sqlite = require("better-sqlite3");
  }
  return _sqlite;
}

const SQLite = getSqlite();
const dbPath = process.env.DB_PATH ?? path.resolve(__dirname, "../../bookateacher.db");

let _localDb: any = null;
function getLocalDb() {
  if (!_localDb) {
    _localDb = new SQLite(dbPath);
    _localDb.pragma("journal_mode = WAL");
    _localDb.pragma("foreign_keys = ON");
    _localDb.pragma("secure_delete = ON");
    initSchemaLocal(_localDb);
  }
  return _localDb;
}

// ----------------------------------------------------------------------
// Backend selection
// ----------------------------------------------------------------------
export function usingTurso(): boolean {
  return !!(tursoUrl && tursoToken && tursoUrl.startsWith("libsql://"));
}

export function getDb() {
  return usingTurso() ? getTursoClient() : getLocalDb();
}

// ----------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------
const SCHEMA_SQL = `
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
  lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL,
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
  student_id TEXT,
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

CREATE TABLE IF NOT EXISTS testimonial_requests (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tutor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','received','published')),
  message TEXT,
  sent_at TEXT,
  received_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payment_orders (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_order_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','refunded')),
  payment_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT
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
CREATE INDEX IF NOT EXISTS idx_sessions_lead ON sessions(lead_id);
CREATE INDEX IF NOT EXISTS idx_sessions_tutor ON sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_leads_student ON leads(student_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_subject ON leads(subject);
CREATE INDEX IF NOT EXISTS idx_testimonials_tutor ON testimonials(tutor_id);
CREATE INDEX IF NOT EXISTS idx_testimonial_requests_tutor ON testimonial_requests(tutor_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON payment_orders(user_id);
`;

function initSchemaLocal(db: any) {
  db.exec(SCHEMA_SQL);
  try { db.exec("ALTER TABLE leads ADD COLUMN student_id TEXT"); } catch {}
  try { db.exec("ALTER TABLE sessions ADD COLUMN lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL"); } catch {}
  db.exec("CREATE INDEX IF NOT EXISTS idx_leads_student ON leads(student_id)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_sessions_lead ON sessions(lead_id)");
}

// Async schema init for Turso (called lazily on first use)
async function initSchemaTurso() {
  const client = getTursoClient();
  const stmts = SCHEMA_SQL.split(";").filter((s) => s.trim());
  for (const stmt of stmts) {
    if (stmt.trim()) {
      try {
        await client.execute({ sql: stmt.trim() });
      } catch {
        /* ignore schema errors (table already exists, etc.) */
      }
    }
  }
  try { await client.execute("ALTER TABLE leads ADD COLUMN student_id TEXT"); } catch {}
  try { await client.execute("ALTER TABLE sessions ADD COLUMN lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL"); } catch {}
  await client.execute("CREATE INDEX IF NOT EXISTS idx_leads_student ON leads(student_id)");
  await client.execute("CREATE INDEX IF NOT EXISTS idx_sessions_lead ON sessions(lead_id)");
}

// Ensure Turso schema is initialized lazily
let _tursoSchemaInit: Promise<void> | null = null;
async function ensureTursoSchema() {
  if (!_tursoSchemaInit) {
    _tursoSchemaInit = initSchemaTurso();
  }
  return _tursoSchemaInit;
}

// ----------------------------------------------------------------------
// Internal query executor
// ----------------------------------------------------------------------

/** Run a query, return { rows: any[] } */
async function runQuery(
  sql: string,
  params: any[] = [],
): Promise<{ rows: any[]; columns?: string[] }> {
  if (usingTurso()) {
    await ensureTursoSchema();
    const result = await getTursoClient().execute({ sql, args: params });
    return { rows: result.rows ?? [], columns: result.columns };
  } else {
    const d = getLocalDb();
    const stmt = d.prepare(sql);
    const rows = stmt.all(...params);
    return { rows, columns: [] };
  }
}

/** Run INSERT/UPDATE/DELETE */
async function runExec(
  sql: string,
  params: any[] = [],
): Promise<number> {
  if (usingTurso()) {
    await ensureTursoSchema();
    const result = await getTursoClient().execute({ sql, args: params });
    return Number(result.rowsAffected ?? 0);
  } else {
    const d = getLocalDb();
    const result = d.prepare(sql).run(...params);
    return Number(result.changes ?? 0);
  }
}

/** Generate a unique ID */
export function uid(): string {
  return crypto.randomUUID();
}

// ----------------------------------------------------------------------
// Generic query helpers (async — always returns Promise)
// ----------------------------------------------------------------------

export async function query<T = any>(
  sql: string,
  params?: any[],
): Promise<T[]> {
  const result = await runQuery(sql, params ?? []);
  return result.rows as T[];
}

export async function queryOne<T = any>(
  sql: string,
  params?: any[],
): Promise<T | undefined> {
  const result = await runQuery(sql, params ?? []);
  const rows = result.rows;
  return rows.length > 0 ? (rows[0] as T) : undefined;
}

export async function executeStmt(
  sql: string,
  params?: any[],
): Promise<number> {
  return runExec(sql, params ?? []);
}

// ----------------------------------------------------------------------
// Users
// ----------------------------------------------------------------------
export async function getUserByEmail(email: string): Promise<any | undefined> {
  return queryOne("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
}

export async function getUserById(id: string): Promise<any | undefined> {
  return queryOne("SELECT * FROM users WHERE id = ?", [id]);
}

export async function getTutorById(id: string): Promise<any | undefined> {
  return queryOne(
    "SELECT * FROM users WHERE id = ? AND role = 'tutor'",
    [id],
  );
}

export async function createUser(data: {
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
  verified?: number;
  status?: string;
  avatar_url?: string | null;
}) {
  const fields: string[] = [];
  const values: any[] = [];

  fields.push("id"); values.push(data.id);
  fields.push("email"); values.push(data.email);
  fields.push("name"); values.push(data.name);
  fields.push("password_hash"); values.push(data.password_hash ?? null);
  fields.push("role"); values.push(data.role ?? "student");
  fields.push("phone"); values.push(data.phone ?? null);
  fields.push("credentials"); values.push(data.credentials ? JSON.stringify(data.credentials) : null);
  fields.push("bio"); values.push(data.bio ?? null);
  fields.push("hourly_rate"); values.push(data.hourly_rate ?? null);
  fields.push("subjects"); values.push(data.subjects ? JSON.stringify(data.subjects) : null);
  fields.push("availability"); values.push(data.availability ? JSON.stringify(data.availability) : null);
  fields.push("verified"); values.push(data.verified ?? 0);
  fields.push("status"); values.push(data.status ?? "active");
  fields.push("avatar_url"); values.push(data.avatar_url ?? null);

  await executeStmt(
    `INSERT INTO users (${fields.join(", ")}) VALUES (${fields.map(() => "?").join(", ")})`,
    values,
  );
}

export async function updateUser(id: string, data: Record<string, any>) {
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

  await executeStmt(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
}

export async function updateUserVerification(
  id: string,
  verified: boolean,
  notes?: string | null,
) {
  await executeStmt(
    "UPDATE users SET verified = ?, verification_notes = ?, updated_at = datetime('now') WHERE id = ?",
    [verified ? 1 : 0, notes ?? null, id],
  );
}

// ----------------------------------------------------------------------
// Sessions
// ----------------------------------------------------------------------
export async function createSession(data: {
  id: string;
  lead_id?: string | null;
  tutor_id: string;
  student_id: string;
  scheduled_at: string;
  duration_minutes?: number;
  meeting_link?: string | null;
}) {
  await executeStmt(
    `INSERT INTO sessions (id, lead_id, tutor_id, student_id, scheduled_at, duration_minutes, meeting_link)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.id,
      data.lead_id ?? null,
      data.tutor_id,
      data.student_id,
      data.scheduled_at,
      data.duration_minutes ?? 60,
      data.meeting_link ?? null,
    ],
  );
}

export async function getPaymentOrderBySessionId(sessionId: string): Promise<any | undefined> {
  return queryOne("SELECT * FROM payment_orders WHERE session_id = ?", [sessionId]);
}

export async function createPaymentOrder(data: {
  id: string;
  session_id: string;
  user_id: string;
  provider_order_id: string;
  amount: number;
  currency: string;
}) {
  await executeStmt(
    `INSERT INTO payment_orders (id, session_id, user_id, provider_order_id, amount, currency)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.id, data.session_id, data.user_id, data.provider_order_id, data.amount, data.currency],
  );
}

export async function markPaymentOrderPaid(providerOrderId: string, paymentId: string): Promise<boolean> {
  const changed = await executeStmt(
    `UPDATE payment_orders
     SET status = 'paid', payment_id = ?, paid_at = datetime('now')
     WHERE provider_order_id = ? AND status = 'pending'`,
    [paymentId, providerOrderId],
  );
  return changed > 0;
}

export async function getSessionsForTutor(
  tutorId: string,
  opts?: { status?: string; limit?: number },
): Promise<any[]> {
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
  return query(sql, params);
}

export async function getSessionsForStudent(
  studentId: string,
): Promise<any[]> {
  return query(
    `SELECT s.*, u.name as tutor_name, u.email as tutor_email, u.phone as tutor_phone
     FROM sessions s
     JOIN users u ON u.id = s.tutor_id
     WHERE s.student_id = ?
     ORDER BY s.scheduled_at DESC`,
    [studentId],
  );
}

export async function getSessionById(id: string): Promise<any | undefined> {
  return queryOne("SELECT * FROM sessions WHERE id = ?", [id]);
}

export async function updateSession(
  id: string,
  data: Record<string, any>,
) {
  const allowedFields = new Set([
    "tutor_id", "student_id", "scheduled_at", "duration_minutes", "status",
    "notes", "meeting_link", "payment_status", "paid_at", "rating", "feedback",
  ]);
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "created_at" || !allowedFields.has(key)) continue;
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) return;
  fields.push("updated_at = datetime('now')");
  values.push(id);

  await executeStmt(
    `UPDATE sessions SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
}

// ----------------------------------------------------------------------
// Leads
// ----------------------------------------------------------------------
export async function createLead(data: {
  id: string;
  student_id?: string | null;
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
  await executeStmt(
    `INSERT INTO leads (id, student_id, name, email, phone, subject, goal, budget_per_hour, preferred_days, preferred_times, online_or_local, location, current_level, challenge)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.id,
      data.student_id ?? null,
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
    ],
  );
}

export async function getLeads(
  opts?: { status?: string; limit?: number },
): Promise<any[]> {
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
  return query(sql, params);
}

export async function getLeadsForStudent(
  studentId: string,
  studentEmail?: string,
): Promise<any[]> {
  return query(
    `SELECT * FROM leads
     WHERE student_id = ? OR (student_id IS NULL AND email = ?)
     ORDER BY created_at DESC`,
    [studentId, studentEmail ?? ""],
  );
}

export async function getLeadsForTutor(
  tutorId: string,
  opts?: { limit?: number },
): Promise<any[]> {
  // New leads are marketplace opportunities, not yet accepted relationships.
  // Keep contact details server-side until this tutor has claimed the lead.
  let sql = `SELECT
    id, student_id, name,
    CASE WHEN assigned_tutor_id = ? THEN email ELSE NULL END AS email,
    CASE WHEN assigned_tutor_id = ? THEN phone ELSE NULL END AS phone,
    subject, goal, budget_per_hour, preferred_days, preferred_times,
    online_or_local, location, current_level, challenge, status,
    assigned_tutor_id, contacted_at, matched_at, converted_at, closed_reason,
    created_at, updated_at
    FROM leads
    WHERE status = 'new' OR assigned_tutor_id = ?
    ORDER BY created_at DESC`;
  const params: any[] = [tutorId, tutorId, tutorId];
  if (opts?.limit) {
    sql += " LIMIT ?";
    params.push(opts.limit);
  }
  return query(sql, params);
}

export async function getLeadById(id: string): Promise<any | undefined> {
  return queryOne("SELECT * FROM leads WHERE id = ?", [id]);
}

export async function updateLead(id: string, data: Record<string, any>) {
  const allowedFields = new Set([
    "student_id", "email", "goal", "budget_per_hour", "preferred_days", "preferred_times",
    "online_or_local", "location", "current_level", "challenge", "status",
    "assigned_tutor_id", "contacted_at", "matched_at", "converted_at", "closed_reason",
  ]);
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "created_at" || !allowedFields.has(key))
      continue;
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

  await executeStmt(
    `UPDATE leads SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
}

/** Accept a lead — mark as "contacted" and assign tutor */
export async function acceptLead(
  leadId: string,
  tutorId: string,
): Promise<boolean> {
  // Claim in one conditional write so two tutors cannot both win the same new lead.
  const changed = await executeStmt(
    `UPDATE leads
     SET status = 'contacted',
         assigned_tutor_id = ?,
         contacted_at = datetime('now'),
         updated_at = datetime('now')
     WHERE id = ?
       AND status = 'new'
       AND assigned_tutor_id IS NULL`,
    [tutorId, leadId],
  );
  return changed > 0;
}

/** Decline a lead — archive it */
export async function declineLead(
  leadId: string,
  tutorId: string,
  reason?: string,
): Promise<boolean> {
  // Only decline an unclaimed lead or a lead already owned by this tutor.
  const changed = await executeStmt(
    `UPDATE leads
     SET status = 'archived',
         closed_reason = ?,
         updated_at = datetime('now')
     WHERE id = ?
       AND (
         (status = 'new' AND assigned_tutor_id IS NULL)
         OR assigned_tutor_id = ?
       )`,
    [reason || "Declined by tutor", leadId, tutorId],
  );
  return changed > 0;
}

// ----------------------------------------------------------------------
// Testimonials
// ----------------------------------------------------------------------
export async function createTestimonial(data: {
  id: string;
  session_id: string;
  student_id: string;
  tutor_id: string;
  rating: number;
  text: string;
}) {
  await executeStmt(
    `INSERT INTO testimonials (id, session_id, student_id, tutor_id, rating, text)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.id, data.session_id, data.student_id, data.tutor_id, data.rating, data.text],
  );
}

export async function getTestimonialsForTutor(
  tutorId: string,
): Promise<any[]> {
  return query(
    `SELECT t.*, u.name as student_name
     FROM testimonials t
     JOIN users u ON u.id = t.student_id
     WHERE t.tutor_id = ? AND t.visible = 1
     ORDER BY t.created_at DESC`,
    [tutorId],
  );
}

export async function getPendingTestimonialRequests(
  tutorId: string,
): Promise<any[]> {
  return query(
    `SELECT tr.*, s.scheduled_at, s.status as session_status,
            u.name as student_name, u.email as student_email, u.phone as student_phone
     FROM testimonial_requests tr
     JOIN sessions s ON s.id = tr.session_id
     JOIN users u ON u.id = tr.student_id
     WHERE tr.tutor_id = ? AND tr.status = 'pending'
     ORDER BY tr.created_at DESC`,
    [tutorId],
  );
}

export async function getTutorTestimonialRequests(
  tutorId: string,
): Promise<any[]> {
  return query(
    `SELECT tr.*, s.scheduled_at, s.status as session_status,
            u.name as student_name, u.email as student_email, u.phone as student_phone,
            t.rating as testimonial_rating, t.text as testimonial_text, t.visible as testimonial_visible,
            t.created_at as testimonial_created_at
     FROM testimonial_requests tr
     LEFT JOIN sessions s ON s.id = tr.session_id
     LEFT JOIN users u ON u.id = tr.student_id
     LEFT JOIN testimonials t ON t.session_id = tr.session_id AND t.tutor_id = tr.tutor_id
     WHERE tr.tutor_id = ?
     ORDER BY tr.created_at DESC`,
    [tutorId],
  );
}

export async function sendTestimonialRequest(
  requestId: string,
  message?: string,
): Promise<void> {
  await executeStmt(
    `UPDATE testimonial_requests SET status = 'sent', message = ?, sent_at = datetime('now') WHERE id = ?`,
    [message ?? null, requestId],
  );
}

export async function publishTestimonial(
  requestId: string,
  rating: number,
  text: string,
): Promise<string> {
  const row = await queryOne(
    "SELECT * FROM testimonial_requests WHERE id = ?",
    [requestId],
  );
  if (!row) return "request_not_found";
  if ((row as any).status !== "received") return "request_not_received";
  if (
    !(row as any).session_id ||
    !(row as any).student_id ||
    !(row as any).tutor_id
  )
    return "invalid_request";
  const id = crypto.randomUUID();
  try {
    await createTestimonial({
      id,
      session_id: (row as any).session_id,
      student_id: (row as any).student_id,
      tutor_id: (row as any).tutor_id,
      rating,
      text,
    });
    await executeStmt(
      `UPDATE testimonial_requests SET status = 'published', received_at = datetime('now') WHERE id = ?`,
      [requestId],
    );
    return "ok";
  } catch {
    return "insert_failed";
  }
}

// ----------------------------------------------------------------------
// Admin actions
// ----------------------------------------------------------------------
export async function recordAdminAction(
  adminId: string,
  action: string,
  targetType: string,
  targetId: string,
  details?: Record<string, any> | null,
) {
  await executeStmt(
    `INSERT INTO admin_actions (admin_id, action, target_type, target_id, details)
     VALUES (?, ?, ?, ?, ?)`,
    [
      adminId,
      action,
      targetType,
      targetId,
      details ? JSON.stringify(details) : null,
    ],
  );
}

// ----------------------------------------------------------------------
// Search
// ----------------------------------------------------------------------
export async function searchTutors(
  queryStr?: string,
  opts?: { subject?: string; verified?: boolean; limit?: number },
): Promise<any[]> {
  let sql = "SELECT * FROM users WHERE role = 'tutor' AND status = 'active'";
  const params: any[] = [];

  if (queryStr) {
    sql += " AND (name LIKE ? OR bio LIKE ? OR email LIKE ?)";
    const q = `%${queryStr}%`;
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

  const rows = await query(sql, params);
  return rows.map((row: any) => ({
    ...row,
    credentials: row.credentials ? JSON.parse(row.credentials) : null,
    subjects: row.subjects ? JSON.parse(row.subjects) : null,
    availability: row.availability ? JSON.parse(row.availability) : null,
  }));
}
