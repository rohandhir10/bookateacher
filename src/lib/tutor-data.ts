// Tutor data for public-facing pages (tutors list + profile pages)
//
// IMPORTANT: This module must not silently fabricate marketplace truth when the
// database is unavailable. A marketplace depends on authoritative tutor data.
// When the DB is unreachable, we render a degraded/error state rather than
// presenting static demo data as if it were real.
//
// The static demo data below is ONLY used in local development when DB is
// deliberately offline. In production, DB unavailability must surface an error.

import { SUBJECT_LABELS } from "./utils";

export interface TutorData {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  hourly_rate: number;
  subjects: string[];
  verified: boolean;
  rating: number;
  reviews: number;
  specializations: string[];
  languages: string[];
  credentials: {
    experience_years: number;
    certification: string;
    teaching_style: string;
    background: string;
    ielts_score?: number;
    toefl_score?: number;
  };
  availability?: Record<string, string[]>;
  avatar_url?: string;
  qualifications?: string[];
}

// ─── Demo-only static data ─────────────────────────────────────────────────────
// Only used when the database is intentionally unavailable during local dev.
// NOT used in production to fabricate tutor listings.

export const DEMO_TUTOR_DATA: TutorData[] = [
  {
    id: "rahul-kumar-ielts",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    role: "tutor",
    bio: `I've been teaching IELTS for 8 years, mostly to students targeting university admission abroad. My own IELTS score is Band 8.5 — I scored it twice, once for myself and once to understand what the examiners are actually looking for.

My approach: session 1 is a diagnostic. I listen to you speak, read your writing, and find the exact gap between where you are and where your target score is. Most students don't need more practice — they need targeted correction on the 2–3 things holding them back. I work on those.

I specialise in Writing Task 2 and Speaking — the two sections where I see the most students lose marks unnecessarily. I've had students go from 6.0 to 7.5 in writing alone in about 6 weeks.

If your test is within 4 weeks, we'll focus on strategy and exam technique. If you have more time, we'll build the language skills properly — that's more sustainable, and you'll keep the score longer.

Credentials: IDP Certified IELTS Instructor (2018), MA English Literature, 500+ students coached.`,
    hourly_rate: 1200,
    subjects: ["ielts"],
    verified: true,
    rating: 4.8,
    reviews: 127,
    specializations: ["IELTS Writing Task 2", "IELTS Speaking", "IELTS Reading", "Study abroad strategy"],
    languages: ["English", "Hindi"],
    credentials: {
      experience_years: 8,
      certification: "IDP Certified IELTS Instructor (2018)",
      teaching_style: "Diagnostic first — find the gap, then close it. Targeted correction over general practice.",
      background: "8 years teaching IELTS, mostly university-admission students. Band 8.5 holder. Specialises in Writing Task 2 and Speaking.",
      ielts_score: 8.5,
    },
    availability: {
      monday: ["10:00–12:00", "14:00–17:00", "18:00–21:00"],
      tuesday: ["10:00–12:00", "14:00–17:00"],
      wednesday: ["10:00–12:00", "14:00–17:00", "18:00–21:00"],
      thursday: ["10:00–12:00", "14:00–17:00"],
      friday: ["10:00–12:00", "14:00–17:00", "18:00–21:00"],
      saturday: ["10:00–13:00"],
      sunday: [],
    },
  },
  {
    id: "ananya-sharma-toefl",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    role: "tutor",
    bio: `I scored 112/120 on the TOEFL iBT myself — 30 in Reading, 29 in Listening, 28 in Speaking, 25 in Writing. I help students reach the 100+ range that most US universities require.

My focus is on the computer-based format specifically — timing, the integrated tasks, and how to handle the on-screen pressure. A lot of students know English well but lose marks to the format, not the language.

For Speaking, we do lots of recorded practice — you speak into a mic the way the test requires, and I give feedback on delivery, pacing, and structure. For Writing, we work on the integrated writing task specifically (that's where most students lose the most points), plus the independent essay.

If you're applying to US universities, I also help with the overall strategy: which schools, what scores they actually require, how to schedule your test date around application deadlines.

Credentials: TOEFL iBT 112/120, MA Applied Linguistics, 3 years TOEFL coaching, 200+ students.`,
    hourly_rate: 1800,
    subjects: ["toefl"],
    verified: true,
    rating: 4.9,
    reviews: 98,
    specializations: ["TOEFL iBT", "TOEFL Speaking", "TOEFL Writing (Integrated)", "US university admissions"],
    languages: ["English", "Hindi"],
    credentials: {
      experience_years: 3,
      certification: "MA Applied Linguistics (Delhi University, 2021)",
      teaching_style: "Format-focused coaching — the computer-based TOEFL has its own logic. Practice the real format, not general English.",
      background: "Scored 112/120 on TOEFL iBT. 3 years TOEFL coaching. 200+ students coached. MA Applied Linguistics.",
      toefl_score: 112,
    },
    availability: {
      monday: ["10:00–12:00", "15:00–18:00", "19:00–21:00"],
      tuesday: ["10:00–12:00", "15:00–18:00"],
      wednesday: ["10:00–12:00", "15:00–18:00", "19:00–21:00"],
      thursday: ["10:00–12:00", "15:00–18:00"],
      friday: ["10:00–12:00", "15:00–18:00", "19:00–21:00"],
      saturday: ["10:00–13:00"],
      sunday: [],
    },
  },
  {
    id: "vikram-patel-spoken",
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    role: "tutor",
    bio: `I specialise in spoken English — helping people who understand English but can't speak it confidently. This is different from test prep. If you're preparing for IELTS or TOEFL, I'd suggest one of my colleagues. If you need to walk into a meeting, a job interview, or a conversation and actually speak — that's what I do.

My background is in corporate training. I've worked with IT professionals, managers, and entrepreneurs who needed to communicate better in English — not to pass a test, but to do their job better. That's a different skill set from academic English.

Sessions are conversation-based. We talk about things that matter to you — your work, your goals, situations you face. I correct in real time, but not interruptively — the goal is to build flow and confidence first, accuracy second.

Pronunciation work is practical — the specific sounds that are hardest for Indian speakers (th, v/w, r/l distinctions, intonation patterns), and the rhythm of English sentences. Not phonetic theory — the actual speaking.

Credentials: CELTA (Cambridge), 6 years corporate English training, 300+ professionals coached.`,
    hourly_rate: 1000,
    subjects: ["spoken-english"],
    verified: true,
    rating: 4.7,
    reviews: 203,
    specializations: ["Spoken English", "Business English", "Pronunciation", "Job interview preparation"],
    languages: ["English", "Hindi", "Gujarati"],
    credentials: {
      experience_years: 6,
      certification: "CELTA (Cambridge English, 2019)",
      teaching_style: "Conversation-based. Real situations, real corrections, real confidence. Build flow first, accuracy second.",
      background: "CELTA-certified. 6 years corporate English training. 300+ professionals coached — IT, management, entrepreneurship.",
    },
    availability: {
      monday: ["10:00–12:00", "14:00–17:00", "18:00–20:00"],
      tuesday: ["10:00–12:00", "14:00–17:00"],
      wednesday: ["10:00–12:00", "14:00–17:00", "18:00–20:00"],
      thursday: ["10:00–12:00", "14:00–17:00"],
      friday: ["10:00–12:00", "14:00–17:00", "18:00–20:00"],
      saturday: ["10:00–13:00"],
      sunday: [],
    },
  },
];

