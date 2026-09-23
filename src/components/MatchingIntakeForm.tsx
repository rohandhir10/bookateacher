"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SUBJECT_LABELS } from "@/lib/utils";

const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const;
const times = ["morning","afternoon","evening","night"] as const;
const subjects = Object.entries(SUBJECT_LABELS);

export function MatchingIntakeForm({ initialSubject }: { initialSubject: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    phone: "",
    subject: initialSubject,
    goal: "",
    budget: "",
    preferredDays: [] as string[],
    preferredTimes: [] as string[],
    onlineOrLocal: "online",
    location: "",
    currentLevel: "",
    challenge: "",
  });

  function toggle(key: "preferredDays" | "preferredTimes", value: string) {
    setForm((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-lead",
          data: {
            phone: form.phone,
            subject: form.subject,
            goal: form.goal || undefined,
            budget_per_hour: form.budget ? Number(form.budget) : undefined,
            preferred_days: form.preferredDays,
            preferred_times: form.preferredTimes,
            online_or_local: form.onlineOrLocal,
            location: form.location || undefined,
            current_level: form.currentLevel || undefined,
            challenge: form.challenge || undefined,
          },
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.leadId) {
        throw new Error(result.error ?? "We couldn't save your matching request.");
      }

      router.push("/matching-status?leadId=" + encodeURIComponent(result.leadId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && <div className="rounded-lg bg-error-soft p-3 text-sm text-error" role="alert">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="input"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            minLength={10}
          />
        </div>
        <div>
          <label className="label" htmlFor="subject">Subject</label>
          <select id="subject" className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            {subjects.map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="goal">What are you trying to achieve?</label>
        <input
          id="goal"
          className="input"
          placeholder="e.g. Reach IELTS 7.5 before my university application"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="budget">Budget per hour (INR)</label>
          <input
            id="budget"
            type="number"
            min="0"
            max="50000"
            step="100"
            className="input"
            placeholder="1000"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
        </div>
        <div>
          <label className="label" htmlFor="level">Current level</label>
          <input id="level" className="input" placeholder="Beginner, Band 6.0, etc." value={form.currentLevel} onChange={(e) => setForm({ ...form, currentLevel: e.target.value })} />
        </div>
      </div>

      <div>
        <span className="label">Preferred days</span>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button key={day} type="button" onClick={() => toggle("preferredDays", day)} className={form.preferredDays.includes(day) ? "rounded-lg border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent" : "rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground-muted"}>
              {day.slice(0, 3).replace(/^./, (x) => x.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Preferred times</span>
        <div className="flex flex-wrap gap-2">
          {times.map((time) => (
            <button key={time} type="button" onClick={() => toggle("preferredTimes", time)} className={form.preferredTimes.includes(time) ? "rounded-lg border border-accent bg-accent-soft px-3 py-1.5 text-sm text-accent" : "rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground-muted"}>
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="mode">Format</label>
          <select id="mode" className="input" value={form.onlineOrLocal} onChange={(e) => setForm({ ...form, onlineOrLocal: e.target.value })}>
            <option value="online">Online</option>
            <option value="local">Local</option>
            <option value="either">Either</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="location">Location</label>
          <input id="location" className="input" placeholder="Delhi, Mumbai, etc." value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="challenge">What are you struggling with?</label>
        <textarea id="challenge" rows={4} className="input min-h-28" placeholder="Tell us what is holding you back so we can make a better match." value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} />
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
        {loading ? "Submitting your request..." : "Find my tutor"}
      </button>
    </form>
  );
}
