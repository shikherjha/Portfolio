import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [rawKey, ...rawValue] = trimmed.split("=");
    const key = rawKey.trim();
    const value = rawValue.join("=").trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);
function cleanDatabaseUrl(value?: string) {
  if (!value || value.includes("${{") || value.includes("}")) return undefined;
  try {
    const url = new URL(value);
    if (!["postgresql:", "postgres:"].includes(url.protocol)) return undefined;
    return value;
  } catch {
    return undefined;
  }
}

const candidates = isRailway
  ? [process.env.DATABASE_URL, process.env.DATABASE_PUBLIC_URL]
  : [process.env.DATABASE_PUBLIC_URL, process.env.DATABASE_URL];
const databaseUrl = candidates.map(cleanDatabaseUrl).find(Boolean);

if (!databaseUrl) {
  throw new Error("DATABASE_URL or DATABASE_PUBLIC_URL must be set");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
