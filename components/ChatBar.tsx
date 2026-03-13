"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

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
      text: "Hej! Jeg er Flora, Flowerhaus' assistent. Spørg mig om dine projekter, aftaler eller andet.",
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
    <div className={`chat-bar ${expanded ? "chat-bar-expanded" : ""}`}>
      {expanded && (
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender === "client" ? "chat-message-client" : "chat-message-team"}`}
            >
              <div className="chat-bubble">
                <p>{msg.text}</p>
                {msg.time && <span className="chat-time">{msg.time}</span>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-message chat-message-team">
              <div className="chat-bubble chat-typing">Flora skriver...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div className="chat-input-row">
        <button
          className="chat-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "\u25BC" : "\u25B2"}
        </button>
        <div className="chat-flora-label">Flora</div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            type="text"
            placeholder="Spørg Flora om dine projekter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setExpanded(true)}
            disabled={loading}
          />
          <button
            className="chat-send"
            type="submit"
            disabled={!input.trim() || loading}
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
          </button>
        </form>
      </div>
    </div>
  );
}
