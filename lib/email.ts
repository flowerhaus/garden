import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendMagicLink(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/auth/verify?token=${token}`;

  await getResend().emails.send({
    from: process.env.EMAIL_FROM || "Garden <noreply@resend.dev>",
    to: email,
    subject: "Log ind på Garden",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #1a1a1a; margin-bottom: 8px;">Log ind på Garden</h2>
        <p style="color: #666; margin-bottom: 24px;">Klik på knappen herunder for at logge ind. Linket udløber om 15 minutter.</p>
        <a href="${url}" style="display: inline-block; background: #2d6a4f; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          Log ind
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 32px;">Hvis du ikke har bedt om dette link, kan du ignorere denne email.</p>
      </div>
    `,
  });
}
