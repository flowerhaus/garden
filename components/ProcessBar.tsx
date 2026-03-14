"use client";

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
  return (
    <div className="process-bar">
      <div className="process-bar-phases">
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
      <div className="process-bar-track">
        <div className="process-bar-fill" />
      </div>
    </div>
  );
}
