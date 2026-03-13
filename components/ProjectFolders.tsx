"use client";

import { useState } from "react";

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

export default function ProjectFolders() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  return (
    <div className="folders-section">
      <div className="folders-header">
        <h2 className="folders-title">
          Projekt
          <strong>Mapper</strong>
        </h2>
      </div>
      <div className="folders-grid">
        {DEMO_FOLDERS.map((folder) => (
          <div key={folder.id} className="folder-card-wrapper">
            <button
              className={`folder-card ${openFolder === folder.id ? "folder-card-open" : ""}`}
              onClick={() =>
                setOpenFolder(openFolder === folder.id ? null : folder.id)
              }
            >
              <div className="folder-card-icon">{folder.icon}</div>
              <div className="folder-card-info">
                <span className="folder-card-name">{folder.name}</span>
                <span className="folder-card-count">
                  {folder.projects.length} projekt
                  {folder.projects.length !== 1 ? "er" : ""}
                </span>
              </div>
              <div className="folder-card-chevron">
                {openFolder === folder.id ? "\u25B4" : "\u25BE"}
              </div>
            </button>
            {openFolder === folder.id && (
              <div className="folder-projects">
                {folder.projects.map((project) => (
                  <div key={project.id} className="folder-project-row">
                    <div className="folder-project-info">
                      <span className="folder-project-title">
                        {project.title}
                      </span>
                      <span className="folder-project-date">
                        {project.updated}
                      </span>
                    </div>
                    <span className={`status-badge ${project.status}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
