"use client";

import { Card, CardBody } from "@heroui/react";

const MILESTONES = [
  { id: "m1", label: "Koncept godkendt", date: "Feb 2026", status: "done" as const },
  { id: "m2", label: "Produktion start", date: "Mar 2026", status: "current" as const },
  { id: "m3", label: "Intern review", date: "Apr 2026", status: "upcoming" as const },
  { id: "m4", label: "Kundefernisering", date: "Maj 2026", status: "upcoming" as const },
  { id: "m5", label: "Levering", date: "Jun 2026", status: "upcoming" as const },
];

export default function MilestoneTimeline() {
  return (
    <Card className="mb-3" shadow="none">
      <CardBody className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-default-500 mb-4">Milepæle</div>
        <div className="flex items-start overflow-x-auto max-sm:pb-2">
          {MILESTONES.map((m, i) => (
            <div key={m.id} className="flex items-start flex-1 max-sm:min-w-[100px]">
              {i > 0 && (
                <div
                  className={`w-full h-0.5 mt-[9px] shrink-0 min-w-4 flex-1 ${
                    m.status === "done" || m.status === "current" ? "bg-primary" : "bg-default-300"
                  }`}
                />
              )}
              <div className="flex flex-col items-center min-w-0">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    m.status === "done"
                      ? "bg-primary"
                      : m.status === "current"
                        ? "bg-primary outline-3 outline-[#d2d5c4] outline-offset-2"
                        : "bg-default-200 border-2 border-default-300"
                  }`}
                >
                  {m.status === "done" && (
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[11px] font-medium text-foreground text-center mt-2 max-w-[90px] leading-tight">{m.label}</span>
                <span className="text-[10px] text-default-500 mt-0.5">{m.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
