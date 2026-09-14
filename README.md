# Tanni Venue Styling

Next.js 16 (App Router, Turbopack) marketing site, content sourced from Contentful.

## Requirements

- Node.js 20+
- pnpm (this repo uses `pnpm-lock.yaml`; do not add an npm lockfile)

## Local development

```bash
pnpm install
pnpm dev
```

Create `.env.local` in the project root:

```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...      # Content Delivery API key
CONTENTFUL_PREVIEW_TOKEN=...     # Content Preview API key
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_MANAGEMENT_TOKEN=...  # CMA token, only used by scripts/*.py
```

## Deploying to Vercel (no Git integration)

One-time:

```bash
npm i -g vercel
vercel login
```

Then, from the project root:

```bash
./scripts/deploy-vercel.sh          # preview URL
./scripts/deploy-vercel.sh --prod   # production
```

The script links the project, syncs the Contentful env vars out of `.env.local`
(the management token is intentionally never uploaded), and deploys.

## Layout

| Path             | What                                                        |
| ---------------- | ----------------------------------------------------------- |
| `app/`           | Routes: `/`, `/about`, `/services`, `/services/[slug]`, `/gallery`, `/contact` |
| `components/`    | UI, grouped by page/section                                  |
| `lib/contentful.ts` | Contentful clients and typed fetchers                     |
| `lib/content.ts` | Static fallback copy used when Contentful is empty           |
| `scripts/`       | Local-only Contentful admin scripts (Python). Never deployed |
| `public/`        | Static assets                                                |

## Notes

- `.vercelignore` keeps ~150 MB of unreferenced media, plus `scripts/` and all
  env files, out of every deployment. Add new excludes there, not in `.gitignore`.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`; there are real type
  errors in `components/ui/shader-background.tsx` and `components/contact/contact-hero.tsx`.
