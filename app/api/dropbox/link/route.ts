import { NextRequest, NextResponse } from "next/server";
import { getTemporaryLink } from "@/lib/dropbox";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const link = await getTemporaryLink(path);
    return NextResponse.json({ link });
  } catch (error: any) {
    console.error("Dropbox link error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get download link" },
      { status: 500 }
    );
  }
}
