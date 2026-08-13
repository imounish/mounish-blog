# T9 — Homepage & static pages

**Priority:** P1
**Depends on:** T6, T7, T8
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Build the remaining non-templated pages — the homepage, the tags page, and the 404 — closing out the "real content" portion of the migration. After this task, the site's full route set exists, which is what T11 (sitemap) and T13 (search indexing) are both waiting on.

## Current state

- `src/pages/index.jsx`: the homepage — likely composed from `src/components/homepage/{HeroSection,FeaturedBlogs,FeaturedCategories,NewsletterSection}.jsx`.
- `src/pages/tags.jsx`: the tags listing page.
- `src/pages/404.jsx`: the not-found page.
- `src/components/homepage/NewsletterSection.jsx` also appears embedded at the bottom of `single-blog-post.jsx` (T6) — build it once here as a shared component both places import, rather than duplicating it.

## Steps

1. Build `/astro/src/pages/index.astro`, porting `HeroSection`, `FeaturedBlogs`, `FeaturedCategories`, and `NewsletterSection` as Astro components, pulling "featured" data from the GROQ queries established in T2 (add a featured-content query if the current implementation uses one, e.g. most recent N posts).
2. Build `/astro/src/pages/tags/index.astro` (or `tags.astro`, matching the current single-page convention) porting `src/pages/tags.jsx`'s content and whatever tag-listing components it uses from `src/components/tags/`.
3. Build `/astro/src/pages/404.astro`, porting `src/pages/404.jsx`. Confirm Astro serves this the same way Gatsby does for genuinely unmatched routes (Astro's static 404 convention).
4. Make sure `NewsletterSection` is built as a single shared component referenced both here and in T6's blog post template, not duplicated — the actual submit behavior isn't wired up until T12, but the visual component should exist and be shared now.

## Netlify / config notes

None specific beyond what T1–T3 already established.

## Definition of done

- [x] Homepage, tags page, and 404 page all render — verified via local `npm run build` output (`dist/index.html`, `dist/tags/index.html`, `dist/404.html`) with field-for-field parity to the Gatsby sources (`src/pages/index.jsx`, `tags.jsx`, `404.jsx`) and their component dependencies. Live branch-preview visual comparison not done — no Netlify credentials in this environment, same gap as T1–T8.
- [x] `NewsletterSection` is a single shared component used by both the homepage and the blog post template, not duplicated — confirmed only one file (`astro/src/components/homepage/NewsletterSection.astro`) exists, imported by both `astro/src/pages/index.astro` and `astro/src/pages/posts/[slug].astro`.
- [x] The full route set for the site now exists locally (confirmed via `npm run build` producing all 19 pages: `/`, `/tags`, `/404`, `/posts`, `/posts/*`, `/categories`, `/categories/*`, `/authors`, `/authors/*`). Whether this route set is live on a branch-preview deploy was not verified — no Netlify credentials in this environment.
- [ ] No automated tests required — visual comparison against the *live* site was not performed (no Netlify credentials/browser access in this environment); the 404 page was confirmed to build as `dist/404.html` (Astro's static-404 convention) but not confirmed to actually serve for a genuinely nonexistent URL on a live preview deploy.
