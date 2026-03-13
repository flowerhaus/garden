"use client";

import { Card, CardBody } from "@heroui/react";

const TEST_DAYS = [
  { day: 22, weekday: "Monday", subject: null, highlight: false },
  { day: 23, weekday: "Tuesday", subject: "Math", highlight: true },
  { day: 24, weekday: "Wednesday", subject: "Art", highlight: true },
  { day: 25, weekday: "Thursday", subject: null, highlight: false },
  { day: 26, weekday: "Friday", subject: null, highlight: false },
];

export default function UpcomingTests() {
  return (
    <Card shadow="none" className="bg-default overflow-hidden">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Upcoming Tests</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-foreground" />
              <span className="text-xs text-foreground/60">Test Day</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/60">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 relative">
          {TEST_DAYS.slice(0, 3).map((d) => (
            <div
              key={d.day}
              className={`rounded-xl p-4 text-center ${
                d.highlight
                  ? "bg-foreground text-white"
                  : "bg-background/50 border border-foreground/10"
              }`}
            >
              <p className={`text-3xl font-light ${d.highlight ? "text-white" : "text-foreground"}`}>{d.day}</p>
              {d.subject && <p className="text-sm mt-1 text-white/80">{d.subject}</p>}
              <p className={`text-xs mt-1 ${d.highlight ? "text-white/60" : "text-foreground/50"}`}>{d.weekday}</p>
            </div>
          ))}
          {/* Second row */}
          <div className="col-span-3 grid grid-cols-3 gap-2 mt-0">
            {TEST_DAYS.slice(3).map((d) => (
              <div
                key={d.day}
                className={`rounded-xl p-4 text-center ${
                  d.highlight
                    ? "bg-foreground text-white"
                    : "bg-background/50 border border-foreground/10"
                }`}
              >
                <p className={`text-3xl font-light ${d.highlight ? "text-white" : "text-foreground"}`}>{d.day}</p>
                {d.subject && <p className="text-sm mt-1 text-white/80">{d.subject}</p>}
                <p className={`text-xs mt-1 ${d.highlight ? "text-white/60" : "text-foreground/50"}`}>{d.weekday}</p>
              </div>
            ))}
            {/* Decorative radial pattern */}
            <div className="rounded-xl bg-background/50 border border-foreground/10 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 45 * Math.cos((i * 10 * Math.PI) / 180)}
                      y2={50 + 45 * Math.sin((i * 10 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
