"use client";

import Link from "next/link";

const goals = [
  { label: "IELTS", detail: "Score-focused" },
  { label: "TOEFL", detail: "Test practice" },
  { label: "Speaking", detail: "Fluency" },
  { label: "1-to-1", detail: "Personal support" },
];

export default function LearningMatchVisual() {
  return (
    <div className="learning-visual" aria-label="Example of the tutor matching journey">
      <div className="learning-visual-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="learning-node learning-node-top">
        <span className="learning-node-dot" />
        <span><strong>IELTS</strong><small>Score-focused</small></span>
      </div>

      <div className="learning-node learning-node-right">
        <span className="learning-node-dot" />
        <span><strong>1-to-1</strong><small>Personal support</small></span>
      </div>

      <div className="learning-node learning-node-bottom">
        <span className="learning-node-dot" />
        <span><strong>Speaking</strong><small>Build confidence</small></span>
      </div>

      <div className="learning-node learning-node-left">
        <span className="learning-node-dot" />
        <span><strong>TOEFL</strong><small>Test practice</small></span>
      </div>

      <div className="learning-match-card">
        <div className="learning-match-kicker">Example learning match</div>
        <div className="learning-match-title">Your goal</div>
        <div className="learning-match-main">IELTS · Band 7.5</div>
        <p>Compare tutors by subject, approach, availability and rate.</p>
        <div className="learning-match-tags">
          {goals.map((goal) => <span key={goal.label}>{goal.label}</span>)}
        </div>
        <Link href="/tutors" className="learning-match-action">
          Explore tutor profiles <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="learning-visual-caption">
        Start with the outcome. The directory does the rest.
      </div>
    </div>
  );
}
