import request from "supertest";
import bcrypt from "bcryptjs";
import { beforeAll, describe, expect, it } from "vitest";

let app: Awaited<ReturnType<typeof import("./app").createApp>>;

describe("admin auth and content flow", () => {
  beforeAll(async () => {
    process.env.SESSION_SECRET = "test-secret";
    process.env.ADMIN_LOGIN = "admin";
    process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash("password123", 10);

    const { createApp } = await import("./app");
    app = await createApp();
  });

  it("requires auth for admin content route", async () => {
    const response = await request(app).get("/api/admin/content");
    expect(response.status).toBe(401);
  });

  it("allows login and content update for admin", async () => {
    const agent = request.agent(app);

    const failedLogin = await agent.post("/api/auth/login").send({
      login: "admin",
      password: "wrong",
    });
    expect(failedLogin.status).toBe(401);

    const okLogin = await agent.post("/api/auth/login").send({
      login: "admin",
      password: "password123",
    });
    expect(okLogin.status).toBe(200);
    expect(okLogin.body.csrfToken).toBeTruthy();
    const csrfToken = okLogin.body.csrfToken as string;

    const current = await agent.get("/api/admin/content");
    expect(current.status).toBe(200);

    const nextContent = {
      ...current.body,
      navbar: {
        ...current.body.navbar,
        brandTitle: "Тестовый бренд",
      },
    };

    const missingCsrf = await agent.put("/api/admin/content").send(nextContent);
    expect(missingCsrf.status).toBe(403);

    const updated = await agent
      .put("/api/admin/content")
      .set("x-csrf-token", csrfToken)
      .send(nextContent);
    expect(updated.status).toBe(200);
    expect(updated.body.navbar.brandTitle).toBe("Тестовый бренд");

    const publicContent = await request(app).get("/api/content");
    expect(publicContent.status).toBe(200);
    expect(publicContent.body.navbar.brandTitle).toBe("Тестовый бренд");
  });
});

