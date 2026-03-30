"use client";

import { useState } from "react";

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  date: string;
  folder: string;
  category: string;
  dropboxPath?: string;
}

interface Props {
  files: ProjectFile[];
  onFileClick?: (file: ProjectFile) => void;
}

const CATEGORIES = ["Alle", "Dokument", "Billede", "Video", "Lyd", "Præsentation", "Regneark"];

function getFolders(files: ProjectFile[], path: string) {
  const subfolders = new Map<string, number>();
  for (const f of files) {
    if (!f.folder.startsWith(path)) continue;
    const rest = path ? f.folder.slice(path.length + 1) : f.folder;
    if (!rest) continue;
    const next = rest.split("/")[0];
    subfolders.set(next, (subfolders.get(next) || 0) + 1);
  }
  return Array.from(subfolders.entries()).map(([name, count]) => ({
    name,
    path: path ? `${path}/${name}` : name,
    fileCount: count,
  }));
}

function getFilesInFolder(files: ProjectFile[], path: string) {
  return files.filter((f) => f.folder === path);
}

export default function FileBrowser({ files, onFileClick }: Props) {
  const [currentPath, setCurrentPath] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const isSearching = search.length > 0;

  const searchResults = isSearching
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const folders = !isSearching ? getFolders(files, currentPath) : [];
  const currentFiles = !isSearching ? getFilesInFolder(files, currentPath) : searchResults;

  const filteredFiles = currentFiles.filter(
    (f) => activeCategory === "Alle" || f.category === activeCategory
  );

  const breadcrumbs = currentPath ? currentPath.split("/") : [];

  return (
    <div className="filebrowser-section">
      <div className="filebrowser-header">
        <div className="filebrowser-search-wrap">
          <svg className="filebrowser-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="filebrowser-search"
            placeholder="Søg i alle filer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {!isSearching && currentPath && (
        <div className="filebrowser-breadcrumbs">
          <button className="filebrowser-breadcrumb" onClick={() => setCurrentPath("")}>
            Filer
          </button>
          {breadcrumbs.map((crumb, i) => {
            const path = breadcrumbs.slice(0, i + 1).join("/");
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={path}>
                <span className="filebrowser-breadcrumb-sep">/</span>
                {isLast ? (
                  <span className="filebrowser-breadcrumb filebrowser-breadcrumb--current">{crumb}</span>
                ) : (
                  <button className="filebrowser-breadcrumb" onClick={() => setCurrentPath(path)}>
                    {crumb}
                  </button>
                )}
              </span>
            );
          })}
        </div>
      )}

      {!isSearching && folders.length > 0 && (
        <div className="filebrowser-folders">
          {folders.map((folder) => (
            <button
              key={folder.path}
              className="filebrowser-folder"
              onClick={() => setCurrentPath(folder.path)}
            >
              <svg className="filebrowser-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <div className="filebrowser-folder-info">
                <span className="filebrowser-folder-name">{folder.name}</span>
                <span className="filebrowser-folder-count">{folder.fileCount} {folder.fileCount === 1 ? "fil" : "filer"}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {(currentFiles.length > 0 || isSearching) && (
        <>
          <div className="filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeCategory === cat ? " filter-tab--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <table className="filebrowser-table">
            <thead>
              <tr>
                <th>Filnavn</th>
                {isSearching && <th>Mappe</th>}
                <th>Kategori</th>
                <th>Størrelse</th>
                <th>Dato</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className={onFileClick ? "filebrowser-row-clickable" : ""}
                  onClick={() => onFileClick?.(file)}
                >
                  <td>
                    <span className="filebrowser-filename">
                      <svg className="filebrowser-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {file.name}
                    </span>
                  </td>
                  {isSearching && (
                    <td><span className="filebrowser-folder-badge">{file.folder || "Rod"}</span></td>
                  )}
                  <td><span className="filebrowser-category">{file.category}</span></td>
                  <td><span className="filebrowser-size">{file.size}</span></td>
                  <td><span className="filebrowser-date">{file.date}</span></td>
                </tr>
              ))}
              {filteredFiles.length === 0 && (
                <tr>
                  <td colSpan={isSearching ? 5 : 4} style={{ textAlign: "center", color: "var(--text-muted)", padding: "24px 0" }}>
                    {isSearching ? "Ingen filer matcher din søgning" : "Ingen filer i denne mappe"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
