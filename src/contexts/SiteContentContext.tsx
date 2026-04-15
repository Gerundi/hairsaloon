import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
  replaceContent: (next: SiteContent) => void;
  saveContent: () => Promise<SiteContent>;
  editorEnabled: boolean;
  setEditorEnabled: (enabled: boolean) => void;
  selectedPath: string | null;
  setSelectedPath: (path: string | null) => void;
  getFieldValue: (path: string) => string;
  setFieldValue: (path: string, value: string) => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const deepMerge = <T,>(base: T, incoming: unknown): T => {
  if (Array.isArray(base)) {
    return (Array.isArray(incoming) ? incoming : base) as T;
  }

  if (base && typeof base === "object") {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    const incomingRecord =
      incoming && typeof incoming === "object" ? (incoming as Record<string, unknown>) : {};
    for (const [key, baseValue] of Object.entries(base as Record<string, unknown>)) {
      result[key] = deepMerge(baseValue, incomingRecord[key]);
    }
    return result as T;
  }

  return (incoming ?? base) as T;
};

const getByPath = (root: unknown, path: string) => {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (Array.isArray(acc)) {
      return acc[Number(part)];
    }
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return "";
  }, root);
};

const setByPath = (root: SiteContent, path: string, value: string): SiteContent => {
  const clone = structuredClone(root) as Record<string, unknown>;
  const parts = path.split(".");
  let cursor: unknown = clone;

  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    if (Array.isArray(cursor)) {
      cursor = cursor[Number(part)];
    } else {
      cursor = (cursor as Record<string, unknown>)[part];
    }
  }

  const last = parts[parts.length - 1];
  if (Array.isArray(cursor)) {
    cursor[Number(last)] = value;
  } else {
    (cursor as Record<string, unknown>)[last] = value;
  }

  return clone as SiteContent;
};

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const remote = await api.getPublicContent();
      setContent(deepMerge(defaultSiteContent, remote));
    } catch {
      setContent(defaultSiteContent);
    } finally {
      setLoading(false);
    }
  }, []);

  const replaceContent = useCallback((next: SiteContent) => {
    setContent(deepMerge(defaultSiteContent, next));
  }, []);

  const saveContent = useCallback(async () => {
    const saved = await api.updateAdminContent(content);
    const merged = deepMerge(defaultSiteContent, saved);
    setContent(merged);
    return merged;
  }, [content]);

  const getFieldValue = useCallback((path: string) => {
    const value = getByPath(content, path);
    return typeof value === "string" ? value : "";
  }, [content]);

  const setFieldValue = useCallback((path: string, value: string) => {
    setContent((prev) => setByPath(prev, path, value));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
      replaceContent,
      saveContent,
      editorEnabled,
      setEditorEnabled,
      selectedPath,
      setSelectedPath,
      getFieldValue,
      setFieldValue,
    }),
    [content, loading, refresh, replaceContent, saveContent, editorEnabled, selectedPath, getFieldValue, setFieldValue],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
};

