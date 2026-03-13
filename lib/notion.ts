import { Client } from "@notionhq/client";
import { db, type Project } from "./db";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

interface NotionProject {
  id: string;
  title: string;
  status: "active" | "paused" | "completed";
  description: string;
  updatedAt: string;
}

function mapStatus(notionStatus: string): "active" | "paused" | "completed" {
  const lower = notionStatus.toLowerCase();
  if (lower.includes("done") || lower.includes("complete") || lower.includes("færdig")) {
    return "completed";
  }
  if (lower.includes("pause") || lower.includes("hold") || lower.includes("vent")) {
    return "paused";
  }
  return "active";
}

export async function fetchProjectsFromNotion(
  filter?: string
): Promise<NotionProject[]> {
  const queryParams: any = {
    database_id: DATABASE_ID,
  };

  if (filter) {
    try {
      queryParams.filter = JSON.parse(filter);
    } catch {
      queryParams.filter = {
        property: "Kunde",
        rich_text: { equals: filter },
      };
    }
  }

  const response = await (notion.databases as any).query(queryParams);

  return response.results.map((page: any) => {
    const props = page.properties;

    const titleProp = props.Name || props.Navn || props.Title || props.Titel;
    const title = titleProp?.title?.[0]?.plain_text || "Uden titel";

    const statusProp = props.Status;
    const status = mapStatus(statusProp?.status?.name || statusProp?.select?.name || "active");

    const descProp = props.Description || props.Beskrivelse;
    const description = descProp?.rich_text?.[0]?.plain_text || "";

    return {
      id: page.id,
      title,
      status,
      description,
      updatedAt: page.last_edited_time,
    };
  });
}

export async function syncProjectsForUser(
  userId: string,
  notionFilter?: string
): Promise<Project[]> {
  const notionProjects = await fetchProjectsFromNotion(notionFilter || undefined);

  const projects: Project[] = [];

  for (const np of notionProjects) {
    const id = crypto.randomUUID();

    await db.execute({
      sql: `INSERT INTO projects (id, notion_id, user_id, title, status, description, updated_at, notion_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(notion_id) DO UPDATE SET
              title = excluded.title,
              status = excluded.status,
              description = excluded.description,
              updated_at = excluded.updated_at,
              notion_data = excluded.notion_data`,
      args: [
        id,
        np.id,
        userId,
        np.title,
        np.status,
        np.description,
        np.updatedAt,
        JSON.stringify(np),
      ],
    });

    projects.push({
      id,
      notion_id: np.id,
      user_id: userId,
      title: np.title,
      status: np.status,
      description: np.description,
      updated_at: np.updatedAt,
      notion_data: JSON.stringify(np),
    });
  }

  return projects;
}

export async function getCachedProjects(userId: string): Promise<Project[]> {
  const result = await db.execute({
    sql: `SELECT * FROM projects WHERE user_id = ? ORDER BY
          CASE status
            WHEN 'active' THEN 1
            WHEN 'paused' THEN 2
            WHEN 'completed' THEN 3
          END, updated_at DESC`,
    args: [userId],
  });

  return result.rows.map((row) => ({
    id: row.id as string,
    notion_id: row.notion_id as string | null,
    user_id: row.user_id as string,
    title: row.title as string,
    status: row.status as "active" | "paused" | "completed",
    description: row.description as string | null,
    updated_at: row.updated_at as string | null,
    notion_data: row.notion_data as string | null,
  }));
}
