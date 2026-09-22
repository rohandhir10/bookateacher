import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createLead,
  updateLead,
  createSession,
  updateSession,
  acceptLead,
  declineLead,
  getUserById,
  recordAdminAction,
  executeStmt,
  queryOne,
} from "@/lib/db";
import { leadSchema, sessionUpdateSchema } from "@/lib/validations";
import { generateId } from "@/lib/utils";

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

    if (action === "create-lead") {
      const parsed = leadSchema.parse(body.data);
      const id = generateId();
      await createLead({
        id,
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
      await updateLead(id, updates);
      return NextResponse.json({ success: true });
    }

    if (action === "create-session") {
      const parsed = sessionUpdateSchema.parse(body.data);
      const id = generateId();
      await createSession({
        id,
        tutor_id: body.tutorId,
        student_id: body.studentId,
        scheduled_at: parsed.scheduled_at || new Date().toISOString(),
        duration_minutes: parsed.duration_minutes ?? 60,
        meeting_link: parsed.meeting_link || undefined,
      });

      await updateLead(body.leadId, {
        status: "matched",
        matched_at: new Date().toISOString(),
      });

      await recordAdminAction(
        session.user.id,
        "created_session",
        "session",
        id,
        { leadId: body.leadId, tutorId: body.tutorId, studentId: body.studentId },
      );

      return NextResponse.json({ success: true, sessionId: id });
    }

    if (action === "update-session") {
      const { id, ...updates } = body.data;
      if (!id) return NextResponse.json({ error: "Session ID required" }, { status: 400 });
      await updateSession(id, updates);
      return NextResponse.json({ success: true });
    }

    if (action === "accept-lead") {
      const { id } = body.data;
      if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      const ok = await acceptLead(id, session.user.id);
      if (!ok) return NextResponse.json({ error: "Lead not found or not claimable" }, { status: 400 });
      return NextResponse.json({ success: true });
    }

    if (action === "decline-lead") {
      const { id, reason } = body.data;
      if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
      await declineLead(id, session.user.id, reason || undefined);
      return NextResponse.json({ success: true });
    }

    if (action === "complete-session") {
      const { id, notes, rating, feedback } = body.data;
      if (!id) return NextResponse.json({ error: "Session ID required" }, { status: 400 });
      await updateSession(id, {
        status: "completed",
        notes: notes || undefined,
        rating: rating !== undefined ? rating : undefined,
        feedback: feedback || undefined,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "send-testimonial-request") {
      const { sessionId, studentId, message } = body.data;
      if (!sessionId || !studentId) return NextResponse.json({ error: "sessionId and studentId required" }, { status: 400 });
      const id = generateId();
      await executeStmt(
        `INSERT INTO testimonial_requests (id, session_id, student_id, tutor_id, status, message, created_at) VALUES (?, ?, ?, ?, 'pending', ?, datetime('now'))`,
        [id, sessionId, studentId, session.user.id, message || null],
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
