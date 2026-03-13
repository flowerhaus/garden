"use client";

import { Card, CardBody } from "@heroui/react";

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "review" | "call";
}

const DEMO_APPOINTMENTS: Appointment[] = [
  { id: "1", title: "Statusmøde: Website Redesign", date: "2026-03-14", time: "10:00", type: "meeting" },
  { id: "2", title: "Feedback: Logo udkast v2", date: "2026-03-17", time: "13:30", type: "review" },
  { id: "3", title: "Opkald: E-commerce kravspec", date: "2026-03-19", time: "09:00", type: "call" },
  { id: "4", title: "Deadline: Brand Guidelines", date: "2026-03-21", time: "17:00", type: "deadline" },
  { id: "5", title: "Præsentation: Webshop mockups", date: "2026-03-25", time: "14:00", type: "meeting" },
];

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
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-default-500">Kommende aftaler</span>
          <span className="text-[11px] font-semibold text-default-500">{DEMO_APPOINTMENTS.length}</span>
        </div>
        <div className="flex flex-col">
          {DEMO_APPOINTMENTS.map((apt, i) => (
            <div
              key={apt.id}
              className={`flex items-center gap-3 py-2.5 cursor-pointer group ${
                i < DEMO_APPOINTMENTS.length - 1 ? "border-b border-default-300" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <span className="block text-[13px] font-medium text-foreground truncate transition-colors group-hover:text-primary">
                  {apt.title}
                </span>
                <span className="text-[11px] text-default-500">
                  {formatDate(apt.date)} &middot; {apt.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
