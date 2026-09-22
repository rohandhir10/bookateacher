// bookateacher — TOEFL subject page illustration
// A horizontal gauge: 0–120 scale, with a highlighted "competitive range"
// band (100–120) and a marker showing "your target". One glance = scores.
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
const BLUE_SOFT = "#93C5FD";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

export { ToeflIllustration as default };
export function ToeflIllustration() {
  const w = 380;
  const h = 507;
  const gaugeCx = w / 2;
  const gaugeCy = h / 2 + 14;
  const gaugeR = 160;

  // Scale 0–120 mapped to angle. 0 = left (135°), 120 = right (45°)
  const scoreToAngle = (s: number) => {
    const t = s / 120; // 0..1
    return (135 + t * 270) * (Math.PI / 180); // 135° → 405° (= 45°)
  };

  const arcPath = (s0: number, s1: number, r: number) => {
    const a0 = scoreToAngle(s0);
    const a1 = scoreToAngle(s1);
    const x0 = gaugeCx + r * Math.cos(a0);
    const y0 = gaugeCy + r * Math.sin(a0);
    const x1 = gaugeCx + r * Math.cos(a1);
    const y1 = gaugeCy + r * Math.sin(a1);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  // Tick marks every 10 points
  const ticks = Array.from({ length: 13 }, (_, i) => i * 10);

  const markerScore = 105;

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
        <rect width={w} height={h} fill={`url(#toeflBg)`} opacity="0.5" />

        {/* Subtle background rings */}
        <circle cx={gaugeCx} cy={gaugeCy} r={gaugeR + 30} stroke={LINE} strokeWidth="0.6" opacity="0.4" fill="none" />
        <circle cx={gaugeCx} cy={gaugeCy} r={gaugeR - 10} stroke={LINE} strokeWidth="0.5" opacity="0.3" fill="none" />

        {/* Competitive range band 100–120 (highlighted zone) */}
        <path
          d={arcPath(100, 120, gaugeR)}
          stroke={`rgba(${rgb(GREEN)}, 0.18)`}
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
        />

        {/* Base scale arc 0–120 (full) */}
        <path
          d={arcPath(0, 120, gaugeR)}
          stroke={LINE}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* "Your score" arc 0 → marker (filled navy) */}
        <path
          d={arcPath(0, markerScore, gaugeR)}
          stroke={INK}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Tick marks + labels every 10 */}
        {ticks.map((score) => {
          const a = scoreToAngle(score);
          const innerR = gaugeR - 14;
          const outerR = gaugeR + 10;
          const isMajor = score % 20 === 0;
          const x1 = gaugeCx + innerR * Math.cos(a);
          const y1 = gaugeCy + innerR * Math.sin(a);
          const x2 = gaugeCx + outerR * Math.cos(a);
          const y2 = gaugeCy + outerR * Math.sin(a);
          return (
            <g key={score}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={score >= 100 ? GREEN : isMajor ? INK_SOFT : MUTED}
                strokeWidth={isMajor ? 1.4 : 0.8}
                opacity={score >= 100 ? 0.9 : isMajor ? 0.7 : 0.45}
              />
              {/* Label for major ticks */}
              {isMajor && (
                <text
                  x={gaugeCx + (outerR + 22) * Math.cos(a)}
                  y={gaugeCy + (outerR + 22) * Math.sin(a) + 4}
                  fill={score >= 100 ? GREEN : INK_SOFT}
                  fontSize={10}
                  fontFamily="Inter, sans-serif"
                  fontWeight={600}
                  textAnchor="middle"
                  opacity={score >= 100 ? 0.95 : 0.7}
                >
                  {score}
                </text>
              )}
            </g>
          );
        })}

        {/* "Competitive range" label inside the highlighted zone */}
        <g transform={`translate(${gaugeCx + (gaugeR - 58) * Math.cos(scoreToAngle(110))}, ${gaugeCy + (gaugeR - 58) * Math.sin(scoreToAngle(110))})`}>
          <rect x="-42" y="-11" width="84" height="22" rx="11" fill={`rgba(${rgb(GREEN)}, 0.12)`} stroke={`rgba(${rgb(GREEN)}, 0.4)`} strokeWidth="0.8" />
          <text
            x="0"
            y="4"
            fill={GREEN}
            fontSize="9"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            COMPETITIVE
          </text>
        </g>

        {/* Center marker dot on the score */}
        <circle
          cx={gaugeCx + (gaugeR - 2) * Math.cos(scoreToAngle(markerScore))}
          cy={gaugeCy + (gaugeR - 2) * Math.sin(scoreToAngle(markerScore))}
          r="5"
          fill={INK}
          stroke={PAPER}
          strokeWidth="2.5"
        />

        {/* "Your score" annotation */}
        <g transform={`translate(${gaugeCx + (gaugeR + 44) * Math.cos(scoreToAngle(markerScore))}, ${gaugeCy + (gaugeR + 44) * Math.sin(scoreToAngle(markerScore))})`}>
          <line
            x1={gaugeCx + (gaugeR + 8) * Math.cos(scoreToAngle(markerScore))}
            y1={gaugeCy + (gaugeR + 8) * Math.sin(scoreToAngle(markerScore))}
            x2={gaugeCx + (gaugeR + 38) * Math.cos(scoreToAngle(markerScore))}
            y2={gaugeCy + (gaugeR + 38) * Math.sin(scoreToAngle(markerScore))}
            stroke={INK}
            strokeWidth="1.2"
            opacity="0.7"
          />
          <circle cx={gaugeCx + (gaugeR + 38) * Math.cos(scoreToAngle(markerScore))} cy={gaugeCy + (gaugeR + 38) * Math.sin(scoreToAngle(markerScore))} r="3" fill={INK} />
          <text
            x={gaugeCx + (gaugeR + 52) * Math.cos(scoreToAngle(markerScore))}
            y={gaugeCy + (gaugeR + 52) * Math.sin(scoreToAngle(markerScore)) + 4}
            fill={INK}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            opacity="0.85"
          >
            Your score: {markerScore}
          </text>
        </g>

        {/* "TOEFL iBT · 0 – 120" center label */}
        <text
          x={gaugeCx}
          y={gaugeCy - 4}
          fill={INK}
          fontSize="16"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="2.5"
          opacity="0.92"
        >
          TOEFL
        </text>
        <text
          x={gaugeCx}
          y={gaugeCy + 16}
          fill={MUTED}
          fontSize="10"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
          opacity="0.65"
        >
          0 – 120
        </text>

        {/* Scale label */}
        <text
          x={gaugeCx}
          y={h - 22}
          fill={MUTED}
          fontSize="9"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
          opacity="0.55"
        >
          sectional: R / L / S / W · each 0–30
        </text>

        <defs>
          <radialGradient id="toeflBg" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor={`rgba(${rgb(INK)}, 0.04)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
