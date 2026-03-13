"use client";

import { Card, CardBody, Button } from "@heroui/react";

const GRADES = ["A", "B", "C", "D", "E", "F"];
const DAYS = [
  { label: "Mon 22", heights: [85, 70] },
  { label: "Tue 23", heights: [75, 55] },
  { label: "Wed 24", heights: [90, 80] },
  { label: "Thu 25", heights: [65, 50] },
  { label: "Fri 26", heights: [80, 65] },
];

export default function AverageGPA() {
  return (
    <Card shadow="none" className="bg-default">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Average GPA</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/50">&lsaquo; Previous week</span>
            <span className="text-xs text-foreground/50">&lsaquo; Previous week</span>
            <Button size="sm" variant="bordered" radius="full" className="text-xs h-7 border-foreground/20">
              January <span className="ml-1">&#8964;</span>
            </Button>
          </div>
        </div>
        <div className="flex gap-0">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pr-3 py-1 text-xs text-foreground/40 shrink-0" style={{ height: 180 }}>
            {GRADES.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
          {/* Bars */}
          <div className="flex-1 flex items-end justify-between gap-3" style={{ height: 180 }}>
            {DAYS.map((day) => (
              <div key={day.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-1 w-full justify-center" style={{ height: 160 }}>
                  {day.heights.map((h, i) => (
                    <div
                      key={i}
                      className="w-5 bg-foreground/80 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-foreground/50 mt-1">{day.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
