import type { SiteContent } from "./site-content";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
let csrfToken = "";

const setCsrfToken = (token: string | undefined) => {
  csrfToken = token ?? "";
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const method = (init?.method ?? "GET").toUpperCase();
  const isStateChanging = !["GET", "HEAD", "OPTIONS"].includes(method);

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(isStateChanging && csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const api = {
  setCsrfToken,
  getPublicContent: () => request<SiteContent>("/api/content"),
  getAdminContent: () => request<SiteContent>("/api/admin/content"),
  updateAdminContent: (content: SiteContent) =>
    request<SiteContent>("/api/admin/content", {
      method: "PUT",
      body: JSON.stringify(content),
    }),
  login: async (login: string, password: string) => {
    const response = await request<{ ok: boolean; login: string; csrfToken?: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });
    setCsrfToken(response.csrfToken);
    return response;
  },
  logout: async () => {
    try {
      return await request<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
    } finally {
      setCsrfToken("");
    }
  },
  getSession: async () => {
    const response = await request<{ authenticated: boolean; login?: string; csrfToken?: string }>("/api/auth/session");
    setCsrfToken(response.csrfToken);
    return response;
  },
};

