"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button, ScrollShadow } from "@heroui/react";

interface Message {
  id: string;
  text: string;
  sender: "client" | "flora";
  time: string;
}

export default function ChatBar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hej! Jeg er Gardens AI-assistent. Spørg mig om dine projekter, aftaler eller leverancer.",
      sender: "flora",
      time: "",
    },
  ]);
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, expanded]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "client",
      time: new Date().toLocaleTimeString("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const currentInput = input.trim();
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setExpanded(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "client" ? "user" : "assistant",
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, history }),
      });

      const data = await res.json();

      const floraMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Beklager, jeg kunne ikke svare.",
        sender: "flora",
        time: new Date().toLocaleTimeString("da-DK", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, floraMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Beklager, der opstod en fejl. Prøv igen.",
          sender: "flora",
          time: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] bg-default border-t border-default-300 ${expanded ? "shadow-[0_-4px_24px_rgba(0,0,0,0.08)]" : ""}`}>
      {expanded && (
        <ScrollShadow className="max-h-[280px] overflow-y-auto px-4 sm:px-10 pt-4 pb-1">
          <div className="flex flex-col gap-1.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[60%] px-3.5 py-2 rounded-[14px] text-[13px] leading-relaxed ${
                    msg.sender === "client"
                      ? "bg-primary text-primary-foreground rounded-br-[4px]"
                      : "bg-default-200 text-foreground rounded-bl-[4px]"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.time && <span className="block text-[9px] mt-0.5 opacity-50">{msg.time}</span>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-default-200 text-foreground px-3.5 py-2 rounded-[14px] rounded-bl-[4px] text-[13px] italic text-default-500">
                  Garden skriver...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollShadow>
      )}
      <div className="flex items-center gap-2 px-4 sm:px-10 py-2.5">
        <Button
          isIconOnly
          size="sm"
          variant="bordered"
          radius="full"
          className="shrink-0 text-[9px] text-default-500 border-default-300 hover:border-primary"
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? "\u25BC" : "\u25B2"}
        </Button>
        <span className="text-xs font-bold text-primary uppercase tracking-wider shrink-0">Garden</span>
        <form className="flex-1 flex items-center gap-2 border border-default-300 rounded-full pl-4 pr-1 py-0.5 focus-within:border-primary transition-colors" onSubmit={handleSubmit}>
          <input
            className="flex-1 border-none bg-transparent text-sm text-foreground outline-none py-1.5 placeholder:text-default-500"
            type="text"
            placeholder="Spørg Garden om dine projekter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setExpanded(true)}
            disabled={loading}
          />
          <Button
            isIconOnly
            type="submit"
            size="sm"
            radius="full"
            className="bg-secondary text-white shrink-0"
            isDisabled={!input.trim() || loading}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14V2M8 2L3 7M8 2L13 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}
