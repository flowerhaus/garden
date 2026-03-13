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

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Henter projekter...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">&#127793;</div>
        <h3>Ingen projekter endnu</h3>
        <p>Dine projekter vil dukke op her, når de er oprettet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Projekter</h1>
          <p className="dashboard-subtitle">
            {projects.length} projekt{projects.length !== 1 ? "er" : ""}
          </p>
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
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
