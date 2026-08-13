# T10 — RSS feed

**Priority:** P2
**Depends on:** T2
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Ship a real RSS/Atom feed — something the live site has never actually done. `gatsby-plugin-feed` is installed as a dependency in `package.json` but has always been commented out in `gatsby-config.js`. This is a low-risk, self-contained, genuinely new capability, and a good task to pick up whenever you want an easy, satisfying win without being blocked on other in-progress work.

## Current state

- `package.json`: `gatsby-plugin-feed` is listed as a dependency.
- `gatsby-config.js`: the plugin's config block is present but commented out — no feed has ever shipped in production.
- The GROQ blog-list query from T2 already has everything a feed needs: title, slug, publishedAt, and (for a richer feed) excerpt/description.

## Steps

1. Add `@astrojs/rss`: `npx astro add rss` (or install directly) from inside `/astro`.
2. Build a feed endpoint (typically `/astro/src/pages/rss.xml.js` or `.ts`) that queries the same blog-list data as T7's listing page and maps each post to a feed item: `title`, `pubDate` (from `publishedAt`), `link` (post URL), and `description` (excerpt).
3. Link the feed from the site — an `<link rel="alternate" type="application/rss+xml">` tag in `Layout.astro`'s head (T3) is the standard way readers/aggregators auto-discover it; consider also surfacing a visible RSS link somewhere in the footer if the current footer has room for one.
4. Update T4's `robots.txt` (or just note it) if the feed URL is something worth referencing there — not strictly necessary, but harmless.

## Netlify / config notes

None specific to this task.

## Definition of done

- [ ] `/rss.xml` (or whatever path is chosen) is reachable on the branch-preview site and returns valid RSS/Atom XML — the "returns valid XML" half is verified locally: `npm run build` produces `dist/rss.xml`, `xmllint --noout` confirms it's well-formed, and a Python `xml.etree.ElementTree` parse confirms channel `title`/`link`/`description` and 5 `<item>`s each with `title`/`link`/`pubDate`/`guid`. The "reachable on the branch-preview site" half is NOT verified — no Netlify credentials in this environment, left unchecked rather than assumed.
- [ ] The feed validates against a standard feed validator (e.g. the W3C Feed Validation Service) with no errors — NOT verified; the W3C validator needs a publicly reachable URL and no live branch-preview deploy is available in this environment. Local structural checks (well-formed XML, RSS 2.0 required elements present) are a reasonable proxy but not a substitute for the real validator.
- [x] Feed items include at minimum title, link, and publish date for real posts, matching what's actually live — confirmed in `dist/rss.xml`: 5 items matching the 5 real posts in the `production` Sanity dataset, `link`/`guid` are absolute URLs (`https://blog.mounish.dev/posts/<slug>/`), `pubDate` matches each post's `publishedAt`, `description` is a clean plain-text excerpt with no double-escaping (checked a post with both an apostrophe and quotation marks: renders as `&apos;`/`&quot;`, not `&amp;apos;`/`&amp;quot;`).
- [x] A `<link rel="alternate">` tag exists in the page head so feed readers can auto-discover it — confirmed in `dist/index.html`: `<link rel="alternate" type="application/rss+xml" title="mounish's blog — RSS feed" href="/rss.xml">`. Footer RSS icon link (`<a href="/rss.xml" title="RSS feed">`) also confirmed present in built HTML.
- [x] No automated tests required.
