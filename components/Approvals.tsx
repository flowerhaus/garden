"use client";

import { useState } from "react";
import { Card, CardBody, Button, Input } from "@heroui/react";

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
      // Stille fejl
    }

    setTimeout(() => setConfirmed(null), 3000);
  }

  const pending = items.filter((i) => i.status === "pending");
  const done = items.filter((i) => i.status !== "pending");

  return (
    <Card shadow="none">
      <CardBody className="p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-default-500">Godkendelser</span>
          {pending.length > 0 && (
            <div className="w-5 h-5 rounded-full bg-secondary text-white text-[11px] font-bold flex items-center justify-center">
              {pending.length}
            </div>
          )}
        </div>

        {pending.length === 0 && done.length === 0 && (
          <p className="text-[13px] text-default-500">Ingen godkendelser lige nu.</p>
        )}

        {pending.map((item, i) => (
          <div key={item.id} className={`py-3.5 ${i < pending.length - 1 ? "border-b border-default-300" : ""}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                <span className="block text-xs text-default-500 mt-0.5">{item.description}</span>
              </div>
              <span className="text-[11px] text-default-500 whitespace-nowrap">{item.date}</span>
            </div>

            {item.wimioUrl && (
              <a
                href={item.wimioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-medium text-primary mb-2.5 hover:text-primary-600 transition-colors"
              >
                Se video-feedback &rarr;
              </a>
            )}

            {signing === item.id ? (
              <div className="mt-2">
                <Input
                  size="sm"
                  variant="bordered"
                  placeholder="Skriv dit fulde navn"
                  value={signName}
                  onValueChange={setSignName}
                  autoFocus
                  classNames={{ input: "italic" }}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    color="primary"
                    radius="full"
                    className="text-xs font-semibold"
                    onPress={() => handleSign(item.id)}
                    isDisabled={!signName.trim()}
                  >
                    Godkend
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    radius="full"
                    className="text-xs font-semibold text-default-500"
                    onPress={() => setSigning(null)}
                  >
                    Annuller
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  radius="full"
                  className="text-xs font-semibold"
                  onPress={() => handleApprove(item.id)}
                >
                  Godkend
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  radius="full"
                  className="text-xs font-semibold text-default-500 border-default-300 hover:border-danger hover:text-danger"
                  onPress={() => handleRequestRevision(item.id)}
                >
                  Anmod om rettelse
                </Button>
              </div>
            )}
          </div>
        ))}

        {confirmed && (
          <div className="p-2.5 bg-success/20 text-success rounded-medium text-xs font-semibold text-center mt-3">
            Godkendt og bekræftelse sendt
          </div>
        )}

        {done.length > 0 && (
          <div className="mt-3 pt-3 border-t border-default-300">
            {done.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-default-500">{item.title}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${item.status === "approved" ? "text-primary" : "text-secondary"}`}>
                  {item.status === "approved" ? "Godkendt" : "Rettelse"}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
