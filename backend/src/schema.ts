// bookateacher backend — PostgreSQL schema
import { query, execute } from "./db.js";

const SCHEMA = `
-- Users
CREATE TABLE IF NOT EXISTS users (
  id              TEXT PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT,
  name            TEXT,
  role            TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','tutor','admin')),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','suspended','rejected')),
  verified        BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url      TEXT,
  phone           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id                  TEXT PRIMARY KEY,
  student_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tutor_id            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status              TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','in_progress','completed','cancelled','no_show')),
  scheduled_at        TIMESTAMPTZ,
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  subject             TEXT,
  topic               TEXT,
  notes               TEXT,
  rating              INTEGER CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  feedback            TEXT,
  feedback_by         TEXT CHECK (feedback_by IN ('student','tutor')),
  meeting_link        TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id                    TEXT PRIMARY KEY,
  student_id            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject               TEXT NOT NULL,
  budget_per_hour       NUMERIC(10,2),
  requirements          TEXT,
  experience_level      TEXT,
  preferred_language    TEXT,
  status                TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','matched','archived','rejected')),
  assigned_tutor_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
  contacted_at          TIMESTAMPTZ,
  matched_at            TIMESTAMPTZ,
  rejected_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tutor profiles
CREATE TABLE IF NOT EXISTS tutor_profiles (
  user_id              TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  headline             TEXT,
  bio                  TEXT,
  hourly_rate          NUMERIC(10,2),
  session_price        NUMERIC(10,2),
  subjects             TEXT,              -- JSON array
  experience_years     INTEGER,
  teaching_style       TEXT,
  achievements         TEXT,              -- JSON array
  certifications       TEXT,
  education            TEXT,
  demo_lesson_available BOOLEAN DEFAULT FALSE,
  demo_lesson_price    NUMERIC(10,2),
  availability         TEXT,              -- JSON array
  languages            TEXT,              -- JSON array
  profile_views        INTEGER DEFAULT 0,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id              TEXT PRIMARY KEY,
  session_id      TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content         TEXT,
  is_public       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Testimonial requests
CREATE TABLE IF NOT EXISTS testimonial_requests (
  id                  TEXT PRIMARY KEY,
  session_id          TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  requester_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','completed','expired')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at        TIMESTAMPTZ
);

-- Admin actions (audit log)
CREATE TABLE IF NOT EXISTS admin_actions (
  id              TEXT PRIMARY KEY,
  actor_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type     TEXT NOT NULL,
  target_type     TEXT,
  target_id       TEXT,
  note            TEXT,
  metadata        TEXT,              -- JSON
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

const INDEXES = `
CREATE INDEX IF NOT EXISTS idx_leads_student_id         ON leads(student_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_tutor_id  ON leads(assigned_tutor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status             ON leads(status);
CREATE INDEX IF NOT EXISTS idx_sessions_student_id      ON sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_tutor_id        ON sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status          ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at    ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_testimonials_author_id   ON testimonials(author_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_recipient_id ON testimonials(recipient_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_actor_id   ON admin_actions(actor_id);
`;

export async function migrate(): Promise<void> {
  console.log("Running schema migration...");
  await execute(SCHEMA);
  await execute(INDEXES);
  console.log("✓ Schema migration complete");
}

export async function seedAdminUser(): Promise<void> {
  const { queryOne, execute } = await import("./db.js");
  const existing = await queryOne("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (existing) {
    console.log("Admin user already exists, skipping");
    return;
  }
  const { uid } = await import("./db.js");
  const adminId = uid();
  await execute(
    `INSERT INTO users (id, email, name, role, status, verified, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
    [adminId, "admin@bookateacher.in", "Admin", "admin", "active", true],
  );
  console.log("✓ Admin user created: admin@bookateacher.in");
}

export async function seedTestUsers(): Promise<void> {
  const { queryOne, execute, uid } = await import("./db.js");
  const { hashPassword } = await import("./auth.js");

  // Check existing tutors
  const existingTutors = await queryOne(
    "SELECT COUNT(*) as cnt FROM users WHERE role = 'tutor' AND status = 'active'",
  );
  if ((existingTutors?.cnt as number) >= 3) {
    console.log("Tutor users already exist, skipping");
    return;
  }

  const tutors = [
    {
      id: uid(),
      email: "rahul.kapoor@bookateacher.in",
      name: "Rahul Kumar",
      password: "Test@1234",
      headline: "Certified IELTS Coach — 7+ years",
      bio: "I have helped 500+ students achieve their target IELTS band scores. My teaching is structured, data-driven, and personalized to each student's weak areas.",
      hourly_rate: 2500,
      session_price: 1250,
      subjects: ["IELTS"],
      experience_years: 7,
      teaching_style: "Structured, data-driven",
      achievements: ["500+ students placed", "Average band improvement: 1.2"],
      certifications: "British Council Certified IELTS Trainer, TESOL",
      education: "M.A. English, University of Delhi",
      demo_lesson_available: true,
      demo_lesson_price: 500,
      availability: '["Mon-Wed 6-9 PM", "Thu-Sat 10 AM-1 PM"]',
      languages: '["English", "Hindi"]',
    },
    {
      id: uid(),
      email: "anita.sharma@bookateacher.in",
      name: "Ananya Sharma",
      password: "Test@1234",
      headline: "TOEFL Expert — 5 years experience",
      bio: "Former university admissions counselor turned TOEFL coach. I know exactly what examiners look for.",
      hourly_rate: 3000,
      session_price: 1800,
      subjects: ["TOEFL"],
      experience_years: 5,
      teaching_style: "Interactive, exam-focused",
      achievements: ["Average TOEFL score: 105+", "100+ students coached"],
      certifications: "ETS Certified TOEFL Instructor",
      education: "M.A. English Literature, Jawaharlal Nehru University",
      demo_lesson_available: true,
      demo_lesson_price: 600,
      availability: '["Mon-Fri 4-8 PM", "Sat 10 AM-2 PM"]',
      languages: '["English", "Hindi"]',
    },
    {
      id: uid(),
      email: "vikram.singh@bookateacher.in",
      name: "Vikram Patel",
      password: "Test@1234",
      headline: "Spoken English Coach — Fluent in 3 months guarantee",
      bio: "I specialize in conversational English for professionals who need to communicate confidently in global workplaces.",
      hourly_rate: 1500,
      session_price: 1000,
      subjects: ["Spoken English"],
      experience_years: 4,
      teaching_style: "Conversation-first, practical",
      achievements: ["70+ professionals coached", "Average fluency improvement: 2 levels"],
      certifications: "CELTA (Cambridge English)",
      education: "B.A. English, Gujarat University",
      demo_lesson_available: true,
      demo_lesson_price: 300,
      availability: '["Tue-Thu 6-9 PM", "Sun 10 AM-1 PM"]',
      languages: '["English", "Hindi", "Gujarati"]',
    },
  ];

  for (const t of tutors) {
    const existing = await queryOne("SELECT id FROM users WHERE email = $1", [t.email]);
    if (existing) continue;

    const passwordHash = await hashPassword(t.password);
    await execute(
      `INSERT INTO users (id, email, password_hash, name, role, status, verified, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [t.id, t.email, passwordHash, t.name, "tutor", "active", true],
    );
    await execute(
      `INSERT INTO tutor_profiles (user_id, headline, bio, hourly_rate, session_price, subjects,
        experience_years, teaching_style, achievements, certifications, education,
        demo_lesson_available, demo_lesson_price, availability, languages, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())`,
      [
        t.id,
        t.headline,
        t.bio,
        t.hourly_rate,
        t.session_price,
        JSON.stringify(t.subjects),
        t.experience_years,
        t.teaching_style,
        JSON.stringify(t.achievements),
        t.certifications,
        t.education,
        t.demo_lesson_available,
        t.demo_lesson_price,
        t.availability,
        t.languages,
      ],
    );
    console.log(`✓ Tutor created: ${t.email}`);
  }

  // Create a student user
  const studentEmail = "priya.mehta@example.com";
  const existingStudent = await queryOne("SELECT id FROM users WHERE email = $1", [studentEmail]);
  if (!existingStudent) {
    const studentId = uid();
    const passwordHash = await hashPassword("Test@1234");
    await execute(
      `INSERT INTO users (id, email, password_hash, name, role, status, verified, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [studentId, studentEmail, passwordHash, "Priya Mehta", "student", "active", true],
    );
    console.log("✓ Student created: priya.mehta@example.com");
  }
}
