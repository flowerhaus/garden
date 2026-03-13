const DEMO_LINKS = [
  { id: "ql1", title: "Brand Guidelines PDF", type: "pdf", size: "4.2 MB" },
  { id: "ql2", title: "Logo pakke (.zip)", type: "zip", size: "12.8 MB" },
  { id: "ql3", title: "Website mockups (Figma)", type: "figma", size: "Link" },
  { id: "ql4", title: "Intro-video (MP4)", type: "video", size: "82 MB" },
  { id: "ql5", title: "Fotopakke (.zip)", type: "zip", size: "210 MB" },
];

const TYPE_ICONS: Record<string, string> = {
  pdf: "PDF",
  zip: "ZIP",
  figma: "FIG",
  video: "MP4",
};

export default function QuickLinks() {
  return (
    <div className="quicklinks-section">
      <div className="quicklinks-header">
        <span className="quicklinks-title">Leverancer</span>
        <span className="quicklinks-count">{DEMO_LINKS.length} filer</span>
      </div>
      <div className="quicklinks-list">
        {DEMO_LINKS.map((link) => (
          <div key={link.id} className="quicklinks-item">
            <div className="quicklinks-item-icon">
              {TYPE_ICONS[link.type] || "FIL"}
            </div>
            <div className="quicklinks-item-info">
              <span className="quicklinks-item-name">{link.title}</span>
              <span className="quicklinks-item-meta">{link.size}</span>
            </div>
            <a href="#" className="quicklinks-item-btn">
              {link.type === "figma" ? "Åbn" : "Hent"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
