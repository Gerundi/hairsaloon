import { Router } from "express";
import { z } from "zod";
import { getContent, updateContent } from "../db";
import { requireAdmin } from "../middleware/auth";
import { requireCsrf } from "../middleware/csrf";

const siteContentSchema = z.record(z.unknown());

export const contentRouter = Router();

contentRouter.get("/content", async (_req, res) => {
  try {
    const content = await getContent();
    return res.json(content);
  } catch (error) {
    console.error("Failed to load public content", error);
    return res.status(500).json({ error: "Failed to load content" });
  }
});

contentRouter.get("/admin/content", requireAdmin, async (_req, res) => {
  try {
    const content = await getContent();
    return res.json(content);
  } catch (error) {
    console.error("Failed to load admin content", error);
    return res.status(500).json({ error: "Failed to load content" });
  }
});

contentRouter.put("/admin/content", requireAdmin, requireCsrf, async (req, res) => {
  const parsed = siteContentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid content payload",
      details: parsed.error.flatten(),
    });
  }

  try {
    const saved = await updateContent(parsed.data);
    return res.json(saved);
  } catch (error) {
    console.error("Failed to save admin content", error);
    return res.status(500).json({ error: "Failed to save content" });
  }
});

