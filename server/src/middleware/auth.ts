import type { NextFunction, Request, Response } from "express";
import { readAdminSession } from "../auth-token";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const session = readAdminSession(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.adminSession = session;
  next();
};

