"use client";

import { useState, useRef, DragEvent } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  time: string;
}

const DEMO_FILES: UploadedFile[] = [
  { id: "1", name: "brief-website-v2.pdf", size: "2.4 MB", time: "12. mar" },
  { id: "2", name: "logo-feedback.docx", size: "340 KB", time: "10. mar" },
  { id: "3", name: "produktfotos-ref.zip", size: "18.7 MB", time: "5. mar" },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function FileShare() {
  const [files, setFiles] = useState<UploadedFile[]>(DEMO_FILES);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList) {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: Date.now().toString() + f.name,
      name: f.name,
      size: formatFileSize(f.size),
      time: "Lige nu",
    }));
    setFiles([...newFiles, ...files]);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
  }

  return (
    <div className="fileshare-section">
      <div className="fileshare-header">
        <h2 className="fileshare-title">
          Del
          <strong>Filer</strong>
        </h2>
        <span className="fileshare-count">{files.length} filer</span>
      </div>

      <div
        className={`fileshare-dropzone ${dragging ? "fileshare-dropzone-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="fileshare-dropzone-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
        </div>
        <span className="fileshare-dropzone-text">
          Træk filer hertil eller klik for at vælge
        </span>
      </div>

      {files.length > 0 && (
        <div className="fileshare-list">
          {files.map((file) => (
            <div key={file.id} className="fileshare-item">
              <div className="fileshare-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <div className="fileshare-item-info">
                <span className="fileshare-item-name">{file.name}</span>
                <span className="fileshare-item-meta">
                  {file.size} &middot; {file.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
