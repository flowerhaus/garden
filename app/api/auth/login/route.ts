import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createMagicLink } from "@/lib/auth";
import { sendMagicLink } from "@/lib/email";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email er påkrævet" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Tjek om brugeren findes
  const user = await db.execute({
    sql: `SELECT id FROM users WHERE email = ?`,
    args: [normalizedEmail],
  });

  if (user.rows.length === 0) {
    // Returner success uanset hvad (undgå at lække info om brugere)
    return NextResponse.json({ success: true });
  }

  const token = await createMagicLink(normalizedEmail);
  await sendMagicLink(normalizedEmail, token);

  return NextResponse.json({ success: true });
}
