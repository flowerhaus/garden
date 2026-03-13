"use client";

import { Card, CardBody, Button } from "@heroui/react";

const DEMO_LINKS = [
  { id: "ql1", title: "Brand Guidelines PDF", type: "pdf", size: "4.2 MB" },
  { id: "ql2", title: "Logo pakke (.zip)", type: "zip", size: "12.8 MB" },
  { id: "ql3", title: "Website mockups (Figma)", type: "figma", size: "Link" },
  { id: "ql4", title: "Intro-video (MP4)", type: "video", size: "82 MB" },
  { id: "ql5", title: "Fotopakke (.zip)", type: "zip", size: "210 MB" },
];

const TYPE_ICONS: Record<string, string> = {
  pdf: "PDF",
  zip: "ZIP",
  figma: "FIG",
  video: "MP4",
};

export default function QuickLinks() {
  return (
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-default-500">Leverancer</span>
          <span className="text-[11px] font-semibold text-default-500">{DEMO_LINKS.length} filer</span>
        </div>
        <div className="flex flex-col">
          {DEMO_LINKS.map((link, i) => (
            <div key={link.id} className={`flex items-center gap-2.5 py-2 ${i < DEMO_LINKS.length - 1 ? "border-b border-default-300" : ""}`}>
              <div className="w-9 h-7 rounded bg-[#d2d5c4] text-primary text-[9px] font-extrabold tracking-tight flex items-center justify-center shrink-0">
                {TYPE_ICONS[link.type] || "FIL"}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[13px] font-medium text-foreground truncate">{link.title}</span>
                <span className="text-[11px] text-default-500">{link.size}</span>
              </div>
              <Button
                as="a"
                href="#"
                size="sm"
                variant="bordered"
                radius="full"
                className="text-[11px] font-semibold text-primary border-default-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {link.type === "figma" ? "Åbn" : "Hent"}
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
