"use client";

import { useState, useEffect } from "react";

interface Note {
  id: string;
  text: string;
  author: string;
  date: string;
  body?: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    text: "Husk: Leverandørmøde torsdag kl. 10",
    author: "Marie",
    date: "14. mar",
    body: "Mødet handler om levering af materialer til sal 2. Husk at medbringe den opdaterede tidsplan og budgetoversigten. Leverandøren vil gerne gennemgå logistik for de store installationer.",
  },
  {
    id: "2",
    text: "Printfiler klar til gennemsyn i Drive",
    author: "Anna",
    date: "13. mar",
    body: "Alle printfiler til plakater og foldere ligger nu i den delte Drive-mappe under Tryksager. Gennemse venligst inden fredag, så vi kan nå deadline hos trykkeriet.",
  },
  {
    id: "3",
    text: "Ny tidsplan sendt på mail",
    author: "Peter",
    date: "12. mar",
    body: "Den opdaterede tidsplan for de sidste to uger inden vernissagen er sendt til alle. Vigtigste ændring: godkendelse af tekster er rykket til onsdag.",
  },
  {
    id: "4",
    text: "Belysningsplan godkendt af scenograf",
    author: "Marie",
    date: "11. mar",
    body: "Anders har godkendt belysningsplanen for sal 2. Vi kan nu bestille de ekstra spots fra leverandøren. Kontakt Jeppe for bestilling.",
  },
  {
    id: "5",
    text: "Catering til vernissage er bestilt",
    author: "Anna",
    date: "10. mar",
    body: "Meyers leverer catering til vernissagen den 25. marts. Menu: finger food og bobler til 120 gæster. Faktura er sendt til økonomi.",
  },
  {
    id: "6",
    text: "Kunsttransport bekræftet",
    author: "Peter",
    date: "9. mar",
    body: "Transportfirmaet har bekræftet afhentning af Lena Bjørks værker den 22. marts kl. 8. Kræver to mand til aflæsning. Koordiner med vagten.",
  },
];

function formatDate(): string {
  const d = new Date();
  return d.toLocaleDateString("da-DK", { day: "numeric", month: "short" });
}

export default function OpslagstavlePage() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newBody, setNewBody] = useState("");

  const openNote = notes.find((n) => n.id === openId);

  useEffect(() => {
    if (!openId && !adding) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setAdding(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, adding]);

  function handleAdd() {
    if (!newText.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text: newText.trim(),
      author: "Dig",
      date: formatDate(),
      body: newBody.trim() || undefined,
    };
    setNotes((prev) => [note, ...prev]);
    setNewText("");
    setNewBody("");
    setAdding(false);
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Opslagstavle</h1>
          <p className="page-subtitle">Beskeder og opslag fra teamet</p>
        </div>
        <button className="opslagstavle-add-btn" onClick={() => setAdding(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nyt opslag
        </button>
      </div>

      <div className="opslagstavle-grid">
        {notes.map((n) => (
          <div key={n.id} className="opslagstavle-card" onClick={() => setOpenId(n.id)}>
            <span className="opslagstavle-card-text">{n.text}</span>
            {n.body && <span className="opslagstavle-card-body">{n.body}</span>}
            <span className="opslagstavle-card-meta">{n.author} &middot; {n.date}</span>
          </div>
        ))}
      </div>

      {openNote && (
        <div className="notes-overlay" onClick={() => setOpenId(null)}>
          <div className="notes-detail" onClick={(e) => e.stopPropagation()}>
            <div className="notes-detail-header">
              <h3 className="notes-detail-title">{openNote.text}</h3>
              <button className="notes-detail-close" onClick={() => setOpenId(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <span className="notes-detail-meta">{openNote.author} &middot; {openNote.date}</span>
            {openNote.body && (
              <p className="notes-detail-body">{openNote.body}</p>
            )}
          </div>
        </div>
      )}

      {adding && (
        <div className="notes-overlay" onClick={() => setAdding(false)}>
          <div className="notes-detail" onClick={(e) => e.stopPropagation()}>
            <div className="notes-detail-header">
              <h3 className="notes-detail-title">Nyt opslag</h3>
              <button className="notes-detail-close" onClick={() => setAdding(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="notes-form">
              <input
                className="notes-form-input"
                type="text"
                placeholder="Overskrift..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                autoFocus
              />
              <textarea
                className="notes-form-textarea"
                placeholder="Beskrivelse (valgfrit)..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={4}
              />
              <button
                className="notes-form-submit"
                onClick={handleAdd}
                disabled={!newText.trim()}
              >
                Opret opslag
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
