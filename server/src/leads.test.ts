import request from "supertest";
import bcrypt from "bcryptjs";
import { beforeAll, describe, expect, it } from "vitest";

describe("public lead telegram endpoint", () => {
  let app: Awaited<ReturnType<typeof import("./app").createApp>>;

  beforeAll(async () => {
    process.env.SESSION_SECRET = "test-secret";
    process.env.ADMIN_LOGIN = "admin";
    process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash("password123", 10);
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const { createApp } = await import("./app");
    app = await createApp();
  });

  it("returns 503 when Telegram is not configured", async () => {
    const response = await request(app).post("/api/leads/telegram").send({
      phone: "+79887364100",
      answers: {
        zone: "Голова",
        gender: "Мужской",
        previous: "Нет, не проводилось",
        city: "Сочи",
      },
    });
    expect(response.status).toBe(503);
  });
});
