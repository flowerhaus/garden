"use client";

import { useState } from "react";

interface ApprovalItem {
  id: string;
  title: string;
  description: string;
  type: "design" | "video" | "document" | "deliverable";
  wimioUrl?: string;
  status: "pending" | "approved" | "revision";
  date: string;
}

const DEMO_APPROVALS: ApprovalItem[] = [
  {
    id: "a1",
    title: "Logo Design v2",
    description: "Endelig logo i 3 varianter (lys, mørk, ikon)",
    type: "design",
    wimioUrl: "https://wimio.com/review/abc123",
    status: "pending",
    date: "12. mar",
  },
  {
    id: "a2",
    title: "Landingsside mockup",
    description: "Desktop og mobil wireframes for forsiden",
    type: "design",
    status: "pending",
    date: "11. mar",
  },
  {
    id: "a3",
    title: "Produktvideo 30s",
    description: "Kort intro-video til sociale medier",
    type: "video",
    wimioUrl: "https://wimio.com/review/def456",
    status: "pending",
    date: "8. mar",
  },
  {
    id: "a4",
    title: "Brand Guidelines PDF",
    description: "Komplet brand manual med farver, fonts og regler",
    type: "document",
    status: "approved",
    date: "1. mar",
  },
];

export default function Approvals() {
  const [items, setItems] = useState(DEMO_APPROVALS);
  const [signing, setSigning] = useState<string | null>(null);
  const [signName, setSignName] = useState("");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  function handleApprove(id: string) {
    setSigning(id);
    setSignName("");
  }

  function handleRequestRevision(id: string) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: "revision" as const } : item
      )
    );
  }

  async function handleSign(id: string) {
    if (!signName.trim()) return;

    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: "approved" as const } : item
      )
    );
    setSigning(null);
    setConfirmed(id);

    // Send bekræftelsesmail
    try {
      await fetch("/api/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: id,
          itemTitle: items.find((i) => i.id === id)?.title,
          signedBy: signName.trim(),
        }),
      });
    } catch {
      // Stille fejl - godkendelsen er stadig gemt lokalt
    }

    setTimeout(() => setConfirmed(null), 3000);
  }

  const pending = items.filter((i) => i.status === "pending");
  const done = items.filter((i) => i.status !== "pending");

  return (
    <div className="approvals-section">
      <div className="approvals-header">
        <span className="approvals-title">Godkendelser</span>
        {pending.length > 0 && (
          <span className="approvals-badge">{pending.length}</span>
        )}
      </div>

      {pending.length === 0 && done.length === 0 && (
        <p className="approvals-empty">Ingen godkendelser lige nu.</p>
      )}

      {pending.map((item) => (
        <div key={item.id} className="approval-item">
          <div className="approval-item-top">
            <div className="approval-item-info">
              <span className="approval-item-title">{item.title}</span>
              <span className="approval-item-desc">{item.description}</span>
            </div>
            <span className="approval-item-date">{item.date}</span>
          </div>

          {item.wimioUrl && (
            <a
              href={item.wimioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="approval-wimio-link"
            >
              Se video-feedback &rarr;
            </a>
          )}

          {signing === item.id ? (
            <div className="approval-sign">
              <input
                className="approval-sign-input"
                type="text"
                placeholder="Skriv dit fulde navn"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
                autoFocus
              />
              <div className="approval-sign-actions">
                <button
                  className="approval-btn-confirm"
                  onClick={() => handleSign(item.id)}
                  disabled={!signName.trim()}
                >
                  Godkend
                </button>
                <button
                  className="approval-btn-cancel"
                  onClick={() => setSigning(null)}
                >
                  Annuller
                </button>
              </div>
            </div>
          ) : (
            <div className="approval-actions">
              <button
                className="approval-btn-approve"
                onClick={() => handleApprove(item.id)}
              >
                Godkend
              </button>
              <button
                className="approval-btn-revision"
                onClick={() => handleRequestRevision(item.id)}
              >
                Anmod om rettelse
              </button>
            </div>
          )}
        </div>
      ))}

      {confirmed && (
        <div className="approval-confirmed">Godkendt og bekræftelse sendt</div>
      )}

      {done.length > 0 && (
        <div className="approval-done-list">
          {done.map((item) => (
            <div key={item.id} className="approval-done-item">
              <span className="approval-done-title">{item.title}</span>
              <span
                className={`approval-done-status ${item.status}`}
              >
                {item.status === "approved" ? "Godkendt" : "Rettelse"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
