import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const FLORA_SYSTEM = `Du er Flora, Flowerhaus' venlige AI-assistent. Du hjælper kunder med spørgsmål om deres projekter.

Du taler dansk. Vær venlig, professionel og kort i dine svar.

Her er information om kundens aktive projekter:
- Website Redesign (aktiv) - Komplet redesign af hjemmeside
- Brand Identity (aktiv) - Nyt logo, farvepalette og brand guidelines
- E-commerce Platform (aktiv) - Webshop med produktkatalog og betaling
- Social Media Strategi (på pause) - Content-plan for Instagram, LinkedIn, Facebook
- SEO Optimering (afsluttet) - Teknisk SEO-audit og on-page optimering
- Fotoshoot Produkter (afsluttet) - Produktfotografering

Kommende aftaler:
- 14. mar kl. 10:00 - Statusmøde: Website Redesign
- 17. mar kl. 13:30 - Feedback: Logo udkast v2
- 19. mar kl. 09:00 - Opkald: E-commerce kravspec
- 21. mar kl. 17:00 - Deadline: Brand Guidelines
- 25. mar kl. 14:00 - Præsentation: Webshop mockups

Hvis du ikke kan svare på et spørgsmål, sig at du sender det videre til teamet hos Flowerhaus. Svar ALDRIG med information du ikke har - vær ærlig om hvad du ikke ved.`;

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function POST(request: Request) {
  const { message, history } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Besked påkrævet" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply:
        "Jeg kan desværre ikke svare lige nu. Dit spørgsmål er sendt videre til teamet hos Flowerhaus.",
      forwarded: true,
    });
  }

  try {
    const client = getClient();

    const messages = [
      ...(history || []).map((m: { role: string; text: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      })),
      { role: "user" as const, content: message },
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: FLORA_SYSTEM,
      messages,
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "Jeg kunne ikke generere et svar.";

    // Tjek om Flora sender videre til teamet
    const forwarded =
      reply.includes("sender det videre") ||
      reply.includes("kontakte teamet") ||
      reply.includes("Flowerhaus direkte");

    if (forwarded) {
      // Send email til teamet
      try {
        const { Resend } = require("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "Garden <noreply@resend.dev>",
          to: process.env.TEAM_EMAIL || "hello@flowerhaus.dk",
          subject: `Kundespørgsmål via Garden`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px; padding: 32px 20px;">
              <p style="color: #5a6b4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Spørgsmål fra kunde</p>
              <p style="color: #2a2c24; margin: 12px 0; font-size: 15px;">"${message}"</p>
              <p style="color: #858877; font-size: 13px;">Flora kunne ikke besvare dette spørgsmål. Venligst følg op.</p>
            </div>
          `,
        });
      } catch {
        // Stille fejl
      }
    }

    return NextResponse.json({ reply, forwarded });
  } catch {
    return NextResponse.json({
      reply:
        "Beklager, der opstod en fejl. Dit spørgsmål er sendt videre til Flowerhaus.",
      forwarded: true,
    });
  }
}
