import { NextRequest, NextResponse } from "next/server";
import { listFolder, uploadFile } from "@/lib/dropbox";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "";

    const entries = await listFolder(path);
    return NextResponse.json(entries);
  } catch (error: any) {
    console.error("Dropbox list error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list files" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json(
        { error: "File and path are required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.endsWith("/")
      ? `${path}${file.name}`
      : `${path}/${file.name}`;

    const entry = await uploadFile(fullPath, buffer);
    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    console.error("Dropbox upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
