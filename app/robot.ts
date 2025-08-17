const SITE_URL = process.env.PUBLIC_SITE_URL || "https://url.com";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: SITE_URL }; 
}