import { Project } from "@/lib/db";

const statusLabels: Record<string, string> = {
  active: "Aktiv",
  paused: "På pause",
  completed: "Afsluttet",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-card-title">{project.title}</h3>
        <span className={`status-badge ${project.status}`}>
          {statusLabels[project.status] || project.status}
        </span>
      </div>
      {project.description && (
        <p className="project-card-description">{project.description}</p>
      )}
      <div className="project-card-footer">
        <span className="project-card-date">
          {formatDate(project.updated_at)}
        </span>
      </div>
    </div>
  );
}
