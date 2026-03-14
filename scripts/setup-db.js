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

  // Approvals table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS approvals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      from_name TEXT NOT NULL,
      assigned_to TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
      attachments TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      resolved_at TEXT
    )
  `);

  // Seed demo approvals (idempotent)
  const demoApprovals = [
    {
      id: 'demo-1',
      title: 'Rumplan sal 2 — rev. 3',
      description: 'Opdateret rumplan med justeret placering af interaktiv station og ny belysningszone ved indgangspartiet.',
      from_name: 'Peter Lund',
      assigned_to: 'marie@flowerhaus.dk',
      attachments: JSON.stringify([
        { name: 'Rumplan_sal2_rev3.pdf', type: 'pdf', url: '#' },
        { name: 'Belysningszone_detalje.pdf', type: 'pdf', url: '#' },
      ]),
    },
    {
      id: 'demo-2',
      title: 'Plakat A2 — final udkast',
      description: 'Endelig plakat i A2-format til tryk. Grafik, tekst og farver er godkendt af kurator.',
      from_name: 'Anna Vest',
      assigned_to: 'marie@flowerhaus.dk',
      attachments: JSON.stringify([
        { name: 'Plakat_A2_final.pdf', type: 'pdf', url: '#' },
        { name: 'Plakat_mockup.jpg', type: 'image', url: '#' },
      ]),
    },
    {
      id: 'demo-3',
      title: 'Tekniske krav til ophængning',
      description: 'Specifikationer for ophængning af installationer. Inkluderer vægtberegninger og sikkerhedskrav.',
      from_name: 'Lena Bjørk',
      assigned_to: 'jeppe@flowerhaus.dk',
      attachments: JSON.stringify([
        { name: 'Teknisk_spec.pdf', type: 'pdf', url: '#' },
      ]),
    },
  ];

  for (const a of demoApprovals) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO approvals (id, title, description, from_name, assigned_to, attachments) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [a.id, a.title, a.description, a.from_name, a.assigned_to, a.attachments],
    });
  }

  console.log("Database setup complete!");
}

setup().catch(console.error);
