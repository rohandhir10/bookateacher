"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/lib/validations";
import { SUBJECT_LABELS, SUBJECT_DESCRIPTIONS } from "@/lib/utils";

const SUBJECTS = Object.entries(SUBJECT_LABELS).map(([slug, label]) => ({
  slug,
  label,
  description: SUBJECT_DESCRIPTIONS[slug],
}));

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "tutor",
    phone: "",
    // Student lead fields
    subject: "ielts" as string,
    goal: "",
    budget_per_hour: "",
    preferred_days: [] as string[],
    preferred_times: [] as string[],
    online_or_local: "online" as "online" | "local" | "either",
    location: "",
    current_level: "",
    challenge: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Register the user
      const parsed = registerSchema.parse(formData);
      const res = await fetch("/api/auth/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", data: parsed }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Registration failed");

      const loginResult = await signIn("credentials", {
        email: parsed.email,
        password: parsed.password,
        redirect: false,
      });
      if (!loginResult?.ok) throw new Error("Account created, but sign-in failed.");

      // If student, also create a lead so the matching flow has something to show
      if (parsed.role === "student") {
        try {
          const leadRes = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "create-lead",
              data: {
                name: parsed.name,
                email: parsed.email,
                phone: "",
                subject: formData.subject || "ielts",
                goal: formData.goal || undefined,
                budget_per_hour: formData.budget_per_hour
                  ? Number(formData.budget_per_hour)
                  : undefined,
                preferred_days: formData.preferred_days.length > 0
                  ? formData.preferred_days
                  : undefined,
                preferred_times: formData.preferred_times.length > 0
                  ? formData.preferred_times
                  : undefined,
                online_or_local: formData.online_or_local,
                location: formData.location || undefined,
                current_level: formData.current_level || undefined,
                challenge: formData.challenge || undefined,
              },
            }),
          });
          const leadJson = await leadRes.json();
          if (leadRes.ok && leadJson.leadId) {
            router.push(`/matching-status?leadId=${leadJson.leadId}`);
            return;
          }
        } catch {
          // Lead creation failed — fall through to dashboard
        }
      }

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-success bg-opacity-10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {formData.role === "tutor" ? "Account created!" : "Welcome aboard!"}
        </h2>
        <p className="text-foreground-muted mb-6">
          {formData.role === "tutor"
            ? "Your account is ready. Complete your tutor profile to start receiving student leads."
            : "You&apos;re signed up. Let&apos;s find you the perfect tutor."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={formData.role === "tutor" ? "/tutor/profile" : "/dashboard"}
            className="btn btn-primary flex-1"
          >
            {formData.role === "tutor" ? "Complete profile" : "Go to dashboard"}
          </a>
          <a href="/" className="btn btn-ghost flex-1">
            Browse tutors
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Role toggle */}
      <div className="flex bg-bg-secondary rounded-lg p-1 mb-6" role="tablist">
        <button
          role="tab"
          aria-selected={formData.role === "student"}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            formData.role === "student"
              ? "bg-surface text-foreground shadow-sm"
              : "text-foreground-muted hover:text-foreground"
          }`}
          onClick={() =>
            setFormData((f) => ({ ...f, role: "student", subject: "ielts" }))
          }
        >
          I&apos;m a student
        </button>
        <button
          role="tab"
          aria-selected={formData.role === "tutor"}
          className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            formData.role === "tutor"
              ? "bg-surface text-foreground shadow-sm"
              : "text-foreground-muted hover:text-foreground"
          }`}
          onClick={() =>
            setFormData((f) => ({ ...f, role: "tutor", subject: "ielts" }))
          }
        >
          I&apos;m a tutor
        </button>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-lg bg-error-soft text-error text-sm flex items-start gap-2"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Common fields */}
        <div className="form-group">
          <label className="label" htmlFor="reg-name">Full name</label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            className="input"
            placeholder="Priya Sharma"
            value={formData.name}
            onChange={(e) =>
              setFormData((f) => ({ ...f, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="reg-email">Email address</label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            className="input"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({ ...f, email: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            className="input"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={(e) =>
              setFormData((f) => ({ ...f, password: e.target.value }))
            }
            required
            minLength={8}
          />
          <p className="text-xs text-foreground-subtle mt-1">
            At least 8 characters
          </p>
        </div>

        {/* Student-specific fields */}
        {formData.role === "student" && (
          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-sm font-medium text-foreground mb-2">
              What do you want to learn?{" "}
              <span className="text-foreground-subtle font-normal">(optional — helps us match you)</span>
            </p>

            <div className="form-group">
              <label className="label" htmlFor="subject">
                Subject
              </label>
              <select
                id="subject"
                className="input"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, subject: e.target.value }))
                }
              >
                {SUBJECTS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.label} — {s.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="label" htmlFor="budget">
                  Budget per hour (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">₹</span>
                  <input
                    id="budget"
                    type="number"
                    className="input pl-8"
                    placeholder="500"
                    min="0"
                    step="100"
                    value={formData.budget_per_hour}
                    onChange={(e) =>
                      setFormData((f) => ({
                        ...f,
                        budget_per_hour: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label" htmlFor="level">
                  Current level
                </label>
                <input
                  id="level"
                  type="text"
                  className="input"
                  placeholder="e.g. Beginner, Band 6.0"
                  value={formData.current_level}
                  onChange={(e) =>
                    setFormData((f) => ({
                      ...f,
                      current_level: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="goal">
                Goal
              </label>
              <input
                id="goal"
                type="text"
                className="input"
                placeholder="e.g. Get Band 7.5 in IELTS in 2 months"
                value={formData.goal}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, goal: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="challenge">
                What are you struggling with?
              </label>
              <textarea
                id="challenge"
                className="input min-h-[80px]"
                placeholder="e.g. Writing and speaking are my weak areas. I need help with time management in reading."
                value={formData.challenge}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, challenge: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="label" htmlFor="online-local">
                  Online or local?
                </label>
                <select
                  id="online-local"
                  className="input"
                  value={formData.online_or_local}
                  onChange={(e) =>
                    setFormData((f) => ({
                      ...f,
                      online_or_local: e.target.value as "online" | "local" | "either",
                    }))
                  }
                >
                  <option value="online">Online</option>
                  <option value="local">Local (in-person)</option>
                  <option value="either">Either</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="input"
                  placeholder="e.g. Delhi, Mumbai, Bangalore"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, location: e.target.value }))
                  }
                />
                <p className="text-xs text-foreground-subtle mt-1">
                  Used for local tutor matching
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <label className="label mb-2">
                Preferred days{" "}
                <span className="text-foreground-subtle font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
                  (day) => (
                    <button
                      key={day}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                        formData.preferred_days.includes(day)
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-border bg-surface text-foreground-muted hover:border-border-strong"
                      }`}
                      onClick={() =>
                        setFormData((f) => ({
                          ...f,
                          preferred_days: f.preferred_days.includes(day)
                            ? f.preferred_days.filter((d) => d !== day)
                            : [...f.preferred_days, day],
                        }))
                      }
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                    </button>
                  ),
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["morning", "afternoon", "evening", "night"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all capitalize ${
                      formData.preferred_times.includes(time)
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-border bg-surface text-foreground-muted hover:border-border-strong"
                    }`}
                    onClick={() =>
                      setFormData((f) => ({
                        ...f,
                        preferred_times: f.preferred_times.includes(time)
                          ? f.preferred_times.filter((t) => t !== time)
                          : [...f.preferred_times, time],
                      }))
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tutor-specific fields */}
        {formData.role === "tutor" && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="form-group">
              <label className="label" htmlFor="phone">
                Phone number
                <span className="text-foreground-subtle font-normal"> (optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, phone: e.target.value }))
                }
              />
              <p className="text-xs text-foreground-subtle mt-1">
                Used to contact you about student matches
              </p>
            </div>

            <p className="text-sm text-foreground-muted">
              You&apos;ll complete your full tutor profile after registration.
              This includes your subjects, hourly rate, experience, and credentials.
            </p>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full btn-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : (
            `Create ${formData.role === "tutor" ? "tutor" : "student"} account`
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground-subtle uppercase tracking-wider">
          or continue with
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form action="/api/auth/signin/google" method="POST" className="flex w-full">
        <input type="hidden" name="csrfToken" defaultValue="" />
        <button
          type="submit"
          className="flex-1 btn btn-secondary w-full justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.21h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 9.04 1 6.55 2.55 4.79 5.21l3.2 3.2c.86-.63 1.92-1.08 3.01-1.38z" />
            <path fill="currentColor" d="M1 1C1 1 5.68 8.1 12 14.36V23h3.57c2.08-1.92 3.28-4.74 3.28-8.09l-.01-2.84c0-4.55-1.93-8.55-4.79-11.21z" />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-foreground-subtle">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="underline">Terms of Service</a>
        and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
