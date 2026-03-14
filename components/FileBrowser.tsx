"use client";

import { useState } from "react";

interface DemoFile {
  id: string;
  name: string;
  category: string;
  size: string;
  date: string;
}

const CATEGORIES = ["Alle", "Dokument", "Billede", "Video", "Lyd", "Præsentation"];

const DEMO_FILES: DemoFile[] = [
  { id: "1", name: "Scenografi_rumplan_v3.pdf", category: "Dokument", size: "2.4 MB", date: "12. mar 2026" },
  { id: "2", name: "Plakat_A2_final.png", category: "Billede", size: "8.1 MB", date: "11. mar 2026" },
  { id: "3", name: "Interview_Lena_Bjork.mp4", category: "Video", size: "142 MB", date: "10. mar 2026" },
  { id: "4", name: "Lydspor_installation.wav", category: "Lyd", size: "34.5 MB", date: "10. mar 2026" },
  { id: "5", name: "Budgetopgorelse_Q1.xlsx", category: "Dokument", size: "156 KB", date: "9. mar 2026" },
  { id: "6", name: "Vernissage_invitation.pdf", category: "Dokument", size: "1.2 MB", date: "8. mar 2026" },
  { id: "7", name: "Sal2_belysning_ref.jpg", category: "Billede", size: "3.7 MB", date: "7. mar 2026" },
  { id: "8", name: "Pressemappe_2026.pptx", category: "Præsentation", size: "12.8 MB", date: "6. mar 2026" },
  { id: "9", name: "Katalog_layout_draft.pdf", category: "Dokument", size: "5.6 MB", date: "5. mar 2026" },
  { id: "10", name: "Moodboard_farver.png", category: "Billede", size: "4.2 MB", date: "4. mar 2026" },
  { id: "11", name: "Timelapse_opbygning.mp4", category: "Video", size: "280 MB", date: "3. mar 2026" },
  { id: "12", name: "Kontaktliste_team.pdf", category: "Dokument", size: "89 KB", date: "2. mar 2026" },
];

export default function FileBrowser() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = DEMO_FILES.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Alle" || f.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="filebrowser-section">
      <div className="filebrowser-header">
        <input
          type="text"
          className="filebrowser-search"
          placeholder="Søg i filer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-tab${activeCategory === cat ? " filter-tab--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <table className="filebrowser-table">
        <thead>
          <tr>
            <th>Filnavn</th>
            <th>Kategori</th>
            <th>Størrelse</th>
            <th>Dato</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((file) => (
            <tr key={file.id}>
              <td>
                <span className="filebrowser-filename">
                  <svg className="filebrowser-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  {file.name}
                </span>
              </td>
              <td><span className="filebrowser-category">{file.category}</span></td>
              <td><span className="filebrowser-size">{file.size}</span></td>
              <td><span className="filebrowser-date">{file.date}</span></td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>
                Ingen filer matcher din søgning
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
