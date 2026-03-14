"use client";

import { useState } from "react";

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  color: "olive" | "coral" | "amber";
}

const EVENTS: CalEvent[] = [
  { id: "1", title: "Scenografi-gennemgang", date: "2026-03-14", time: "10:00", color: "olive" },
  { id: "2", title: "Møde med Lena Bjørk", date: "2026-03-17", time: "13:30", color: "coral" },
  { id: "3", title: "Godkendelse af tekster", date: "2026-03-19", time: "09:00", color: "amber" },
  { id: "4", title: "Deadline: Tryksager", date: "2026-03-21", time: "17:00", color: "coral" },
  { id: "5", title: "Vernissage", date: "2026-03-25", time: "14:00", color: "olive" },
];

const WEEKDAYS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

const MONTH_NAMES = [
  "Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-based (Mon=0, Sun=6)
  return day === 0 ? 6 : day - 1;
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarGrid() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  function prevMonth() {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  }

  function nextMonth() {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const daysInPrevMonth = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);

  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // Build event lookup
  const eventsByDate: Record<string, CalEvent[]> = {};
  EVENTS.forEach((e) => {
    if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
    eventsByDate[e.date].push(e);
  });

  // Build calendar cells
  const cells: { day: number; isOther: boolean; dateKey: string }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, isOther: true, dateKey: formatDateKey(y, m, d) });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isOther: false, dateKey: formatDateKey(year, month, d) });
  }

  // Next month leading days
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const m = month === 11 ? 0 : month + 1;
      const y = month === 11 ? year + 1 : year;
      cells.push({ day: d, isOther: true, dateKey: formatDateKey(y, m, d) });
    }
  }

  return (
    <div className="calgrid-section">
      <div className="calgrid-header">
        <h2 className="calgrid-title">{MONTH_NAMES[month]} {year}</h2>
        <div className="calgrid-nav">
          <button className="calgrid-nav-btn" onClick={prevMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="calgrid-nav-btn" onClick={nextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="calgrid-weekdays">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="calgrid-weekday">{wd}</div>
        ))}
      </div>
      <div className="calgrid-days">
        {cells.map((cell, i) => {
          const isToday = cell.dateKey === todayKey;
          const dayEvents = eventsByDate[cell.dateKey] || [];
          return (
            <div
              key={i}
              className={`calgrid-day${cell.isOther ? " calgrid-day--other" : ""}${isToday ? " calgrid-day--today" : ""}`}
            >
              <div className="calgrid-day-num">{cell.day}</div>
              {dayEvents.map((ev) => (
                <span key={ev.id} className={`calgrid-event-pill calgrid-event-pill--${ev.color}`}>
                  {ev.title}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
