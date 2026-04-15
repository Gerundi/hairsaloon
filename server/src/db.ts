import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { defaultContent } from "./defaultContent";
import type { SiteContent } from "./types";

type ContentRow = {
  id: number;
  content_json: SiteContent | string;
  updated_at: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CONTENT_TABLE = process.env.SUPABASE_CONTENT_TABLE ?? "site_content";

let client: SupabaseClient | null = null;
let memoryContent: SiteContent = defaultContent;

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

const getClient = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
};

const parseContent = (raw: unknown): SiteContent => {
  if (!raw) {
    return defaultContent;
  }
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as SiteContent;
    } catch {
      return defaultContent;
    }
  }
  if (typeof raw === "object") {
    return raw as SiteContent;
  }
  return defaultContent;
};

const ensureDefaultRow = async (supabase: SupabaseClient) => {
  const now = new Date().toISOString();
  const { error } = await supabase.from(CONTENT_TABLE).upsert(
    {
      id: 1,
      content_json: defaultContent,
      updated_at: now,
    },
    { onConflict: "id", ignoreDuplicates: true },
  );

  if (error) {
    throw new Error(`Failed to initialize content row: ${error.message}`);
  }
};

export const getContent = async (): Promise<SiteContent> => {
  const supabase = getClient();
  if (!supabase) {
    return memoryContent;
  }

  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select("id, content_json, updated_at")
    .eq("id", 1)
    .maybeSingle<ContentRow>();

  if (error) {
    throw new Error(`Failed to fetch content: ${error.message}`);
  }

  if (!data) {
    await ensureDefaultRow(supabase);
    return defaultContent;
  }

  return parseContent(data.content_json);
};

export const updateContent = async (content: SiteContent): Promise<SiteContent> => {
  const supabase = getClient();
  if (!supabase) {
    memoryContent = content;
    return content;
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from(CONTENT_TABLE).upsert(
    {
      id: 1,
      content_json: content,
      updated_at: now,
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`Failed to save content: ${error.message}`);
  }

  return content;
};

export const usingSupabase = hasSupabaseConfig;
