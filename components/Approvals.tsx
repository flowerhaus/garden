"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "./UserProvider";
import type { Approval } from "@/lib/db";

type AttachmentType = "pdf" | "image" | "video";

interface Attachment {
  name: string;
  type: AttachmentType;
  url: string;
}

function parseAttachments(raw: string | null): Attachment[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function AttachmentIcon({ type }: { type: AttachmentType }) {
  if (type === "video") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
  }
  if (type === "image") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default function Approvals() {
  const user = useUser();
  const [items, setItems] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);

  const fetchApprovals = useCallback(async () => {
    try {
      const res = await fetch("/api/approvals");
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch approvals:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  // Close on Escape
  useEffect(() => {
    if (!openId) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [openId]);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setActing(id);
    try {
      const res = await fetch(`/api/approvals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
        setOpenId(null);
      } else {
        const err = await res.json();
        alert(err.error || "Noget gik galt");
      }
    } catch {
      alert("Kunne ikke kontakte serveren");
    } finally {
      setActing(null);
    }
  }

  function canAct(item: Approval): boolean {
    return !!(user && item.assigned_to === user.email && item.status === "pending");
  }

  const pending = items.filter((i) => i.status === "pending");
  const resolved = items.filter((i) => i.status !== "pending");
  const openItem = items.find((i) => i.id === openId);

  if (loading) {
    return (
      <div className="approvals-section">
        <div className="approvals-header">
          <h2 className="approvals-title">Godkendelser</h2>
        </div>
        <div className="loading" style={{ padding: "40px 0" }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="approvals-section">
        <div className="approvals-header">
          <h2 className="approvals-title">Godkendelser</h2>
          {pending.length > 0 && (
            <span className="approvals-badge">{pending.length}</span>
          )}
        </div>

        {!user && (
          <div className="approval-login-notice">
            Log ind for at godkende eller afvise
          </div>
        )}

        <div className="approvals-list">
          {pending.map((item) => (
            <div
              key={item.id}
              className="approval-item approval-item--clickable"
              onClick={() => setOpenId(item.id)}
            >
              <div className="approval-info">
                <span className="approval-name">{item.title}</span>
                <span className="approval-meta">
                  {item.from_name} · {item.assigned_to}
                </span>
              </div>
              {canAct(item) && (
                <div className="approval-actions">
                  <button
                    className="approval-btn approval-btn--approve"
                    onClick={(e) => { e.stopPropagation(); updateStatus(item.id, "approved"); }}
                    disabled={acting === item.id}
                    title="Godkend"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <button
                    className="approval-btn approval-btn--reject"
                    onClick={(e) => { e.stopPropagation(); updateStatus(item.id, "rejected"); }}
                    disabled={acting === item.id}
                    title="Afvis"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
          {resolved.map((item) => (
            <div
              key={item.id}
              className="approval-item approval-item--resolved approval-item--clickable"
              onClick={() => setOpenId(item.id)}
            >
              <div className="approval-info">
                <span className="approval-name">{item.title}</span>
                <span className="approval-meta">
                  {item.from_name} · {item.assigned_to}
                </span>
              </div>
              <span className={`approval-status approval-status--${item.status}`}>
                {item.status === "approved" ? "Godkendt" : "Afvist"}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ padding: "20px 0", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
              Ingen godkendelser endnu
            </div>
          )}
        </div>
      </div>

      {/* Detail overlay */}
      {openItem && (() => {
        const attachments = parseAttachments(openItem.attachments);
        return (
          <div className="approval-overlay" onClick={() => setOpenId(null)}>
            <div className="approval-detail" onClick={(e) => e.stopPropagation()}>
              <div className="approval-detail-header">
                <div>
                  <h3 className="approval-detail-title">{openItem.title}</h3>
                  <span className="approval-detail-meta">
                    {openItem.from_name} &middot; Til: {openItem.assigned_to}
                  </span>
                </div>
                <button className="approval-detail-close" onClick={() => setOpenId(null)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {openItem.description && (
                <p className="approval-detail-desc">{openItem.description}</p>
              )}

              {attachments.length > 0 && (
                <div className="approval-detail-attachments">
                  <span className="approval-detail-label">Vedhæftede filer</span>
                  {attachments.map((att, i) => (
                    <a key={i} className="approval-attachment" href={att.url}>
                      <span className={`approval-attachment-icon approval-attachment-icon--${att.type}`}>
                        <AttachmentIcon type={att.type} />
                      </span>
                      <span className="approval-attachment-name">{att.name}</span>
                    </a>
                  ))}
                </div>
              )}

              {openItem.status === "pending" && canAct(openItem) ? (
                <div className="approval-detail-actions">
                  <button
                    className="approval-detail-btn approval-detail-btn--approve"
                    onClick={() => updateStatus(openItem.id, "approved")}
                    disabled={acting === openItem.id}
                  >
                    {acting === openItem.id ? "..." : "Godkend"}
                  </button>
                  <button
                    className="approval-detail-btn approval-detail-btn--reject"
                    onClick={() => updateStatus(openItem.id, "rejected")}
                    disabled={acting === openItem.id}
                  >
                    {acting === openItem.id ? "..." : "Afvis"}
                  </button>
                </div>
              ) : openItem.status === "pending" ? (
                <div className="approval-detail-resolved" style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  {user ? "Tildelt til en anden bruger" : "Log ind for at behandle"}
                </div>
              ) : (
                <div className="approval-detail-resolved">
                  <span className={`approval-status approval-status--${openItem.status}`}>
                    {openItem.status === "approved" ? "Godkendt" : "Afvist"}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </>
  );
}
