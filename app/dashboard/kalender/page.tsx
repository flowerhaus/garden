import CalendarGrid from "@/components/CalendarGrid";

type EventType = "møde" | "workshop" | "deadline" | "gennemgang" | "briefing" | "vernissage";

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
  },
  {
    id: "2",
    title: "Møde med Lena Bjørk",
    description: "Aftale om levering af værker og tekniske krav til ophængning",
    date: "17. mar",
    time: "13:30",
    type: "møde" as EventType,
  },
  {
    id: "3",
    title: "Godkendelse af tekster",
    description: "Kurator fremlægger de endelige tekster til vægplancher og katalog",
    date: "19. mar",
    time: "09:00",
    type: "møde" as EventType,
  },
  {
    id: "4",
    title: "Deadline: Tryksager",
    description: "Plakater, foldere og invitationer skal være klar til produktion",
    date: "21. mar",
    time: "17:00",
    type: "deadline" as EventType,
  },
  {
    id: "5",
    title: "Vernissage",
    description: "Pressen inviteres kl. 14, åbning for gæster kl. 17",
    date: "25. mar",
    time: "14:00",
    type: "vernissage" as EventType,
  },
];

export default function KalenderPage() {
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
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <span className="event-date-day">{event.date.split(".")[0].trim()}</span>
                    <span className="event-date-month">{event.date.split(".")[1]?.trim()}</span>
                  </div>
                  <div className="event-info">
                    <div className="event-title-row">
                      <span className="event-time">{event.time}</span>
                      <span className="event-name">{event.title}</span>
                      <span className={`event-badge event-badge--${event.type}`}>
                        {TYPE_LABELS[event.type]}
                      </span>
                    </div>
                    <span className="event-desc">{event.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
