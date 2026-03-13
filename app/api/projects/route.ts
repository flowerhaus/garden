import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCachedProjects, syncProjectsForUser } from "@/lib/notion";

export async function GET(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Ikke logget ind" }, { status: 401 });
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

  // Sync fra Notion hvis ingen cached projekter
  if (projects.length === 0) {
    const synced = await syncProjectsForUser(
      user.id,
      user.notion_filter || undefined
    );
    return NextResponse.json(synced);
  }

  return NextResponse.json(projects);
}
