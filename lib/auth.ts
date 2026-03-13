import { cookies } from "next/headers";
import { db, type User } from "./db";

function generateId(): string {
  return crypto.randomUUID();
}

export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createMagicLink(email: string): Promise<string> {
  const id = generateId();
  const token = generateToken();
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await db.execute({
    sql: `INSERT INTO magic_links (id, email, token, expires_at) VALUES (?, ?, ?, ?)`,
    args: [id, email, token, expires.toISOString()],
  });

  return token;
}

export async function verifyMagicLink(
  token: string
): Promise<string | null> {
  const result = await db.execute({
    sql: `SELECT * FROM magic_links WHERE token = ? AND used = 0 AND expires_at > datetime('now')`,
    args: [token],
  });

  if (result.rows.length === 0) return null;

  const link = result.rows[0];

  await db.execute({
    sql: `UPDATE magic_links SET used = 1 WHERE id = ?`,
    args: [link.id as string],
  });

  return link.email as string;
}

export async function createSession(userId: string): Promise<string> {
  const id = generateId();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dage

  await db.execute({
    sql: `INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`,
    args: [id, userId, expires.toISOString()],
  });

  const cookieStore = await cookies();
  cookieStore.set("session", id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });

  return id;
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) return null;

  const result = await db.execute({
    sql: `SELECT u.* FROM users u
          JOIN sessions s ON s.user_id = u.id
          WHERE s.id = ? AND s.expires_at > datetime('now')`,
    args: [sessionId],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id as string,
    email: row.email as string,
    name: row.name as string | null,
    notion_filter: row.notion_filter as string | null,
    created_at: row.created_at as string,
  };
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) return;

  await db.execute({
    sql: `DELETE FROM sessions WHERE id = ?`,
    args: [sessionId],
  });

  cookieStore.delete("session");
}
