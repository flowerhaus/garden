import { db, Approval } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// GET — return all approvals, sorted pending-first
export async function GET() {
  try {
    const result = await db.execute(
      "SELECT * FROM approvals ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, created_at DESC"
    );
    return NextResponse.json(result.rows as unknown as Approval[]);
  } catch (error) {
    console.error("Failed to fetch approvals:", error);
    return NextResponse.json({ error: "Failed to fetch approvals" }, { status: 500 });
  }
}

// POST — create a new approval
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Ikke logget ind" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, assigned_to, from_name, attachments } = body;

    if (!title?.trim() || !assigned_to?.trim()) {
      return NextResponse.json({ error: "Titel og modtager er påkrævet" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const result = await db.execute({
      sql: `INSERT INTO approvals (id, title, description, from_name, assigned_to, attachments)
            VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
      args: [
        id,
        title.trim(),
        description?.trim() || null,
        from_name?.trim() || session.name || session.email,
        assigned_to.trim().toLowerCase(),
        attachments ? JSON.stringify(attachments) : null,
      ],
    });

    return NextResponse.json(result.rows[0] as unknown as Approval, { status: 201 });
  } catch (error) {
    console.error("Failed to create approval:", error);
    return NextResponse.json({ error: "Failed to create approval" }, { status: 500 });
  }
}
