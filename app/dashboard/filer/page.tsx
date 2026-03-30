"use client";

import { useState, useEffect, useCallback } from "react";
import FileBrowser, { type ProjectFile } from "@/components/FileBrowser";
import FileUpload from "@/components/FileUpload";
import DropboxFolderPicker from "@/components/DropboxFolderPicker";

const EXT_CATEGORY: Record<string, string> = {
  pdf: "Dokument", docx: "Dokument", doc: "Dokument", txt: "Dokument",
  png: "Billede", jpg: "Billede", jpeg: "Billede", svg: "Billede",
  gif: "Billede", tiff: "Billede", webp: "Billede",
  mp4: "Video", mov: "Video", avi: "Video", webm: "Video",
  mp3: "Lyd", wav: "Lyd", aac: "Lyd", flac: "Lyd",
  pptx: "Præsentation", ppt: "Præsentation", key: "Præsentation",
  xlsx: "Regneark", xls: "Regneark", csv: "Regneark",
};

function getCategory(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return EXT_CATEGORY[ext] || "Dokument";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

type DropboxEntry = {
  id: string;
  name: string;
  path: string;
  size: number;
  modified: string;
  isFolder: boolean;
};

// Persist chosen Dropbox path in localStorage
const STORAGE_KEY = "garden-dropbox-path";

export default function FilerPage() {
  const [dropboxPath, setDropboxPath] = useState<string | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Load saved path on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setDropboxPath(saved);
  }, []);

  // Fetch files when dropboxPath changes
  const fetchFiles = useCallback(async () => {
    if (!dropboxPath) {
      setFiles([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/dropbox/files?path=${encodeURIComponent(dropboxPath)}`);
      if (!res.ok) throw new Error("Kunne ikke hente filer");
      const entries: DropboxEntry[] = await res.json();

      setFiles(
        entries.map((e) => {
          // Build relative folder path from the dropbox base path
          const relativePath = e.path.slice(dropboxPath.length + 1);
          const parts = relativePath.split("/");
          const folder = e.isFolder ? relativePath : parts.slice(0, -1).join("/");

          return {
            id: e.id,
            name: e.name,
            size: formatSize(e.size),
            date: e.modified
              ? new Date(e.modified).toLocaleDateString("da-DK", {
                  day: "numeric", month: "short", year: "numeric",
                })
              : "",
            folder: e.isFolder ? "" : folder,
            category: e.isFolder ? "Mappe" : getCategory(e.name),
            dropboxPath: e.path,
          };
        }).filter((f) => f.category !== "Mappe") // Don't show folders as files — FileBrowser handles them via getFolders
      );
    } catch (err) {
      console.error(err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [dropboxPath]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSelectFolder = (path: string) => {
    setDropboxPath(path);
    localStorage.setItem(STORAGE_KEY, path);
    setShowPicker(false);
  };

  const handleUnlink = () => {
    setDropboxPath(null);
    localStorage.removeItem(STORAGE_KEY);
    setFiles([]);
  };

  const handleFileClick = async (file: ProjectFile) => {
    if (!file.dropboxPath) return;
    try {
      const res = await fetch(`/api/dropbox/link?path=${encodeURIComponent(file.dropboxPath)}`);
      if (!res.ok) throw new Error("Kunne ikke hente link");
      const { link } = await res.json();
      window.open(link, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    fetchFiles();
  };

  function totalSize(files: ProjectFile[]): string {
    let mb = 0;
    for (const f of files) {
      const val = parseFloat(f.size);
      if (f.size.includes("MB")) mb += val;
      else if (f.size.includes("KB")) mb += val / 1024;
      else if (f.size.includes("GB")) mb += val * 1024;
    }
    return mb >= 1000 ? (mb / 1000).toFixed(1) + " GB" : Math.round(mb) + " MB";
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Filer</h1>
        <p className="page-subtitle">Alle projektfiler samlet ét sted</p>
      </div>

      {/* Dropbox folder link */}
      <div className="dropbox-toolbar">
        {dropboxPath ? (
          <div className="dropbox-linked">
            <svg className="dropbox-linked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span className="dropbox-linked-path">{dropboxPath}</span>
            <button className="btn-secondary btn-sm" onClick={() => setShowPicker(true)}>Skift</button>
            <button className="btn-secondary btn-sm" onClick={handleUnlink}>Fjern</button>
          </div>
        ) : (
          <button className="btn-primary" onClick={() => setShowPicker(true)}>
            Link Dropbox-mappe
          </button>
        )}
      </div>

      {/* Stats */}
      {dropboxPath && (
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
      )}

      {/* File browser */}
      {loading ? (
        <div className="loading-state">
          <span className="spinner" /> Henter filer fra Dropbox...
        </div>
      ) : dropboxPath ? (
        <FileBrowser files={files} onFileClick={handleFileClick} />
      ) : (
        <div className="empty-state-card">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <h3>Ingen mappe valgt</h3>
          <p>Link en Dropbox-mappe for at se og administrere filer</p>
        </div>
      )}

      {/* Upload + Recent */}
      <div className="filer-upload-row">
        <div className="filer-recent">
          {files.length > 0 && (
            <div className="recent-uploads-section">
              <h2 className="recent-uploads-title">Seneste filer</h2>
              <div className="recent-uploads-list">
                {files.slice(0, 5).map((file) => (
                  <div
                    key={file.id}
                    className="recent-upload-item recent-upload-clickable"
                    onClick={() => handleFileClick(file)}
                  >
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
          )}
        </div>
        <div className="filer-upload">
          <FileUpload dropboxPath={dropboxPath || undefined} onUpload={handleUpload} />
        </div>
      </div>

      {/* Folder picker modal */}
      {showPicker && (
        <DropboxFolderPicker
          onSelect={handleSelectFolder}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
