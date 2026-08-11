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

- [ ] Every favicon/icon/manifest file referenced by `SEO.jsx` exists under `/astro/public/` and resolves on the branch-preview site.
- [ ] `robots.txt` exists and references the sitemap (update the exact path after T11 if it changes).
- [ ] Loading the branch-preview site and checking the browser tab icon, and a mobile "add to home screen" preview if convenient, shows the correct icon/theme color.
- [ ] No automated tests required.
