"use client";

import { useState } from "react";

interface Phase {
  id: number;
  name: string;
  period: string;
  status: "completed" | "active" | "upcoming";
}

const PHASES: Phase[] = [
  { id: 1, name: "Scope & koncept", period: "Jan–Jun 2026", status: "active" },
  { id: 2, name: "Skitsedesign", period: "Efterår 2026", status: "upcoming" },
  { id: 3, name: "Design & model", period: "Jan–Jun 2027", status: "upcoming" },
  { id: 4, name: "Præproduktion", period: "2027", status: "upcoming" },
  { id: 5, name: "Produktion", period: "Jan–Apr 2028", status: "upcoming" },
  { id: 6, name: "Overlevering", period: "2028", status: "upcoming" },
];

export default function ProcessBar() {
  const [expanded, setExpanded] = useState(false);
  const activePhase = PHASES.find((p) => p.status === "active") || PHASES[0];
  const activeIndex = PHASES.indexOf(activePhase);
  const progress = ((activeIndex + 0.5) / PHASES.length) * 100;

  return (
    <div className="process-bar">
      {/* Desktop: show all phases */}
      <div className="process-bar-phases process-bar-desktop">
        {PHASES.map((phase) => (
          <div key={phase.id} className={`process-phase process-phase--${phase.status}`}>
            <div className="process-phase-dot" />
            <div className="process-phase-info">
              <span className="process-phase-name">{phase.name}</span>
              <span className="process-phase-period">{phase.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: show active phase, tap to expand */}
      <div className="process-bar-mobile">
        <button
          className="process-mobile-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="process-mobile-active">
            <div className={`process-phase-dot process-phase--active`}>
              <div className="process-phase-dot" />
            </div>
            <div className="process-mobile-info">
              <span className="process-mobile-label">Fase {activeIndex + 1}/{PHASES.length}</span>
              <span className="process-mobile-name">{activePhase.name}</span>
              <span className="process-mobile-period">{activePhase.period}</span>
            </div>
          </div>
          <svg
            className={`process-mobile-chevron${expanded ? " process-mobile-chevron--open" : ""}`}
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {expanded && (
          <div className="process-mobile-list">
            {PHASES.map((phase, i) => (
              <div key={phase.id} className={`process-mobile-item process-mobile-item--${phase.status}`}>
                <div className="process-mobile-step">
                  <div className={`process-mobile-dot process-mobile-dot--${phase.status}`} />
                  {i < PHASES.length - 1 && (
                    <div className={`process-mobile-line${phase.status === "completed" ? " process-mobile-line--done" : ""}`} />
                  )}
                </div>
                <div className="process-mobile-item-info">
                  <span className="process-mobile-item-name">{phase.name}</span>
                  <span className="process-mobile-item-period">{phase.period}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="process-bar-track">
        <div className="process-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
