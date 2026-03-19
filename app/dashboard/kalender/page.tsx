"use client";

import { useState, useEffect } from "react";
import CalendarGrid from "@/components/CalendarGrid";

type EventType = "møde" | "workshop" | "deadline" | "gennemgang" | "briefing" | "vernissage";

interface EventDoc {
  name: string;
  url: string;
}

const TYPE_LABELS: Record<EventType, string> = {
  møde: "Møde",
  workshop: "Workshop",
  deadline: "Deadline",
  gennemgang: "Gennemgang",
  briefing: "Briefing",
  vernissage: "Vernissage",
};

const EVENTS = [
  {
    id: "1",
    title: "Scenografi-gennemgang",
    description: "Gennemgang af rumplan og placering af installationer i sal 2",
    date: "14. mar",
    time: "10:00",
    type: "gennemgang" as EventType,
    location: "Sal 2, Kunsthal Charlottenborg",
    brief: "Vi gennemgår den opdaterede rumplan med fokus på placering af de tre hovedinstallationer. Medbring printede plantegninger. Scenograf Anders deltager virtuelt.",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    documents: [
      { name: "Rumplan_v3.pdf", url: "#" },
      { name: "Installationsoversigt.xlsx", url: "#" },
    ] as EventDoc[],
  },
  {
    id: "2",
    title: "Møde med Lena Bjørk",
    description: "Aftale om levering af værker og tekniske krav til ophængning",
    date: "17. mar",
    time: "13:30",
    type: "møde" as EventType,
    location: "Mødelokale 3, Kunsthal Charlottenborg",
    brief: "Lena præsenterer de endelige værker og vi aftaler tekniske krav til ophængning, lyssætning og sikring. Hun medbringer materialeprøver.",
    documents: [
      { name: "Tekniske_krav_Bjørk.pdf", url: "#" },
    ] as EventDoc[],
  },
  {
    id: "3",
    title: "Godkendelse af tekster",
    description: "Kurator fremlægger de endelige tekster til vægplancher og katalog",
    date: "19. mar",
    time: "09:00",
    type: "møde" as EventType,
    location: "Online",
    meetingLink: "https://meet.google.com/xyz-abcd-efg",
    brief: "Kurator Maria fremlægger de endelige vægplancher og katalogtekster til godkendelse. Alle kommentarer skal være indsendt senest dagen før.",
    documents: [
      { name: "Vægplancher_final.pdf", url: "#" },
      { name: "Katalogtekst_udkast.docx", url: "#" },
    ] as EventDoc[],
  },
  {
    id: "4",
    title: "Deadline: Tryksager",
    description: "Plakater, foldere og invitationer skal være klar til produktion",
    date: "21. mar",
    time: "17:00",
    type: "deadline" as EventType,
    brief: "Alt trykmateriale skal være godkendt og sendt til trykkeriet inden kl. 17. Kontakt grafiker Sofie ved spørgsmål.",
    documents: [
      { name: "Plakat_A2_final.pdf", url: "#" },
      { name: "Folder_trykklar.pdf", url: "#" },
      { name: "Invitation_digital.pdf", url: "#" },
    ] as EventDoc[],
  },
  {
    id: "5",
    title: "Vernissage",
    description: "Pressen inviteres kl. 14, åbning for gæster kl. 17",
    date: "25. mar",
    time: "14:00",
    type: "vernissage" as EventType,
    location: "Kunsthal Charlottenborg, Store Sal",
    brief: "Kl. 14–16: Pressevisning med rundvisning af kurator. Kl. 17: Officiel åbning med tale af direktør. Kl. 17.30: Fri adgang for inviterede gæster. Catering er bestilt hos Meyers.",
    documents: [
      { name: "Pressemeddelelse.pdf", url: "#" },
      { name: "Gæsteliste.xlsx", url: "#" },
    ] as EventDoc[],
  },
];

export default function KalenderPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openEvent = EVENTS.find((e) => e.id === openId);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Kalender</h1>
        <p className="page-subtitle">Begivenheder og deadlines for projektet</p>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <CalendarGrid />
        </div>
        <div className="dashboard-sidebar">
          <div className="events-section">
            <div className="events-header">
              <h2 className="events-title">Alle begivenheder</h2>
            </div>
            <div className="events-list">
              {EVENTS.map((event) => (
                <div key={event.id} className="event-item event-item--clickable" onClick={() => setOpenId(event.id)}>
                  <div className="event-date">
                    <span className="event-date-day">{event.date.split(".")[0].trim()}</span>
                    <span className="event-date-month">{event.date.split(".")[1]?.trim()}</span>
                  </div>
                  <div className="event-info">
                    <div className="event-title-row">
                      <span className="event-time">{event.time}</span>
                      <span className="event-name">{event.title}</span>
                    </div>
                    <span className="event-desc">{event.description}</span>
                    <div className="event-bottom-row">
                      <span className={`event-badge event-badge--sm event-badge--${event.type}`}>
                        {TYPE_LABELS[event.type]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openEvent && (
        <div className="event-overlay" onClick={() => setOpenId(null)}>
          <div className="event-detail" onClick={(e) => e.stopPropagation()}>
            <div className="event-detail-header">
              <div>
                <div className="event-detail-title-row">
                  <h3 className="event-detail-title">{openEvent.title}</h3>
                  <span className={`event-badge event-badge--${openEvent.type}`}>
                    {TYPE_LABELS[openEvent.type]}
                  </span>
                </div>
                <span className="event-detail-meta">
                  {openEvent.date} &middot; kl. {openEvent.time}
                </span>
              </div>
              <button className="event-detail-close" onClick={() => setOpenId(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {openEvent.location && (
              <div className="event-detail-field">
                <span className="event-detail-label">Lokation</span>
                <span className="event-detail-value">{openEvent.location}</span>
              </div>
            )}

            {openEvent.meetingLink && (
              <div className="event-detail-field">
                <span className="event-detail-label">Online møde</span>
                <a className="event-detail-link" href={openEvent.meetingLink} target="_blank" rel="noopener noreferrer">
                  Deltag i mødet
                </a>
              </div>
            )}

            {openEvent.brief && (
              <div className="event-detail-field">
                <span className="event-detail-label">Brief</span>
                <p className="event-detail-brief">{openEvent.brief}</p>
              </div>
            )}

            {openEvent.documents && openEvent.documents.length > 0 && (
              <div className="event-detail-field">
                <span className="event-detail-label">Dokumenter</span>
                <div className="event-detail-docs">
                  {openEvent.documents.map((doc, i) => (
                    <a key={i} className="event-detail-doc" href={doc.url}>
                      <svg className="event-detail-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
