"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  id: string;
  text: string;
  sender: "client" | "flora";
  time: string;
}

export default function ChatBar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, expanded, fullscreen]);

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
      const history = messages.map((m) => ({
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

  if (fullscreen) {
    return (
      <div className="chat-fullscreen" onClick={() => setFullscreen(false)}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="chat-fullscreen-inner" onClick={(e) => e.stopPropagation()}>
        <div className="chat-fullscreen-header">
          <div className="chat-float-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="12"
                  y1="12"
                  x2={12 + 8 * Math.cos((angle * Math.PI) / 180)}
                  y2={12 + 8 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
          <span className="chat-fullscreen-title">Garden</span>
          <div className="chat-fullscreen-actions">
            <button
              type="button"
              className="chat-float-new"
              onClick={() => setMessages([])}
            >
              Ny chat
            </button>
            <button
              type="button"
              className="chat-fullscreen-close"
              onClick={() => setFullscreen(false)}
              title="Minimer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2v4h4M6 14v-4H2M14 6l-4 4M2 10l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="chat-fullscreen-messages">
          {messages.length === 0 && (
            <div className="chat-fullscreen-empty">
              <div className="chat-float-icon" style={{ width: 48, height: 48 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1="12"
                      y1="12"
                      x2={12 + 8 * Math.cos((angle * Math.PI) / 180)}
                      y2={12 + 8 * Math.sin((angle * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>
              <p>Hvad kan jeg hjælpe med?</p>
            </div>
          )}
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
              <div className="chat-bubble chat-typing">Garden skriver...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-fullscreen-input" onSubmit={handleSubmit}>
          <input
            className="chat-float-input"
            type="text"
            placeholder="Skriv en besked..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            className="chat-float-send"
            type="submit"
            disabled={!input.trim() || loading}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14V2M8 2L3 7M8 2L13 7"
                stroke="currentColor"
                strokeWidth="2.5"
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

  return (
    <>
      {expanded && <div className="chat-overlay" onClick={() => setExpanded(false)} />}
      <div className={`chat-float ${expanded ? "chat-float-expanded" : ""}`}>
      {expanded && messages.length > 0 && (
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
              <div className="chat-bubble chat-typing">Garden skriver...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      <form className="chat-float-bar" onSubmit={handleSubmit}>
        <div className="chat-float-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="12"
                y1="12"
                x2={12 + 8 * Math.cos((angle * Math.PI) / 180)}
                y2={12 + 8 * Math.sin((angle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
        <input
          className="chat-float-input"
          type="text"
          placeholder="Hvad kan jeg hjælpe med?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setExpanded(true)}
          disabled={loading}
        />
        {expanded && messages.length > 0 && (
          <>
            <button
              type="button"
              className="chat-float-new"
              onClick={() => {
                setMessages([]);
                setExpanded(false);
              }}
            >
              Ny chat
            </button>
            <button
              type="button"
              className="chat-float-expand"
              onClick={() => setFullscreen(true)}
              title="Fuld skærm"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6V2h4M14 10v4h-4M2 2l5 5M14 14l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
        <button
          className="chat-float-send"
          type="submit"
          disabled={!input.trim() || loading}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 14V2M8 2L3 7M8 2L13 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
    </>
  );
}
