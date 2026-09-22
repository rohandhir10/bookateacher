// bookateacher backend — Tutor profile routes
import { Hono } from "hono";
import { z } from "zod";
import { queryOne, execute, uid } from "../db.js";

const app = new Hono();

const updateProfileSchema = z.object({
  user_id: z.string(),
  headline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  hourly_rate: z.number().optional(),
  session_price: z.number().optional(),
  subjects: z.array(z.string()).optional(),
  experience_years: z.number().optional(),
  teaching_style: z.string().max(100).optional(),
  achievements: z.array(z.string()).optional(),
  certifications: z.string().max(500).optional(),
  education: z.string().max(200).optional(),
  demo_lesson_available: z.boolean().optional(),
  demo_lesson_price: z.number().optional(),
  availability: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional(),
});

app.post("/profile", async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, ...updates } = body as any;

    if (!user_id) {
      return c.json({ error: "Missing user_id" }, 400);
    }

    const parsed = updateProfileSchema.partial().safeParse(updates);
    if (!parsed.success) {
      return c.json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
    }

    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    const addField = (column: string, value: any) => {
      fields.push(`${column} = $${idx++}`);
      values.push(value);
    };

    if (updates.headline !== undefined) addField("headline", updates.headline);
    if (updates.bio !== undefined) addField("bio", updates.bio);
    if (updates.hourly_rate !== undefined) addField("hourly_rate", updates.hourly_rate);
    if (updates.session_price !== undefined) addField("session_price", updates.session_price);
    if (updates.subjects !== undefined) addField("subjects", JSON.stringify(updates.subjects));
    if (updates.experience_years !== undefined) addField("experience_years", updates.experience_years);
    if (updates.teaching_style !== undefined) addField("teaching_style", updates.teaching_style);
    if (updates.achievements !== undefined) addField("achievements", JSON.stringify(updates.achievements));
    if (updates.certifications !== undefined) addField("certifications", updates.certifications);
    if (updates.education !== undefined) addField("education", updates.education);
    if (updates.demo_lesson_available !== undefined) addField("demo_lesson_available", updates.demo_lesson_available);
    if (updates.demo_lesson_price !== undefined) addField("demo_lesson_price", updates.demo_lesson_price);
    if (updates.availability !== undefined) addField("availability", JSON.stringify(updates.availability));
    if (updates.languages !== undefined) addField("languages", JSON.stringify(updates.languages));

    // Also allow updating user-level fields
    if (updates.phone !== undefined) {
      await execute(`UPDATE users SET phone = $1, updated_at = NOW() WHERE id = $2`, [updates.phone, user_id]);
    }
    if (updates.avatar_url !== undefined) {
      await execute(`UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2`, [updates.avatar_url, user_id]);
    }

    if (fields.length > 0) {
      values.push(user_id);
      await execute(
        `UPDATE tutor_profiles SET ${fields.join(", ")}, updated_at = NOW() WHERE user_id = $${idx}`,
        values,
      );
    }

    const profile = await queryOne<any>(
      `SELECT * FROM tutor_profiles WHERE user_id = $1`,
      [user_id],
    );

    return c.json({ ok: true, profile });
  } catch (err) {
    console.error("Tutor profile update error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

app.get("/profile/:user_id", async (c) => {
  const user_id = c.req.param("user_id");
  const profile = await queryOne<any>(
    `SELECT tp.*, u.name, u.email, u.avatar_url, u.verified
     FROM tutor_profiles tp
     JOIN users u ON u.id = tp.user_id
     WHERE tp.user_id = $1`,
    [user_id],
  );

  if (!profile) {
    return c.json({ error: "Profile not found" }, 404);
  }

  return c.json({ profile });
});

export default app;
