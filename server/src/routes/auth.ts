import { Router } from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import {
  clearAdminSessionCookie,
  createAdminSessionToken,
  readAdminSession,
  readAdminSessionFromToken,
  setAdminSessionCookie,
} from "../auth-token";

const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_LOGIN || !ADMIN_PASSWORD_HASH) {
  throw new Error("ADMIN_LOGIN and ADMIN_PASSWORD_HASH must be set in environment");
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRouter = Router();

authRouter.post("/login", loginLimiter, async (req, res) => {
  const { login, password } = req.body as { login?: string; password?: string };

  if (!login || !password) {
    return res.status(400).json({ error: "Login and password are required" });
  }

  const isLoginValid = login === ADMIN_LOGIN;
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isLoginValid || !isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = createAdminSessionToken(login);
  const session = readAdminSessionFromToken(token);
  if (!session) {
    return res.status(500).json({ error: "Failed to create session" });
  }

  setAdminSessionCookie(res, token);
  return res.json({ ok: true, login, csrfToken: session.csrfToken });
});

authRouter.post("/logout", (_req, res) => {
  clearAdminSessionCookie(res);
  res.json({ ok: true });
});

authRouter.get("/session", (req, res) => {
  const session = readAdminSession(req);
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    login: session.login ?? ADMIN_LOGIN,
    csrfToken: session.csrfToken,
  });
});

