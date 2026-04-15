import fs from "node:fs";
import path from "node:path";
import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";
import { defaultContent } from "./defaultContent";
import type { SiteContent } from "./types";

let dbPromise: Promise<Database<sqlite3.Database, sqlite3.Statement>> | null = null;

const DB_PATH = process.env.DB_PATH ?? "server/data/site-content.db";

const ensureDbDirectory = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const initSchema = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const existing = await db.get<{ id: number }>("SELECT id FROM site_content WHERE id = 1");
  if (!existing) {
    await db.run(
      "INSERT INTO site_content (id, content_json, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP)",
      JSON.stringify(defaultContent),
    );
  }
};

export const getDb = async () => {
  if (!dbPromise) {
    ensureDbDirectory();
    dbPromise = open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    }).then(async (db) => {
      await initSchema(db);
      return db;
    });
  }
  return dbPromise;
};

export const getContent = async (): Promise<SiteContent> => {
  const db = await getDb();
  const row = await db.get<{ content_json: string }>("SELECT content_json FROM site_content WHERE id = 1");

  if (!row) {
    return defaultContent;
  }

  try {
    return JSON.parse(row.content_json) as SiteContent;
  } catch {
    return defaultContent;
  }
};

export const updateContent = async (content: SiteContent): Promise<SiteContent> => {
  const db = await getDb();
  const serialized = JSON.stringify(content);

  await db.run(
    "UPDATE site_content SET content_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1",
    serialized,
  );

  return content;
};

