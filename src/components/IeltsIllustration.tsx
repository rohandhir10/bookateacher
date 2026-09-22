// bookateacher — IELTS subject page illustration
// A single banded arc showing the 0–9 IELTS scale, with a highlighted
// "your target" marker. One glance = "this is about bands, not a test paper."
import React from "react";

const INK = "#14213D";
const INK_SOFT = "#3D4A63";
const PAPER = "#FAF7F0";
const PAPER_2 = "#F2ECE0";
const LINE = "#D9D2C5";
const MUTED = "#6B6557";
const GREEN = "#2F5233";
const AMBER = "#8A5A00";

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
};

export { IeltsIllustration as default };
export function IeltsIllustration() {
  // Band scale 0–9, drawn as a vertical arc of rounded segments.
  const bands = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const markerBand = 7; // "your target" — Band 7
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
        <rect width={w} height={h} fill={`url(#ieltsBg)`} opacity="0.55" />

        {/* Subtle rings in background */}
        <circle cx={w / 2} cy={h / 2} r="170" stroke={LINE} strokeWidth="0.6" opacity="0.5" fill="none" />
        <circle cx={w / 2} cy={h / 2} r="130" stroke={LINE} strokeWidth="0.5" opacity="0.35" fill="none" />

        {/* Score arc — 10 bands around a circle, each a short arc segment */}
        {/* Center of arc */}
        <g transform={`translate(${w / 2}, ${h / 2})`}>
          {/* Thin guide circle */}
          <circle r="110" stroke={LINE} strokeWidth="0.6" opacity="0.4" fill="none" />

          {/* Band segments — each band is a 33° arc slice on the outer ring */}
          {bands.map((band, i) => {
            const startAngle = (i * 36 - 90) * (Math.PI / 180);
            const endAngle = ((i + 1) * 36 - 90) * (Math.PI / 180);
            const isMarker = band === markerBand;
            const isActive = band >= 6; // bands 6–9 highlighted
            const strokeColor = isMarker
              ? GREEN
              : isActive
              ? `rgba(${rgb(INK)}, 0.55)`
              : MUTED;
            const strokeWidth = isMarker ? 14 : isActive ? 11 : 6;
            const opacity = isMarker ? 1 : isActive ? 0.75 : 0.4;

            const x1 = 110 * Math.cos(startAngle);
            const y1 = 110 * Math.sin(startAngle);
            const x2 = 110 * Math.cos(endAngle);
            const y2 = 110 * Math.sin(endAngle);

            const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;

            return (
              <g key={band}>
                {/* Band label */}
                <text
                  x={138 * Math.cos((startAngle + endAngle) / 2)}
                  y={138 * Math.sin((startAngle + endAngle) / 2) + 4}
                  fill={isMarker ? GREEN : isActive ? INK_SOFT : MUTED}
                  fontSize={isMarker ? 13 : 10}
                  fontFamily="Inter, sans-serif"
                  fontWeight={isMarker ? 700 : 500}
                  textAnchor="middle"
                  opacity={isMarker ? 1 : isActive ? 0.85 : 0.5}
                >
                  {band}
                </text>
                {/* Arc segment */}
                <path
                  d={`M ${x1} ${y1} A 110 110 0 ${largeArc} 1 ${x2} ${y2}`}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  fill="none"
                  opacity={opacity}
                />
                {/* Marker dot on band 7 */}
                {isMarker && (
                  <circle
                    cx={110 * Math.cos((startAngle + endAngle) / 2)}
                    cy={110 * Math.sin((startAngle + endAngle) / 2)}
                    r="7"
                    fill={GREEN}
                    stroke={PAPER}
                    strokeWidth="3"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Center label: "BAND" */}
        <text
          x={w / 2}
          y={h / 2 - 8}
          fill={INK}
          fontSize="18"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="3"
          opacity="0.92"
        >
          BAND
        </text>
        <text
          x={w / 2}
          y={h / 2 + 18}
          fill={MUTED}
          fontSize="10"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
          opacity="0.7"
        >
          0 – 9
        </text>

        {/* "Your target" annotation */}
        <g transform={`translate(${w / 2 + 150}, ${h / 2 - 70})`}>
          <line x1="0" y1="0" x2="46" y2="-36" stroke={GREEN} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
          <circle cx="46" cy="-36" r="3" fill={GREEN} />
          <text
            x="52"
            y="-30"
            fill={GREEN}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            opacity="0.85"
          >
            Your target
          </text>
          <text
            x="52"
            y="-16"
            fill={MUTED}
            fontSize="9"
            fontFamily="Inter, sans-serif"
            opacity="0.6"
          >
            Band 7+
          </text>
        </g>

        {/* Subtle corner score ticks */}
        <g transform={`translate(30, ${h - 40})`} opacity="0.45">
          {[-80, -40, 0, 40, 80].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="8" stroke={INK_SOFT} strokeWidth="0.8" />
          ))}
          <text x="0" y="22" fill={MUTED} fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">
            score
          </text>
        </g>

        {/* Gradient */}
        <defs>
          <radialGradient id="ieltsBg" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor={`rgba(${rgb(INK)}, 0.04)`} />
            <stop offset="100%" stopColor={`rgba(${rgb(INK)}, 0)`} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
