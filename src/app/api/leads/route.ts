import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  acceptLead,
  createLead,
  createSession,
  declineLead,
  executeStmt,
  getLeadById,
  getLeads,
  getLeadsForStudent,
  getSessionsForStudent,
  getSessionsForTutor,
  getSessionById,
  getTestimonialsForTutor,
  getTutorTestimonialRequests,
  query,
  getTutorById,
  getUserById,
  recordAdminAction,
  updateLead,
  updateSession,
} from "@/lib/db";
import { leadSchema, sessionUpdateSchema } from "@/lib/validations";
import { generateId } from "@/lib/utils";

function roleOf(session: Awaited<ReturnType<typeof auth>>) {
  return session?.user
    ? (session.user as {
        id: string;
        email: string;
        role: "student" | "tutor" | "admin";
      })
    : null;
}

export async function GET(request: Request) {
  const session = await auth();
  const actor = roleOf(session);
  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const resource = url.searchParams.get("resource");

  if (id) {
    const lead = await getLeadById(id);
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

    const canRead =
      actor.role === "admin" ||
      (actor.role === "student" && String(lead.email || "").toLowerCase() === actor.email.toLowerCase()) ||
      (actor.role === "tutor" && (!lead.assigned_tutor_id || lead.assigned_tutor_id === actor.id));

    if (!canRead) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    return NextResponse.json({ lead });
  }

  if (resource === "sessions") {
    if (actor.role === "tutor") return NextResponse.json({ sessions: await getSessionsForTutor(actor.id) });
    if (actor.role === "student") return NextResponse.json({ sessions: await getSessionsForStudent(actor.id) });
    return NextResponse.json({ sessions: [] });
  }

  if (resource === "testimonials") {
    if (actor.role !== "tutor") return NextResponse.json({ testimonials: [] });
    return NextResponse.json({ testimonials: await getTestimonialsForTutor(actor.id) });
  }

  if (resource === "testimonial-requests") {
    if (actor.role !== "tutor") return NextResponse.json({ requests: [] });
    return NextResponse.json({ requests: await getTutorTestimonialRequests(actor.id) });
  }

  let leadsForUser: any[];
  if (actor.role === "admin") {
    leadsForUser = await getLeads();
  } else if (actor.role === "student") {
    leadsForUser = await getLeadsForStudent(actor.email);
  } else {
    leadsForUser = await query(
      "SELECT * FROM leads WHERE status = 'new' OR assigned_tutor_id = ? ORDER BY created_at DESC",
      [actor.id],
    );
  }

  const normalized = leadsForUser.map((lead: any) => ({
    ...lead,
    student_name: lead.name,
    student_email: lead.email,
    student_phone: lead.phone,
  }));

  return NextResponse.json({ leads: normalized });
}

