import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "node:crypto";

const hasRedis =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = hasRedis ? Redis.fromEnv() : null;

const WINDOW_SECONDS = 60 * 60 * 24; // 24h

function getIP(req: NextApiRequest): string {
  
  const xff = (req.headers["x-forwarded-for"] ?? "") as string;
  if (xff) return xff.split(",")[0].trim();
  const xri = (req.headers["x-real-ip"] ?? "") as string;
  if (xri) return xri;
  return req.socket?.remoteAddress ?? "";
}

function anonymize(ip: string) {
  const salt = process.env.VIEW_SALT || ""; 
  return createHash("sha256").update(ip + salt).digest("hex");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.status(200).json({ ok: true, route: "pages/api/incr" });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, GET");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const slug = typeof body.slug === "string" ? body.slug : "";
    if (!slug) return res.status(400).json({ ok: false, error: "invalid slug" });

    if (!redis) return res.status(200).json({ ok: true, skipped: true });

    const ip = getIP(req);
    const anon = ip ? anonymize(ip) : "noip";
    const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const dedupeKey = `pv:dedupe:${slug}:${day}:${anon}`;

    const created = await redis.set(dedupeKey, "1", { nx: true, ex: WINDOW_SECONDS });

    if (created === null) {
      return res.status(200).json({ ok: true, deduped: true });
    }
 
    await redis.incr(`pageviews:projects:${slug}`);
    return res.status(200).json({ ok: true, incremented: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}