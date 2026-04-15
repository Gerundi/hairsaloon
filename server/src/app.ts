import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { authRouter } from "./routes/auth";
import { contentRouter } from "./routes/content";
import { getDb } from "./db";

const IS_PROD = process.env.NODE_ENV === "production";

export const createApp = async () => {
  await getDb();

  const frontendOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:8080")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const sessionSecret = process.env.SESSION_SECRET;
  const redisUrl = process.env.REDIS_URL;

  if (!sessionSecret) {
    throw new Error("SESSION_SECRET is required");
  }
  if (IS_PROD && !redisUrl) {
    throw new Error("REDIS_URL is required in production");
  }

  const app = express();
  if (IS_PROD) {
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

  let store: session.Store | undefined;
  if (redisUrl) {
    const redisClient = createClient({ url: redisUrl });
    redisClient.on("error", (error) => {
      console.error("Redis error:", error);
    });
    await redisClient.connect();
    store = new RedisStore({
      client: redisClient,
      prefix: "hairsaloon:sess:",
    });
  }

  app.use(
    session({
      name: "admin.sid",
      secret: sessionSecret,
      store,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PROD,
        maxAge: 1000 * 60 * 60 * 12,
      },
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api", contentRouter);

  return app;
};

