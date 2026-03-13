import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { syncProjectsForUser } from "@/lib/notion";

export async function POST() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Ikke logget ind" }, { status: 401 });
  }

  const projects = await syncProjectsForUser(
    user.id,
    user.notion_filter || undefined
  );

  return NextResponse.json({ synced: projects.length });
}
