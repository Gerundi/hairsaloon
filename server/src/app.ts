import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRouter } from "./routes/auth";
import { contentRouter } from "./routes/content";

export const createApp = async () => {
  const frontendOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:8080")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required");
  }

  const app = express();
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(
    cors({
      origin: frontendOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api", contentRouter);

  return app;
};

