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

- [ ] Homepage, tags page, and 404 page all render on the branch-preview site with parity to the live site.
- [ ] `NewsletterSection` is a single shared component used by both the homepage and the blog post template, not duplicated.
- [ ] The full route set for the site now exists on the branch-preview deploy (every page type that exists on the live site has an Astro equivalent).
- [ ] No automated tests required — verify all three pages visually against the live site, and confirm the 404 page actually renders for a genuinely nonexistent URL on the preview deploy.
