export default function TeamOverview() {
  const members = [
    { name: "Marie Holm", role: "Projektleder", online: true },
    { name: "Peter Lund", role: "Arkitekt", online: true },
    { name: "Anna Vest", role: "Grafiker", online: false },
    { name: "Lena Bjørk", role: "Kunstner", online: false },
    { name: "Jeppe Vinum", role: "Digital", online: true },
  ];

  function initials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }

  return (
    <div className="team-section">
      <div className="team-header">
        <h2 className="team-title">Teamoversigt</h2>
      </div>
      <div className="team-list">
        {members.map((m) => (
          <div key={m.name} className="team-item">
            <div className="team-avatar">{initials(m.name)}</div>
            <div className="team-info">
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </div>
            <span className={`team-status ${m.online ? "team-status--online" : "team-status--offline"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
