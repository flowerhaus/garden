const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function setup() {
  console.log("Setting up Garden database...");

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      notion_filter TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS magic_links (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      notion_id TEXT UNIQUE,
      user_id TEXT NOT NULL REFERENCES users(id),
      title TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      description TEXT,
      updated_at TEXT,
      notion_data TEXT
    );
  `);

  console.log("Database setup complete!");
}

setup().catch(console.error);
