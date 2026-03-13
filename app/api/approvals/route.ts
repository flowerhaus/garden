import { NextResponse } from "next/server";

function getResend() {
  const { Resend } = require("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  const { itemTitle, signedBy } = await request.json();

  const teamEmail = process.env.TEAM_EMAIL || "hello@flowerhaus.dk";
  const now = new Date().toLocaleString("da-DK", {
    dateStyle: "long",
    timeStyle: "short",
  });

  try {
    const resend = getResend();

    // Mail til teamet
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Garden <noreply@resend.dev>",
      to: teamEmail,
      subject: `Godkendt: ${itemTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; padding: 32px 20px;">
          <p style="color: #5a6b4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Godkendelse modtaget</p>
          <h2 style="color: #2a2c24; margin: 8px 0 16px;">${itemTitle}</h2>
          <p style="color: #5c5f52;"><strong>${signedBy}</strong> har godkendt denne leverance.</p>
          <p style="color: #858877; font-size: 13px; margin-top: 16px;">${now}</p>
        </div>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ sent: false });
  }
}
