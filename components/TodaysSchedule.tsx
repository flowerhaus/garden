"use client";

import { Card, CardBody } from "@heroui/react";

const SCHEDULE = [
  { time: "8:45 AM - 10:10 AM", subject: "English Language Arts" },
  { time: "10:13 AM - 10:54 AM", subject: "Physical Education" },
  { time: "10:57 AM - 11:37 AM", subject: "Mathematics" },
  { time: "11:40 AM - 12:20 PM", subject: "Lunch & Advisory" },
  { time: "12:23 PM - 1:03 PM", subject: "Enrichment" },
  { time: "1:06 AM - 1:47 AM", subject: "Science" },
];

export default function TodaysSchedule() {
  return (
    <Card shadow="none" className="bg-default">
      <CardBody className="p-6">
        <h2 className="text-lg font-semibold mb-5">Today&apos;s Schedule</h2>
        <div className="flex flex-col">
          {SCHEDULE.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-3 ${
                i < SCHEDULE.length - 1 ? "border-b border-foreground/8" : ""
              }`}
            >
              <span className="text-xs text-foreground/50 w-[140px] shrink-0">{item.time}</span>
              <span className="text-sm font-medium text-right">{item.subject}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
