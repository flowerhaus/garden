"use client";

import { useRef, useState } from "react";
import type { ProjectFile } from "./FileBrowser";

interface Props {
  dropboxPath?: string;
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

function categorizeFile(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return EXT_CATEGORY[ext] || "Dokument";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

type UploadingFile = {
  name: string;
  size: string;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

export default function FileUpload({ dropboxPath, onUpload }: Props) {
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(fileList: FileList) {
    if (!dropboxPath) return;

    const files = Array.from(fileList);
    const entries: UploadingFile[] = files.map((f) => ({
      name: f.name,
      size: formatSize(f.size),
      status: "pending",
    }));
    setUploading(entries);

    const uploaded: ProjectFile[] = [];

    for (let i = 0; i < files.length; i++) {
      setUploading((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "uploading" } : e))
      );

      try {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("path", dropboxPath);

        const res = await fetch("/api/dropbox/files", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload fejlede");
        }

        const entry = await res.json();

        uploaded.push({
          id: entry.id,
          name: entry.name,
          size: formatSize(entry.size),
          date: new Date(entry.modified).toLocaleDateString("da-DK", {
            day: "numeric", month: "short", year: "numeric",
          }),
          folder: "",
          category: categorizeFile(entry.name),
          dropboxPath: entry.path,
        });

        setUploading((prev) =>
          prev.map((e, j) => (j === i ? { ...e, status: "done" } : e))
        );
      } catch (err: any) {
        setUploading((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, status: "error", error: err.message } : e
          )
        );
      }
    }

    if (uploaded.length > 0) onUpload?.(uploaded);
    setTimeout(() => setUploading([]), 3000);
  }

  if (!dropboxPath) {
    return (
      <div className="upload-section">
        <div className="upload-header">
          <h2 className="upload-title">Upload</h2>
        </div>
        <div className="upload-dropzone upload-dropzone-disabled">
          <span className="upload-dropzone-text">Vælg en Dropbox-mappe for at uploade filer</span>
        </div>
      </div>
    );
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
      {uploading.length > 0 && (
        <div className="upload-files">
          {uploading.map((file, i) => (
            <div key={i} className={`upload-file upload-file--${file.status}`}>
              <svg className="upload-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div className="upload-file-info">
                <span className="upload-file-name">{file.name}</span>
                <span className="upload-file-size">
                  {file.size}
                  {file.status === "uploading" && <span className="upload-file-status"> — uploader...</span>}
                  {file.status === "done" && <span className="upload-file-status upload-file-done"> — uploadet</span>}
                  {file.status === "error" && <span className="upload-file-status upload-file-error"> — {file.error}</span>}
                </span>
              </div>
              {file.status === "uploading" && <span className="spinner" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
