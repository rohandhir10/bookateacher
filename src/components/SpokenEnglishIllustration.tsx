// bookateacher — Spoken English subject page illustration
// Two speech bubbles facing each other with a sound wave between them —
// communicates "real conversation with a real person" in one glance.
import React from "react";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const AMBER = "#8A5A00";
const BLUE = "#2563EB";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

export { SpokenEnglishIllustration as default };
export function SpokenEnglishIllustration() {
  const w = 380;
  const h = 507;

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
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        {/* Background */}
        <rect width={w} height={h} fill={PAPER_2} />
        <rect width={w} height={h} fill={`url(#spokenBg)`} opacity="0.5" />

        {/* Subtle horizontal guide lines (conversation feel) */}
        <g opacity="0.3">
          {[-60, 0, 60].map((y, i) => (
            <line key={i} x1="40" y1={y + h / 2} x2={w - 40} y2={y + h / 2} stroke={LINE} strokeWidth="0.5" />
          ))}
        </g>

        {/* Sound wave between the two bubbles — 3 curved lines */}
        <g stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.75">
          {[-30, 0, 30].map((dy, i) => {
            const phase = i * 0.6;
            return (
              <path
                key={i}
                d={`M 165 ${h / 2 + dy} Q 180 ${h / 2 + dy - 14 - phase * 3} 195 ${h / 2 + dy} Q 210 ${h / 2 + dy + 14 + phase * 3} 225 ${h / 2 + dy}`}
              />
            );
          })}
        </g>

        {/* Left speech bubble (speaker) */}
        <g transform="translate(30, 120)">
          <rect x="0" y="0" width="130" height="160" rx="18" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Bubble tail */}
          <path d="M 20 160 L 0 190 L 30 160 Z" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Header strip */}
          <rect x="0" y="0" width="130" height="32" rx="18" fill={INK} />
          <rect x="0" y="22" width="130" height="10" fill={INK} />
          <text x="65" y="21" fill={PAPER} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="1.2" opacity="0.92">
            YOU
          </text>
          {/* Lines of speech */}
          <g fill={INK_SOFT} opacity="0.75">
            {[
              [24, 60, 92, 9],
              [24, 78, 78, 9],
              [24, 96, 88, 9],
              [24, 114, 66, 9],
            ].map(([x, y, w, th], i) => (
              <rect key={i} x={x} y={y} width={w} height={th} rx="2" fill={`rgba(${rgb(INK)}, 0.12)`} />
            ))}
          </g>
          {/* Small avatar dot */}
          <circle cx="65" cy="138" r="10" fill={`rgba(${rgb(GREEN)}, 0.12)`} stroke={LINE} strokeWidth="0.8" />
          <text x="65" y="142" fill={GREEN} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">
            you
          </text>
        </g>

        {/* Right speech bubble (tutor/coach) */}
        <g transform="translate(220, 120)">
          <rect x="0" y="0" width="130" height="160" rx="18" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Bubble tail pointing left */}
          <path d="M 110 160 L 130 190 L 100 160 Z" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Header strip — different colour to distinguish */}
          <rect x="0" y="0" width="130" height="32" rx="18" fill={BLUE} />
          <rect x="0" y="22" width="130" height="10" fill={BLUE} />
          <text x="65" y="21" fill={PAPER} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="1.2" opacity="0.92">
            COACH
          </text>
          {/* Lines of speech */}
          <g fill={INK_SOFT} opacity="0.75">
            {[
              [24, 60, 96, 9],
              [24, 76, 84, 9],
              [24, 92, 70, 9],
            ].map(([x, y, w, th], i) => (
              <rect key={i} x={x} y={y} width={w} height={th} rx="2" fill={`rgba(${rgb(INK)}, 0.12)`} />
            ))}
          </g>
          {/* Small avatar dot */}
          <circle cx="65" cy="138" r="10" fill={`rgba(${rgb(BLUE)}, 0.12)`} stroke={LINE} strokeWidth="0.8" />
          <text x="65" y="142" fill={BLUE} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">
            coach
          </text>
        </g>

        {/* "Real conversation" caption */}
        <g transform={`translate(${w / 2}, ${h - 70})`}>
          <text
            x="0"
            y="0"
            fill={INK_SOFT}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="1.5"
            opacity="0.6"
          >
            REAL CONVERSATION
          </text>
          <text
            x="0"
            y="16"
            fill={MUTED}
            fontSize="9"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            opacity="0.5"
          >
            not a test — a dialogue
          </text>
        </g>

        {/* Small decorative dot grid top-right */}
        <g opacity="0.35">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={w - 22 - (i % 4) * 14} cy={28 + Math.floor(i / 4) * 14} r="2.5" fill={i % 2 === 0 ? GREEN : BLUE} opacity="0.5" />
          ))}
        </g>

        <defs>
          <radialGradient id="spokenBg" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0%" stopColor={`rgba(${rgb(INK)}, 0.03)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
