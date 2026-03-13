"use client";

import { Card, CardBody } from "@heroui/react";

const DEMO_PROJECTS = [
  { id: "b1", name: "Brand Identity", status: "green" as const, note: "På skema" },
  { id: "b2", name: "Website Redesign", status: "green" as const, note: "Kører fint" },
  { id: "b3", name: "E-commerce Platform", status: "yellow" as const, note: "Afventer feedback" },
  { id: "b4", name: "Social Media Strategi", status: "red" as const, note: "Forsinkelse" },
  { id: "b5", name: "Content Plan Q2", status: "green" as const, note: "På skema" },
];

const dotColors: Record<string, string> = {
  green: "bg-primary",
  yellow: "bg-warning",
  red: "bg-danger",
};

export default function StatusBarometer() {
  return (
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-default-500 mb-3.5">Projektstatus</div>
        <div className="flex flex-col">
          {DEMO_PROJECTS.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-3 py-2.5 ${i < DEMO_PROJECTS.length - 1 ? "border-b border-default-300" : ""}`}>
              <div className={`w-3 h-3 rounded-full shrink-0 ${dotColors[p.status]}`} />
              <div className="flex-1 min-w-0">
                <span className="block text-[13px] font-medium text-foreground">{p.name}</span>
                <span className="block text-[11px] text-default-500">{p.note}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
