const DEMO_PROJECTS = [
  { id: "b1", name: "Brand Identity", status: "green" as const, note: "På skema" },
  { id: "b2", name: "Website Redesign", status: "green" as const, note: "Kører fint" },
  { id: "b3", name: "E-commerce Platform", status: "yellow" as const, note: "Afventer feedback" },
  { id: "b4", name: "Social Media Strategi", status: "red" as const, note: "Forsinkelse" },
  { id: "b5", name: "Content Plan Q2", status: "green" as const, note: "På skema" },
];

export default function StatusBarometer() {
  return (
    <div className="barometer-section">
      <div className="barometer-title">Projektstatus</div>
      <div className="barometer-list">
        {DEMO_PROJECTS.map((p) => (
          <div key={p.id} className="barometer-item">
            <div className={`barometer-dot ${p.status}`} />
            <div className="barometer-item-info">
              <span className="barometer-item-name">{p.name}</span>
              <span className="barometer-item-note">{p.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
