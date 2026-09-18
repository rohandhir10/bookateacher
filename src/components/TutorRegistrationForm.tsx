"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tutorProfileSchema } from "@/lib/validations";
import { SUBJECT_LABELS } from "@/lib/utils";

// Tutor profile data — will be managed via API calls, not direct DB access from client
interface ProfileData {
  name: string;
  email: string;
  hourly_rate: string;
  subjects: string[];
  ielts_band: string;
  certification: string;
  experience_years: string;
  teaching_style: string;
  background: string;
  bio: string;
}

interface ProfileResponse {
  success: boolean;
  profile?: ProfileData;
  error?: string;
}

export function TutorRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    email: "",
    hourly_rate: "",
    subjects: [],
    ielts_band: "",
    certification: "",
    experience_years: "",
    teaching_style: "",
    background: "",
    bio: "",
  });

  const handleNext = async () => {
    if (step === 1 && (!formData.hourly_rate || parseFloat(formData.hourly_rate) <= 0)) {
      setError("Please enter your hourly rate");
      return;
    }
    if (step === 2 && formData.subjects.length === 0) {
      setError("Please select at least one subject");
      return;
    }
    setError(null);

    if (step < 5) {
      setStep((s) => s + 1);
      return;
    }

    // Final submission — call API
    setLoading(true);
    try {
      const res = await fetch("/api/tutor/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hourly_rate: parseFloat(formData.hourly_rate),
          experience_years: formData.experience_years ? parseInt(formData.experience_years) : undefined,
          ielts_band: formData.ielts_band ? parseInt(formData.ielts_band) : undefined,
          subjects: formData.subjects,
          certification: formData.certification || undefined,
          teaching_style: formData.teaching_style || undefined,
          background: formData.background || undefined,
          bio: formData.bio || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to save profile");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (slug: string) => {
    setFormData((f) => ({
      ...f,
      subjects: f.subjects.includes(slug)
        ? f.subjects.filter((s) => s !== slug)
        : [...f.subjects, slug],
    }));
  };

  if (success) {
    return (
      <div className="card p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-success bg-opacity-10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Profile saved!</h2>
        <p className="text-foreground-muted mb-6">
          Your tutor profile has been updated. Our team will review it and get back to you shortly.
        </p>
        <button
          onClick={() => router.push("/tutor/dashboard")}
          className="btn btn-primary"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  const SUBJECTS = Object.entries(SUBJECT_LABELS).map(([slug, label]) => ({
    slug,
    label,
    description: {
      ielts: "International English Language Testing System — for study, work, and migration abroad",
      toefl: "Test of English as a Foreign Language — widely accepted for university admissions",
      "spoken-english": "Conversational English, fluency, pronunciation, and confidence",
      gre: "Graduate Record Examination — for graduate school admissions",
      gmat: "Graduate Management Admission Test — for business school admissions",
      sat: "Scholastic Assessment Test — for undergraduate admissions",
      ptet: "Pearson Test of English — fast, computer-based English proficiency test",
      other: "Other subjects and exams",
    }[slug],
  }));

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex-1 h-1.5 rounded-full transition-all">
            <div
              className={`h-full rounded-full transition-all ${
                s <= step ? "bg-accent" : "bg-border-strong"
              }`}
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-foreground-muted mb-6 text-center">Step {step} of 5</p>

      {error && (
        <div
          className="mb-6 p-3 rounded-lg bg-error-soft text-error text-sm flex items-start gap-2"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Rate */}
      {step === 1 && (
        <div className="card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your hourly rate</h2>
          <p className="text-sm text-foreground-muted mb-6">
            Set the rate you charge per hour. Students will see this on your profile.
          </p>
          <div className="form-group">
            <label className="label" htmlFor="hourly-rate">Hourly rate (INR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted font-medium">₹</span>
              <input
                id="hourly-rate"
                type="number"
                className="input pl-8"
                placeholder="500"
                min="0"
                step="100"
                value={formData.hourly_rate}
                onChange={(e) => setFormData((f) => ({ ...f, hourly_rate: e.target.value }))}
              />
            </div>
            <p className="text-xs text-foreground-subtle mt-1">Typical range: ₹300–₹2,000/hr for IELTS/TOEFL tutors</p>
          </div>
        </div>
      )}

      {/* Step 2: Subjects */}
      {step === 2 && (
        <div className="card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-2">What do you teach?</h2>
          <p className="text-sm text-foreground-muted mb-6">Select all subjects you can tutor.</p>
          <div className="space-y-2">
            {SUBJECTS.map((subject) => (
              <label
                key={subject.slug}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  formData.subjects.includes(subject.slug)
                    ? "border-accent bg-accent-soft"
                    : "border-border hover:border-border-strong bg-surface"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
                  checked={formData.subjects.includes(subject.slug)}
                  onChange={() => toggleSubject(subject.slug)}
                />
                <div>
                  <div className="font-medium text-foreground">{subject.label}</div>
                  <div className="text-xs text-foreground-muted mt-0.5">{subject.description}</div>
                </div>
              </label>
            ))}
          </div>
          {formData.subjects.length === 0 && (
            <p className="text-sm text-foreground-subtle mt-3">Select at least one subject</p>
          )}
        </div>
      )}

      {/* Step 3: Experience */}
      {step === 3 && (
        <div className="card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Experience & credentials</h2>
          <p className="text-sm text-foreground-muted mb-6">Help students trust you by sharing your background.</p>
          <div className="space-y-4">
            <div className="form-group">
              <label className="label" htmlFor="experience">Years of teaching experience</label>
              <input
                id="experience"
                type="number"
                className="input"
                placeholder="e.g. 5"
                min="0"
                max="50"
                value={formData.experience_years}
                onChange={(e) => setFormData((f) => ({ ...f, experience_years: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="ielts-band">Your IELTS band score (if applicable)</label>
              <input
                id="ielts-band"
                type="number"
                className="input"
                placeholder="e.g. 8.5"
                min="0"
                max="10"
                step="0.5"
                value={formData.ielts_band}
                onChange={(e) => setFormData((f) => ({ ...f, ielts_band: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="certification">Certifications & qualifications</label>
              <input
                id="certification"
                type="text"
                className="input"
                placeholder="e.g. British Council certified, CELTA, MBA from XYZ..."
                value={formData.certification}
                onChange={(e) => setFormData((f) => ({ ...f, certification: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="teaching-style">Teaching style</label>
              <textarea
                id="teaching-style"
                className="input min-h-[80px]"
                placeholder="e.g. I focus on personalized feedback, mock tests, and practical strategies..."
                value={formData.teaching_style}
                onChange={(e) => setFormData((f) => ({ ...f, teaching_style: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="background">Your background</label>
              <textarea
                id="background"
                className="input min-h-[80px]"
                placeholder="e.g. I have an MBA from IIM and worked in education for 8 years..."
                value={formData.background}
                onChange={(e) => setFormData((f) => ({ ...f, background: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Bio */}
      {step === 4 && (
        <div className="card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your bio</h2>
          <p className="text-sm text-foreground-muted mb-6">Write a short bio that introduces you to students.</p>
          <div className="form-group">
            <textarea
              className="input min-h-[120px]"
              placeholder="Hi, I'm [name]. I'm an IELTS tutor with 5 years of experience..."
              value={formData.bio}
              onChange={(e) => setFormData((f) => ({ ...f, bio: e.target.value }))}
              rows={5}
            />
            <div className="flex justify-end gap-2 mt-1">
              <span className="text-xs text-foreground-subtle">{formData.bio.length}/2000 characters</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="card p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Review your profile</h2>
          <p className="text-sm text-foreground-muted mb-6">Check everything looks right. You can edit anytime later.</p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-bg-secondary">
              <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">Rate</div>
              <div className="text-lg font-semibold text-foreground">
                ₹{parseFloat(formData.hourly_rate || "0").toLocaleString("en-IN")}/hr
              </div>
            </div>
            {formData.subjects.length > 0 && (
              <div>
                <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-2">Subjects</div>
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((s) => (
                    <span key={s} className="badge bg-accent-soft text-accent">
                      {SUBJECT_LABELS[s] || s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.ielts_band && (
              <div className="p-4 rounded-lg bg-bg-secondary">
                <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">IELTS Band</div>
                <div className="text-lg font-semibold text-foreground">Band {formData.ielts_band}</div>
              </div>
            )}
            {formData.certification && (
              <div className="p-4 rounded-lg bg-bg-secondary">
                <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">Certifications</div>
                <div className="text-sm text-foreground">{formData.certification}</div>
              </div>
            )}
            {formData.experience_years && (
              <div className="p-4 rounded-lg bg-bg-secondary">
                <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-1">Experience</div>
                <div className="text-sm text-foreground">{formData.experience_years} years teaching</div>
              </div>
            )}
            {formData.bio && (
              <div>
                <div className="text-xs text-foreground-subtle uppercase tracking-wider mb-2">Bio</div>
                <p className="text-sm text-foreground leading-relaxed">{formData.bio}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-secondary">
            Back
          </button>
        )}
        <div className="ml-auto">
          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              disabled={step === 2 && formData.subjects.length === 0}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