// ─── Canonical data access ─────────────────────────────────────────────────────
// Production path: always use the database.
// If the DB is unreachable, throw rather than silently returning fabricated data.

export async function getTutors(): Promise<TutorData[]> {
  // Try DB first. If it's unavailable, do NOT fall back to static data.
  try {
    const { query } = await import("./db");
    const rows = await query(
      "SELECT id, name, email, role, bio, hourly_rate, " +
      "COALESCE(subjects, '[]') as subjects, " +
      "COALESCE(verified, 0) as verified, COALESCE(credentials, '') as credentials, " +
      "COALESCE(rating, 0) as rating, COALESCE(reviews, 0) as reviews, " +
      "COALESCE(specializations, '[]') as specializations, " +
      "COALESCE(languages, '[]') as languages, " +
      "COALESCE(availability, NULL) as availability, " +
      "COALESCE(avatar_url, NULL) as avatar_url " +
      "FROM users WHERE role = 'tutor' AND status = 'active' ORDER BY created_at ASC",
    );
    if (rows && rows.length > 0) {
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        bio: row.bio || "",
        hourly_rate: Number(row.hourly_rate) || 0,
        subjects: row.subjects ? JSON.parse(row.subjects) : [],
        verified: !!row.verified,
        credentials: row.credentials ? JSON.parse(row.credentials) : { experience_years: 5, certification: "", teaching_style: "", background: "" },
        rating: Number(row.rating) || 0,
        reviews: Number(row.reviews) || 0,
        specializations: row.specializations ? JSON.parse(row.specializations) : [],
        languages: row.languages ? JSON.parse(row.languages) : [],
        availability: row.availability ? JSON.parse(row.availability) : undefined,
        avatar_url: row.avatar_url || undefined,
      }));
    }
    // DB connected but no tutors — return empty list, not fake data.
    return [];
  } catch (err) {
    // DB unavailable in production — throw so the page renders an error state,
    // rather than silently showing fabricated demo tutors as if they were real.
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      // In local development only, fall back to demo data when DB is offline.
      // This is intentionally NOT done in production.
      return DEMO_TUTOR_DATA;
    }
    throw new Error("Tutor database unavailable");
  }
}

export async function getTutorById(id: string): Promise<TutorData | undefined> {
  const tutors = await getTutors();
  // Exact match first
  const exact = tutors.find((t) => t.id === id);
  if (exact) return exact;
  // The requested id may be a human-readable slug that's longer than the stored id
  // (e.g. /tutors/vikram-patel-spoken-english → stored id = vikram-patel-spoken)
  // Try: stored id is a prefix of requested id, or stored id appears in requested id
  return tutors.find(
    (t) =>
      id.startsWith(t.id + "-") ||
      id.startsWith(t.id + "_") ||
      id.includes(t.id),
  );
}
