import type { NextFunction, Request, Response } from "express";

export const requireCsrf = (req: Request, res: Response, next: NextFunction) => {
  const tokenFromHeader = req.header("x-csrf-token");
  const tokenInSession = req.session.csrfToken;

  if (!tokenFromHeader || !tokenInSession || tokenFromHeader !== tokenInSession) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
};

