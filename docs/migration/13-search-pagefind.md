# T13 — Search: Pagefind integration

**Priority:** P2
**Depends on:** T6, T7, T8, T9
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Replace the four bundled `flexsearch` indices with [Pagefind](https://pagefind.app), a build-time static search tool that indexes the site's *built HTML output* rather than shipping search-index data and a search runtime to the client. This directly serves the "lightweight" goal from the original analysis and is a structural improvement over porting flexsearch as-is.

## Current state

- `gatsby-config.js`: four separate `gatsby-plugin-local-search` blocks (blogs, categories, tags, authors), each with its own GraphQL query, `ref`/`index`/`store` config, all using the `flexsearch` engine — these get removed entirely, not ported.
- `src/components/search/{SearchButton,SearchField,SearchModal,SearchResult,SearchResultHolder,SearchResultItem}.jsx` (+ associated `.module.css` files): the search UI — this **does** get ported, just re-wired to a different backend.
- `src/context/searchModalContext.jsx`: open/close state for the search modal — ports directly, no backend-specific logic here.

## Steps

1. **Sequence this after T6–T9, not alongside them.** Unlike flexsearch (which Gatsby indexes at GraphQL/build time, independent of final HTML), Pagefind runs as a post-build CLI step that crawls the actual generated `dist/` output. It needs real, structurally-final pages to index against — running it against placeholder/incomplete pages produces a placeholder/incomplete index.
2. Add Pagefind to the Astro build: `npx pagefind --site dist` as a post-build step (e.g. wired into the `build` script in `/astro/package.json` as `astro build && pagefind --site dist`).
3. Port the search UI components (`SearchButton`, `SearchModal`, `SearchField`, `SearchResult*`) to call Pagefind's client-side search API (`pagefind.js`, loaded from the generated `_pagefind` assets) instead of the flexsearch store lookups they use today. Pagefind's JS is loaded on demand (e.g. when the search modal opens), not bundled into the main page load — this is where most of the weight savings versus the current 4-index flexsearch bundle comes from.
4. Confirm the indexed content quality is good: Pagefind indexes by default based on visible page text and heading structure, so verify blog post titles/excerpts surface sensibly in results — you may need `data-pagefind-*` attributes on specific elements (e.g. to boost titles, or exclude nav/footer chrome from indexing) to match the relevance quality the current curated flexsearch stores provide.
5. Decide whether category/tag/author search (previously 3 of the 4 separate indices) is still needed as distinct search scopes, or whether a single unified Pagefind index across all page types is sufficient — this is a product decision, not just a technical port; the current UI's separation may or may not be worth preserving.

## Netlify / config notes

- Make sure the post-build `pagefind` step actually runs as part of the Netlify build command for the migration branch context (i.e. it needs to be part of the `command` in `netlify.toml`/the build script, not just a local dev step you remember to run manually).

## Definition of done

- [ ] Search works end-to-end on the branch-preview site: opening the search modal, typing a query, and getting relevant results linking to real pages.
- [ ] No flexsearch-related code or dependencies remain.
- [ ] The Pagefind post-build step is part of the actual Netlify build command, not a manual local-only step.
- [ ] A rough before/after check of client JS shipped for search (e.g. via browser dev tools network tab) shows a real reduction versus the current 4-index flexsearch setup.
- [ ] No automated tests required — verify with a handful of real queries covering post titles, category names, and author names.
