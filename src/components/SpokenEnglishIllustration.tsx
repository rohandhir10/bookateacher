// bookateacher — Spoken English subject page illustration
// Conversation scene: two people talking, speech/thought bubbles, sound waves,
// lesson notes, coffee cup. Navy/parchment palette, warm editorial mood.

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
const AMBER = "#8A5A00";

export { SpokenEnglishIllustration as default, SpokenEnglishIllustration };
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
        <rect width="380" height="507" fill={`url(#spokenBg)`} opacity="0.7" />

        {/* ── Floor ── */}
        <ellipse cx="190" cy="470" rx="200" ry="36" fill={`rgba(${rgb(INK)}, 0.02)`} stroke={LINE} strokeWidth="1" />
        <ellipse cx="190" cy="466" rx="180" ry="28" fill={`rgba(${rgb(PAPER)}, 0.2)`} />

        {/* ── Person 1 (right, speaking) ── */}
        <g transform="translate(240, 210)">
          {/* Body shadow */}
          <ellipse cx="0" cy="28" rx="42" ry="12" fill={`rgba(${rgb(INK)}, 0.04)`} />

          {/* Head */}
          <circle cx="0" cy="0" r="22" fill={INK} />
          <circle cx="0" cy="0" r="22" fill={`url(#personGrad)`} opacity="0.5" />

          {/* Hair */}
          <path d="M-22 -6 Q-18 -22 -6 -24 Q0 -25 6 -24 Q18 -22 22 -6 Q18 -16 10 -18 Q0 -18 -10 -18 Q-18 -16 -22 -6Z" fill="#0F2440" />

          {/* Eyes */}
          <circle cx="-7" cy="-3" r="1.5" fill={PAPER_2} />
          <circle cx="7" cy="-3" r="1.5" fill={PAPER_2} />

          {/* Mouth (speaking) */}
          <path d="M-4 6 Q0 9 4 6" stroke={PAPER_2} strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Body/torso */}
          <rect x="-16" y="22" width="32" height="42" rx="7" fill={`rgba(${rgb(INK)}, 0.18)`} stroke={LINE} strokeWidth="0.8" />

          {/* Arms */}
          <path d="M-12 26 Q-28 34 -34 48" stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M12 26 Q28 34 34 48" stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Reaching arm toward person 2 */}
          <path d="M18 34 Q48 42 68 52" stroke={`rgba(${rgb(INK)}, 0.15)`} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M16 36 Q46 44 66 54" stroke={`rgba(${rgb(INK)}, 0.3)`} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* ── Person 2 (left, listening/responding) ── */}
        <g transform="translate(150, 200)">
          {/* Body shadow */}
          <ellipse cx="0" cy="30" rx="36" ry="10" fill={`rgba(${rgb(INK)}, 0.04)`} />

          {/* Head */}
          <circle cx="0" cy="0" r="18" fill={INK_SOFT} />
          <circle cx="0" cy="0" r="18" fill={`url(#personGrad2)`} opacity="0.4" />

          {/* Hair (tied back – shorter style) */}
          <path d="M-18 -4 Q-12 -16 -4 -18 Q0 -19 4 -18 Q12 -16 18 -4 Q12 -10 6 -12 Q0 -12 -6 -12 Q-12 -10 -18 -4Z" fill={`rgba(${rgb(INK)}, 0.2)`} />

          {/* Eyes */}
          <circle cx="-5" cy="-2" r="1.2" fill={PAPER} />
          <circle cx="5" cy="-2" r="1.2" fill={PAPER} />

          {/* Mouth (gentle smile) */}
          <path d="M-3 5 Q0 7 3 5" stroke={PAPER} strokeWidth="0.8" fill="none" strokeLinecap="round" />

          {/* Body/torso */}
          <rect x="-14" y="18" width="28" height="38" rx="6" fill={`rgba(${rgb(INK_SOFT)}, 0.2)`} stroke={LINE} strokeWidth="0.8" />

          {/* Arms */}
          <path d="M-10 22 Q-26 32 -32 46" stroke={`rgba(${rgb(INK_SOFT)}, 0.18)`} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M10 22 Q-8 40 -14 50" stroke={`rgba(${rgb(INK_SOFT)}, 0.15)`} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* ── Speech bubbles (person 1, speaking — right) ── */}
        {/* Primary bubble */}
        <g transform="translate(292, 155)">
          <rect x="0" y="0" width="62" height="30" rx="7" fill={`rgba(${rgb(INK)}, 0.07)`} stroke={LINE} strokeWidth="0.9" />
          <polygon points="52,30 56,40 46,30" fill={`rgba(${rgb(INK)}, 0.07)`} stroke={LINE} strokeWidth="0.9" />
          {/* Text lines */}
          <path d="M8 12h46M8 19h46M8 23h40M50 23h8" stroke={INK_SOFT} strokeWidth="0.9" strokeLinecap="round" opacity="0.65" />
        </g>

        {/* Secondary bubble */}
        <g transform="translate(312, 115)">
          <rect x="0" y="0" width="52" height="24" rx="6" fill={`rgba(${rgb(INK)}, 0.04)`} stroke={LINE} strokeWidth="0.7" />
          <polygon points="44,24 48,31 40,24" fill={`rgba(${rgb(INK)}, 0.04)`} stroke={LINE} strokeWidth="0.7" />
          <path d="M7 9h38M7 15h32M44 15h6" stroke={`rgba(${rgb(INK_SOFT)}, 0.55)`} strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* ── Speech bubble (person 2, responding — left) ── */}
        <g transform="translate(88, 170)">
          <rect x="0" y="0" width="56" height="26" rx="6" fill={`rgba(${rgb(INK_SOFT)}, 0.06)`} stroke={LINE} strokeWidth="0.9" />
          <polygon points="8,26 4,36 12,26" fill={`rgba(${rgb(INK_SOFT)}, 0.06)`} stroke={LINE} strokeWidth="0.9" />
          <path d="M8 10h40M8 16h34M44 16h6" stroke={`rgba(${rgb(INK)}, 0.5}`} strokeWidth="0.8" strokeLinecap="round" opacity="0.65" />
        </g>

        {/* ── Thought bubble (person 2 — small) ── */}
        <g transform="translate(72, 128)">
          <circle cx="6" cy="6" r="1.8" fill={`rgba(${rgb(INK_SOFT)}, 0.35)`} />
          <circle cx="13" cy="9" r="1.3" fill={`rgba(${rgb(INK_SOFT)}, 0.35)`} />
          <circle cx="20" cy="6" r="1.8" fill={`rgba(${rgb(INK_SOFT)}, 0.35)`} />
          <path d="M27 9h8" stroke={`rgba(${rgb(INK_SOFT)}, 0.35)`} strokeWidth="0.7" strokeLinecap="round" />
        </g>

        {/* ── Sound waves between speakers ── */}
        <g transform="translate(195, 185)" stroke={GREEN} strokeWidth="1.3" fill="none" opacity="0.55" strokeLinecap="round">
          <path d="M-16 0 Q-10 -8 -4 0 Q0 8 4 0 Q10 -8 16 0" />
          <path d="M-22 0 Q-13 -13 -4 0 Q0 13 4 0 Q13 -13 22 0" strokeWidth="0.9" opacity="0.3" />
          <path d="M-28 0 Q-16 -18 -4 0 Q0 18 4 0 Q16 -18 28 0" strokeWidth="0.6" opacity="0.15" />
        </g>

        {/* ── Music/accent note (top right) ── */}
        <g transform="translate(328, 78)" opacity="0.45">
          <circle cx="0" cy="0" r="16" fill={`rgba(${rgb(GREEN)}, 0.08)`} />
          <circle cx="0" cy="0" r="11" fill="none" stroke={GREEN} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill={GREEN} opacity="0.3" />
          <text x="0" y="4" textAnchor="middle" fill={GREEN} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">♪</text>
        </g>

        {/* ── Lesson notes (bottom left) ── */}
        <g transform="translate(18, 408)">
          <rect x="0" y="0" width="72" height="56" rx="2" fill={PAPER_2} stroke={LINE} strokeWidth="0.9" />
          {/* Binding holes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={8 + i * 14} cy="4" r="2.2" fill={INK_SOFT} opacity="0.35" />
          ))}
          {/* Note lines */}
          {[
            [10, 15, 54],
            [10, 22, 54],
            [10, 29, 54],
            [10, 36, 46],
            [10, 43, 54],
            [10, 50, 42],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.15)`} strokeWidth="0.6" strokeLinecap="round" />
          ))}
          {/* Highlighted sections */}
          <rect x="10" y="21" width="46" height="8" rx="1" fill={`rgba(${rgb(GREEN)}, 0.1)`} />
          <rect x="10" y="37" width="38" height="7" rx="1" fill={`rgba(${rgb(BLUE)}, 0.1)`} />
        </g>

        {/* ── Coffee/tea cup (bottom right) ── */}
        <g transform="translate(305, 375)">
          <ellipse cx="16" cy="32" rx="16" ry="4" fill={`rgba(${rgb(INK)}, 0.06)`} />
          <path d="M4 14 Q4 32 16 32 Q28 32 28 14 Z" fill={PAPER_2} stroke={LINE} strokeWidth="1" />
          <path d="M4 14 Q4 20 10 20 L22 20 Q28 20 28 14" fill={`rgba(${rgb(INK)}, 0.04)`} />
          {/* Handle */}
          <path d="M28 18 Q38 18 38 25 Q38 32 28 32" fill="none" stroke={LINE} strokeWidth="1.3" />
          {/* Steam */}
          <path d="M11 12 Q9 6 11 2" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.4" />
          <path d="M16 10 Q14 4 16 0" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.35" />
          <path d="M21 12 Q19 6 21 2" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.3" />
        </g>

        {/* ── Accent particles ── */}
        <g opacity="0.3">
          {[
            { x: 50, y: 438 },
            { x: 110, y: 448 },
            { x: 200, y: 460 },
            { x: 350, y: 442 },
          ].map(({ x, y }) => (
            <circle key={x} cx={x} cy={y} r="1.3" fill={GREEN} />
          ))}
        </g>

        {/* ── Rising arrows (motif) ── */}
        <g opacity="0.35">
          {[
            { x: 82, y: 90 },
            { x: 102, y: 80 },
            { x: 335, y: 90 },
          ].map(({ x, y }) => (
            <g key={x}>
              <path d={`M${x} ${y} L${x + 4} ${y - 7} L${x + 8} ${y}`} stroke={GREEN} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={x + 4} y1={y - 11} x2={x + 4} y2={y - 16} stroke={GREEN} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
            </g>
          ))}
        </g>

        {/* ── Small star accents ── */}
        <g opacity="0.45">
          <path d="M50 170 L52 165 L54 170 L59 172 L54 174 L52 179 L50 174 L45 172Z" fill={GREEN} />
          <path d="M340 195 L342 190 L344 195 L349 197 L344 199 L342 204 L340 199 L335 197Z" fill={GREEN} />
          <path d="M180 75 L182 70 L184 75 L189 77 L184 79 L182 84 L180 79 L175 77Z" fill={`rgba(${rgb(GREEN)}, 0.3)`} />
        </g>

        {/* ── Gradient definitions ── */}
        <defs>
          <radialGradient id="spokenBg" cx="0.5" cy="0.35" r="0.85">
            <stop offset="0%" stopColor={`rgba(${rgb(PAPER)}, 0.3)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(PAPER_2)}, 0)`} />
          </radialGradient>
          <radialGradient id="personGrad" cx="0.4" cy="0.35" r="0.65">
            <stop offset="0%" stopColor={`rgba(${rgb(LINE)}, 0.15)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK_SOFT)}, 0.05)`} />
          </radialGradient>
          <radialGradient id="personGrad2" cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor={`rgba(${rgb(LINE)}, 0.12)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK)}, 0.05)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
