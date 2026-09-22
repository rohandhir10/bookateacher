// bookateacher backend — Hono API server
import { Hono } from "hono";
import { handle } from "@hono/node-server";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { authRouter } from "./routes/auth.js";
import { leadsRouter } from "./routes/leads.js";
import { tutorRouter } from "./routes/tutor.js";
import { healthRouter } from "./routes/health.js";

const app = new Hono();

// Middleware
app.use(
  "*",
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") ?? ["http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use("*", logger());
app.use("*", prettyJSON());

// Routers
app.route("/api/auth", authRouter);
app.route("/api/leads", leadsRouter);
app.route("/api/tutor", tutorRouter);
app.route("/api/health", healthRouter);

// 404
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

console.log(`bookateacher backend starting on ${host}:${port}`);
console.log(`CORS origins: ${process.env.CORS_ORIGINS ?? "http://localhost:3000"}`);

serve({ fetch: app.fetch, port, host }, (info) => {
  console.log(`✓ Listening on http://${info.address}:${info.port}`);
});
