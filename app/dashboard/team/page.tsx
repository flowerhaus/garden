"use client";

const TEAM = [
  {
    id: "1",
    name: "Sofie Lindgren",
    initials: "SL",
    role: "Projektleder",
    status: "online" as const,
    focus: "Scenografi-gennemgang",
    email: "sofie@flowerhaus.dk",
    phone: "+45 28 91 44 02",
    tasksActive: 4,
    tasksDone: 12,
    tasksPending: 2,
  },
  {
    id: "2",
    name: "Mikkel Brandt",
    initials: "MB",
    role: "Kreativ Direktør",
    status: "online" as const,
    focus: "Lyssætning sal 2",
    email: "mikkel@flowerhaus.dk",
    phone: "+45 30 12 77 85",
    tasksActive: 3,
    tasksDone: 8,
    tasksPending: 1,
  },
  {
    id: "3",
    name: "Anna Kjær",
    initials: "AK",
    role: "Grafiker",
    status: "online" as const,
    focus: "Plakatdesign v3",
    email: "anna@flowerhaus.dk",
    phone: "+45 22 56 33 10",
    tasksActive: 2,
    tasksDone: 15,
    tasksPending: 3,
  },
  {
    id: "4",
    name: "Jonas Holm",
    initials: "JH",
    role: "Tekniker",
    status: "offline" as const,
    focus: "Touchscreen opsætning",
    email: "jonas@flowerhaus.dk",
    phone: "+45 40 88 12 63",
    tasksActive: 1,
    tasksDone: 6,
    tasksPending: 4,
  },
  {
    id: "5",
    name: "Line Vestergaard",
    initials: "LV",
    role: "Kurator",
    status: "online" as const,
    focus: "Udstillingstekster",
    email: "line@flowerhaus.dk",
    phone: "+45 51 23 90 47",
    tasksActive: 2,
    tasksDone: 9,
    tasksPending: 1,
  },
  {
    id: "6",
    name: "Rasmus Dahl",
    initials: "RD",
    role: "Kommunikation",
    status: "offline" as const,
    focus: "Pressemeddelelse",
    email: "rasmus@flowerhaus.dk",
    phone: "+45 61 44 28 09",
    tasksActive: 1,
    tasksDone: 5,
    tasksPending: 2,
  },
];

export default function TeamPage() {
  const online = TEAM.filter((m) => m.status === "online").length;
  const totalActive = TEAM.reduce((s, m) => s + m.tasksActive, 0);
  const totalDone = TEAM.reduce((s, m) => s + m.tasksDone, 0);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Team</h1>
        <p className="page-subtitle">Teammedlemmer, roller og opgavestatus</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{TEAM.length}</span>
          <span className="stat-label">Medlemmer</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{online}</span>
          <span className="stat-label">Online nu</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalActive}</span>
          <span className="stat-label">Aktive opgaver</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalDone}</span>
          <span className="stat-label">Afsluttede</span>
        </div>
      </div>
      <div className="teampage-grid" style={{ paddingBottom: 100 }}>
        {TEAM.map((member) => (
          <div key={member.id} className="teampage-card">
            <div className="teampage-card-top">
              <div className="teampage-avatar">{member.initials}</div>
              <div>
                <div className="teampage-name">{member.name}</div>
                <div className="teampage-role">{member.role}</div>
              </div>
              <span className={`teampage-status-dot teampage-status-dot--${member.status}`} />
            </div>
            <div className="teampage-details">
              <div className="teampage-detail-row">
                <svg className="teampage-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Fokus: {member.focus}</span>
              </div>
              <div className="teampage-detail-row">
                <svg className="teampage-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{member.email}</span>
              </div>
              <div className="teampage-detail-row">
                <svg className="teampage-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{member.phone}</span>
              </div>
            </div>
            <div className="teampage-task-stats">
              <div className="teampage-task-stat">
                <span className="teampage-task-num">{member.tasksActive}</span>
                <span className="teampage-task-label">I gang</span>
              </div>
              <div className="teampage-task-stat">
                <span className="teampage-task-num">{member.tasksDone}</span>
                <span className="teampage-task-label">Afsluttet</span>
              </div>
              <div className="teampage-task-stat">
                <span className="teampage-task-num">{member.tasksPending}</span>
                <span className="teampage-task-label">Afventer</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
