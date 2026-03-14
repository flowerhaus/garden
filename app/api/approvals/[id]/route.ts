import { db, Approval } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// PATCH — approve or reject
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Ikke logget ind" }, { status: 401 });
    }

    const { status } = await request.json();
    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json(
        { error: "Status skal være 'approved' eller 'rejected'" },
        { status: 400 }
      );
    }

    // Fetch approval to verify assignment
    const existing = await db.execute({
      sql: "SELECT * FROM approvals WHERE id = ?",
      args: [params.id],
    });

    if (existing.rows.length === 0) {
      return NextResponse.json({ error: "Godkendelse ikke fundet" }, { status: 404 });
    }

    const approval = existing.rows[0] as unknown as Approval;

    // Only the assigned user can act
    if (approval.assigned_to !== session.email) {
      return NextResponse.json(
        { error: "Du har ikke tilladelse til at behandle denne godkendelse" },
        { status: 403 }
      );
    }

    if (approval.status !== "pending") {
      return NextResponse.json(
        { error: "Denne godkendelse er allerede behandlet" },
        { status: 400 }
      );
    }

    const result = await db.execute({
      sql: "UPDATE approvals SET status = ?, resolved_at = datetime('now') WHERE id = ? RETURNING *",
      args: [status, params.id],
    });

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const teamEmail = process.env.TEAM_EMAIL || "hello@flowerhaus.dk";
        const statusLabel = status === "approved" ? "Godkendt" : "Afvist";

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "Garden <noreply@resend.dev>",
          to: teamEmail,
          subject: `${statusLabel}: ${approval.title}`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; padding: 32px 20px;">
              <p style="color: #5a6b4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${statusLabel}</p>
              <h2 style="color: #2a2c24; margin: 8px 0 16px;">${approval.title}</h2>
              <p style="color: #5c5f52;"><strong>${session.name || session.email}</strong> har ${status === "approved" ? "godkendt" : "afvist"} denne leverance.</p>
            </div>
          `,
        });
      } catch {
        // Email is best-effort
      }
    }

    return NextResponse.json(result.rows[0] as unknown as Approval);
  } catch (error) {
    console.error("Failed to update approval:", error);
    return NextResponse.json({ error: "Failed to update approval" }, { status: 500 });
  }
}
