# T4 — Static asset parity

**Priority:** P1
**Depends on:** T1
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Carry over every static file the site currently serves — favicons, manifest, and related meta — so nothing regresses silently (a wrong favicon or missing manifest is the kind of thing that's easy to not notice until a screenshot or a phone's home-screen icon looks broken). Also add a `robots.txt`, since **the live site doesn't have one today** — this task adds it for the first time rather than porting an existing one.

## Current state

- `src/components/seo/SEO.jsx` references: `/apple-touch-icon.png`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/site.webmanifest`, `/safari-pinned-tab.svg` (with `color="#b83854"`), plus `msapplication-TileColor` and `theme-color` meta.
- These files live under `static/` (Gatsby's static-asset convention) and get copied to `public/` at build time.
- No `robots.txt` exists anywhere in the current repo or build output, and `gatsby-plugin-sitemap` doesn't generate one either — confirmed by checking both `static/` and the sitemap plugin's config.

## Steps

1. Copy every favicon/manifest/icon file referenced in `SEO.jsx` from `static/` into `/astro/public/` byte-for-byte — Astro serves `public/` the same way Gatsby serves `static/`, so this should be a direct copy with no transformation.
2. Check for a `browserconfig.xml` (referenced by some favicon generators alongside `msapplication-TileColor`) and copy it if present.
3. Write a new `robots.txt` in `/astro/public/robots.txt` that allows crawling and points to the sitemap URL that T11 will produce (`Sitemap: https://blog.mounish.dev/sitemap-index.xml` or whatever path `@astrojs/sitemap` outputs — confirm the exact path once T11 is done, and come back to update this if needed).
4. Spot-check the manifest file's `theme_color`/`background_color`/icon references still resolve correctly once served from `/astro/public/`.

## Netlify / config notes

None specific — this is pure static file copying, no build config changes.

## Definition of done

- [x] Every favicon/icon/manifest file referenced by `SEO.jsx` exists under `/astro/public/` and resolves on the branch-preview site. Verified: `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`, `safari-pinned-tab.svg` (plus `browserconfig.xml`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `mstile-150x150.png` needed by the manifest/browserconfig) all present under `astro/public/` and `sha256sum` byte-identical to their `static/` sources. A fresh `npm run build` in `/astro` copies all of them unchanged into `dist/` (also sha256-verified). Live branch-preview resolution not confirmed (no Netlify credentials in this environment) — same outstanding manual step as T1–T3.
- [x] `robots.txt` exists and references the sitemap (update the exact path after T11 if it changes). `astro/public/robots.txt` allows crawling and points at `https://blog.mounish.dev/sitemap-index.xml` with a clear comment flagging it as a placeholder pending T11 confirmation — matches this file's own step 3 guidance. Copies unchanged into `dist/robots.txt`.
- [ ] Loading the branch-preview site and checking the browser tab icon, and a mobile "add to home screen" preview if convenient, shows the correct icon/theme color. **Does not hold up, and this is not just the usual "no Netlify access" gap.** `astro/src/layouts/Layout.astro` (from T1/T3 scaffold, untouched by the T4 commit) still serves `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` and `<link rel="icon" href="/favicon.ico">` — confirmed present verbatim in `astro/dist/index.html`'s `<head>` after a real build. Both files are leftover Astro-starter defaults, not the site's real assets: `astro/public/favicon.svg` is the default Astro "A" logomark (no equivalent file exists in `static/` at all), and `astro/public/favicon.ico` (`sha256 09d2ac08…`) is a 655-byte PNG-in-.ico, not the real 15KB multi-resolution `static/favicon.ico` (`sha256 d5857a9c…`) — confirmed with `file` (astro's copy reports "PNG image data, 32x32"; the real one reports "MS Windows icon resource - 3 icons"). Net effect: the browser tab on the branch preview would currently show Astro's default logo, not the site's real favicon, regardless of Netlify access — this is reproducible locally and is a genuine, unaddressed gap in the T4 commit (which copied the manifest-referenced icons but never touched `favicon.ico`/`favicon.svg`, nor Layout.astro's existing `<link>` tags). Needs a follow-up: copy the real `static/favicon.ico` over the placeholder and either remove the stray `favicon.svg`/its `<link>` or replace it with real brand artwork.
- [x] No automated tests required. Confirmed — no test files or test scripts reference these assets; `npm run build` is the only verification surface, and it passed.
