export default function TaskStatus() {
  const statuses = [
    { label: "Åbne", count: 12, color: "var(--olive)" },
    { label: "I gang", count: 5, color: "var(--status-paused)" },
    { label: "Afsluttede", count: 23, color: "var(--text-muted)" },
  ];

  const total = statuses.reduce((s, r) => s + r.count, 0);
  const completed = statuses[2].count;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="taskstatus-section">
      <div className="taskstatus-header">
        <h2 className="taskstatus-title">Opgavestatus</h2>
      </div>
      <div className="taskstatus-list">
        {statuses.map((s) => (
          <div key={s.label} className="taskstatus-row">
            <span className="taskstatus-dot" style={{ background: s.color }} />
            <span className="taskstatus-label">{s.label}</span>
            <span className="taskstatus-count">{s.count}</span>
          </div>
        ))}
      </div>
      <div className="taskstatus-bar">
        <div className="taskstatus-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="taskstatus-pct">{pct}% afsluttet</span>
    </div>
  );
}
