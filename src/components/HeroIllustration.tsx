// bookateacher — Hero illustration
// A layered desk scene: desk surface, lamp, books, notes, score card,
// light from a window, subtle background detail. Navy/parchment palette.
import React from "react";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const RED = "#B23A2E";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

export { HeroIllustration as default };
export function HeroIllustration() {
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
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 720 405"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* ── Background wash ── */}
        <rect width="720" height="405" fill={PAPER_2} />
        <rect
          x="0"
          y="0"
          width="720"
          height="405"
          fill={`url(#heroGrad)`}
          opacity="0.6"
        />

        {/* ── Window (upper left) ── */}
        <g opacity="0.9">
          <rect x="60" y="40" width="170" height="140" rx="4" fill={`rgba(${rgb(INK)}, 0.04)`} stroke={LINE} strokeWidth="1.5" />
          <line x1="145" y1="40" x2="145" y2="180" stroke={LINE} strokeWidth="1" />
          <line x1="60" y1="110" x2="230" y2="110" stroke={LINE} strokeWidth="1" />
          {/* Light rays from window */}
          <polygon
            points="145,180 280,360 60,360"
            fill={`rgba(${rgb(PAPER)}, 0.4)`}
            opacity="0.5"
          />
          <polygon
            points="145,180 220,360 80,360"
            fill={`rgba(${rgb(PAPER)}, 0.5)`}
            opacity="0.35"
          />
          {/* Curtain hint */}
          <path d="M55 38 Q60 90 58 182" stroke={INK_SOFT} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M235 38 Q230 90 232 182" stroke={INK_SOFT} strokeWidth="1.5" fill="none" opacity="0.5" />
        </g>

        {/* ── Wall detail / bookshelf (upper right) ── */}
        <g opacity="0.7">
          <rect x="480" y="30" width="180" height="120" rx="3" fill={`rgba(${rgb(INK)}, 0.03)`} stroke={LINE} strokeWidth="1" />
          {/* Shelf lines */}
          <line x1="480" y1="65" x2="660" y2="65" stroke={LINE} strokeWidth="0.8" />
          <line x1="480" y1="95" x2="660" y2="95" stroke={LINE} strokeWidth="0.8" />
          <line x1="480" y1="125" x2="660" y2="125" stroke={LINE} strokeWidth="0.8" />
          {/* Books on shelves */}
          {[
            [500, 48, 14, 14, INK],
            [520, 48, 12, 14, INK_SOFT],
            [538, 48, 16, 14, PAPER_2],
            [560, 48, 10, 14, INK_SOFT],
            [575, 48, 14, 14, INK],
            [595, 48, 13, 14, INK_SOFT],
            [505, 78, 16, 14, INK_SOFT],
            [527, 78, 12, 14, INK],
            [545, 78, 14, 14, PAPER_2],
            [565, 78, 10, 14, INK_SOFT],
            [580, 78, 14, 14, INK],
            [600, 78, 12, 14, PAPER_2],
            [500, 108, 14, 14, INK],
            [520, 108, 12, 14, INK_SOFT],
            [538, 108, 16, 14, PAPER_2],
            [560, 108, 14, 14, INK_SOFT],
            [582, 108, 10, 14, INK],
            [598, 108, 14, 14, INK_SOFT],
            [618, 108, 12, 14, PAPER_2],
          ].map(([x, y, w, h, color]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="1.5" fill={color} stroke={LINE} strokeWidth="0.5" />
          ))}
          {/* Small frame on wall */}
          <rect x="560" y="20" width="50" height="38" rx="2" fill={`rgba(${rgb(INK)}, 0.05)`} stroke={LINE} strokeWidth="1" />
          <circle cx="585" cy="38" r="12" fill={`rgba(${rgb(GREEN)}, 0.15)`} stroke={LINE} strokeWidth="0.8" />
        </g>

        {/* ── Desk surface ── */}
        <g>
          <ellipse cx="360" cy="340" rx="340" ry="70" fill={`rgba(${rgb(INK)}, 0.03)`} stroke={LINE} strokeWidth="1.2" />
          <ellipse cx="360" cy="335" rx="320" ry="60" fill={`rgba(${rgb(PAPER)}, 0.3)`} />
          {/* Desk edge highlight */}
          <path d="M20 340 Q360 370 700 340" stroke={`rgba(${rgb(INK)}, 0.08)`} strokeWidth="2" fill="none" />
        </g>

        {/* ── Lamp (left of desk) ── */}
        <g>
          {/* Lamp base */}
          <ellipse cx="140" cy="330" rx="24" ry="8" fill={`rgba(${rgb(INK)}, 0.06)`} stroke={LINE} strokeWidth="1" />
          <rect x="126" y="310" width="28" height="20" rx="2" fill={INK_SOFT} stroke={LINE} strokeWidth="0.8" />
          {/* Lamp stem */}
          <rect x="137" y="270" width="6" height="42" fill={INK_SOFT} stroke={LINE} strokeWidth="0.8" />
          {/* Lamp shade */}
          <path d="M112 270 Q120 240 140 240 Q160 240 168 270 Z" fill={INK} stroke={LINE} strokeWidth="1" />
          <path d="M115 270 Q122 243 140 243 Q158 243 165 270" fill={`rgba(${rgb(PAPER)}, 0.15)`} />
          {/* Light cone from lamp */}
          <polygon
            points="125,270 155,270 220,360 60,360"
            fill={`rgba(${rgb(PAPER)}, 0.35)`}
            opacity="0.5"
          />
          <polygon
            points="130,270 150,270 195,360 95,360"
            fill={`rgba(${rgb(PAPER)}, 0.45)`}
            opacity="0.35"
          />
          {/* Light glow on desk */}
          <ellipse cx="150" cy="338" rx="80" ry="18" fill={`rgba(${rgb(PAPER)}, 0.3)`} />
        </g>

        {/* ── Open book (center foreground) ── */}
        <g transform="translate(280, 300)">
          {/* Book spine shadow */}
          <ellipse cx="40" cy="40" rx="55" ry="8" fill={`rgba(${rgb(INK)}, 0.08)`} />
          {/* Left page */}
          <path d="M0 5 Q20 0 40 0 L40 40 Q20 38 0 40 Z" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Right page */}
          <path d="M40 0 Q60 0 80 5 L80 40 Q60 38 40 40 Z" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          {/* Text lines on left page */}
          {[
            [8, 10, 22],
            [8, 16, 22],
            [8, 22, 22],
            [8, 28, 18],
            [8, 34, 16],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.15)`} strokeWidth="0.8" strokeLinecap="round" />
          ))}
          {/* Text lines on right page */}
          {[
            [46, 10, 28],
            [46, 16, 24],
            [46, 22, 28],
            [46, 28, 20],
            [46, 34, 14],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.15)`} strokeWidth="0.8" strokeLinecap="round" />
          ))}
          {/* Fold shadow at spine */}
          <path d="M40 0 L40 40" stroke={`rgba(${rgb(INK)}, 0.1)`} strokeWidth="1.5" />
          {/* Bookmark ribbon */}
          <path
            d="M65 0 L65 22 L70 18 L75 22 L75 0"
            fill={RED}
            opacity="0.85"
          />
        </g>

        {/* ── Notebook / notepad (right of book) ── */}
        <g transform="translate(410, 310)">
          <rect x="0" y="0" width="80" height="55" rx="2" fill={PAPER_2} stroke={LINE} strokeWidth="1" />
          {/* Spiral binding holes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={10 + i * 14} cy="4" r="2.5" fill={INK_SOFT} opacity="0.5" />
          ))}
          {/* Writing lines */}
          {[
            [12, 14, 58],
            [12, 21, 52],
            [12, 28, 56],
            [12, 35, 44],
            [12, 42, 50],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="0.7" strokeLinecap="round" />
          ))}
          {/* Small pencil/scribble */}
          <path d="M55 14 L62 16 L58 20" stroke={RED} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── Score card (right edge) ── */}
        <g transform="translate(560, 280)">
          <rect x="0" y="0" width="80" height="110" rx="3" fill={PAPER} stroke={LINE} strokeWidth="1.2" />
          <rect x="0" y="0" width="80" height="22" rx="3" fill={INK} />
          <rect x="0" y="20" width="80" height="2" fill={LINE} />
          {/* Header text */}
          <text x="40" y="15" textAnchor="middle" fill={PAPER} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">SCORE</text>
          {/* Score rows */}
          {[
            ["Listening", "8.0", GREEN],
            ["Reading", "7.5", GREEN],
            ["Writing", "6.5", RED],
            ["Speaking", "7.0", GREEN],
          ].map(([label, score, color], i) => (
            <g key={label}>
              <line x1="6" y1={34 + i * 18} x2={74} y2={34 + i * 18} stroke={LINE} strokeWidth="0.5" />
              <text x="10" y={34 + i * 18 + 5} fill={INK_SOFT} fontSize="8" fontFamily="Inter, sans-serif">{label}</text>
              <text x={70} y={34 + i * 18 + 5} textAnchor="end" fill={color} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">{score}</text>
            </g>
          ))}
          {/* Overall band */}
          <rect x="0" y="102" width="80" height="8" rx="1" fill={`rgba(${rgb(GREEN)}, 0.1)`} />
          <text x="40" y="109" textAnchor="middle" fill={GREEN} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="700">7.5</text>
          {/* Small decorative star */}
          <path d="M72 8 L73.5 11 L77 11 L74 13 L75 16.5 L72 14.5 L69 16.5 L70 13 L67 11 L70.5 11 Z" fill={`rgba(${rgb(GREEN)}, 0.4)`} />
        </g>

        {/* ── Coffee cup (far right) ── */}
        <g transform="translate(610, 310)">
          <ellipse cx="18" cy="42" rx="18" ry="5" fill={`rgba(${rgb(INK)}, 0.06)`} />
          <path d="M2 15 Q2 42 18 42 Q34 42 34 15 Z" fill={PAPER_2} stroke={LINE} strokeWidth="1.2" />
          <path d="M2 15 Q2 20 8 20 L26 20 Q34 20 34 15" fill={`rgba(${rgb(INK)}, 0.04)`} />
          {/* Handle */}
          <path d="M34 20 Q44 20 44 27 Q44 34 34 34" fill="none" stroke={LINE} strokeWidth="1.5" />
          {/* Saucer */}
          <ellipse cx="18" cy="46" rx="24" ry="4" fill={PAPER_2} stroke={LINE} strokeWidth="0.8" />
          {/* Steam */}
          <path d="M12 12 Q10 6 12 2" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.4" />
          <path d="M18 10 Q16 4 18 0" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.35" />
          <path d="M24 12 Q22 6 24 2" stroke={INK_SOFT} strokeWidth="0.8" fill="none" opacity="0.3" />
        </g>

        {/* ── Desk accessories (left foreground) ── */}
        <g transform="translate(190, 330)">
          {/* Stacked papers */}
          <rect x="0" y="0" width="40" height="28" rx="1" fill={PAPER} stroke={LINE} strokeWidth="0.8" transform="rotate(-3)" />
          <rect x="3" y="2" width="38" height="26" rx="1" fill={PAPER_2} stroke={LINE} strokeWidth="0.8" transform="rotate(-2)" />
          {/* Pen */}
          <g transform="rotate(25, 50, 14)">
            <rect x="48" y="4" width="10" height="20" rx="1" fill={INK} stroke={LINE} strokeWidth="0.5" />
            <rect x="52" y="0" width="4" height="6" rx="0.5" fill={INK_SOFT} />
            <polygon points="56,0 58,4 54,4" fill={INK_SOFT} />
          </g>
        </g>

        {/* ── Subtle floating elements (depth) ── */}
        <g opacity="0.4">
          {/* Small stars/marks in upper area */}
          <circle cx="300" cy="60" r="1.5" fill={GREEN} />
          <circle cx="320" cy="75" r="1" fill={GREEN} />
          <circle cx="340" cy="55" r="1.5" fill={GREEN} />
          <circle cx="420" cy="80" r="1" fill={GREEN} />
          <circle cx="450" cy="50" r="1.5" fill={GREEN} />
          {/* Small arrows suggesting progress */}
          <path d="M380 90 L385 85 L390 90" stroke={GREEN} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <path d="M400 100 L405 95 L410 100" stroke={GREEN} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </g>

        {/* ── Gradient definitions ── */}
        <defs>
          <radialGradient id="heroGrad" cx="0.6" cy="0.4" r="0.7">
            <stop offset="0%" stopColor={`rgba(${rgb(PAPER)}, 0.3)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(PAPER_2)}, 0)`} />
          </radialGradient>
          <linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${rgb(PAPER)}, 0.4)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(PAPER)}, 0)`} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
