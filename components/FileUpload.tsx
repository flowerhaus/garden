"use client";

import { useRef, useState } from "react";
import type { ProjectFile } from "./FileBrowser";

interface Props {
  onUpload?: (files: ProjectFile[]) => void;
}

const EXT_CATEGORY: Record<string, string> = {
  pdf: "Dokument", docx: "Dokument", doc: "Dokument", txt: "Dokument",
  png: "Billede", jpg: "Billede", jpeg: "Billede", svg: "Billede",
  gif: "Billede", tiff: "Billede", webp: "Billede",
  mp4: "Video", mov: "Video", avi: "Video", webm: "Video",
  mp3: "Lyd", wav: "Lyd", aac: "Lyd", flac: "Lyd",
  pptx: "Præsentation", ppt: "Præsentation", key: "Præsentation",
  xlsx: "Regneark", xls: "Regneark", csv: "Regneark",
};

const FOLDER_RULES: { keywords: string[]; folder: string }[] = [
  { keywords: ["rumplan", "scenografi", "installation", "belysning", "plantegning"], folder: "Scenografi" },
  { keywords: ["plakat", "folder", "invitation", "tryksag"], folder: "Tryksager" },
  { keywords: ["presse", "kontakt", "gæsteliste", "kommunikation"], folder: "Kommunikation" },
  { keywords: ["katalog", "tekst", "budget", "opgørelse"], folder: "Tekster" },
  { keywords: ["bjørk", "bjork"], folder: "Kunstnere/Lena Bjørk" },
];

function categorizeFile(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return EXT_CATEGORY[ext] || "Dokument";
}

function detectFolder(name: string, category: string): string {
  const lower = name.toLowerCase();
  for (const rule of FOLDER_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.folder;
    }
  }
  if (category === "Video" || category === "Lyd") return "Media";
  return "";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(): string {
  const d = new Date();
  return d.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" });
}

interface PendingFile {
  id: string;
  name: string;
  size: string;
  folder: string;
  category: string;
}

export default function FileUpload({ onUpload }: Props) {
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList) {
    const newPending: PendingFile[] = [];
    const newProjectFiles: ProjectFile[] = [];

    for (const f of Array.from(fileList)) {
      const category = categorizeFile(f.name);
      const folder = detectFolder(f.name, category);
      const id = crypto.randomUUID();
      const size = formatSize(f.size);
      const date = formatDate();

      newPending.push({ id, name: f.name, size, folder, category });
      newProjectFiles.push({ id, name: f.name, size, date, folder, category });
    }

    setPending((prev) => [...newPending, ...prev]);
    onUpload?.(newProjectFiles);
  }

  function removePending(id: string) {
    setPending((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="upload-section">
      <div className="upload-header">
        <h2 className="upload-title">Upload</h2>
      </div>
      <div
        className={`upload-dropzone${dragging ? " upload-dropzone-active" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="upload-dropzone-text">Træk filer hertil eller klik for at uploade</span>
      </div>
      {pending.length > 0 && (
        <div className="upload-files">
          {pending.map((file) => (
            <div key={file.id} className="upload-file">
              <svg className="upload-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div className="upload-file-info">
                <span className="upload-file-name">{file.name}</span>
                <span className="upload-file-size">
                  {file.size}
                  {file.folder && <span className="upload-file-folder"> → {file.folder}/</span>}
                </span>
              </div>
              <button className="upload-file-remove" onClick={() => removePending(file.id)} title="Fjern">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
