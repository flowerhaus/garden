import ProjectFolders from "@/components/ProjectFolders";

export default function ProjekterPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Projekter</h1>
        <p className="page-subtitle">Overblik over alle projektgrupper og opgaver</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">5</span>
          <span className="stat-label">Grupper</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">17</span>
          <span className="stat-label">Opgaver i alt</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">5</span>
          <span className="stat-label">Afsluttet</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">5</span>
          <span className="stat-label">I gang</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">2</span>
          <span className="stat-label">Pause</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">5</span>
          <span className="stat-label">Afventer</span>
        </div>
      </div>
      <div style={{ paddingBottom: 100 }}>
        <ProjectFolders />
      </div>
    </>
  );
}
