"use client";

import { useState } from "react";

type TaskStatusType = "done" | "active" | "paused" | "pending";

interface Task {
  id: string;
  name: string;
  status: TaskStatusType;
}

interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
}

const STATUS_LABEL: Record<TaskStatusType, string> = {
  done: "Afsluttet",
  active: "I gang",
  paused: "Pause",
  pending: "Afventer",
};

const DEMO_GROUPS: TaskGroup[] = [
  {
    id: "1",
    name: "Digitale installationer",
    tasks: [
      { id: "1a", name: "Touchscreens sal 1", status: "done" },
      { id: "1b", name: "Projektion nordlys", status: "active" },
      { id: "1c", name: "Lydskulptur", status: "pending" },
    ],
  },
  {
    id: "2",
    name: "Scenografi",
    tasks: [
      { id: "2a", name: "Rumplan sal 1-3", status: "done" },
      { id: "2b", name: "Lyssætning", status: "active" },
      { id: "2c", name: "Møbler og montrer", status: "paused" },
    ],
  },
  {
    id: "3",
    name: "Print",
    tasks: [
      { id: "3a", name: "Plakater", status: "done" },
      { id: "3b", name: "Foldere og invitationer", status: "active" },
      { id: "3c", name: "Vægplancher", status: "pending" },
      { id: "3d", name: "Katalog", status: "pending" },
    ],
  },
  {
    id: "4",
    name: "Kunst og værker",
    tasks: [
      { id: "4a", name: "Lena Bjørk — levering", status: "done" },
      { id: "4b", name: "Ophængning og teknisk", status: "paused" },
    ],
  },
  {
    id: "5",
    name: "Kommunikation",
    tasks: [
      { id: "5a", name: "Pressemeddelelser", status: "done" },
      { id: "5b", name: "SoMe materiale", status: "active" },
      { id: "5c", name: "Vernissage", status: "pending" },
    ],
  },
];

function countByStatus(tasks: Task[]) {
  const done = tasks.filter((t) => t.status === "done").length;
  return `${done}/${tasks.length}`;
}

export default function ProjectFolders() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="folders-section">
      <div className="folders-header">
        <h2 className="folders-title">Projektopgaver</h2>
      </div>
      <div className="folders-list">
        {DEMO_GROUPS.map((group) => {
          const isOpen = openId === group.id;
          return (
            <div key={group.id} className={`folder-item${isOpen ? " folder-item--open" : ""}`}>
              <button
                className="folder-toggle"
                onClick={() => setOpenId(isOpen ? null : group.id)}
              >
                <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span className="folder-name">{group.name}</span>
                <span className="folder-count">{countByStatus(group.tasks)}</span>
                <svg className={`folder-chevron${isOpen ? " folder-chevron--open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="folder-files">
                  {group.tasks.map((task) => (
                    <div key={task.id} className="folder-task">
                      <span className={`folder-task-dot folder-task-dot--${task.status}`} />
                      <span className="folder-file-name">{task.name}</span>
                      <span className={`folder-task-label folder-task-label--${task.status}`}>
                        {STATUS_LABEL[task.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