export async function POST(request: Request) {
  const session = await auth();
  const actor = roleOf(session);

  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const action = body?.action;
    const data = body?.data ?? {};

    if (action === "create-lead") {
      if (actor.role !== "student" && actor.role !== "admin") {
        return NextResponse.json({ error: "Only students can create leads." }, { status: 403 });
      }

      const parsed = leadSchema.parse(data);
      const user = actor.role === "student" ? await getUserById(actor.id) : null;
      const name = actor.role === "student" ? user?.name || parsed.name : parsed.name;
      const email = actor.role === "student" ? user?.email || parsed.email : parsed.email;

      const id = generateId();
      await createLead({
        id,
        name,
        email: email || undefined,
        phone: parsed.phone,
        subject: parsed.subject,
        goal: parsed.goal || undefined,
        budget_per_hour: parsed.budget_per_hour ?? undefined,
        preferred_days: parsed.preferred_days || undefined,
        preferred_times: parsed.preferred_times || undefined,
        online_or_local: parsed.online_or_local,
        location: parsed.location || undefined,
        current_level: parsed.current_level || undefined,
        challenge: parsed.challenge || undefined,
      });

      return NextResponse.json({ success: true, leadId: id });
    }

    if (action === "update-lead") {
      const id = typeof data.id === "string" ? data.id : "";
      if (!id) return NextResponse.json({ error: "Lead ID required." }, { status: 400 });

      const lead = await getLeadById(id);
      if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

      const isAdmin = actor.role === "admin";
      const isOwner = actor.role === "student" && String(lead.email || "").toLowerCase() === actor.email?.toLowerCase();
      if (!isAdmin && !isOwner) {
        return NextResponse.json({ error: "You cannot update this lead." }, { status: 403 });
      }

      const { id: _id, ...updates } = data;
      const safeUpdates: Record<string, unknown> = {};
      for (const key of [
        "goal",
        "budget_per_hour",
        "preferred_days",
        "preferred_times",
        "online_or_local",
        "location",
        "current_level",
        "challenge",
      ]) {
        if (updates[key] !== undefined) safeUpdates[key] = updates[key];
      }
      await updateLead(id, safeUpdates);
      return NextResponse.json({ success: true });
    }

    if (action === "create-session") {
      const leadId = typeof data.lead_id === "string" ? data.lead_id : "";
      const tutorId = typeof data.tutor_id === "string" ? data.tutor_id : "";
      if (!leadId || !tutorId) {
        return NextResponse.json({ error: "lead_id and tutor_id are required." }, { status: 400 });
      }

      const lead = await getLeadById(leadId);
      const tutor = await getTutorById(tutorId);
      if (!lead || !tutor) {
        return NextResponse.json({ error: "Lead or tutor not found." }, { status: 404 });
      }

      const isAdmin = actor.role === "admin";
      const isStudentOwner =
        actor.role === "student" &&
        String(lead.email || "").toLowerCase() === actor.email.toLowerCase();

      if (!isAdmin && !isStudentOwner) {
        return NextResponse.json({ error: "You cannot create this session." }, { status: 403 });
      }

      const parsed = sessionUpdateSchema.parse(data);
      const id = generateId();

      const studentId = isAdmin ? String(data.student_id || "") : actor.id;
      const student = await getUserById(studentId);
      if (!student || student.role !== "student") {
        return NextResponse.json({ error: "A valid student account is required." }, { status: 400 });
      }

      await createSession({
        id,
        tutor_id: tutorId,
        student_id: studentId,
        scheduled_at: parsed.scheduled_at || new Date().toISOString(),
        duration_minutes: parsed.duration_minutes ?? 60,
        meeting_link: parsed.meeting_link || undefined,
        amount_inr: typeof data.amount_inr === "number" ? data.amount_inr : null,
      });

      await updateLead(leadId, {
        status: "matched",
        assigned_tutor_id: tutorId,
        matched_at: new Date().toISOString(),
      });

      if (isAdmin) {
        await recordAdminAction(actor.id, "created_session", "session", id, {
          leadId,
          tutorId,
          studentId: isAdmin ? data.student_id : actor.id,
        });
      }

      return NextResponse.json({ success: true, sessionId: id });
    }

    if (action === "update-session") {
      const id = typeof data.id === "string" ? data.id : "";
      if (!id) return NextResponse.json({ error: "Session ID required." }, { status: 400 });

      const tutoringSession = await getSessionById(id);
      if (!tutoringSession) {
        return NextResponse.json({ error: "Session not found." }, { status: 404 });
      }

      const ownsStudent = tutoringSession.student_id === actor.id;
      const ownsTutor = tutoringSession.tutor_id === actor.id;
      if (actor.role !== "admin" && !ownsStudent && !ownsTutor) {
        return NextResponse.json({ error: "You cannot update this session." }, { status: 403 });
      }

      const parsed = sessionUpdateSchema.parse(data);
      const updates: Record<string, unknown> = {};
      for (const key of [
        "scheduled_at",
        "duration_minutes",
        "status",
        "meeting_link",
        "payment_status",
        "notes",
      ]) {
        if (parsed[key as keyof typeof parsed] !== undefined) {
          updates[key] = parsed[key as keyof typeof parsed];
        }
      }

      if (parsed.rating !== undefined || parsed.feedback !== undefined) {
        if (!ownsStudent && actor.role !== "admin") {
          return NextResponse.json({ error: "Only the student can submit session feedback." }, { status: 403 });
        }
        if (parsed.rating !== undefined) updates.rating = parsed.rating;
        if (parsed.feedback !== undefined) updates.feedback = parsed.feedback;
      }

      await updateSession(id, updates);
      return NextResponse.json({ success: true });
    }

    if (action === "accept-lead") {
      if (actor.role !== "tutor") {
        return NextResponse.json({ error: "Only tutors can accept leads." }, { status: 403 });
      }
      const id = typeof data.id === "string" ? data.id : "";
      if (!id) return NextResponse.json({ error: "Lead ID required." }, { status: 400 });
      const ok = await acceptLead(id, actor.id);
      return ok
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Lead not found or no longer available." }, { status: 409 });
    }

    if (action === "decline-lead") {
      if (actor.role !== "tutor") {
        return NextResponse.json({ error: "Only tutors can decline leads." }, { status: 403 });
      }
      const id = typeof data.id === "string" ? data.id : "";
      if (!id) return NextResponse.json({ error: "Lead ID required." }, { status: 400 });
      const ok = await declineLead(id, actor.id, typeof data.reason === "string" ? data.reason : undefined);
      return ok
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Lead not found or cannot be declined." }, { status: 409 });
    }

    if (action === "complete-session") {
      const id = typeof data.id === "string" ? data.id : "";
      if (!id) return NextResponse.json({ error: "Session ID required." }, { status: 400 });
      const tutoringSession = await getSessionById(id);
      if (!tutoringSession) return NextResponse.json({ error: "Session not found." }, { status: 404 });
      if (actor.role !== "admin" && tutoringSession.tutor_id !== actor.id) {
        return NextResponse.json({ error: "Only the assigned tutor or an admin can complete a session." }, { status: 403 });
      }
      await updateSession(id, {
        status: "completed",
        notes: typeof data.notes === "string" ? data.notes : undefined,
        rating: typeof data.rating === "number" ? data.rating : undefined,
        feedback: typeof data.feedback === "string" ? data.feedback : undefined,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "send-testimonial-request") {
      if (actor.role !== "tutor") {
        return NextResponse.json({ error: "Only tutors can request testimonials." }, { status: 403 });
      }
      const sessionId = typeof data.sessionId === "string" ? data.sessionId : "";
      if (!sessionId) return NextResponse.json({ error: "sessionId is required." }, { status: 400 });
      const tutoringSession = await getSessionById(sessionId);
      if (!tutoringSession || tutoringSession.tutor_id !== actor.id) {
        return NextResponse.json({ error: "Session not found." }, { status: 404 });
      }
      const requestId = generateId();
      await executeStmt(
        "INSERT INTO testimonial_requests (id, session_id, student_id, tutor_id, status, message, created_at) VALUES (?, ?, ?, ?, 'pending', ?, datetime('now'))",
        [requestId, sessionId, tutoringSession.student_id, actor.id, typeof data.message === "string" ? data.message : null],
      );
      return NextResponse.json({ success: true, requestId });
    }

    if (action === "publish-testimonial") {
      if (actor.role !== "tutor") {
        return NextResponse.json({ error: "Only tutors can publish testimonials." }, { status: 403 });
      }
      const requestId = typeof data.requestId === "string" ? data.requestId : "";
      const rating = typeof data.rating === "number" ? data.rating : 0;
      const text = typeof data.text === "string" ? data.text.trim() : "";
      if (!requestId || rating < 1 || rating > 5 || text.length < 10) {
        return NextResponse.json({ error: "Valid requestId, rating, and text are required." }, { status: 400 });
      }

      const row = await import("@/lib/db").then((m) =>
        m.queryOne("SELECT * FROM testimonial_requests WHERE id = ? AND tutor_id = ?", [requestId, actor.id])
      );
      if (!row) return NextResponse.json({ error: "Request not found." }, { status: 404 });
      if (row.status !== "received") {
        return NextResponse.json({ error: "Testimonial is not ready to publish." }, { status: 409 });
      }

      await executeStmt(
        "INSERT INTO testimonials (id, session_id, student_id, tutor_id, rating, text, visible) VALUES (?, ?, ?, ?, ?, ?, 1)",
        [generateId(), row.session_id, row.student_id, row.tutor_id, rating, text],
      );
      await executeStmt(
        "UPDATE testimonial_requests SET status = 'published', received_at = datetime('now') WHERE id = ?",
        [requestId],
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
