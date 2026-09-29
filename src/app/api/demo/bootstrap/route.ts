import { NextResponse } from "next/server";
import { createTestimonial, createLead, createSession, executeStmt, getUserByEmail, getUserById, updateSession, createUser, uid } from "@/lib/db";
import { hashPassword } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

const DEMO_PASSWORD = "Demo@12345";
const DEMO_STUDENT = {
  email: "demo.student@bookateacher.in",
  name: "Demo Student",
};
const DEMO_TUTOR = {
  email: "demo.tutor@bookateacher.in",
  name: "Demo Tutor",
};

function isDemoAllowed() {
  return process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV !== "production";
}

async function ensureUser({
  email,
  name,
  role,
  verified,
}: {
  email: string;
  name: string;
  role: "student" | "tutor";
  verified: number;
}) {
  const existing = await getUserByEmail(email);
  if (existing) return existing;

  const id = uid();
  await createUser({
    id,
    email,
    name,
    password_hash: await hashPassword(DEMO_PASSWORD),
    role,
    verified,
    status: "active",
    phone: role === "tutor" ? "+91 90000 00000" : undefined,
    bio:
      role === "tutor"
        ? "Preview tutor account used to demonstrate the BookATeacher workspace."
        : "Preview student account used to demonstrate the BookATeacher workspace.",
    hourly_rate: role === "tutor" ? 1800 : undefined,
    subjects: role === "tutor" ? ["ielts", "spoken-english"] : undefined,
    credentials:
      role === "tutor"
        ? {
            experience_years: 5,
            certification: "Demo credential — preview only",
            teaching_style: "Structured, practical and feedback-led",
            background: "Preview account for testing the tutor dashboard.",
          }
        : undefined,
  });

  return getUserById(id);
}

export async function POST() {
  if (!isDemoAllowed()) {
    return NextResponse.json({ error: "Demo access is disabled." }, { status: 404 });
  }

  try {
    const [student, tutor] = await Promise.all([
      ensureUser({
        ...DEMO_STUDENT,
        role: "student",
        verified: 1,
      }),
      ensureUser({
        ...DEMO_TUTOR,
        role: "tutor",
        verified: 1,
      }),
    ]);

    if (!student || !tutor) {
      return NextResponse.json({ error: "Could not create demo users." }, { status: 500 });
    }

    const existingLead = await (async () => {
      const rows = await import("@/lib/db").then(({ query }) =>
        query<any>(
          "SELECT * FROM leads WHERE email = ? AND name = ? ORDER BY created_at DESC LIMIT 1",
          [DEMO_STUDENT.email, DEMO_STUDENT.name],
        ),
      );
      return rows[0];
    })();

    let leadId = existingLead?.id as string | undefined;
    if (!leadId) {
      leadId = uid();
      await createLead({
        id: leadId,
        name: DEMO_STUDENT.name,
        email: DEMO_STUDENT.email,
        phone: "+91 90000 00001",
        subject: "ielts",
        goal: "Reach IELTS 7.5 for university applications.",
        budget_per_hour: 2000,
        preferred_days: ["monday", "wednesday", "friday"],
        preferred_times: ["evening"],
        online_or_local: "online",
        current_level: "Band 6.5",
        challenge: "Writing Task 2 structure and speaking fluency.",
      });
      await executeStmt(
        "UPDATE leads SET status = 'contacted', assigned_tutor_id = ?, contacted_at = datetime('now') WHERE id = ?",
        [tutor.id, leadId],
      );
    }

    const sessions = await import("@/lib/db").then(({ query }) =>
      query<any>(
        "SELECT * FROM sessions WHERE student_id = ? AND tutor_id = ? ORDER BY scheduled_at ASC",
        [student.id, tutor.id],
      ),
    );

    if (sessions.length === 0) {
      const completedId = uid();
      await createSession({
        id: completedId,
        tutor_id: tutor.id,
        student_id: student.id,
        scheduled_at: "2026-09-20T10:00:00.000Z",
        duration_minutes: 60,
      });
      await updateSession(completedId, {
        status: "completed",
        completed_at: "2026-09-20T11:00:00.000Z",
        payment_status: "paid",
        rating: 5,
        feedback: "Great first diagnostic session.",
        feedback_by: "student",
      });
      await createTestimonial({
        id: uid(),
        session_id: completedId,
        student_id: student.id,
        tutor_id: tutor.id,
        rating: 5,
        text: "A useful, focused preview lesson. The dashboard demo works beautifully.",
      });

      await createSession({
        id: uid(),
        tutor_id: tutor.id,
        student_id: student.id,
        scheduled_at: "2026-10-03T10:30:00.000Z",
        duration_minutes: 60,
      });
    }

    return NextResponse.json({
      ok: true,
      users: {
        student: { email: DEMO_STUDENT.email, password: DEMO_PASSWORD },
        tutor: { email: DEMO_TUTOR.email, password: DEMO_PASSWORD },
      },
      leadId,
    });
  } catch (error) {
    console.error("Demo bootstrap error:", error);
    return NextResponse.json({ error: "Unable to bootstrap demo accounts." }, { status: 500 });
  }
}
