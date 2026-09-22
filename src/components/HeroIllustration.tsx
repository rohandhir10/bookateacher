// bookateacher — Hero illustration
// A clean conceptual mark: overlapping "score rings" (band, TOEFL, speaking)
// forming a single composition that says "you hit a target" without any clutter.
import React from "react";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const RED = "#B23A2E";
const BLUE = "#2563EB";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

export { HeroIllustration as default };
export function HeroIllustration() {
  const w = 720;
  const h = 405;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        margin: "48px auto 0",
        aspectRatio: "16 / 9",
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        {/* Background */}
        <rect width={w} height={h} fill={PAPER_2} />
        <rect width={w} height={h} fill={`url(#heroBg)`} opacity="0.6" />

        {/* Left score ring — IELTS Band (0–9 arc) */}
        <g transform="translate(200, 202)">
          <circle r="88" stroke={LINE} strokeWidth="0.6" opacity="0.4" fill="none" />
          {/* Band arc 5→9 highlighted */}
          <path
            d={`M ${88 * Math.cos((5 * 40 - 90) * Math.PI / 180)} ${88 * Math.sin((5 * 40 - 90) * Math.PI / 180)} A 88 88 0 0 1 ${88 * Math.cos((9 * 40 - 90) * Math.PI / 180)} ${88 * Math.sin((9 * 40 - 90) * Math.PI / 180)}`}
            stroke={GREEN}
            strokeWidth={7}
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          {/* tick marks every band */}
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i * 36 - 90) * Math.PI / 180;
            const x1 = 88 * Math.cos(a);
            const y1 = 88 * Math.sin(a);
            const x2 = 94 * Math.cos(a);
            const y2 = 94 * Math.sin(a);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i >= 5 ? GREEN : MUTED} strokeWidth={i >= 5 ? 2 : 1} opacity={i >= 5 ? 0.9 : 0.35} />
            );
          })}
          {/* center label */}
          <text x="0" y="-6" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="2" opacity="0.9">BAND</text>
          <text x="0" y="10" fill={MUTED} fontSize="9" fontFamily="Inter, sans-serif" textAnchor="middle" opacity="0.55">0 – 9</text>
        </g>

        {/* Middle score ring — TOEFL 0–120 (wider, fainter) */}
        <g transform="translate(380, 202)">
          <circle r="100" stroke={LINE} strokeWidth="0.6" opacity="0.35" fill="none" />
          {/* highlighted 100–120 arc */}
          <path
            d={`M ${100 * Math.cos((100 * 2.25 - 0) * Math.PI / 180)} ${100 * Math.sin((100 * 2.25 - 0) * Math.PI / 180)} A 100 100 0 0 1 ${100 * Math.cos((120 * 2.25 - 0) * Math.PI / 180)} ${100 * Math.sin((120 * 2.25 - 0) * Math.PI / 180)}`}
            stroke={`rgba(${rgb(GREEN)}, 0.25)`}
            strokeWidth={18}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M ${100 * Math.cos(0)} ${100 * Math.sin(0)} A 100 100 0 0 1 ${100 * Math.cos((105 * 2.25) * Math.PI / 180)} ${100 * Math.sin((105 * 2.25) * Math.PI / 180)}`}
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          {/* ticks 0..120 every 20 */}
          {Array.from({ length: 7 }, (_, i) => {
            const s = i * 20;
            const a = (s * 2.25) * Math.PI / 180; // 0..315° mapping 0..120... approximate
            const x1 = 100 * Math.cos(a);
            const y1 = 100 * Math.sin(a);
            const x2 = 107 * Math.cos(a);
            const y2 = 107 * Math.sin(a);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s >= 100 ? GREEN : INK_SOFT} strokeWidth={1.2} opacity={s >= 100 ? 0.85 : 0.4} />
            );
          })}
          <text x="0" y="-6" fill={INK} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="2" opacity="0.9">TOEFL</text>
          <text x="0" y="10" fill={MUTED} fontSize="9" fontFamily="Inter, sans-serif" textAnchor="middle" opacity="0.55">0 – 120</text>
        </g>

        {/* Right speech wave — 3 arcs representing conversation */}
        <g transform="translate(540, 202)">
          {/* enclosing circle */}
          <circle r="82" stroke={LINE} strokeWidth="0.6" opacity="0.35" fill="none" />
          {/* sound wave arcs */}
          {[-32, 0, 32].map((dy, i) => {
            const r1 = 20 + i * 6;
            const r2 = 60 + i * 6;
            return (
              <path
                key={i}
                d={`M ${-r1} ${dy} A ${r1} ${r1} 0 0 1 ${r1} ${dy}`}
                stroke={i === 1 ? BLUE : INK_SOFT}
                strokeWidth={i === 1 ? 3 : 1.5}
                fill="none"
                opacity={i === 1 ? 0.85 : 0.4}
                strokeLinecap="round"
              />
            );
          })}
          {/* center dot (with talk) */}
          <circle r="8" fill={BLUE} opacity="0.85" />
          <circle r="3.5" fill={PAPER} />
          <text x="0" y="30" fill={MUTED} fontSize="9" fontFamily="Inter, sans-serif" textAnchor="middle" opacity="0.5">SPEAK</text>
        </g>

        {/* Top center: "YOUR TARGET" label */}
        <g transform="translate(360, 60)">
          <text
            x="0"
            y="0"
            fill={INK}
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="3"
            opacity="0.7"
          >
            YOUR TARGET
          </text>
        </g>

        {/* Three small "checkmark" dots above each ring — suggesting "hit" */}
        {[
          { x: 200, y: 110, c: GREEN },
          { x: 380, y: 100, c: GREEN },
          { x: 540, y: 120, c: BLUE },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="4" fill={p.c} />
            <path d="M -3 -1 L -1 1 L 3 -2" stroke={PAPER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        ))}

        {/* Subtle background dots */}
        <g opacity="0.3">
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={i} cx={40 + (i * 31) % w} cy={i % 2 === 0 ? 30 : h - 30} r="2" fill={i % 3 === 0 ? GREEN : i % 3 === 1 ? BLUE : INK_SOFT} />
          ))}
        </g>

        <defs>
          <radialGradient id="heroBg" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0%" stopColor={`rgba(${rgb(INK)}, 0.04)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
