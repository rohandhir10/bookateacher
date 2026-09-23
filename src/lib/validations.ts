import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  role: z.enum(["student", "tutor"]).default("student"),
  phone: z.string().min(10, "Enter a valid phone number").max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const tutorProfileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(2000).optional(),
  hourly_rate: z.number().int().positive().max(100000).optional(),
  subjects: z.array(z.string()).max(20).optional(),
  ielts_band: z.number().int().min(0).max(10).optional(),
  certification: z.string().max(500).optional(),
  experience_years: z.number().int().min(0).max(50).optional(),
  teaching_style: z.string().max(500).optional(),
  background: z.string().max(1000).optional(),
  verified_document_url: z.string().url().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(10).max(20),
  subject: z.enum([
    "ielts",
    "toefl",
    "spoken-english",
    "gre",
    "gmat",
    "sat",
    "ptet",
    "other",
  ]),
  goal: z.string().max(500).optional(),
  budget_per_hour: z
    .number()
    .int()
    .min(0)
    .max(50000)
    .optional(),
  preferred_days: z
    .array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]),
    )
    .max(7)
    .optional(),
  preferred_times: z
    .array(
      z.enum([
        "morning",
        "afternoon",
        "evening",
        "night",
      ]),
    )
    .max(4)
    .optional(),
  online_or_local: z.enum(["online", "local", "either"]).default("online"),
  location: z.string().max(200).optional(),
  current_level: z.string().max(100).optional(),
  challenge: z.string().max(1000).optional(),
});

export const sessionUpdateSchema = z.object({
  scheduled_at: z.string().datetime().optional(),
  duration_minutes: z.number().int().min(15).max(480).optional(),
  meeting_link: z.string().url().optional().or(z.literal("")),
  status: z.enum(["scheduled", "completed", "cancelled", "no_show"]).optional(),
  payment_status: z
    .enum(["pending", "paid", "refunded", "free"])
    .optional(),
  notes: z.string().max(2000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().max(2000).optional(),
});

export const testimonialSchema = z.object({
  sessionId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(2000),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TutorProfileInput = z.infer<typeof tutorProfileSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type SessionUpdateInput = z.infer<typeof sessionUpdateSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
