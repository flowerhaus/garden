import { Dropbox } from "dropbox";

export interface DropboxFileEntry {
  id: string;
  name: string;
  path: string;
  size: number;
  modified: string;
  isFolder: boolean;
}

// Team root namespace ID for Flowerhaus Dropbox Business
const TEAM_ROOT_NAMESPACE_ID = "2578860003";

let client: Dropbox | null = null;

function getClient(): Dropbox {
  if (client) return client;

  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;

  if (!appKey || !appSecret || !refreshToken) {
    throw new Error("Missing Dropbox credentials in environment variables");
  }

  client = new Dropbox({
    clientId: appKey,
    clientSecret: appSecret,
    refreshToken: refreshToken,
    pathRoot: JSON.stringify({
      ".tag": "namespace_id",
      namespace_id: TEAM_ROOT_NAMESPACE_ID,
    }),
  });

  return client;
}

function toEntry(
  entry: {
    ".tag": string;
    id?: string;
    name: string;
    path_lower?: string;
    path_display?: string;
    size?: number;
    server_modified?: string;
  }
): DropboxFileEntry {
  return {
    id: entry.id || "",
    name: entry.name,
    path: entry.path_display || entry.path_lower || "",
    size: entry.size || 0,
    modified: entry.server_modified || "",
    isFolder: entry[".tag"] === "folder",
  };
}

export async function listFolder(path: string): Promise<DropboxFileEntry[]> {
  const dbx = getClient();
  const res = await dbx.filesListFolder({
    path: path || "",
    include_mounted_folders: true,
  });
  return res.result.entries.map((e) => toEntry(e as any));
}

export async function uploadFile(
  path: string,
  contents: Buffer
): Promise<DropboxFileEntry> {
  const dbx = getClient();
  const res = await dbx.filesUpload({
    path,
    contents,
    mode: { ".tag": "overwrite" },
  });
  return toEntry(res.result as any);
}

export async function getTemporaryLink(path: string): Promise<string> {
  const dbx = getClient();
  const res = await dbx.filesGetTemporaryLink({ path });
  return res.result.link;
}

export async function createFolder(
  path: string
): Promise<DropboxFileEntry> {
  const dbx = getClient();
  const res = await dbx.filesCreateFolderV2({ path });
  return toEntry(res.result.metadata as any);
}
