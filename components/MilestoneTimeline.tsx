const MILESTONES = [
  { id: "m1", label: "Koncept godkendt", date: "Feb 2026", status: "done" as const },
  { id: "m2", label: "Produktion start", date: "Mar 2026", status: "current" as const },
  { id: "m3", label: "Intern review", date: "Apr 2026", status: "upcoming" as const },
  { id: "m4", label: "Kundefernisering", date: "Maj 2026", status: "upcoming" as const },
  { id: "m5", label: "Levering", date: "Jun 2026", status: "upcoming" as const },
];

export default function MilestoneTimeline() {
  return (
    <div className="timeline-section">
      <div className="timeline-title">Milepæle</div>
      <div className="timeline-track">
        {MILESTONES.map((m, i) => (
          <div key={m.id} className="timeline-node">
            {i > 0 && (
              <div
                className={`timeline-connector ${
                  m.status === "done" || m.status === "current" ? "timeline-connector-done" : ""
                }`}
              />
            )}
            <div className="timeline-step">
              <div className={`timeline-dot ${m.status}`}>
                {m.status === "done" && (
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="timeline-step-label">{m.label}</span>
              <span className="timeline-step-date">{m.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
