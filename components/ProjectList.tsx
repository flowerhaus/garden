"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/db";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects(refresh = false) {
    try {
      const url = refresh ? "/api/projects?refresh=true" : "/api/projects";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const activeCount = projects.filter((p) => p.status === "active").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const pausedCount = projects.filter((p) => p.status === "paused").length;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <span className="loading-text">Henter projekter</span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">+</div>
        <h3>
          Ingen <strong>projekter</strong> endnu
        </h3>
        <p>Dine projekter vil dukke op her, når de er oprettet.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Aktive projekter</div>
          <div className="stat-value">
            {activeCount}
            <span className="decimal">.0</span>
          </div>
          <div className="stat-bar">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="stat-bar-line"
                style={{ height: `${8 + Math.random() * 24}px` }}
              />
            ))}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Afsluttede</div>
          <div className="stat-value">
            {completedCount}
            <span className="decimal">.0</span>
          </div>
          <div className="stat-bar">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="stat-bar-line"
                style={{ height: `${8 + Math.random() * 24}px` }}
              />
            ))}
          </div>
        </div>
        {pausedCount > 0 ? (
          <div className="stat-card alert">
            <div className="stat-label">På pause</div>
            <div className="stat-value">
              {pausedCount}
              <span className="decimal">.0</span>
            </div>
            <div className="stat-bar">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="stat-bar-line"
                  style={{ height: `${8 + Math.random() * 24}px` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="stat-card">
            <div className="stat-label">I alt</div>
            <div className="stat-value">
              {projects.length}
              <span className="decimal">.0</span>
            </div>
            <div className="stat-bar">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="stat-bar-line"
                  style={{ height: `${8 + Math.random() * 24}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project List Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Alle
            <strong>Projekter</strong>
          </h1>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => {
            setLoading(true);
            fetchProjects(true);
          }}
        >
          Opdater
        </button>
      </div>

      {/* Project Grid */}
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
