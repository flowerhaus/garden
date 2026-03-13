import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyMagicLink, createSession } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?error=missing_token", request.url));
  }

  const email = await verifyMagicLink(token);

  if (!email) {
    return NextResponse.redirect(new URL("/?error=invalid_token", request.url));
  }

  // Find brugeren
  const result = await db.execute({
    sql: `SELECT id FROM users WHERE email = ?`,
    args: [email],
  });

  if (result.rows.length === 0) {
    return NextResponse.redirect(new URL("/?error=no_user", request.url));
  }

  const userId = result.rows[0].id as string;
  await createSession(userId);

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
