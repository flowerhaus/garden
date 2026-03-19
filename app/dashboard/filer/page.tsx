"use client";

import { useState } from "react";
import FileBrowser, { type ProjectFile } from "@/components/FileBrowser";
import FileUpload from "@/components/FileUpload";

const INITIAL_FILES: ProjectFile[] = [
  { id: "1",  name: "Scenografi_rumplan_v3.pdf",    category: "Dokument",      size: "2.4 MB",  date: "12. mar 2026", folder: "Scenografi" },
  { id: "2",  name: "Plakat_A2_final.png",          category: "Billede",       size: "8.1 MB",  date: "11. mar 2026", folder: "Tryksager" },
  { id: "3",  name: "Interview_Lena_Bjork.mp4",     category: "Video",         size: "142 MB",  date: "10. mar 2026", folder: "Kunstnere/Lena Bjørk" },
  { id: "4",  name: "Lydspor_installation.wav",     category: "Lyd",           size: "34.5 MB", date: "10. mar 2026", folder: "Media" },
  { id: "5",  name: "Budgetopgorelse_Q1.xlsx",      category: "Regneark",      size: "156 KB",  date: "9. mar 2026",  folder: "Tekster" },
  { id: "6",  name: "Vernissage_invitation.pdf",    category: "Dokument",      size: "1.2 MB",  date: "8. mar 2026",  folder: "Tryksager" },
  { id: "7",  name: "Sal2_belysning_ref.jpg",       category: "Billede",       size: "3.7 MB",  date: "7. mar 2026",  folder: "Scenografi" },
  { id: "8",  name: "Pressemappe_2026.pptx",        category: "Præsentation",  size: "12.8 MB", date: "6. mar 2026",  folder: "Kommunikation" },
  { id: "9",  name: "Katalog_layout_draft.pdf",     category: "Dokument",      size: "5.6 MB",  date: "5. mar 2026",  folder: "Tekster" },
  { id: "10", name: "Moodboard_farver.png",         category: "Billede",       size: "4.2 MB",  date: "4. mar 2026",  folder: "Scenografi" },
  { id: "11", name: "Timelapse_opbygning.mp4",      category: "Video",         size: "280 MB",  date: "3. mar 2026",  folder: "Media" },
  { id: "12", name: "Kontaktliste_team.pdf",        category: "Dokument",      size: "89 KB",   date: "2. mar 2026",  folder: "Kommunikation" },
];

function totalSize(files: ProjectFile[]): string {
  let mb = 0;
  for (const f of files) {
    const val = parseFloat(f.size);
    if (f.size.includes("MB")) mb += val;
    else if (f.size.includes("KB")) mb += val / 1024;
  }
  return mb >= 1000 ? (mb / 1000).toFixed(1) + " GB" : Math.round(mb) + " MB";
}

export default function FilerPage() {
  const [files, setFiles] = useState<ProjectFile[]>(INITIAL_FILES);

  function handleUpload(newFiles: ProjectFile[]) {
    setFiles((prev) => [...newFiles, ...prev]);
  }

  const recent = files.slice(0, 5);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Filer</h1>
        <p className="page-subtitle">Alle projektfiler samlet ét sted</p>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{files.length}</span>
          <span className="stat-label">Filer i alt</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalSize(files)}</span>
          <span className="stat-label">Samlet størrelse</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {new Set(files.map((f) => f.folder).filter(Boolean)).size}
          </span>
          <span className="stat-label">Mapper</span>
        </div>
      </div>

      <FileBrowser files={files} />

      <div className="filer-upload-row">
        <div className="filer-recent">
          <div className="recent-uploads-section">
            <h2 className="recent-uploads-title">Seneste uploads</h2>
            <div className="recent-uploads-list">
              {recent.map((file) => (
                <div key={file.id} className="recent-upload-item">
                  <svg className="recent-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div className="recent-upload-info">
                    <span className="recent-upload-name">{file.name}</span>
                    <span className="recent-upload-meta">
                      {file.size} &middot; {file.date}
                    </span>
                  </div>
                  {file.folder && (
                    <span className="recent-upload-folder">{file.folder}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="filer-upload">
          <FileUpload onUpload={handleUpload} />
        </div>
      </div>
    </>
  );
}
