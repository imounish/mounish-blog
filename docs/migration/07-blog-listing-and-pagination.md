# T7 — Shared pagination pattern + blog listing template

**Priority:** P1
**Depends on:** T2, T3, T5
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Build the `/posts` (and `/posts/2`, `/posts/3`, ...) listing pages, and — importantly — build the pagination logic as a **reusable pattern**, not a one-off. `gatsby-node.js` implements essentially identical `limit`/`offset`/`numberOfPages`/`currentPage` logic three separate times, once each for posts, categories, and authors. Building it once here means T8 (categories/authors) is mostly configuration, not new logic.

## Current state

- `gatsby-node.js`: the `totalBlogListPages` block (`Math.ceil(blogs.length / postsPerPage)`, then a loop creating `/posts`, `/posts/2`, ... with `context: { limit, offset, numberOfPages, currentPage }`) is the template for all three list types — the categories and authors blocks below it are structurally identical with different source arrays and env-var-driven page sizes.
- `src/templates/blog-post-list.jsx`: the current rendering of one page of the paginated list — check its use of `BlogGrid`/`FeaturedBlogGrid`/`BlogItem` (`src/components/blogs/`) for the card/grid layout, and whatever pagination-control UI it renders (page numbers / prev-next).
- Page size env var: `GATSBY_POSTS_PER_PAGE` (default 10) — becomes unprefixed `POSTS_PER_PAGE` per the tracker's env var table (server-only, read in `getStaticPaths`).

## Steps

1. Write a small, reusable pagination helper (plain function, not a component) that takes a total item count and a page size and returns the same shape `gatsby-node.js` computes today (`numberOfPages`, and per-page `limit`/`offset`/`currentPage`) — this is the piece that gets reused in T8, so keep it generic (no posts-specific naming).
2. Build `/astro/src/pages/posts/index.astro` and `/astro/src/pages/posts/[page].astro` (or a single `[...page].astro` route, whichever Astro's pagination conventions make cleaner) using `getStaticPaths`, driven by the helper from step 1 and the GROQ blog-list query from T2.
3. Port `BlogGrid`/`BlogItem`/`FeaturedBlogGrid` (`src/components/blogs/`) as Astro components — presentational, no interactivity expected.
4. Port whatever pagination-control UI `blog-post-list.jsx` currently renders (page numbers, prev/next links).
5. Confirm the URL scheme matches exactly: page 1 at `/posts` (no `/1` suffix), page 2+ at `/posts/2`, `/posts/3`, etc. — this mirrors `gatsby-node.js`'s `index === 0 ? '/posts' : '/posts/${index + 1}'` logic exactly, and getting it wrong would silently break existing inbound/indexed links.

## Netlify / config notes

None specific beyond what T1–T3 already established.

## Definition of done

- [ ] `/posts` and at least one paginated page (`/posts/2` or later, if enough content exists) render on the branch-preview site with the same card layout and pagination controls as the live site.
- [ ] The pagination helper from step 1 is written generically enough to be reused as-is in T8, not posts-specific.
- [ ] URL scheme matches exactly (`/posts` for page 1, `/posts/N` for page N≥2).
- [ ] No automated tests required — verify by comparing the listing page(s) side by side with the live site, including at the last page (checking the "remainder" page renders correctly when post count doesn't divide evenly by page size).
