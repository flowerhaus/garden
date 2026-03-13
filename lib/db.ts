import { createClient } from "@libsql/client";

export const db = createClient({
  url: (process.env.TURSO_URL || "file:local.db").trim(),
  authToken: process.env.TURSO_AUTH_TOKEN?.trim(),
});

export interface User {
  id: string;
  email: string;
  name: string | null;
  notion_filter: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

export interface MagicLink {
  id: string;
  email: string;
  token: string;
  expires_at: string;
  used: number;
}

export interface Project {
  id: string;
  notion_id: string | null;
  user_id: string;
  title: string;
  status: "active" | "paused" | "completed";
  description: string | null;
  updated_at: string | null;
  notion_data: string | null;
}
