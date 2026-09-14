#!/usr/bin/env bash
# Deploy this site to Vercel directly from the local machine (no Git integration).
#
#   ./scripts/deploy-vercel.sh            -> preview deployment
#   ./scripts/deploy-vercel.sh --prod     -> production deployment
#
# Prereq (one time):  vercel login
set -euo pipefail

cd "$(dirname "$0")/.."

# Env vars the running site needs. The Contentful MANAGEMENT token is deliberately
# NOT in this list — it is a write credential and the site never uses it.
VARS=(CONTENTFUL_SPACE_ID CONTENTFUL_ACCESS_TOKEN CONTENTFUL_PREVIEW_TOKEN CONTENTFUL_ENVIRONMENT)

command -v vercel >/dev/null || { echo "vercel CLI not found. npm i -g vercel"; exit 1; }
vercel whoami >/dev/null 2>&1 || { echo "Not logged in. Run: vercel login"; exit 1; }

[ -f .env.local ] || { echo "Missing .env.local"; exit 1; }

# 1. Link this directory to a Vercel project (interactive the first time)
[ -d .vercel ] || vercel link

# 2. Push env vars for every target, replacing any existing value
for name in "${VARS[@]}"; do
  value="$(grep -m1 "^${name}=" .env.local | cut -d= -f2- | sed 's/^["'\'']//; s/["'\'']$//')"
  if [ -z "$value" ]; then
    echo "  skip  $name (not set in .env.local)"
    continue
  fi
  for target in production preview development; do
    vercel env rm "$name" "$target" --yes >/dev/null 2>&1 || true
    printf '%s' "$value" | vercel env add "$name" "$target" >/dev/null
  done
  echo "  set   $name"
done

# 3. Deploy
if [ "${1:-}" = "--prod" ]; then
  vercel deploy --prod
else
  vercel deploy
fi
