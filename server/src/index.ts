import "dotenv/config";
import { createApp } from "./app";

const PORT = Number(process.env.API_PORT ?? 4000);
let keepProcessAliveTimer: NodeJS.Timeout | null = null;

const start = async () => {
  const app = await createApp();
  const server = app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });

  server.on("close", () => {
    if (keepProcessAliveTimer) {
      clearInterval(keepProcessAliveTimer);
      keepProcessAliveTimer = null;
    }
  });

  // In some local shells, the process may exit despite open sockets.
  // This timer guarantees the dev server stays alive.
  keepProcessAliveTimer = setInterval(() => {}, 60_000);
};

start().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});

