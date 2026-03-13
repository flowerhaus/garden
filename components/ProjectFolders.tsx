"use client";

import { useState } from "react";
import { Card, CardBody, Chip } from "@heroui/react";

interface ProjectItem {
  id: string;
  title: string;
  status: "active" | "paused" | "completed";
  updated: string;
}

interface Folder {
  id: string;
  name: string;
  icon: string;
  projects: ProjectItem[];
}

const DEMO_FOLDERS: Folder[] = [
  {
    id: "1",
    name: "Branding",
    icon: "\u{1F3A8}",
    projects: [
      { id: "p1", title: "Brand Identity", status: "active", updated: "11. mar" },
      { id: "p2", title: "Logo Design v2", status: "active", updated: "10. mar" },
      { id: "p3", title: "Brand Guidelines", status: "paused", updated: "28. feb" },
    ],
  },
  {
    id: "2",
    name: "Web",
    icon: "\u{1F310}",
    projects: [
      { id: "p4", title: "Website Redesign", status: "active", updated: "12. mar" },
      { id: "p5", title: "E-commerce Platform", status: "active", updated: "10. mar" },
      { id: "p6", title: "SEO Optimering", status: "completed", updated: "15. feb" },
    ],
  },
  {
    id: "3",
    name: "Marketing",
    icon: "\u{1F4E3}",
    projects: [
      { id: "p7", title: "Social Media Strategi", status: "paused", updated: "28. feb" },
      { id: "p8", title: "Content Plan Q2", status: "active", updated: "9. mar" },
    ],
  },
  {
    id: "4",
    name: "Foto & Video",
    icon: "\u{1F4F7}",
    projects: [
      { id: "p9", title: "Fotoshoot Produkter", status: "completed", updated: "22. jan" },
      { id: "p10", title: "Video Testimonials", status: "active", updated: "7. mar" },
    ],
  },
];

const statusLabels: Record<string, string> = {
  active: "Aktiv",
  paused: "På pause",
  completed: "Afsluttet",
};

const statusColors: Record<string, "success" | "warning" | "default"> = {
  active: "success",
  paused: "warning",
  completed: "default",
};

export default function ProjectFolders() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  return (
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-default-500 mb-3.5">Projektmapper</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-sm:grid-cols-1 gap-2">
          {DEMO_FOLDERS.map((folder) => (
            <div key={folder.id} className="flex flex-col">
              <button
                className={`flex items-center gap-3 px-3.5 py-3 rounded-medium border border-default-300 text-left w-full transition-colors hover:border-primary ${
                  openFolder === folder.id ? "border-primary rounded-b-none border-b-transparent" : ""
                }`}
                onClick={() => setOpenFolder(openFolder === folder.id ? null : folder.id)}
              >
                <span className="text-base shrink-0">{folder.icon}</span>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-foreground">{folder.name}</span>
                  <span className="text-[11px] text-default-500">
                    {folder.projects.length} projekt{folder.projects.length !== 1 ? "er" : ""}
                  </span>
                </div>
                <span className="text-xs text-default-500">{openFolder === folder.id ? "\u25B4" : "\u25BE"}</span>
              </button>
              {openFolder === folder.id && (
                <div className="border border-primary border-t-0 rounded-b-medium px-3.5 py-1 pb-2">
                  {folder.projects.map((project, i) => (
                    <div
                      key={project.id}
                      className={`flex items-center justify-between gap-3 py-2 ${
                        i < folder.projects.length - 1 ? "border-b border-default-300" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block text-[13px] font-medium text-foreground">{project.title}</span>
                        <span className="text-[11px] text-default-500">{project.updated}</span>
                      </div>
                      <Chip size="sm" variant="flat" color={statusColors[project.status]} className="text-[10px] font-semibold uppercase tracking-wider">
                        {statusLabels[project.status]}
                      </Chip>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
