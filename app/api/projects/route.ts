import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getCachedProjects, syncProjectsForUser } from "@/lib/notion";

// TODO: Genaktiver auth-check når login er klar
const DEMO_USER_EMAIL = "hello@flowerhaus.dk";

export async function GET(request: Request) {
  let user = await getSession();

  // Fallback til demo-bruger hvis ingen session
  if (!user) {
    const result = await db.execute({
      sql: `SELECT * FROM users WHERE email = ?`,
      args: [DEMO_USER_EMAIL],
    });
    if (result.rows.length > 0) {
      const row = result.rows[0];
      user = {
        id: row.id as string,
        email: row.email as string,
        name: row.name as string | null,
        notion_filter: row.notion_filter as string | null,
        created_at: row.created_at as string,
      };
    }
  }

  if (!user) {
    return NextResponse.json({ error: "Ingen bruger fundet" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get("refresh") === "true";

  if (refresh) {
    const projects = await syncProjectsForUser(
      user.id,
      user.notion_filter || undefined
    );
    return NextResponse.json(projects);
  }

  const projects = await getCachedProjects(user.id);

  if (projects.length === 0) {
    const synced = await syncProjectsForUser(
      user.id,
      user.notion_filter || undefined
    );
    return NextResponse.json(synced);
  }

  return NextResponse.json(projects);
}
