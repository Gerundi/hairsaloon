import crypto from "node:crypto";
import type { Request, Response } from "express";

const AUTH_COOKIE_NAME = "admin.sid";
const TOKEN_TTL_SECONDS = 60 * 60 * 12;
const IS_PROD = process.env.NODE_ENV === "production";

type AdminSession = {
  login: string;
  csrfToken: string;
  exp: number;
};

const getSessionSecret = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required");
  }
  return secret;
};

const toBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");

const fromBase64Url = (value: string) => Buffer.from(value, "base64url").toString("utf8");

const sign = (payload: string) => {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
};

const parseCookies = (rawCookieHeader: string | undefined) => {
  if (!rawCookieHeader) {
    return {};
  }

  return rawCookieHeader.split(";").reduce<Record<string, string>>((acc, cookiePart) => {
    const [rawKey, ...rawValueParts] = cookiePart.trim().split("=");
    if (!rawKey) {
      return acc;
    }
    acc[rawKey] = decodeURIComponent(rawValueParts.join("="));
    return acc;
  }, {});
};

export const createAdminSessionToken = (login: string) => {
  const payload: AdminSession = {
    login,
    csrfToken: crypto.randomUUID(),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const payloadEncoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(payloadEncoded);

  return `${payloadEncoded}.${signature}`;
};

const readAdminSessionToken = (rawToken: string | undefined): AdminSession | null => {
  if (!rawToken) {
    return null;
  }
  const [payloadEncoded, signature] = rawToken.split(".");
  if (!payloadEncoded || !signature) {
    return null;
  }

  const expectedSignature = sign(payloadEncoded);
  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const isSignatureValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!isSignatureValid) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadEncoded)) as AdminSession;
    if (
      typeof payload.login !== "string" ||
      typeof payload.csrfToken !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const readAdminSession = (req: Request): AdminSession | null => {
  const cookies = parseCookies(req.headers.cookie);
  return readAdminSessionToken(cookies[AUTH_COOKIE_NAME]);
};

export const readAdminSessionFromToken = (token: string): AdminSession | null => {
  return readAdminSessionToken(token);
};

export const setAdminSessionCookie = (res: Response, token: string) => {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: "/",
  });
};

export const clearAdminSessionCookie = (res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
  });
};
