import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  createLead,
  updateLead,
  getLeadById,
  getSessionById,
  queryOne,
  createSession,
  updateSession,
  acceptLead,
  declineLead,
  getUserById,
  executeStmt,
} from "@/lib/db";
import { leadSchema, sessionUpdateSchema } from "@/lib/validations";
import { generateId } from "@/lib/utils";
import { canTransitionSession, canTransitionPayment } from "@/lib/session-policy";
import {
  toActor,
  canCreateSession,
  canUpdateLead,
  canUpdateSession,
  canCompleteSession,
  canRequestTestimonial,
  canPublishTestimonial,
  sanitizeLeadUpdates,
  sanitizeSessionUpdates,
} from "@/lib/authorization";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";
    let body: any;
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {
        action: formData.get("action") as string,
        data: (formData.get("data") || "{}"),
        tutorId: formData.get("tutorId") as string,
        studentId: formData.get("studentId") as string,
        sessionId: formData.get("sessionId") as string,
        message: formData.get("message") as string,
        leadId: formData.get("leadId") as string,
        reason: formData.get("reason") as string,
        notes: formData.get("notes") as string,
        rating: formData.get("rating") as string,
        feedback: formData.get("feedback") as string,
        scheduled_at: formData.get("scheduled_at") as string,
        duration_minutes: formData.get("duration_minutes") as string,
        meeting_link: formData.get("meeting_link") as string,
      };
      if (typeof body.data === "string") {
        try { body.data = JSON.parse(body.data); } catch {}
      }
    }
    const action = body?.action;

    const actor = toActor(session.user);

    if (action === "create-lead") {
      const parsed = leadSchema.parse(body.data);
      const id = generateId();
      await createLead({
        id,
        student_id: session.user.role === "student" ? session.user.id : undefined,
        name: parsed.name,
        email: parsed.email || undefined,
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

      const user = await getUserById(session.user.id);
      if (user?.role === "tutor") {
        await updateLead(id, {
          status: "contacted",
          assigned_tutor_id: user.id,
          contacted_at: new Date().toISOString(),
        });
      }

      return NextResponse.json({ success: true, leadId: id });
    }

    if (action === "update-lead") {
      const { id, ...updates } = body.data;
      if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      const lead = await getLeadById(id);
      if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      if (!canUpdateLead(actor, lead)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      const safeUpdates = sanitizeLeadUpdates(actor, updates);
      if (Object.keys(safeUpdates).length === 0) {
        return NextResponse.json({ error: "No permitted fields to update" }, { status: 400 });
      }
      await updateLead(id, safeUpdates);
      return NextResponse.json({ success: true });
    }

    if (action === "create-session") {
      const parsed = sessionUpdateSchema.parse(body.data);
      const lead = await getLeadById(body.leadId);
      if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

      // A student can only create a session for themselves; a tutor can only
      // create one for themselves. Admins may specify both sides explicitly.
      const tutorId = actor.role === "tutor" ? actor.id : body.tutorId;
      const studentId = actor.role === "student" ? actor.id : body.studentId;
      if (!tutorId || !studentId) {
        return NextResponse.json({ error: "Tutor and student are required" }, { status: 400 });
      }

      const [tutor, student] = await Promise.all([
        getUserById(tutorId),
        getUserById(studentId),
      ]);
      if (tutor?.role !== "tutor" || student?.role !== "student") {
        return NextResponse.json({ error: "Invalid tutor or student" }, { status: 400 });
      }

      if (!canCreateSession(actor, lead, tutorId, studentId)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (lead.assigned_tutor_id !== tutorId) return NextResponse.json({ error: "Lead is not assigned to this tutor" }, { status: 409 });
      if (lead.student_id && lead.student_id !== studentId) return NextResponse.json({ error: "Lead belongs to a different student" }, { status: 409 });
      if (!lead.student_id) {
        const studentEmail = typeof student.email === "string" ? student.email.toLowerCase() : "";
        if (!studentEmail || typeof lead.email !== "string" || lead.email.toLowerCase() !== studentEmail) {
          return NextResponse.json({ error: "Lead relationship does not match session student" }, { status: 409 });
        }
        await updateLead(body.leadId, { student_id: studentId });
      }
      const scheduledAt = parsed.scheduled_at || new Date().toISOString();
      const durationMinutes = parsed.duration_minutes ?? 60;
      const existingConflict = await queryOne(
        `SELECT id FROM sessions
         WHERE status = 'scheduled'
           AND (tutor_id = ? OR student_id = ?)
           AND datetime(scheduled_at) < datetime(?, '+' || duration_minutes || ' minutes')
           AND datetime(?, '+' || ? || ' minutes') > datetime(scheduled_at)
         LIMIT 1`,
        [tutorId, studentId, scheduledAt, scheduledAt, durationMinutes],
      );
      if (existingConflict) return NextResponse.json({ error: "The tutor or student already has a session at that time" }, { status: 409 });
      const id = generateId();
      await createSession({
        id,
        lead_id: body.leadId,
        tutor_id: tutorId,
        student_id: studentId,
        scheduled_at: scheduledAt,
        duration_minutes: durationMinutes,
        meeting_link: parsed.meeting_link || undefined,
      });

      await updateLead(body.leadId, {
        status: "matched",
        matched_at: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, sessionId: id });
    }

    if (action === "update-session") {
      const { id, ...updates } = body.data;
      if (!id) return NextResponse.json({ error: "Session ID required" }, { status: 400 });
      const existing = await getSessionById(id);
      if (!existing) return NextResponse.json({ error: "Session not found" }, { status: 404 });
      if (!canUpdateSession(actor, existing)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

      const safeUpdates = sanitizeSessionUpdates(actor, updates);
      if (Object.keys(safeUpdates).length === 0) {
        return NextResponse.json({ error: "No permitted fields to update" }, { status: 400 });
      }

      const parsedUpdates = sessionUpdateSchema.strict().parse(safeUpdates);
      if (parsedUpdates.status && !canTransitionSession(existing.status, parsedUpdates.status)) {
        return NextResponse.json({ error: "Invalid session status transition" }, { status: 409 });
      }
      if (parsedUpdates.payment_status && !canTransitionPayment(existing.payment_status, parsedUpdates.payment_status)) {
        return NextResponse.json({ error: "Invalid payment status transition" }, { status: 409 });
      }
      if (actor.role === "tutor" && parsedUpdates.status === "completed") {
        return NextResponse.json(
          { error: "Use the completion action to complete a session" },
          { status: 400 },
        );
      }

      await updateSession(id, parsedUpdates);
      return NextResponse.json({ success: true });
    }

    if (action === "accept-lead") {
      if (actor.role !== "tutor") return NextResponse.json({ error: "Only tutors can accept leads" }, { status: 403 });
      const { id } = body.data;
      if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      const ok = await acceptLead(id, session.user.id);
      if (!ok) return NextResponse.json({ error: "Lead not found or not claimable" }, { status: 400 });
      return NextResponse.json({ success: true });
    }

    if (action === "decline-lead") {
      if (actor.role !== "tutor") return NextResponse.json({ error: "Only tutors can decline leads" }, { status: 403 });
      const { id, reason } = body.data;
      if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      await declineLead(id, session.user.id, reason || undefined);
      return NextResponse.json({ success: true });
    }

    if (action === "complete-session") {
      const parsed = z.object({
        id: z.string().min(1),
        notes: z.string().max(2000).optional(),
        rating: z.number().int().min(1).max(5).optional(),
        feedback: z.string().max(2000).optional(),
      }).strict().parse(body.data);

      const existing = await getSessionById(parsed.id);
      if (!existing) return NextResponse.json({ error: "Session not found" }, { status: 404 });
      if (!canCompleteSession(actor, existing)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      if (!canTransitionSession(existing.status, "completed")) {
        return NextResponse.json({ error: "Session is already closed" }, { status: 409 });
      }

      await updateSession(parsed.id, {
        status: "completed",
        notes: parsed.notes,
        rating: parsed.rating,
        feedback: parsed.feedback,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "send-testimonial-request") {
      const parsed = z.object({
        sessionId: z.string().min(1),
        message: z.string().max(1000).optional(),
      }).strict().parse(body.data);

      const sessionRow = await getSessionById(parsed.sessionId);
      if (!sessionRow || !canRequestTestimonial(actor, sessionRow)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const id = generateId();
      await executeStmt(
        `INSERT INTO testimonial_requests (id, session_id, student_id, tutor_id, status, message, created_at)
         VALUES (?, ?, ?, ?, 'pending', ?, datetime('now'))`,
        [id, parsed.sessionId, sessionRow.student_id, sessionRow.tutor_id, parsed.message || null],
      );
      return NextResponse.json({ success: true, requestId: id });
    }

    if (action === "publish-testimonial") {
      const { requestId, rating, text } = body.data;
      if (!requestId || !rating || !text) return NextResponse.json({ error: "requestId, rating, and text required" }, { status: 400 });
      const row = await queryOne(
        "SELECT * FROM testimonial_requests WHERE id = ? AND tutor_id = ?",
        [requestId, session.user.id],
      );
      if (row && !canPublishTestimonial(actor, row)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (!row) return NextResponse.json({ error: "Request not found" }, { status: 404 });
      if ((row as any).status !== "received") return NextResponse.json({ error: "Testimonial not yet received from student" }, { status: 400 });
      if (!(row as any).session_id || !(row as any).student_id || !(row as any).tutor_id) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      const tid = generateId();
      try {
        await executeStmt(
          `INSERT INTO testimonials (id, session_id, student_id, tutor_id, rating, text, visible) VALUES (?, ?, ?, ?, ?, ?, 1)`,
          [tid, (row as any).session_id, (row as any).student_id, (row as any).tutor_id, rating, text],
        );
        await executeStmt(`UPDATE testimonial_requests SET status = 'published', received_at = datetime('now') WHERE id = ?`, [requestId]);
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ error: err.message || "Failed to publish testimonial" }, { status: 400 });
      }
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
