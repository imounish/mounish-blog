# Astro migration tracker

Tracks the move from Gatsby 5 to Astro + Sanity (unchanged) + Beehiiv (unchanged) + RSS + JSON-LD, hosted on Netlify. Background/rationale: [`../tech-stack-analysis.md`](../tech-stack-analysis.md).

Each task below has its own implementation-plan file. Work through them roughly in the order listed; update the **Status** column as you go (`Not started` / `In progress` / `Blocked` / `Done`). No automated test suite is part of this migration — every task's definition of done is manual verification (build success, visual/functional comparison against the live site).

## Branch & repo strategy

- The new Astro app is built in a new **`/astro`** subdirectory at the repo root, on a single long-lived branch (e.g. `astro-migration`).
- The existing Gatsby app at the repo root is left untouched until final cutover (T15). `main` stays fully deployable via Gatsby the entire time — nothing in this migration should require Gatsby to stop working mid-way.
- Netlify branch-deploy previews, scoped to the `/astro` subdirectory via a branch-specific context block in `netlify.toml`, are used to verify each task live before moving to the next one. See T1 for the exact setup.
- Cutover (T15) = merge the migration branch into `main`, then flip the Netlify **site's** build settings (not just the branch context) to build from `/astro`. Only after that succeeds does decommissioning (T16) start.

## Task table

