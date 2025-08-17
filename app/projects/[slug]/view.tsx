"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/incr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {});
    return () => controller.abort();
  }, [slug]);
  return null;
};
