# koryla-nuxt-demo-example

A/B testing with [Koryla](https://koryla.com) and Nuxt 3. Server-side variant assignment via Nitro middleware — zero flicker, zero client JavaScript.

## Setup

```bash
npm install
cp .env.example .env
# fill in your API key and experiment IDs
nuxt dev
```

## Environment variables

```bash
NUXT_KORYLA_API_KEY=sk_live_...
NUXT_KORYLA_API_URL=https://koryla.com

# Experiment IDs from your Koryla dashboard
NUXT_KORYLA_HERO_EXPERIMENT_ID=...
NUXT_KORYLA_PRICING_EXPERIMENT_ID=...
NUXT_KORYLA_DEMO_EDGE_EXPERIMENT_ID=...
NUXT_KORYLA_DEMO_COMBINED_EXPERIMENT_ID=...
NUXT_KORYLA_SDK_EXPERIMENT_ID=...
```

## How it works

**Edge-style (Nitro middleware)** — `server/middleware/koryla.ts` intercepts requests to `/hero`, `/pricing`, `/demo-edge`, and `/demo-combined`. It assigns a variant, sets a `ky_` cookie, and rewrites `event.path` to the variant page if needed. The browser URL never changes.

**SDK-style** — `/demo-sdk` calls `getVariant()` directly inside `<script setup>`. No middleware involved — variant resolution happens in the page component, server-side.

## Related repos

- [koryla-next-demo-example](https://github.com/andresclua/koryla-next-demo-example) — Next.js Edge Middleware
- [koryla-astro-demo-example](https://github.com/andresclua/koryla-astro-demo-example) — Astro + Netlify Edge Functions
