"use client";

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "review" | "call";
}

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    title: "Statusmøde: Website Redesign",
    date: "2026-03-14",
    time: "10:00",
    type: "meeting",
  },
  {
    id: "2",
    title: "Feedback: Logo udkast v2",
    date: "2026-03-17",
    time: "13:30",
    type: "review",
  },
  {
    id: "3",
    title: "Opkald: E-commerce kravspec",
    date: "2026-03-19",
    time: "09:00",
    type: "call",
  },
  {
    id: "4",
    title: "Deadline: Brand Guidelines",
    date: "2026-03-21",
    time: "17:00",
    type: "deadline",
  },
  {
    id: "5",
    title: "Præsentation: Webshop mockups",
    date: "2026-03-25",
    time: "14:00",
    type: "meeting",
  },
];

const typeIcons: Record<string, string> = {
  meeting: "\u{1F4CB}",
  deadline: "\u{23F0}",
  review: "\u{1F50D}",
  call: "\u{1F4DE}",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return "I dag";
  if (date.getTime() === tomorrow.getTime()) return "I morgen";

  return date.toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function Calendar() {
  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <div>
          <h2 className="calendar-title">
            Kommende
            <strong>Aftaler</strong>
          </h2>
        </div>
        <span className="calendar-count">{DEMO_APPOINTMENTS.length}</span>
      </div>
      <div className="calendar-list">
        {DEMO_APPOINTMENTS.map((apt) => (
          <div key={apt.id} className="calendar-item">
            <div className={`calendar-item-icon ${apt.type}`}>
              {typeIcons[apt.type]}
            </div>
            <div className="calendar-item-content">
              <span className="calendar-item-title">{apt.title}</span>
              <span className="calendar-item-meta">
                {formatDate(apt.date)} &middot; {apt.time}
              </span>
            </div>
            <div className="calendar-item-arrow">&rsaquo;</div>
          </div>
        ))}
      </div>
    </div>
  );
}
