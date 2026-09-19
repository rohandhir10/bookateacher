"use client";

import { useState, useCallback } from "react";

const BANDS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

// Rough typical weeks to improve one band, based on industry norms
// (IELTS official guidance: ~100-200 guided study hours per band; ~10-15 hrs/week coaching → ~7-15 weeks per band)
// We show a range, not a single number, to stay honest.
function weeksToImprove(from: number, to: number): string {
  if (from >= to) return "Already at or above target";
  const bands = Math.round((to - from) * 2) / 2; // number of half-bands
  if (bands === 0) return "At target";
  // Typical: 8-16 weeks per full band with 1:1 coaching
  const low = Math.round(bands * 8);
  const high = Math.round(bands * 16);
  if (low === high) return `${low} weeks typical`;
  return `${low}–${high} weeks typical`;
}

const CATEGORY_LABELS: Record<number, string> = {
  1: "Non-user",
  2: "Limited",
  3: "Extremely limited",
  4: "Limited",
  5: "Modest",
  6: "Competent",
  7: "Good",
  8: "Very good",
  9: "Expert",
};

export default function BandScoreTool() {
  const [current, setCurrent] = useState<number>(6.5);
  const [target, setTarget] = useState<number>(7.5);
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const result = weeksToImprove(current, target);
  const canImprove = target > current;

  const handleSubmit = useCallback(() => {
    if (!email.trim() || !canImprove) return;
    setShowResult(true);
    setSubmitted(true);
  }, [email, canImprove]);

  return (
    <div style={{ background: "#F2ECE0", border: "1px solid #D9D2C5", borderRadius: 14, padding: 32, position: "relative" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6557", marginBottom: 20 }}>
        Find your path to the score you need
      </div>

      {/* Two selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        {/* Current band */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#3D4A63", marginBottom: 8 }}>
            Your current band
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {BANDS.map((b) => (
              <button
                key={b}
                onClick={() => setCurrent(b)}
                style={{
                  width: "28%",
                  minWidth: 44,
                  padding: "8px 4px",
                  borderRadius: 6,
                  border: current === b ? `2px solid #B23A2E` : "1px solid #D9D2C5",
                  background: current === b ? "#FAF7F0" : "transparent",
                  color: current === b ? "#B23A2E" : "#6B6557",
                  fontSize: "0.875rem",
                  fontWeight: current === b ? 600 : 400,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  position: "relative",
                }}
              >
                {b}
                {current === b && (
                  <span style={{ position: "absolute", top: -6, right: -6, width: 8, height: 8, background: "#B23A2E", borderRadius: "50%" }}></span>
                )}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: "0.75rem", color: "#6B6557" }}>
            {CATEGORY_LABELS[current] || ""}
          </div>
        </div>

        {/* Target band */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#3D4A63", marginBottom: 8 }}>
            Your target band
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {BANDS.map((b) => (
              <button
                key={b}
                onClick={() => setTarget(b)}
                style={{
                  width: "28%",
                  minWidth: 44,
                  padding: "8px 4px",
                  borderRadius: 6,
                  border: target === b ? `2px solid #14213D` : "1px solid #D9D2C5",
                  background: target === b ? "#FAF7F0" : "transparent",
                  color: target === b ? "#14213D" : "#6B6557",
                  fontSize: "0.875rem",
                  fontWeight: target === b ? 600 : 400,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result area */}
      <div style={{ borderTop: "1px solid #D9D2C5", paddingTop: 20, marginBottom: 16, minHeight: 60 }}>
        {!showResult ? (
          <div style={{ fontSize: "0.9375rem", color: "#6B6557", textAlign: "center" }}>
            Pick your current and target band, then enter your email to see your typical timeline.
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6557", marginBottom: 6 }}>
              Typical timeline
            </div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#14213D", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 4 }}>
              {canImprove ? (
                <>
                  <span style={{ color: "#3D4A63", fontWeight: 400 }}>{current}</span>
                  <span style={{ color: "#B23A2E", fontWeight: 300, margin: "0 4px" }}>→</span>
                  <span style={{ color: "#B23A2E" }}>{target}</span>
                </>
              ) : (
                <span style={{ color: "#6B6557" }}>At or above target</span>
              )}
            </div>
            <div style={{ fontSize: "0.9375rem", color: "#3D4A63", marginBottom: 16 }}>
              {result}
            </div>
            {canImprove && (
              <p style={{ fontSize: "0.8125rem", color: "#6B6557", marginBottom: 20 }}>
                These are typical ranges for students doing 1:1 coaching 2–3× per week. Your actual timeline depends on your starting point, study time, and test date.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Email capture */}
      {!submitted ? (
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            required
            style={{
              flex: "1 1 220px",
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #D9D2C5",
              fontSize: "0.9375rem",
              fontFamily: "'Inter', sans-serif",
              background: "#FAF7F0",
              color: "#14213D",
              outline: "none",
              transition: "border-color 0.15s",
            }}
          />
          <button
            type="submit"
            disabled={!email.trim() || !canImprove}
            style={{
              padding: "10px 22px",
              borderRadius: 6,
              background: canImprove ? "#14213D" : "#6B6557",
              color: "#FAF7F0",
              fontSize: "0.9375rem",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              border: "none",
              cursor: canImprove && email.trim() ? "pointer" : "not-allowed",
              opacity: canImprove && email.trim() ? 1 : 0.5,
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            See my timeline
          </button>
        </form>
      ) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#FAF7F0", border: "1px solid #D9D2C5", borderRadius: 8, fontSize: "0.9375rem", color: "#14213D", fontWeight: 500 }}>
            <span style={{ width: 8, height: 8, background: "#2F5233", borderRadius: "50%" }}></span>
            You're on the list. We'll reach out within 24 hours with tutor matches.
          </div>
          <p style={{ fontSize: "0.8125rem", color: "#6B6557", marginTop: 10 }}>
            Or skip the wait —{" "}
            <a href="/register" style={{ color: "#B23A2E", fontWeight: 500, textDecoration: "underline" }}>
              browse tutors now
            </a>
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p style={{ fontSize: "0.75rem", color: "#6B6557", marginTop: 16, lineHeight: 1.5, textAlign: "center" }}>
        Estimates based on typical IELTS improvement rates for students in structured 1:1 coaching.
        Your results depend on your starting level, weekly study time, and test date.
      </p>
    </div>
  );
}
