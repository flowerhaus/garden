const DEMO_ITEMS = [
  { id: "mb1", title: "Logo koncept A", category: "Branding", seed: "logo-a" },
  { id: "mb2", title: "Logo koncept B", category: "Branding", seed: "logo-b" },
  { id: "mb3", title: "Forside mockup", category: "Webdesign", seed: "homepage" },
  { id: "mb4", title: "Produktside layout", category: "Webdesign", seed: "product" },
  { id: "mb5", title: "Farvepalet udkast", category: "Farver", seed: "colors" },
  { id: "mb6", title: "Typografi oversigt", category: "Branding", seed: "typo" },
];

export default function Moodboard() {
  return (
    <div className="moodboard-section">
      <div className="moodboard-header">
        <span className="moodboard-title">Moodboard</span>
        <span className="moodboard-count">{DEMO_ITEMS.length} udkast</span>
      </div>
      <div className="moodboard-grid">
        {DEMO_ITEMS.map((item) => (
          <div key={item.id} className="moodboard-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="moodboard-img"
              src={`https://picsum.photos/seed/${item.seed}/400/300`}
              alt={item.title}
              loading="lazy"
            />
            <div className="moodboard-item-info">
              <span className="moodboard-label">{item.title}</span>
              <span className="moodboard-category">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
