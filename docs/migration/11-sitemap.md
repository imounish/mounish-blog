# T11 — Sitemap

**Priority:** P2
**Depends on:** T6, T7, T8, T9
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Replace `gatsby-plugin-sitemap` with `@astrojs/sitemap`. This is sequenced after the content templates (T6–T9) specifically because a sitemap generated before the full route set exists is incomplete and not worth trusting — do this once every page type is actually building.

## Current state

- `gatsby-config.js`: `gatsby-plugin-sitemap` is enabled with no custom options, meaning it auto-discovers all generated pages.
- No `robots.txt` currently references a sitemap (see T4 — one is being added for the first time as part of this migration).

## Steps

1. Add `@astrojs/sitemap`: `npx astro add sitemap` from inside `/astro`. It auto-discovers static routes the same way the Gatsby plugin does; confirm the dynamic routes from T6–T8 (`getStaticPaths`-driven) are picked up correctly, since that's the one place auto-discovery could differ from Gatsby's behavior.
2. Set the `site` config value in `astro.config.mjs` to the production URL (`https://blog.mounish.dev`) — `@astrojs/sitemap` needs this to generate absolute URLs.
3. Confirm the generated sitemap's URL path (typically `/sitemap-index.xml` or `/sitemap.xml`) and update `robots.txt` (T4) to reference the exact path.
4. Spot-check the generated sitemap includes every route type: single posts, paginated post listings, single categories, paginated category listings, single authors, paginated author listings, homepage, tags page.

## Netlify / config notes

None specific to this task.

## Definition of done

- [ ] A sitemap is reachable on the branch-preview site and includes every route type the live site has.
- [ ] `robots.txt` references the correct sitemap path.
- [ ] The sitemap validates (well-formed XML, correct `<loc>` values using the production domain even when generated from a preview build).
- [ ] No automated tests required.
