import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createLead,
  updateLead,
  createSession,
  updateSession,
  getUserById,
  recordAdminAction,
} from "@/lib/db";
import { leadSchema, sessionUpdateSchema } from "@/lib/validations";
import { generateId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const action = body?.action;

    if (action === "create-lead") {
      const parsed = leadSchema.parse(body.data);
      const id = generateId();
      createLead({
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

      // If the user is logged in as a tutor, auto-assign to them
      const user = getUserById(session.user.id);
      if (user?.role === "tutor") {
        updateLead(id, {
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
      updateLead(id, updates);
      return NextResponse.json({ success: true });
    }

    if (action === "create-session") {
      const parsed = sessionUpdateSchema.parse(body.data);
      const id = generateId();
      createSession({
        id,
        tutor_id: body.tutorId,
        student_id: body.studentId,
        scheduled_at: parsed.scheduled_at || new Date().toISOString(),
        duration_minutes: parsed.duration_minutes ?? 60,
        meeting_link: parsed.meeting_link || undefined,
      });

      updateLead(body.leadId, {
        status: "matched",
        matched_at: new Date().toISOString(),
      });

      recordAdminAction(
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
      updateSession(id, updates);
      return NextResponse.json({ success: true });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
