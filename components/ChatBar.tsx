"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  id: string;
  text: string;
  sender: "client" | "team";
  time: string;
}

const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hej! Vi har uploadet de nye logo-udkast til jeres mappe.",
    sender: "team",
    time: "10:32",
  },
  {
    id: "2",
    text: "Fedt, tak! Vi kigger på dem i dag og vender tilbage.",
    sender: "client",
    time: "11:15",
  },
  {
    id: "3",
    text: "Vi foretrækker version 2 - kan I lave den i mørk variant også?",
    sender: "client",
    time: "14:03",
  },
  {
    id: "4",
    text: "Selvfølgelig! Vi sender en opdateret version i morgen.",
    sender: "team",
    time: "14:20",
  },
];

export default function ChatBar() {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, expanded]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "client",
      time: new Date().toLocaleTimeString("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setInput("");
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
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div className="chat-input-row">
        <button
          className="chat-toggle"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Skjul chat" : "Vis chat"}
        >
          {expanded ? "\u25BC" : "\u25B2"}
        </button>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            type="text"
            placeholder="Skriv en besked..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setExpanded(true)}
          />
          <button className="chat-send" type="submit" disabled={!input.trim()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
