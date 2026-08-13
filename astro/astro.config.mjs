// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

// astro.config.mjs runs in plain Node, before Vite's env-loading kicks in for
// the rest of the app, so `.env` isn't automatically read into `process.env`
// here the way it is inside pages/components. Load it explicitly per Astro's
// own guidance: https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_TOKEN } =
  loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // T10: required by @astrojs/rss to build absolute <link>/<guid> URLs in
  // the feed (src/pages/rss.xml.ts) — same origin as siteConfig.ts's
  // siteUrl (ported from gatsby-config.js's siteMetadata.siteUrl).
  site: 'https://blog.mounish.dev',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Only pass a token if one is configured — the "production" dataset here
      // is publicly readable for published documents, so builds work without one.
      // A token is only required to read draft/unpublished content.
      ...(SANITY_TOKEN ? { token: SANITY_TOKEN } : {}),
      // Static build (T1 scaffolds `output: 'static'` by default) — always hit
      // the live Content Lake instead of the CDN so build-time content is fresh.
      useCdn: false,
    }),
    // T3: ThemeToggle is a hydrated island (see src/components/theme/ThemeToggle.jsx).
    react(),
    // T3: offloads the GA4 vendor script to a web worker, mirroring the
    // Partytown behavior gatsby-plugin-google-gtag already provides today
    // (visible as a `public/~partytown/` dir in current Gatsby builds).
    // `forward` lets main-thread `gtag(...)`/`dataLayer.push(...)` calls made
    // after the initial load still reach the real gtag.js running in the worker.
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
