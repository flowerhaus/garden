"use client";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const DEMO_EVENTS: Event[] = [
  {
    id: "1",
    title: "Scenografi-gennemgang",
    description: "Gennemgang af rumplan og placering af installationer i sal 2",
    date: "2026-03-14",
    time: "10:00",
  },
  {
    id: "2",
    title: "Møde med kunstner: Lena Bjørk",
    description: "Aftale om levering af værker og tekniske krav til ophængning",
    date: "2026-03-17",
    time: "13:30",
  },
  {
    id: "3",
    title: "Godkendelse af udstillingstekster",
    description: "Kurator fremlægger de endelige tekster til vægplancher og katalog",
    date: "2026-03-19",
    time: "09:00",
  },
  {
    id: "4",
    title: "Deadline: Tryksager til trykker",
    description: "Plakater, foldere og invitationer skal være klar til produktion",
    date: "2026-03-21",
    time: "17:00",
  },
  {
    id: "5",
    title: "Pressevisning og vernissage",
    description: "Pressen inviteres kl. 14, åbning for gæster kl. 17",
    date: "2026-03-25",
    time: "14:00",
  },
];

function formatDay(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").getDate().toString();
}

function formatWeekday(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return "I dag";
  if (date.getTime() === tomorrow.getTime()) return "I morgen";

  return date.toLocaleDateString("da-DK", { weekday: "long" });
}

function formatMonth(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("da-DK", { month: "short" });
}

export default function UpcomingEvents() {
  return (
    <div className="events-section">
      <div className="events-header">
        <h2 className="events-title">Kommende begivenheder</h2>
        <button className="events-all-btn">Kalender</button>
      </div>
      <div className="events-list">
        {DEMO_EVENTS.slice(0, 3).map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-date">
              <span className="event-date-day">{formatDay(event.date)}</span>
              <span className="event-date-month">{formatMonth(event.date)}</span>
            </div>
            <div className="event-info">
              <div className="event-title-row">
                <span className="event-time">{event.time}</span>
                <span className="event-name">{event.title}</span>
              </div>
              <span className="event-desc">{event.description}</span>
              <span className="event-weekday">{formatWeekday(event.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
