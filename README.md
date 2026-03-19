# Personal Portfolio

Minimal, fast, and security‑minded portfolio built with Next.js (App Router), MDX/Contentlayer, and a pure‑black aesthetic. Includes projects, a profile page, contact with Cal.com, and optional privacy‑friendly page views via Upstash Redis.

## Features

- MDX content with type safety (Contentlayer)
- Projects grid and per‑project MDX pages
- Profile page (MDX) for background/experience
- Contact page with email copy, LinkedIn/GitHub, and “Book a call”
- Dark theme with subtle gradient and particles
- Optional projects page views (Upstash Redis, deduped by hash(IP + day + `VIEW_SALT`))
- SEO ready: metadata, `sitemap.xml`, `robots.txt`, Open Graph/Twitter image
- CI: GitHub Actions build pipeline

## Tech Stack

- Framework: Next.js 13+ (App Router) + TypeScript
- Styling: Tailwind CSS, Lucide Icons
- Content: MDX with Contentlayer
- Data (optional): Upstash Redis (REST)
- Deployment: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Dev

```bash
npm install
npm run dev
```

_or_

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Environment Variables

Create a `.env.local` file (never commit real values):

```env
# Public base URL (used by sitemap/robots/OG image resolution)
NEXT_PUBLIC_SITE_URL=https://your-domain.dev

# Optional: Upstash Redis (for page views). Without these, views default to 0 safely.
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Secret salt for hash fingerprint; long random string (letters, numbers, symbols).
VIEW_SALT="u|Qp6yXv6G8#nC^2K0=J%S4a!f9TzL3w"
```

> Do **not** prefix `VIEW_SALT` with `NEXT_PUBLIC_`. Keep it server‑only.  
> In production (Vercel), set the same variables in Project → Settings → Environment Variables.

## Content (MDX)

- **Projects:** add files in `content/projects/*.mdx`  
  Front‑matter example:
  ```mdx
  ---
  title: "D3.js — Monthly Earnings"
  description: "Interactive dashboard comparing earnings by gender, country, and time."
  date: "2019-12-01"
  url: https://github.com/your/repo
  repository: your/repo
  published: true
  ---
  MDX body here…
  ```

- **Profile page:** `content/pages/profile.mdx`  
  Front‑matter example:
  ```mdx
  ---
  title: "Profile"
  description: "Software Engineer near Zürich with a cybersecurity mindset."
  published: true
  ---
  Your profile content…
  ```

## Page Views

- API route: `pages/api/incr.ts`
- Dedupes views by HMAC(`IP + day`, keyed by `VIEW_SALT`)
- Skips bots/crawlers via user‑agent filter
- Returns `204` (silent) and never breaks the UI
- Server helpers in `lib/redis.ts`:
  - `getViewsSafely(slugs)` → returns `{ slug: number }` or zeros
  - `incrViewSafe(slug, ip)` → increments if not counted today

You can deploy without Redis: views will be `0` and everything works.

## SEO

- Metadata in `app/layout.tsx` with `metadataBase` and Open Graph/Twitter entries
- Open Graph image: `public/og.png` (1200×630)
- Sitemap: `app/sitemap.ts` (uses `NEXT_PUBLIC_SITE_URL`; projects and pages are auto‑listed)
- Robots: `app/robots.ts`

## Security / Privacy

- Security headers in `next.config.mjs` (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- No cookies or invasive tracking by default
- Page view fingerprints are HMAC‑salted (cannot reverse to IP)

## Accessibility

- Respects `prefers-reduced-motion` (particles can auto‑disable)
- Good text contrast on pure black background
- Focus styles on interactive elements

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # start prod server

# optional:
npx contentlayer2 build      # force regenerate types/content
```

## CI (GitHub Actions)

A minimal workflow is included in `.github/workflows/ci.yml` to build on push/PR.  
Add env secrets if you want to test Redis in CI; otherwise views fall back to 0.

## Deploy (Vercel)

1. Connect the repo on Vercel  
2. Set environment variables (see above)  
3. Deploy, then test: `/`, `/projects`, `/projects/[slug]`, `/profile`, `/contact`  
4. Verify `/sitemap.xml` and `/robots.txt`  
5. Preview a link on Slack/LinkedIn/Twitter to check the OG image

## Credits

Heavily inspired by minimal portfolios in the Next.js community; adapted to a pure‑black theme, MDX content, and a security‑minded setup.

## License

MIT
