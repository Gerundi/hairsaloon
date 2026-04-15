import type { NextFunction, Request, Response } from "express";
import { readAdminSession } from "../auth-token";

export const requireCsrf = (req: Request, res: Response, next: NextFunction) => {
  const tokenFromHeader = req.header("x-csrf-token");
  const tokenInSession = req.adminSession?.csrfToken ?? readAdminSession(req)?.csrfToken;

  if (!tokenFromHeader || !tokenInSession || tokenFromHeader !== tokenInSession) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
};

