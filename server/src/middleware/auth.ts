import type { NextFunction, Request, Response } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

