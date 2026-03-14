import FileBrowser from "@/components/FileBrowser";
import FileUpload from "@/components/FileUpload";

export default function FilerPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Filer</h1>
        <p className="page-subtitle">Alle projektfiler samlet ét sted</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">12</span>
          <span className="stat-label">Filer i alt</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">492 MB</span>
          <span className="stat-label">Samlet størrelse</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">3</span>
          <span className="stat-label">Uploadet i dag</span>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <FileBrowser />
        </div>
        <div className="dashboard-sidebar">
          <FileUpload />
        </div>
      </div>
    </>
  );
}
