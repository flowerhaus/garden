"use client";

import { useState } from "react";

type TaskStatusType = "done" | "active" | "paused" | "pending";

interface Task {
  id: string;
  name: string;
  status: TaskStatusType;
}

interface SubGroup {
  id: string;
  name: string;
  tasks: Task[];
}

interface TaskItem {
  type: "task";
  task: Task;
}

interface SubGroupItem {
  type: "subgroup";
  subgroup: SubGroup;
}

type GroupChild = TaskItem | SubGroupItem;

interface TaskGroup {
  id: string;
  name: string;
  children: GroupChild[];
}

const STATUS_LABEL: Record<TaskStatusType, string> = {
  done: "Afsluttet",
  active: "I gang",
  paused: "Pause",
  pending: "Afventer",
};

function allTasks(children: GroupChild[]): Task[] {
  return children.flatMap((c) =>
    c.type === "task" ? [c.task] : c.subgroup.tasks
  );
}

function countDone(tasks: Task[]) {
  return tasks.filter((t) => t.status === "done").length;
}

const DEMO_GROUPS: TaskGroup[] = [
  {
    id: "1",
    name: "Digitale installationer",
    children: [
      {
        type: "subgroup",
        subgroup: {
          id: "1s1",
          name: "Touchscreens sal 1",
          tasks: [
            { id: "1a", name: "Hardware-opsætning", status: "done" },
            { id: "1b", name: "Software-installation", status: "done" },
            { id: "1c", name: "Indholdsproduktion", status: "active" },
            { id: "1d", name: "Test med besøgende", status: "pending" },
          ],
        },
      },
      { type: "task", task: { id: "1e", name: "Projektion nordlys", status: "active" } },
      { type: "task", task: { id: "1f", name: "Lydskulptur", status: "pending" } },
    ],
  },
  {
    id: "2",
    name: "Scenografi",
    children: [
      { type: "task", task: { id: "2a", name: "Rumplan sal 1-3", status: "done" } },
      { type: "task", task: { id: "2b", name: "Lyssætning", status: "active" } },
      { type: "task", task: { id: "2c", name: "Møbler og montrer", status: "paused" } },
    ],
  },
  {
    id: "3",
    name: "Print",
    children: [
      { type: "task", task: { id: "3a", name: "Plakater", status: "done" } },
      { type: "task", task: { id: "3b", name: "Foldere og invitationer", status: "active" } },
      { type: "task", task: { id: "3c", name: "Vægplancher", status: "pending" } },
      { type: "task", task: { id: "3d", name: "Katalog", status: "pending" } },
    ],
  },
  {
    id: "4",
    name: "Kunst og værker",
    children: [
      { type: "task", task: { id: "4a", name: "Lena Bjørk — levering", status: "done" } },
      { type: "task", task: { id: "4b", name: "Ophængning og teknisk", status: "paused" } },
    ],
  },
  {
    id: "5",
    name: "Kommunikation",
    children: [
      { type: "task", task: { id: "5a", name: "Pressemeddelelser", status: "done" } },
      { type: "task", task: { id: "5b", name: "SoMe materiale", status: "active" } },
      { type: "task", task: { id: "5c", name: "Vernissage", status: "pending" } },
    ],
  },
];

export default function ProjectFolders() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openSubId, setOpenSubId] = useState<string | null>(null);

  return (
    <div className="folders-section">
      <div className="folders-header">
        <h2 className="folders-title">Projektopgaver</h2>
        <button className="folders-all-btn">Alle projekter</button>
      </div>
      <div className="folders-list">
        {DEMO_GROUPS.map((group) => {
          const isOpen = openId === group.id;
          const tasks = allTasks(group.children);
          return (
            <div key={group.id} className={`folder-item${isOpen ? " folder-item--open" : ""}`}>
              <button
                className="folder-toggle"
                onClick={() => {
                  setOpenId(isOpen ? null : group.id);
                  if (isOpen) setOpenSubId(null);
                }}
              >
                <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span className="folder-name">{group.name}</span>
                <span className="folder-count">{countDone(tasks)}/{tasks.length}</span>
                <svg className={`folder-chevron${isOpen ? " folder-chevron--open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="folder-files">
                  {group.children.map((child) => {
                    if (child.type === "task") {
                      const task = child.task;
                      return (
                        <div key={task.id} className="folder-task">
                          <span className={`folder-task-dot folder-task-dot--${task.status}`} />
                          <span className="folder-file-name">{task.name}</span>
                          <span className={`folder-task-label folder-task-label--${task.status}`}>
                            {STATUS_LABEL[task.status]}
                          </span>
                        </div>
                      );
                    }
                    const sub = child.subgroup;
                    const subOpen = openSubId === sub.id;
                    return (
                      <div key={sub.id} className="folder-subgroup">
                        <button
                          className="folder-subgroup-toggle"
                          onClick={() => setOpenSubId(subOpen ? null : sub.id)}
                        >
                          <svg className="folder-sub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="folder-file-name">{sub.name}</span>
                          <span className="folder-count">{countDone(sub.tasks)}/{sub.tasks.length}</span>
                          <svg className={`folder-chevron folder-chevron--sm${subOpen ? " folder-chevron--open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {subOpen && (
                          <div className="folder-subgroup-tasks">
                            {sub.tasks.map((task) => (
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
