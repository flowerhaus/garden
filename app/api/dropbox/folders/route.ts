import { NextRequest, NextResponse } from "next/server";
import { listFolder, createFolder } from "@/lib/dropbox";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "";

    const entries = await listFolder(path);
    const folders = entries.filter((e) => e.isFolder);
    return NextResponse.json(folders);
  } catch (error: any) {
    console.error("Dropbox folders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list folders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const entry = await createFolder(path);
    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    console.error("Dropbox create folder error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create folder" },
      { status: 500 }
    );
  }
}
