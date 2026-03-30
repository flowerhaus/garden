"use client";
import { useState, useEffect, useCallback } from "react";

type FolderEntry = {
  id: string;
  name: string;
  path: string;
  isFolder: boolean;
};

type Props = {
  onSelect: (path: string) => void;
  onClose: () => void;
};

export default function DropboxFolderPicker({ onSelect, onClose }: Props) {
  const [currentPath, setCurrentPath] = useState("");
  const [folders, setFolders] = useState<FolderEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [error, setError] = useState("");

  const breadcrumbs = currentPath ? currentPath.split("/").filter(Boolean) : [];

  const fetchFolders = useCallback(async (path: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/dropbox/folders?path=${encodeURIComponent(path)}`);
      if (!res.ok) throw new Error("Kunne ikke hente mapper");
      const data = await res.json();
      setFolders(data);
    } catch (e: any) {
      setError(e.message);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders(currentPath);
  }, [currentPath, fetchFolders]);

  const handleCreate = async () => {
    if (!newFolderName.trim()) return;
    setCreating(true);
    try {
      const path = currentPath
        ? `${currentPath}/${newFolderName.trim()}`
        : `/${newFolderName.trim()}`;
      const res = await fetch("/api/dropbox/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) throw new Error("Kunne ikke oprette mappe");
      setNewFolderName("");
      fetchFolders(currentPath);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="picker-overlay" onClick={onClose}>
      <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="picker-header">
          <h3>Vælg Dropbox-mappe</h3>
          <button className="picker-close" onClick={onClose}>&times;</button>
        </div>

        <div className="picker-breadcrumbs">
          <button
            className={`picker-crumb${currentPath === "" ? " picker-crumb--current" : ""}`}
            onClick={() => setCurrentPath("")}
          >
            Dropbox
          </button>
          {breadcrumbs.map((name, i) => {
            const path = "/" + breadcrumbs.slice(0, i + 1).join("/");
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={path}>
                <span className="picker-sep">/</span>
                <button
                  className={`picker-crumb${isLast ? " picker-crumb--current" : ""}`}
                  onClick={() => setCurrentPath(path)}
                >
                  {name}
                </button>
              </span>
            );
          })}
        </div>

        <div className="picker-list">
          {loading ? (
            <div className="picker-status">
              <span className="spinner" /> Henter mapper...
            </div>
          ) : error ? (
            <div className="picker-status picker-error">{error}</div>
          ) : folders.length === 0 ? (
            <div className="picker-status">Ingen undermapper</div>
          ) : (
            folders.map((folder) => (
              <button
                key={folder.id}
                className="picker-item"
                onClick={() => setCurrentPath(folder.path)}
              >
                <svg className="picker-folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                {folder.name}
              </button>
            ))
          )}
        </div>

        <div className="picker-create">
          <input
            type="text"
            placeholder="Ny mappe-navn..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button onClick={handleCreate} disabled={creating || !newFolderName.trim()}>
            {creating ? "..." : "Opret"}
          </button>
        </div>

        <div className="picker-actions">
          <button className="btn-secondary" onClick={onClose}>Annuller</button>
          <button className="btn-primary" onClick={() => onSelect(currentPath || "/")}>
            Vælg denne mappe
          </button>
        </div>
      </div>
    </div>
  );
}
