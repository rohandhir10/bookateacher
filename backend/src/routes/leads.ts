// bookateacher backend — Leads routes (create, update, accept/decline, sessions)
import { Hono } from "hono";
import { z } from "zod";
import {
  query,
  queryOne,
  execute,
  uid,
} from "../db.js";

const app = new Hono();

// ─── Schemas ───────────────────────────────────────────────────────────────────

const createLeadSchema = z.object({
  student_id: z.string(),
  subject: z.string(),
  budget_per_hour: z.number().optional(),
  requirements: z.string().optional(),
  experience_level: z.string().optional(),
  preferred_language: z.string().optional(),
});

const updateSessionSchema = z.object({
  id: z.string(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled", "no_show"]).optional(),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().optional(),
  feedback_by: z.enum(["student", "tutor"]).optional(),
});

const acceptLeadSchema = z.object({
  id: z.string(),
  tutor_id: z.string(),
});

const declineLeadSchema = z.object({
  id: z.string(),
  tutor_id: z.string(),
});

const requestTestimonialSchema = z.object({
  session_id: z.string(),
  recipient_id: z.string(),
  requester_id: z.string(),
});

// ─── POST /api/leads ───────────────────────────────────────────────────────────

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { action, data } = body as { action: string; data: any };

    if (!action || !data) {
      return c.json({ error: "Missing action or data" }, 400);
    }

    // ── Create lead ──────────────────────────────────────────────────────────
    if (action === "create-lead") {
      const parsed = createLeadSchema.safeParse(data);
      if (!parsed.success) {
        return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
      }

      const { student_id, subject, budget_per_hour, requirements, experience_level, preferred_language } = parsed.data;
      const id = uid();

      await execute(
        `INSERT INTO leads (id, student_id, subject, budget_per_hour, requirements,
          experience_level, preferred_language, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'new', NOW())`,
        [id, student_id, subject, budget_per_hour ?? null, requirements ?? null,
         experience_level ?? null, preferred_language ?? null],
      );

      return c.json({ ok: true, id }, 201);
    }

    // ── Update lead ──────────────────────────────────────────────────────────
    if (action === "update-lead") {
      const { id, ...updates } = data as any;
      if (!id) return c.json({ error: "Missing lead id" }, 400);

      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (updates.status !== undefined) {
        fields.push(`status = $${idx++}`);
        values.push(updates.status);
        if (updates.status === "contacted") {
          fields.push(`contacted_at = NOW()`);
        } else if (updates.status === "rejected") {
          fields.push(`rejected_at = NOW()`);
        }
      }
      if (updates.requirements !== undefined) {
        fields.push(`requirements = $${idx++}`);
        values.push(updates.requirements);
      }
      if (updates.budget_per_hour !== undefined) {
        fields.push(`budget_per_hour = $${idx++}`);
        values.push(updates.budget_per_hour);
      }

      if (fields.length === 0) {
        return c.json({ error: "No fields to update" }, 400);
      }

      values.push(id);
      await execute(
        `UPDATE leads SET ${fields.join(", ")} WHERE id = $${idx}`,
        values,
      );

      return c.json({ ok: true });
    }

    // ── Accept lead ──────────────────────────────────────────────────────────
    if (action === "accept-lead") {
      const parsed = acceptLeadSchema.safeParse(data);
      if (!parsed.success) {
        return c.json({ error: "Validation failed" }, 400);
      }

      const { id, tutor_id } = parsed.data;

      const lead = await queryOne<{
        id: string;
        status: string;
        assigned_tutor_id: string | null;
        student_id: string;
      }>(`SELECT id, status, assigned_tutor_id, student_id FROM leads WHERE id = $1`, [id]);

      if (!lead) return c.json({ error: "Lead not found" }, 404);
      if (lead.status !== "new") return c.json({ error: "Lead already processed" }, 400);

      await execute(
        `UPDATE leads SET status = 'contacted', assigned_tutor_id = $1, contacted_at = NOW() WHERE id = $2`,
        [tutor_id, id],
      );

      return c.json({ ok: true, message: "Lead accepted" });
    }

    // ── Decline lead ──────────────────────────────────────────────────────────
    if (action === "decline-lead") {
      const parsed = declineLeadSchema.safeParse(data);
      if (!parsed.success) {
        return c.json({ error: "Validation failed" }, 400);
      }

      const { id, tutor_id } = parsed.data;

      const lead = await queryOne<{ id: string; status: string; assigned_tutor_id: string | null }>(
        `SELECT id, status, assigned_tutor_id FROM leads WHERE id = $1`, [id],
      );

      if (!lead) return c.json({ error: "Lead not found" }, 404);
      if (lead.status !== "new" && lead.assigned_tutor_id !== tutor_id) {
        return c.json({ error: "Cannot decline this lead" }, 400);
      }

      await execute(
        `UPDATE leads SET status = 'archived', assigned_tutor_id = $1 WHERE id = $2`,
        [tutor_id, id],
      );

      return c.json({ ok: true, message: "Lead declined" });
    }

    // ── Create session ────────────────────────────────────────────────────────
    if (action === "create-session") {
      const { lead_id, tutor_id, scheduled_at, subject, topic, meeting_link } = data as any;

      if (!lead_id || !tutor_id) {
        return c.json({ error: "Missing lead_id or tutor_id" }, 400);
      }

      const lead = await queryOne<{ student_id: string; status: string }>(
        `SELECT student_id, status FROM leads WHERE id = $1`, [lead_id],
      );

      if (!lead) return c.json({ error: "Lead not found" }, 404);
      if (lead.status !== "contacted") return c.json({ error: "Lead not in contactable state" }, 400);

      const sessionId = uid();
      await execute(
        `INSERT INTO sessions (id, student_id, tutor_id, status, scheduled_at, subject, topic, meeting_link, created_at)
         VALUES ($1, $2, $3, 'scheduled', $4, $5, $6, $7, NOW())`,
        [sessionId, lead.student_id, tutor_id, scheduled_at ?? null, subject ?? null, topic ?? null, meeting_link ?? null],
      );

      await execute(
        `UPDATE leads SET status = 'matched', matched_at = NOW() WHERE id = $1`,
        [lead_id],
      );

      return c.json({ ok: true, session_id: sessionId }, 201);
    }

    // ── Update session ─────────────────────────────────────────────────────────
    if (action === "update-session") {
      const parsed = updateSessionSchema.safeParse(data);
      if (!parsed.success) {
        return c.json({ error: "Validation failed" }, 400);
      }

      const { id, status, started_at, completed_at, rating, feedback, feedback_by } = parsed.data;
      if (!id) return c.json({ error: "Missing session id" }, 400);

      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (status !== undefined) {
        fields.push(`status = $${idx++}`);
        values.push(status);
        if (status === "in_progress") fields.push(`started_at = NOW()`);
        else if (status === "completed") fields.push(`completed_at = NOW()`);
      }
      if (started_at !== undefined) {
        fields.push(`started_at = $${idx++}`);
        values.push(started_at);
      }
      if (completed_at !== undefined) {
        fields.push(`completed_at = $${idx++}`);
        values.push(completed_at);
      }
      if (rating !== undefined) {
        fields.push(`rating = $${idx++}`);
        values.push(rating);
      }
      if (feedback !== undefined) {
        fields.push(`feedback = $${idx++}`);
        values.push(feedback);
      }
      if (feedback_by !== undefined) {
        fields.push(`feedback_by = $${idx++}`);
        values.push(feedback_by);
      }

      if (fields.length === 0) {
        return c.json({ error: "No fields to update" }, 400);
      }

      values.push(id);
      await execute(
        `UPDATE sessions SET ${fields.join(", ")} WHERE id = $${idx}`,
        values,
      );

      return c.json({ ok: true });
    }

    // ── Request testimonial ────────────────────────────────────────────────────
    if (action === "request-testimonial") {
      const parsed = requestTestimonialSchema.safeParse(data);
      if (!parsed.success) {
        return c.json({ error: "Validation failed" }, 400);
      }

      const { session_id, recipient_id, requester_id } = parsed.data;
      const id = uid();

      await execute(
        `INSERT INTO testimonial_requests (id, session_id, requester_id, recipient_id, status, created_at)
         VALUES ($1, $2, $3, $4, 'pending', NOW())`,
        [id, session_id, requester_id, recipient_id],
      );

      return c.json({ ok: true, id }, 201);
    }

    // ── Submit testimonial ─────────────────────────────────────────────────────
    if (action === "submit-testimonial") {
      const { session_id, author_id, recipient_id, rating, content, is_public } = data as any;

      if (!session_id || !author_id || !recipient_id || !rating) {
        return c.json({ error: "Missing required fields" }, 400);
      }

      const id = uid();
      await execute(
        `INSERT INTO testimonials (id, session_id, author_id, recipient_id, rating, content, is_public, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
        [id, session_id, author_id, recipient_id, rating, content ?? null, is_public ?? true],
      );

      // Mark the testimonial request as completed if one exists
      await execute(
        `UPDATE testimonial_requests SET status = 'completed', responded_at = NOW()
         WHERE session_id = $1 AND recipient_id = $2 AND status = 'pending'`,
        [session_id, recipient_id],
      );

      return c.json({ ok: true, id }, 201);
    }

    return c.json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("Leads API error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ─── GET /api/leads ────────────────────────────────────────────────────────────

app.get("/", async (c) => {
  const student_id = c.req.query("student_id");
  const tutor_id = c.req.query("tutor_id");

  if (student_id) {
    const leads = await query(
      `SELECT id, subject, budget_per_hour, requirements, experience_level,
              preferred_language, status, assigned_tutor_id, contacted_at,
              matched_at, rejected_at, created_at
       FROM leads WHERE student_id = $1 ORDER BY created_at DESC`,
      [student_id],
    );
    return c.json({ leads });
  }

  if (tutor_id) {
    const leads = await query(
      `SELECT id, student_id, subject, budget_per_hour, requirements, experience_level,
              preferred_language, status, assigned_tutor_id, contacted_at,
              matched_at, rejected_at, created_at
       FROM leads WHERE assigned_tutor_id = $1 ORDER BY created_at DESC`,
      [tutor_id],
    );
    return c.json({ leads });
  }

  return c.json({ error: "Missing student_id or tutor_id" }, 400);
});

// ─── PATCH /api/leads/:id ────────────────────────────────────────────────────────
// Update lead status (contacted, accepted, rejected, archived) + assign tutor

app.patch("/:id", async (c) => {
  const id = c.req.param("id");
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    body = {};
  }
  const { status, tutor_id } = body;

  if (!status && !tutor_id) {
    return c.json({ error: "Missing status or tutor_id" }, 400);
  }

  if (status) {
    const allowed = ["contacted", "accepted", "rejected", "archived"];
    if (!allowed.includes(status)) {
      return c.json({ error: "Invalid status. Allowed: contacted, accepted, rejected, archived" }, 400);
    }
  }

  const lead = await queryOne<any>(`SELECT * FROM leads WHERE id = $1`, [id]);
  if (!lead) return c.json({ error: "Lead not found" }, 404);

  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (status) {
    fields.push(`status = $${idx++}`);
    values.push(status);
    if (status === "contacted") fields.push(`contacted_at = NOW()`);
    else if (status === "rejected") fields.push(`rejected_at = NOW()`);
  }
  if (tutor_id) {
    fields.push(`assigned_tutor_id = $${idx++}`);
    values.push(tutor_id);
    fields.push(`contacted_at = NOW()`);
  }

  values.push(id);
  await execute(`UPDATE leads SET ${fields.join(", ")} WHERE id = $${idx}`, values);

  const updated = await queryOne<any>(`SELECT * FROM leads WHERE id = $1`, [id]);
  return c.json({ ok: true, lead: updated });
});

// ─── GET /api/leads/sessions/student/:student_id ───────────────────────────────

app.get("/sessions/student/:student_id", async (c) => {
  const student_id = c.req.param("student_id");
  const sessions = await query(
    `SELECT id, student_id, tutor_id, status, scheduled_at, started_at, completed_at,
            subject, topic, notes, rating, feedback, feedback_by, meeting_link, created_at
     FROM sessions WHERE student_id = $1 ORDER BY scheduled_at DESC`,
    [student_id],
  );
  return c.json({ sessions });
});

// ─── GET /api/leads/:id ────────────────────────────────────────────────────────

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const lead = await queryOne<any>(`SELECT * FROM leads WHERE id = $1`, [id]);
  if (!lead) return c.json({ error: "Lead not found" }, 404);
  return c.json({ lead });
});

// ─── GET /api/leads/sessions/:tutor_id ─────────────────────────────────────────

app.get("/sessions/:tutor_id", async (c) => {
  const tutor_id = c.req.param("tutor_id");
  const sessions = await query(
    `SELECT id, student_id, tutor_id, status, scheduled_at, started_at, completed_at,
            subject, topic, notes, rating, feedback, feedback_by, meeting_link, created_at
     FROM sessions WHERE tutor_id = $1 ORDER BY scheduled_at DESC`,
    [tutor_id],
  );
  return c.json({ sessions });
});

// ─── GET /api/leads/testimonials/:recipient_id ────────────────────────────────

app.get("/testimonials/:recipient_id", async (c) => {
  const recipient_id = c.req.param("recipient_id");
  const testimonials = await query(
    `SELECT id, session_id, author_id, recipient_id, rating, content, is_public, created_at
     FROM testimonials WHERE recipient_id = $1 AND is_public = TRUE ORDER BY created_at DESC`,
    [recipient_id],
  );
  return c.json({ testimonials });
});

// ─── GET /api/leads/testimonial-requests/:recipient_id ────────────────────────

app.get("/testimonial-requests/:recipient_id", async (c) => {
  const recipient_id = c.req.param("recipient_id");
  const requests = await query(
    `SELECT id, session_id, requester_id, recipient_id, status, created_at, responded_at
     FROM testimonial_requests WHERE recipient_id = $1 AND status = 'pending'
     ORDER BY created_at DESC`,
    [recipient_id],
  );
  return c.json({ requests });
});

export default app;
