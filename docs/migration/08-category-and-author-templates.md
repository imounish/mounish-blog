# T8 — Category & author templates

**Priority:** P1
**Depends on:** T7
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Build `/categories/:slug`, `/categories` (+ pagination), `/authors/:slug`, and `/authors` (+ pagination) — reusing T7's pagination pattern rather than rebuilding it. This task should feel like configuration on top of proven logic, not fresh template work, since `gatsby-node.js` treats these identically to posts structurally.

## Current state

- `gatsby-node.js`: the category and author single-page + list-page blocks mirror the posts blocks exactly, with `GATSBY_CATEGORIES_PER_PAGE` (default 6) and `GATSBY_AUTHORS_PER_PAGE` (default 4) driving page size.
- `src/templates/single-category.jsx` (+ `.module.css`), `src/templates/category-list.jsx`, `src/templates/single-author.jsx`, `src/templates/author-list.jsx` — the four current templates to port.
- `src/components/categories/`, `src/components/authors/`, `src/components/tags/` — presentational components these templates likely draw on (tags appear on blog posts via `TagsArray`, ported in T6, and `src/pages/tags.jsx` is handled separately in T9).

## Steps

1. Build `/categories/[slug].astro` and `/authors/[slug].astro` for the single-item pages, using GROQ single-item queries analogous to T6's blog-post query but with the smaller category/author field sets.
2. Build `/categories/index.astro` + `/categories/[page].astro` and `/authors/index.astro` + `/authors/[page].astro` using **T7's pagination helper directly** — just supply the category/author GROQ list query and the respective page-size env var; the pagination math itself shouldn't be rewritten.
3. Port `single-category.jsx`/`category-list.jsx`/`single-author.jsx`/`author-list.jsx`'s presentational content (whatever card/list layout they currently render) as Astro components.
4. Confirm URL scheme parity for both: `/categories`/`/categories/N`, `/authors`/`/authors/N`, matching `gatsby-node.js`'s exact path logic.

## Netlify / config notes

None specific beyond what T1–T3 already established.

## Definition of done

- [ ] `/categories/:slug`, `/categories` (+ a paginated page if content warrants it), `/authors/:slug`, and `/authors` (+ pagination) all render on the branch-preview site with parity to the live site.
- [ ] The pagination logic here is a direct reuse of T7's helper, not a re-implementation.
- [ ] No automated tests required — verify by comparing at least one category page and one author page side by side with the live site.
