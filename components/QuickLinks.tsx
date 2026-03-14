const LINKS = [
  { name: "Google Drive", desc: "Fælles filer", color: "#4285F4" },
  { name: "Notion", desc: "Projektplan", color: "#191919" },
  { name: "Figma", desc: "Designfiler", color: "#A259FF" },
  { name: "Leverandørliste", desc: "Kontakter", color: "#5a6b4a" },
];

export default function QuickLinks() {
  return (
    <div className="links-section">
      <div className="links-header">
        <h2 className="links-title">Links & Ressourcer</h2>
      </div>
      <div className="links-list">
        {LINKS.map((l) => (
          <div key={l.name} className="links-item">
            <span className="links-dot" style={{ background: l.color }} />
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
