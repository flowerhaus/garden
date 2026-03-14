export default function QuickLinks() {
  const links = [
    { name: "Google Drive", desc: "Fælles filer", badge: "GD" },
    { name: "Notion", desc: "Projektplan", badge: "N" },
    { name: "Figma", desc: "Designfiler", badge: "F" },
    { name: "Leverandørliste", desc: "Kontakter", badge: "LV" },
  ];

  return (
    <div className="links-section">
      <div className="links-header">
        <h2 className="links-title">Links & Ressourcer</h2>
      </div>
      <div className="links-list">
        {links.map((l) => (
          <div key={l.name} className="links-item">
            <span className="links-badge">{l.badge}</span>
            <div className="links-info">
              <span className="links-name">{l.name}</span>
              <span className="links-desc">{l.desc}</span>
            </div>
            <a href="#" className="links-btn">Åbn</a>
          </div>
        ))}
      </div>
    </div>
  );
}
