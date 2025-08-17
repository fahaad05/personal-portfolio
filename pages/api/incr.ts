import { incrViewSafe } from "@/lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { slug } = (req.body as { slug?: string }) || {};
    if (!slug || typeof slug !== "string") return res.status(400).json({ ok: false });

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      (req.headers["x-real-ip"] as string) ||
      req.socket.remoteAddress ||
      "0.0.0.0";

    await incrViewSafe(slug, ip);
    return res.status(204).json({ ok: true });
  } catch {
    return res.status(204).json({ ok: true, skipped: true });
  }
}