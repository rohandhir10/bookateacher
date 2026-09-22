// bookateacher — IELTS subject page illustration
// A layered composition: test paper with four sections (Listening, Reading,
// Writing, Speaking), headphones, a writing task with pen, a speaking figure,
// score progression marks. Navy/parchment palette.

import React from "react";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const RED = "#B23A2E";
const GREEN = "#2F5233";

export { IeltsIllustration as default };
export function IeltsIllustration() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 4",
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 380 507"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* ── Background ── */}
        <rect width="380" height="507" fill={PAPER_2} />
        <rect width="380" height="507" fill={`url(#ieltsBg)`} opacity="0.7" />

        {/* ── Decorative grid / measurement lines (test-paper feel) ── */}
        <g opacity="0.25">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="30" y1={30 + i * 40} x2="350" y2={30 + i * 40} stroke={LINE} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={30 + i * 44} y1="30" x2={30 + i * 44} y2="477" stroke={LINE} strokeWidth="0.5" />
          ))}
        </g>

        {/* ── Large test paper (center) ── */}
        <g transform="translate(40, 60)">
          <rect width="260" height="360" rx="3" fill={PAPER} stroke={LINE} strokeWidth="1.5" />
          {/* Paper shadow */}
          <rect x="6" y="6" width="260" height="360" rx="3" fill={`rgba(${rgb(INK)}, 0.04)`} />

          {/* Header bar */}
          <rect width="260" height="36" rx="3" fill={INK} />
          <rect y="34" width="260" height="2" fill={LINE} />
          <text x="15" y="24" fill={PAPER} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1.5" opacity="0.9">IELTS PRACTICE</text>
          <text x="245" y="24" textAnchor="end" fill={PAPER} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.6">Time: 2h 45m</text>

          {/* Section: Listening header */}
          <text x="20" y="60" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">LISTENING</text>
          <line x1="20" y1="67" x2="240" y2="67" stroke={LINE} strokeWidth="0.8" />

          {[
            "Play the recording once — you hear it only once.",
            "Section 1: Conversation (social context)",
            "Section 2: Monologue (everyday topic)",
            "Section 3: Conversation (academic context)",
            "Section 4: Monologue (academic topic)",
            "40 questions · 30 minutes · +10 min transfer",
          ].map((line, i) => (
            <text key={line} x="24" y={86 + i * 16} fill={INK_SOFT} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.75">{line}</text>
          ))}

          {/* Mini speaker icon */}
          <g transform="translate(180, 52)">
            <path d="M3 5h10l2 3h2l-3 8h-12l-3-8h2z" fill={INK} opacity="0.7" />
            <path d="M18 8v15a3 3 0 01-3 3h-7v2h12V8z" fill={INK} opacity="0.5" />
            <circle cx="7" cy="20" r="2" fill={INK} opacity="0.6" />
            <circle cx="19" cy="20" r="2" fill={INK} opacity="0.6" />
          </g>

          {/* Divider */}
          <line x1="20" y1="195" x2="240" y2="195" stroke={LINE} strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Section: Reading header */}
          <text x="20" y="212" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">READING</text>
          <line x1="20" y1="219" x2="240" y2="219" stroke={LINE} strokeWidth="0.8" />

          {[
            "Three passages · 60 minutes · 40 questions",
            "Passage 1: Descriptive/factual (easy → medium)",
            "Passage 2: Discursive/analytical (medium)",
            "Passage 3: Extended argument (hardest)",
            "Question types: T/F/NG, matching, summary, MCQs",
          ].map((line, i) => (
            <text key={line} x="24" y={238 + i * 16} fill={INK_SOFT} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.75">{line}</text>
          ))}

          {/* Small eye/book icon */}
          <g transform="translate(180, 210)">
            <ellipse cx="8" cy="8" rx="7" ry="5" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.7" />
            <circle cx="8" cy="8" r="3" fill={INK} opacity="0.4" />
          </g>

          {/* Divider */}
          <line x1="20" y1="313" x2="240" y2="313" stroke={LINE} strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Section: Writing header */}
          <text x="20" y="330" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">WRITING</text>
          <line x1="20" y1="337" x2="240" y2="337" stroke={LINE} strokeWidth="0.8" />

          {[
            "Task 1 (Academic): Describe a chart/graph/diagram",
            "Task 1 (GT): Write a letter (formal/semi-formal)",
            "Task 2: Essay — 250 words minimum · 40 min",
            "Both tasks assessed on: Task achievement, Coherence,",
            "  Lexical resource, Grammatical range & accuracy",
          ].map((line, i) => (
            <text key={i} x="24" y={356 + i * 15} fill={INK_SOFT} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.75">{line}</text>
          ))}

          {/* Mini pen icon */}
          <g transform="translate(180, 330)">
            <rect x="0" y="2" width="12" height="16" fill={INK} rx="1" opacity="0.7" />
            <polygon points="0,2 4,0 12,0 12,2" fill={INK_SOFT} opacity="0.6" />
            <line x1="12" y1="6" x2="16" y2="8" stroke={INK_SOFT} strokeWidth="0.8" />
          </g>

          {/* Divider */}
          <line x1="20" y1="418" x2="240" y2="418" stroke={LINE} strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Section: Speaking header */}
          <text x="20" y="435" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">SPEAKING</text>
          <line x1="20" y1="442" x2="240" y2="442" stroke={LINE} strokeWidth="0.8" />

          {[
            "Face-to-face interview with an examiner · 11–14 min",
            "Part 1: Introduction & interview (4–5 min)",
            "Part 2: Long turn — 1 min prep, 2 min speak",
            "Part 3: Discussion — deeper questions",
            "Assessed on: Fluency, Lexical resource, Grammatical",
            "  range, Pronunciation",
          ].map((line, i) => (
            <text key={i} x="24" y={461 + i * 12.5} fill={INK_SOFT} fontSize="9" fontFamily="Inter, sans-serif" opacity="0.75">{line}</text>
          ))}

          {/* Mini speech bubbles */}
          <g transform="translate(190, 436)">
            <rect x="0" y="0" width="32" height="18" rx="4" fill={`rgba(${rgb(INK)}, 0.06)`} stroke={LINE} strokeWidth="0.8" />
            <polygon points="8,18 12,24 16,18" fill={`rgba(${rgb(INK)}, 0.06)`} stroke={LINE} strokeWidth="0.8" />
            <path d="M6 6h20M6 9h20M6 12h14" stroke={INK_SOFT} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          </g>
        </g>

        {/* ── Headphones (left, floating) ── */}
        <g transform="translate(30, 180)">
          <ellipse cx="35" cy="80" rx="8" ry="3" fill={`rgba(${rgb(INK)}, 0.04)`} />
          {/* Headband */}
          <path d="M5 75 Q35 20 65 75" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          {/* Left ear cup */}
          <rect x="0" y="70" width="22" height="28" rx="5" fill={INK} stroke={LINE} strokeWidth="0.8" />
          <rect x="4" y="74" width="14" height="20" rx="3" fill={PAPER_2} stroke={LINE} strokeWidth="0.5" />
          {/* Right ear cup */}
          <rect x="48" y="70" width="22" height="28" rx="5" fill={INK} stroke={LINE} strokeWidth="0.8" />
          <rect x="52" y="74" width="14" height="20" rx="3" fill={PAPER_2} stroke={LINE} strokeWidth="0.5" />
          {/* Cable hint */}
          <path d="M11 98 Q5 108 0 115" stroke={INK_SOFT} strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M69 98 Q75 108 80 115" stroke={INK_SOFT} strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* ── Score band arc (right side) ── */}
        <g transform="translate(310, 90)">
          {/* Arc background */}
          <path
            d="M0 120 A80 80 0 0 1 60 150 L60 155 A85 85 0 0 0 0 125 Z"
            fill={`rgba(${rgb(GREEN)}, 0.08)`}
          />
          {/* Score markers along arc */}
          {[
            { angle: 0, score: "6.0", color: RED },
            { angle: 45, score: "7.0", color: MUTED },
            { angle: 90, score: "7.5", color: GREEN },
            { angle: 135, score: "8.0", color: GREEN },
            { angle: 170, score: "9.0", color: GREEN },
          ].map(({ angle, score, color }) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            const cx = 80 + 75 * Math.cos(rad);
            const cy = 80 + 75 * Math.sin(rad);
            return (
              <g key={score}>
                <circle cx={cx} cy={cy} r={angle === 90 ? 5 : 3} fill={color} opacity="0.85" />
                <text
                  x={cx + (angle < 90 ? 8 : -8)}
                  y={cy + 3}
                  textAnchor={angle < 90 ? "start" : "end"}
                  fill={color}
                  fontSize="8"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  opacity="0.85"
                >
                  {score}
                </text>
              </g>
            );
          })}
          {/* Target marker */}
          <g transform="translate(80 + 75 * Math.cos(((90 - 90) * Math.PI) / 180), 80 + 75 * Math.sin(((90 - 90) * Math.PI) / 180))">
            <circle cx="0" cy="0" r="6" fill={PAPER} stroke={GREEN} strokeWidth="2" opacity="0.9" />
            <text x="0" y="3" textAnchor="middle" fill={GREEN} fontSize="7" fontFamily="Inter, sans-serif" fontWeight="700">🎯</text>
          </g>
        </g>

        {/* ── Small rising arrows (motif) ── */}
        <g opacity="0.5">
          {[
            { x: 40, y: 480, color: GREEN },
            { x: 60, y: 470, color: GREEN },
            { x: 80, y: 478, color: MUTED },
            { x: 100, y: 468, color: GREEN },
          ].map(({ x, y, color }) => (
            <g key={x}>
              <path d={`M${x} ${y} L${x + 4} ${y - 8} L${x + 8} ${y}`} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={`M${x + 5} ${y - 12} L${x + 5} ${y - 18}`} stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            </g>
          ))}
        </g>

        {/* ── Small sticky notes (left bottom) ── */}
        <g transform="translate(20, 430)">
          <rect x="0" y="0" width="45" height="40" rx="2" fill={`#FFF9E6`} stroke={LINE} strokeWidth="0.8" />
          {[
            [8, 10, 30],
            [8, 17, 26],
            [8, 24, 32],
            [8, 31, 18],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="0.6" strokeLinecap="round" />
          ))}
          <rect x="0" y="0" width="45" height="40" rx="2" fill={`none`} stroke={LINE} strokeWidth="0.8" transform="rotate(-3, 22, 20)" opacity="0.5" />
        </g>

        {/* ── Gradient definitions ── */}
        <defs>
          <radialGradient id="ieltsBg" cx="0.5" cy="0.3" r="0.8">
            <stop offset="0%" stopColor={`rgba(${rgb(PAPER)}, 0.25)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(PAPER_2)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
