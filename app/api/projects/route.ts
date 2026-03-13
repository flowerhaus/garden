import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { getSession } from "@/lib/auth";
// import { getCachedProjects, syncProjectsForUser } from "@/lib/notion";

// TODO: Fjern demo-data og genaktiver Notion-integration
const DEMO_PROJECTS = [
  {
    id: "1",
    notion_id: null,
    user_id: "demo",
    title: "Website Redesign",
    status: "active",
    description:
      "Komplet redesign af hjemmeside med nyt brand identity, responsivt layout og optimeret brugeroplevelse.",
    updated_at: "2026-03-12T10:30:00Z",
    notion_data: null,
  },
  {
    id: "2",
    notion_id: null,
    user_id: "demo",
    title: "Brand Identity",
    status: "active",
    description:
      "Udvikling af nyt logo, farvepalette, typografi og brand guidelines til brug på tværs af alle kanaler.",
    updated_at: "2026-03-11T14:00:00Z",
    notion_data: null,
  },
  {
    id: "3",
    notion_id: null,
    user_id: "demo",
    title: "E-commerce Platform",
    status: "active",
    description:
      "Opsætning af webshop med produktkatalog, betaling og ordrehåndtering. Integration med lagersystem.",
    updated_at: "2026-03-10T09:15:00Z",
    notion_data: null,
  },
  {
    id: "4",
    notion_id: null,
    user_id: "demo",
    title: "Social Media Strategi",
    status: "paused",
    description:
      "Udarbejdelse af content-plan og strategi for Instagram, LinkedIn og Facebook. Afventer brand guidelines.",
    updated_at: "2026-02-28T16:45:00Z",
    notion_data: null,
  },
  {
    id: "5",
    notion_id: null,
    user_id: "demo",
    title: "SEO Optimering",
    status: "completed",
    description:
      "Teknisk SEO-audit, keyword research og on-page optimering af alle landingssider. Rapport afleveret.",
    updated_at: "2026-02-15T11:20:00Z",
    notion_data: null,
  },
  {
    id: "6",
    notion_id: null,
    user_id: "demo",
    title: "Fotoshoot Produkter",
    status: "completed",
    description:
      "Professionel produktfotografering af hele sortimentet til brug på webshop og sociale medier.",
    updated_at: "2026-01-22T13:00:00Z",
    notion_data: null,
  },
];

export async function GET() {
  return NextResponse.json(DEMO_PROJECTS);
}