| ID | Task | Priority | Depends on | Status |
|---|---|---|---|---|
| [T1](01-scaffold-and-preview-pipeline.md) | Scaffold `/astro` + prove the Netlify branch-preview pipeline | P0 | — | Done (repo-side work verified: scaffold, `netlify.toml`, local build all pass; pushed to `origin/astro-migration` — confirming the Netlify branch-preview + main-unaffected deploy live is the only outstanding manual step) |
| [T2](02-sanity-content-layer.md) | Sanity content layer (`@sanity/astro`, GROQ queries) | P0 | T1 | Done (verified independently: fresh `npm run build` + `npx astro check` pass in `/astro`, fetching real data from the same Sanity project as Gatsby's `.env` (`jmp9mq48`/`production`); GROQ field sets match `gatsby-node.js`/`single-blog-post.jsx` field-for-field; `@sanity/image-url` produces a real CDN URL + width/height. Outstanding manual step, same as T1: a live Netlify branch-preview build was not confirmed — no Netlify credentials in this environment. Minor issue found: a code comment in `astro/src/pages/debug/sanity.astro` cites a "T2 implementation report" that does not exist in the repo — didn't block sign-off since parity was re-verified directly against the query source.) |
| [T3](03-design-system-and-layout.md) | Design system & shared layout (Tailwind, fonts, dark mode, GA) | P0 | T1 | Done (verified independently: fresh `npm install && npm run build` + `npx astro check` pass in `/astro`; built HTML confirms header/footer/nav/logo match the Gatsby app field-for-field; Tailwind v4's `@custom-variant dark` reproduces `darkMode: 'class'` (`brand`/`brand-teal` colors dropped but confirmed unused anywhere in the Gatsby app); a headless Playwright run against `astro preview` confirmed no theme-flash across OS-dark/OS-light/localStorage-override scenarios, toggle-click persistence across reload, and that GA is completely skipped — no `gtag`, no script element, no network request — when `navigator.doNotTrack` is set, while it initializes normally otherwise; `@material-tailwind/react` confirmed fully dropped and consistently hand-rolled, not half-ported. Outstanding manual step, same as T1/T2: a live Netlify branch-preview build and real GA4 realtime-view confirmation were not done — no Netlify/GA credentials in this environment.) |
| [T4](04-static-asset-parity.md) | Static asset parity (favicons, manifest, new `robots.txt`) | P1 | T1 | Blocked (verified independently: all favicon/icon/manifest files `SEO.jsx` actually references — `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`, `safari-pinned-tab.svg` — plus `browserconfig.xml` and the manifest's own icon deps, are present under `astro/public/` and sha256-byte-identical to `static/`; `robots.txt` is a reasonable T11-pending placeholder; fresh `npm install && npm run build` in `/astro` (with `PUBLIC_SANITY_PROJECT_ID=jmp9mq48 PUBLIC_SANITY_DATASET=production`) succeeds and copies every one of those files unchanged into `dist/`; the T4 commit (`e197f0c`) touches only files under `astro/public/`, confirmed via `git show --stat`. **Real, locally-reproducible defect found (not just the usual missing-Netlify-access gap):** `astro/src/layouts/Layout.astro`'s existing `<link rel="icon">` tags (from the T1 scaffold, untouched by T4) still point at `/favicon.svg` and `/favicon.ico`, and both files under `astro/public/` are leftover Astro-starter defaults — `favicon.svg` is the default Astro logomark with no `static/` equivalent, and `favicon.ico` is a 655-byte PNG-in-.ico, not the real 15KB multi-resolution `static/favicon.ico` (confirmed via `sha256sum` and `file`). This is visible in the built `dist/index.html` head today, so the browser tab on any branch preview would currently show the wrong icon regardless of Netlify access. Needs a follow-up commit to copy the real `favicon.ico` over the placeholder and drop or replace the stray `favicon.svg`/its link tag before this can be marked Done. Outstanding manual step once fixed, same as T1–T3: live branch-preview + mobile "add to home screen" confirmation, no Netlify credentials in this environment.) |
| [T5](05-seo-and-json-ld.md) | SEO component port + JSON-LD structured data | P1 | T2, T3 | Not started |
| [T6](06-single-blog-post-template.md) | Single blog post template | P1 | T2, T3, T5 | Not started |
| [T7](07-blog-listing-and-pagination.md) | Shared pagination pattern + blog listing template | P1 | T2, T3, T5 | Not started |
| [T8](08-category-and-author-templates.md) | Category & author templates | P1 | T7 | Not started |
| [T9](09-homepage-and-static-pages.md) | Homepage & static pages | P1 | T6, T7, T8 | Not started |
| [T10](10-rss-feed.md) | RSS feed (`@astrojs/rss`) | P2 | T2 | Not started |
| [T11](11-sitemap.md) | Sitemap (`@astrojs/sitemap`) | P2 | T6, T7, T8, T9 | Not started |
| [T12](12-newsletter-cleanup-beehiiv.md) | Newsletter cleanup: drop dead Mailchimp code, port working Beehiiv function | P2 | T1, T3 | Not started |
| [T13](13-search-pagefind.md) | Search: Pagefind integration | P2 | T6, T7, T8, T9 | Not started |
| [T14](14-qa-and-parity-pass.md) | Pre-cutover QA & parity pass | P2 | T4–T13 | Not started |
| [T15](15-netlify-cutover.md) | Netlify cutover | P2 | T14 | Not started |
| [T16](16-decommission-gatsby.md) | Decommission Gatsby | P2 | T15 (+ bake period) | Not started |

## Recommended execution order

**Serial spine** (each blocks the next in practice, even where the table shows a looser dependency):

```
T1 → T2 → T3 → T5 → T6 → T7 → T8 → T9 → T14 → T15 → T16
```

T6 (single post) is deliberately done before T7 (listing) — it's the highest-risk page, since it's where the Portable Text rendering strategy and the Sanity image pipeline get validated for the first time. Once T6 works, T7/T8/T9 are mostly repeating a proven pattern.

**Fill-in tasks** — do these whenever convenient, without blocking the spine above:

- **T4** (static assets) — anytime after T1.
- **T10** (RSS) — anytime after T2. Low-risk, self-contained, good task when you want an easy win.
- **T12** (newsletter cleanup) — anytime after T3. Fully decoupled from the Sanity content work.

**Must come near the end, not early** — these two are the exception to "do it whenever":

- **T11** (sitemap) — needs the final route set from T9 to be meaningful.
- **T13** (Pagefind search) — Pagefind indexes the *built* HTML output as a post-build step, unlike flexsearch which indexed at Gatsby's GraphQL build time. It needs T6–T9's pages to exist and be structurally final (heading levels, content containers) before indexing is useful. The search UI shell can be built earlier against mock results, but real end-to-end search testing belongs late, right before T14.

## Env var reference (applies across T1, T2, T12, T15)

| Current (Gatsby) | New (Astro) | Notes |
|---|---|---|
| `GATSBY_SANITY_PROJECT_ID` | `PUBLIC_SANITY_PROJECT_ID` | Client-exposed — needed by `@sanity/image-url` when used inside islands |
| `GATSBY_SANITY_DATASET` | `PUBLIC_SANITY_DATASET` | Same reason |
| `SANITY_TOKEN` | `SANITY_TOKEN` | Stays unprefixed/server-only — used only in build-time GROQ queries |
| `GATSBY_POSTS_PER_PAGE` / `GATSBY_CATEGORIES_PER_PAGE` / `GATSBY_AUTHORS_PER_PAGE` | same names, unprefixed | Read only in `getStaticPaths`, never in client JS — no `PUBLIC_` needed |
| `BEEHIIV_API_URL` / `BEEHIIV_API_KEY` / `BEEHIIV_PUBLICATION_ID` | same names, unprefixed | Server-only, used inside the Netlify Function only |
| `GATSBY_NETLIFY_BEEHIIV_API_URL` | `PUBLIC_BEEHIIV_API_URL` (or similar) | **Watch this one** — it's currently read client-side in `FormContainer.jsx`. Astro/Vite does not inline non-`PUBLIC_`-prefixed vars into client bundles the way Gatsby inlines anything `GATSBY_`-prefixed — get this wrong and the signup form fails silently. |
| Stale Mailchimp vars (if present in `.env`) | — | Delete, not port — see T12 |

## Netlify / branch-preview gotchas

Keep these in mind across T1 and T15 specifically:

1. **Functions path resolves relative to `base`.** Once a deploy context sets `base = "astro"`, Netlify looks for `astro/netlify/functions` by default, not the root `netlify/functions`. Cleanest fix: move `netlify/functions/` under `/astro` as part of T12, so the whole app is self-contained in the subdirectory.
2. **Scope `base` to the branch context, not the top level.** A top-level `[build]` block in `netlify.toml` applies to *every* context unless overridden. If `base = "astro"` ever ends up at the top level instead of inside `[context.<branch-name>]`, the next `main` deploy (still Gatsby) will try to build from a nonexistent `/astro` and break production.
3. **Scope env vars to the migration branch's context** before the first real branch-preview build, or you'll see confusing partial-content failures that look like code bugs but are actually missing vars.
4. **Watch `NODE_VERSION`.** This repo already hit real Node-version friction with Gatsby (`300b173 Fix Node 24 compatibility`). If `NODE_VERSION` is set as a global site env var, it applies to both the Gatsby and Astro builds — confirm Astro is happy with whatever version currently satisfies Gatsby, or add a per-context override.
5. **Keep branch previews out of search engines.** T10/T11 will produce real RSS/sitemap output, and the migration branch preview may live for weeks. Add `X-Robots-Tag: noindex` (or a build-time conditional robots meta) for non-production contexts so the ugly `<branch>--<site>.netlify.app` URL doesn't get indexed mid-migration.
6. **Cutover ordering matters.** Merge the migration branch into `main` *first*, then flip the site's production build settings. Flipping settings before merging means the next `main` auto-deploy (still Gatsby-only) tries to build from `/astro` and fails.
