// bookateacher — TOEFL subject page illustration
// Computer-based test scene: monitor with test UI, keyboard, notepad, timer,
// score badges. Navy/parchment palette.

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
const BLUE = "#2563EB";
const BLUE_SOFT = "#93C5FD";

export { ToeflIllustration as default };
export function ToeflIllustration() {
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
        <rect width="380" height="507" fill={`url(#toeflBg)`} opacity="0.7" />

        {/* ── Desk surface ── */}
        <ellipse cx="190" cy="440" rx="190" ry="42" fill={`rgba(${rgb(INK)}, 0.03)`} stroke={LINE} strokeWidth="1" />
        <ellipse cx="190" cy="436" rx="170" ry="34" fill={`rgba(${rgb(PAPER)}, 0.25)`} />

        {/* ── Computer monitor ── */}
        <g transform="translate(60, 65)">
          {/* Monitor shadow */}
          <rect x="6" y="6" width="260" height="170" rx="6" fill={`rgba(${rgb(INK)}, 0.07)`} />

          {/* Bezel */}
          <rect width="260" height="170" rx="6" fill={INK} stroke={LINE} strokeWidth="1.2" />

          {/* Screen */}
          <rect x="10" y="10" width="240" height="150" rx="2" fill="#0F2440" />

          {/* Screen UI — TOEFL test interface */}
          {/* Header */}
          <rect x="10" y="10" width="240" height="32" rx="2" fill={`rgba(${rgb(INK)}, 0.45)`} />
          <text x="18" y="30" fill={PAPER} fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.5">TOEFL iBT · READING</text>
          <text x="232" y="30" textAnchor="end" fill={`rgba(${rgb(PAPER)}, 0.5)`} fontSize="9" fontFamily="Inter, sans-serif">Q 12 / 36</text>

          {/* Progress bar */}
          <rect x="10" y="46" width="240" height="4" rx="1" fill={`rgba(${rgb(PAPER)}, 0.08)`} />
          <rect x="10" y="46" width="76" height="4" rx="1" fill={BLUE_SOFT} opacity="0.5" />
          <text x="235" y="50" fill={`rgba(${rgb(PAPER)}, 0.4)`} fontSize="8" fontFamily="Inter, sans-serif">33%</text>

          {/* Passage text lines */}
          {[
            [14, 60, 222],
            [14, 68, 222],
            [14, 76, 222],
            [14, 84, 222],
            [14, 92, 222],
            [14, 100, 222],
            [14, 108, 222],
            [14, 116, 222],
            [14, 124, 222],
            [14, 132, 222],
            [14, 140, 222],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(PAPER)}, 0.22)`} strokeWidth="2.5" strokeLinecap="round" />
          ))}

          {/* Highlighted sentence */}
          <rect x="14" y="80" width="222" height="8" rx="1" fill={`rgba(${rgb(BLUE_SOFT)}, 0.12)`} />

          {/* Question panel (right) */}
          <rect x="165" y="58" width="80" height="92" rx="2" fill={`rgba(${rgb(PAPER)}, 0.06)`} stroke={`rgba(${rgb(PAPER)}, 0.15)`} strokeWidth="0.8" />
          <text x="172" y="72" fill={`rgba(${rgb(PAPER)}, 0.7)`} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">Q12</text>
          <text x="172" y="84" fill={`rgba(${rgb(PAPER)}, 0.45)`} fontSize="7.5" fontFamily="Inter, sans-serif">Select the sentence</text>
          <text x="172" y="94" fill={`rgba(${rgb(PAPER)}, 0.45)`} fontSize="7.5" fontFamily="Inter, sans-serif">that best expresses</text>
          <text x="172" y="104" fill={`rgba(${rgb(PAPER)}, 0.45)`} fontSize="7.5" fontFamily="Inter, sans-serif">the essential</text>
          <text x="172" y="114" fill={`rgba(${rgb(PAPER)}, 0.45)`} fontSize="7.5" fontFamily="Inter, sans-serif">information.</text>

          {/* Answer options */}
          {[
            { x: 172, y: 124, label: "A", selected: true },
            { x: 172, y: 136, label: "B", selected: false },
            { x: 172, y: 148, label: "C", selected: false },
          ].map(({ x, y, label, selected }) => (
            <g key={label}>
              <circle cx={x + 4} cy={y + 4} r="4.5" fill={selected ? BLUE_SOFT : "none"} stroke={selected ? BLUE_SOFT : `rgba(${rgb(PAPER)}, 0.4)`} strokeWidth="1" />
              <text x={x + 12} y={y + 7.5} fill={selected ? BLUE_SOFT : `rgba(${rgb(PAPER)}, 0.45)`} fontSize="8.5" fontFamily="Inter, sans-serif" fontWeight="600">{label}</text>
            </g>
          ))}

          {/* Next button */}
          <rect x="172" y="156" width="64" height="14" rx="3" fill={BLUE} opacity="0.75" />
          <text x="204" y="166" textAnchor="middle" fill={PAPER} fontSize="8.5" fontFamily="Inter, sans-serif" fontWeight="600">Next →</text>

          {/* Timer */}
          <text x="18" y="150" fill={`rgba(${rgb(PAPER)}, 0.35)`} fontSize="8.5" fontFamily="Inter, sans-serif">⏱ 18:42</text>

          {/* Webcam dot */}
          <circle cx="125" cy="15" r="2.5" fill={`rgba(${rgb(PAPER)}, 0.12)`} />
          <circle cx="125" cy="15" r="1" fill={`rgba(${rgb(PAPER)}, 0.05)`} />

          {/* Monitor stand */}
          <rect x="112" y="171" width="36" height="12" rx="1" fill={INK_SOFT} stroke={LINE} strokeWidth="0.8" />
          <rect x="85" y="182" width="90" height="7" rx="2" fill={INK_SOFT} stroke={LINE} strokeWidth="0.8" />
        </g>

        {/* ── Keyboard ── */}
        <g transform="translate(75, 250)">
          <rect x="4" y="4" width="230" height="62" rx="4" fill={`rgba(${rgb(INK)}, 0.05)`} />
          <rect width="230" height="62" rx="4" fill={INK} stroke={LINE} strokeWidth="1" />

          {/* Key rows */}
          {[
            { y: 8, count: 17, w: 12, gap: 1.5 },
            { y: 22, count: 16, w: 13, gap: 1.5 },
            { y: 36, count: 15, w: 14, gap: 1.5 },
          ].map(({ y, count, w, gap }, ri) => (
            <g key={ri}>
              {Array.from({ length: count }).map((_, ci) => (
                <rect
                  key={ci}
                  x={3 + ci * (w + gap)}
                  y={y}
                  width={w}
                  height="10"
                  rx="1.5"
                  fill={`rgba(${rgb(PAPER)}, 0.12)`}
                  stroke={`rgba(${rgb(PAPER)}, 0.25)`}
                  strokeWidth="0.5"
                />
              ))}
            </g>
          ))}

          {/* Space bar */}
          <rect x="40" y="50" width="110" height="8" rx="1.5" fill={`rgba(${rgb(PAPER)}, 0.12)`} stroke={`rgba(${rgb(PAPER)}, 0.25)`} strokeWidth="0.5" />

          {/* Pressed keys */}
          {[4, 9, 15].map((ci) => (
            <rect key={ci} x={5 + ci * 13} y="38" width="13" height="10" rx="1" fill={BLUE} opacity="0.55" />
          ))}
        </g>

        {/* ── Notepad (left of keyboard) ── */}
        <g transform="translate(18, 320)">
          <rect x="0" y="0" width="62" height="78" rx="2" fill={PAPER_2} stroke={LINE} strokeWidth="1" />
          {/* Spiral */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={6 + i * 11} cy="4" r="2.5" fill={INK_SOFT} opacity="0.4" />
          ))}
          {/* Note lines */}
          {[
            [10, 14, 44],
            [10, 22, 42],
            [10, 30, 44],
            [10, 38, 36],
            [10, 46, 42],
            [10, 54, 38],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="0.7" strokeLinecap="round" />
          ))}
          {/* Circle highlights */}
          <circle cx="28" cy="18" r="2.5" fill={`rgba(${rgb(BLUE)}, 0.25)`} />
          <circle cx="34" cy="34" r="2.5" fill={`rgba(${rgb(RED)}, 0.2)`} />
        </g>

        {/* ── Timer/stopwatch (right) ── */}
        <g transform="translate(310, 262)">
          <rect x="0" y="0" width="50" height="72" rx="4" fill={PAPER} stroke={LINE} strokeWidth="1" />
          {/* Screen */}
          <rect x="4" y="8" width="42" height="54" rx="2" fill={`rgba(${rgb(INK)}, 0.25)`} />
          {/* Clock face ring */}
          <circle cx="25" cy="35" r="14" fill="none" stroke={`rgba(${rgb(PAPER)}, 0.2)`} strokeWidth="0.5" />
          {/* Hands */}
          <line x1="25" y1="35" x2="25" y2="18" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="35" x2="35" y2="35" stroke={`rgba(${rgb(PAPER)}, 0.45)`} strokeWidth="1.5" strokeLinecap="round" />
          {/* Center dot */}
          <circle cx="25" cy="35" r="2" fill={PAPER} />
          {/* Tick marks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
            const rad = (a * Math.PI) / 180;
            const x = 25 + 16 * Math.cos(rad);
            const y = 35 + 16 * Math.sin(rad);
            return (
              <line key={a} x1={x} y1={y} x2={x + 2.5 * Math.cos(rad)} y2={y + 2.5 * Math.sin(rad)} stroke={`rgba(${rgb(PAPER)}, 0.3)`} strokeWidth="1" />
            );
          })}
          {/* Label */}
          <text x="25" y="68" textAnchor="middle" fill={MUTED} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.5">TIME</text>
        </g>

        {/* ── Score badges (upper right) ── */}
        {[
          { x: 315, y: 110, score: "105+", label: "avg TOEFL", color: GREEN },
          { x: 315, y: 155, score: "30", label: "READING", color: BLUE_SOFT },
          { x: 315, y: 185, score: "29", label: "LISTENING", color: BLUE_SOFT },
        ].map(({ x, y, score, label, color }) => (
          <g key={score} transform={`translate(${x}, ${y})`}>
            <rect x="-26" y="-12" width="52" height="24" rx="3" fill={`rgba(${rgb(PAPER_2)}, 0.85)`} stroke={LINE} strokeWidth="0.7" />
            <text x="0" y="4" textAnchor="middle" fill={color} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700">{score}</text>
            <text x="0" y="14" textAnchor="middle" fill={MUTED} fontSize="6.5" fontFamily="Inter, sans-serif" letterSpacing="0.5">{label}</text>
          </g>
        ))}

        {/* ── Rising arrows motif ── */}
        <g opacity="0.4">
          {[
            { x: 35, y: 470 },
            { x: 55, y: 455 },
            { x: 72, y: 468 },
            { x: 92, y: 450 },
          ].map(({ x, y }) => (
            <g key={x}>
              <path d={`M${x} ${y} L${x + 4} ${y - 10} L${x + 8} ${y}`} stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={x + 4} y1={y - 14} x2={x + 4} y2={y - 20} stroke={GREEN} strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
            </g>
          ))}
        </g>

        {/* ── Paper stack (bottom right corner) ── */}
        <g transform="translate(280, 405)">
          <rect x="0" y="0" width="52" height="34" rx="1" fill={PAPER} stroke={LINE} strokeWidth="0.7" transform="rotate(-4)" />
          <rect x="3" y="3" width="48" height="28" rx="1" fill={PAPER_2} stroke={LINE} strokeWidth="0.7" transform="rotate(-2)" />
          {[[8, 10, 34], [8, 16, 30], [8, 22, 36]].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={`rgba(${rgb(INK)}, 0.12)`} strokeWidth="0.6" strokeLinecap="round" transform="rotate(-4)" />
          ))}
        </g>

        {/* ── Gradient definitions ── */}
        <defs>
          <radialGradient id="toeflBg" cx="0.5" cy="0.3" r="0.85">
            <stop offset="0%" stopColor={`rgba(${rgb(PAPER)}, 0.25)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(PAPER_2)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
