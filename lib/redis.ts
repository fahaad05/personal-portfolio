import { Redis } from "@upstash/redis";
import crypto from "node:crypto";

export const HAS_REDIS =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = HAS_REDIS ? Redis.fromEnv() : null;

export const key = {
  pageviews: (slug: string) => ["pageviews", "projects", slug].join(":"),
  dedupe: (slug: string, fp: string) => ["pv", slug, fp].join(":"),
};

export function fingerprint(ip: string, dayISO: string, salt = process.env.VIEW_SALT || "dev_fallback_salt") {
  return crypto.createHash("sha256").update(`${ip}:${dayISO}:${salt}`).digest("hex");
}

export async function getViewsSafely(slugs: string[]): Promise<Record<string, number>> {
  if (!redis || slugs.length === 0) return Object.fromEntries(slugs.map((s) => [s, 0]));
  try {
    const keys = slugs.map(key.pageviews);
    const arr = await redis.mget<number[]>(...keys);
    return Object.fromEntries(slugs.map((s, i) => [s, typeof arr[i] === "number" ? (arr[i] as number) : 0]));
  } catch {
    return Object.fromEntries(slugs.map((s) => [s, 0]));
  }
}

export async function incrViewSafe(slug: string, ip: string) {
  if (!redis) return;
  try {
    const day = new Date().toISOString().slice(0, 10);
    const fp = fingerprint(ip, day);
    const dKey = key.dedupe(slug, fp);
    const seen = await redis.get(dKey);
    if (!seen) {
      await redis.set(dKey, 1, { ex: 60 * 60 * 24 });
      await redis.incr(key.pageviews(slug));
    }
  } catch {
  }
}