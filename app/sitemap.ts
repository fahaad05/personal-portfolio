export default async function sitemap() {
  const base = process.env.PUBLIC_SITE_URL || "https://url.com";
  return [
    { url: `${base}/` },
    { url: `${base}/projects` },
    { url: `${base}/profile` },
    { url: `${base}/contact` },
  ];
}
