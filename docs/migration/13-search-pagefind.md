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

- [ ] Search works end-to-end on the branch-preview site: opening the search modal, typing a query, and getting relevant results linking to real pages. (Verified against a local `astro preview` server instead — no Netlify branch-preview credentials in this environment. Live search itself, via a Node script reproducing `SearchResult.jsx`'s query flow against the built `dist/pagefind` index, worked and returned correct top results for 4 real terms.)
- [x] No flexsearch-related code or dependencies remain.
- [x] The Pagefind post-build step is part of the actual Netlify build command, not a manual local-only step.
- [x] A rough before/after check of client JS shipped for search (e.g. via browser dev tools network tab) shows a real reduction versus the current 4-index flexsearch setup.
- [x] No automated tests required — verify with a handful of real queries covering post titles, category names, and author names.

## Follow-up (2026-08-13): search was unusable in `astro dev`, plus real formatting gaps vs. Gatsby

T13's original sign-off above never actually exercised the search modal in a real browser — only a Node script calling `pagefind.search()` directly, and `astro build`/`astro check`/`eslint` output. That gap hid four real bugs, all now fixed, verified with `playwright-cli` against both `astro dev` and `astro preview`.

### 1. Search was completely broken under `astro dev`

Reported symptom: `Failed to resolve import "/pagefind/pagefind.js" from "SearchModal.jsx". Does the file exist?` — and it wasn't just missing, it broke every page, not only the search modal.

Two compounding causes:

- **Pagefind only exists after a production build.** It indexes `dist/`, which `astro dev` never produces. This was already known (see "Netlify / config notes" above), but nothing made local dev usable — a developer had to remember to `astro build` first and had no path from there to `astro dev` actually serving the result.
- **Vite's dev server refuses to `import()` any file inside `publicDir`**, full stop — even with `/* @vite-ignore */`, even if the file exists. This is a hard Vite restriction (`Cannot import non-asset file ... which is inside /public`), not a missing-file problem, and it fired for *every* page (not just on search-modal focus) because Vite's import-analysis plugin flagged the literal string specifier `'/pagefind/pagefind.js'` at transform time, before any user interaction.

Fixes:

- `astro/scripts/sync-pagefind-dev.mjs` (new) + `npm run pagefind:sync` / `predev` in `package.json`: builds the site (direct `astro build`/`pagefind` calls, never `npm run build`, so it can't recurse through an npm lifecycle hook) and copies `dist/pagefind` → `public/pagefind`, so the dev server has something to serve. Documented in `astro/AGENTS.md` since `astro dev --background` (the documented dev workflow) bypasses npm's `predev` hook.
- `SearchModal.jsx`: the import specifier is now a fully-qualified `new URL('/pagefind/pagefind.js', window.location.origin).href` instead of a root-relative string literal — this is what actually dodges Vite's publicDir-import guard (in both dev and the static build output). The dev-mode sync step alone did not fix this; the specifier change did.
- `SearchModal.jsx`: the dynamic import is now wrapped in try/catch — a missing/failed index shows an inline "run `npm run pagefind:sync`" message and resets the retry flag, instead of leaving search silently, permanently dead for the rest of the session.
- `astro/tsconfig.json` excludes `public/pagefind` (else `astro check` type-checks Pagefind's own minified vendor JS and floods output with noise); `eslint.config.mjs` adds a `globals.node` override scoped to `astro/scripts/**` (the new sync script uses `process`, which the repo's shared flat config — `globals.browser` only — doesn't know about).

### 2. The search modal rendered in the wrong place — real CSS bug, not a dev-only issue

Independent of the above: once search could run at all, the modal rendered pinned near the top-left instead of centered, with no backdrop dim/blur — reproduced identically in `astro dev` **and** `astro preview`, so this wasn't a dev artifact.

Root cause: Gatsby's `Layout.jsx` renders `<Search />` (the modal) as a **sibling** of `<Header />`. Astro islands can't share React context across separate `client:*` roots, so T13's port bundled the button + modal + context into one island (`Search.jsx`) rendered *inside* `Header.astro`'s slot — a reasonable-looking adaptation that had a side effect: the modal's `position: fixed` element is now a descendant of the header, which carries `backdrop-blur-lg` (`backdrop-filter`). Per the CSS spec, an ancestor with `backdrop-filter` becomes the containing block for `position: fixed` descendants, so `.modal`'s `calc(50% - 20rem)` resolved against the header's box instead of the viewport.

Fix: `SearchModal.jsx` now renders through `createPortal(..., document.body)`, restoring the same containing block Gatsby's sibling placement gave it for free, without splitting the island back apart. (Also fixed in passing: `` `font-worksans + ${modal}` `` had a stray literal `+` as its own class token, ported verbatim from a Gatsby typo — harmless, but cleaned up to `` `font-worksans ${modal}` ``.)

### 3. Search results didn't match Gatsby's formatting

The original port rendered every Pagefind result identically (title + plain-text excerpt) regardless of type. Gatsby's flexsearch-backed UI rendered a distinct card per content type — pulled from Pagefind's `result.meta`, this now matches:

- **Blogs**: cover thumbnail + title + "On {date}" (`BlogResultItem` in `SearchResultItem.jsx`), matching `BlogSearchResultItem` in the Gatsby app.
- **Categories**: plain bold title, no image — matches `CategorySearchResultItem`. Previously showed the raw `<title>` tag text including the " | mounish's blog" suffix (e.g. "Movies | mounish's blog") since no `data-pagefind-meta="title"` was set on the category/author page headings; now wrapped in a `<span data-pagefind-meta="title">` on both.
- **Authors**: profile photo + name + one-line description (`AuthorResultItem`), matching `AuthorSearchResultItem`. The description isn't rendered visibly on either app's author page (Gatsby's flexsearch store carried it straight off the Sanity document instead) — reproduced as a `sr-only` element with `data-pagefind-meta="description"` on `AuthorHero.astro`, so search parity doesn't add UI Gatsby never had.

`data-pagefind-meta="image[src]"` was added to the cover/profile `<img>` elements in `posts/[slug].astro` and `AuthorHero.astro`; `data-pagefind-meta="date"` to `PostHeadingSection.astro`'s published-date spans.

### 4. Pagefind was indexing far more than Gatsby's flexsearch ever did

Gatsby's four `gatsby-plugin-local-search` indices were curated: only blog/category/tag/author *content* documents, never listing or utility pages. Pagefind crawls the entire built `dist/` by default, so the original port indexed all 19 pages, including `/posts`, `/categories`, `/authors`, `/tags`, `/`, and `/404`. Concretely, this leaked noise into results — e.g. searching "coffee" surfaced the `/posts` listing page itself (title rendered as "all posts | mounish's blog") ranked above real posts, since the listing page's card grid repeats every post's title/excerpt.

Fixed by adding `data-pagefind-body` to the actual article-content wrapper in `posts/[slug].astro`, `categories/[slug].astro`, and `authors/[slug].astro`. Per Pagefind's documented behavior, the presence of `data-pagefind-body` *anywhere* on the site switches it to an opt-in mode, indexing only elements carrying that attribute — every other page (listings, homepage, tags, 404) is now automatically excluded. Indexed page count dropped from 19 to 12 (5 posts + 6 categories + 1 author — exactly Gatsby's content-page count, tags excluded same as before since there's no per-tag detail page in either app).

Two related-content widgets that sit *inside* an indexed page's own `data-pagefind-body` were separately excluded via `data-pagefind-ignore`, since they list *other* pages' content rather than the current page's own: `posts/[slug].astro`'s "other posts in this category" (`CategoryCatalogue`) and `categories/[slug].astro`'s post grid. Before this, e.g. "The Night of the Winds" post page leaked "A Coffee can change your Life" fragments into its own search excerpt purely because that unrelated post happened to be listed in its category sidebar.

### Verification

`playwright-cli` against a real Chromium browser, both `astro dev` (after `npm run pagefind:sync`) and `astro preview` (after `npm run build`): opened the search modal, typed "coffee"/"movies"/"Mounish", confirmed centered/blurred modal, correct grouped section headers, image+title+date blog cards, plain-title category cards, image+name+description author cards, zero irrelevant listing-page hits, 0 console errors, and dark mode rendering correctly. `npx astro check` (0 errors/warnings, 2 pre-existing hints) and `npx eslint src scripts` (clean) both still pass after all changes.

### Independent verification (2026-08-13)

Re-verified fresh, from scratch, by a separate subagent with no prior context on this task. All four fixes and their causal claims check out; found one harmless doc inconsistency, no functional gaps.

- **Bug #1 (astro dev crash), causal story confirmed precisely, not just "it works now":** `rm -rf dist public/pagefind` then `astro dev --background` → homepage 200s, `/pagefind/pagefind.js` plain-404s (site does not crash — confirms the *only* remaining failure mode pre-sync is a 404, not the "every page 500s" bug). Ran a full `npm run build` (`dist/pagefind` now exists) and confirmed `astro dev` still 404s on `/pagefind/pagefind.js` without a sync — Vite's dev server genuinely never serves from `dist/`, only from `public/`, so the sync step is real and necessary, not redundant. Then directly tested the specifier-fix causal claim: with `public/pagefind` populated (so the file genuinely exists and is servable), temporarily reverted `SearchModal.jsx`'s import to the old root-relative string literal (`import('/pagefind/pagefind.js')`) and reloaded — reproduced a hard 500 on every page, with the dev-server log showing the exact predicted Vite error: `Cannot import non-asset file /pagefind/pagefind.js which is inside /public ... Plugin: vite:import-analysis`. Restored the fully-qualified `new URL(...).href` fix and the crash was gone. This directly confirms the writeup's central claim: the specifier change, not the dev-mode copy, is what fixes the site-wide crash — the copy only fixes the search feature itself being able to find an index. Also confirmed the graceful-degradation path: with the fix in place and `public/pagefind` removed again, the site stays up (200), opening the modal shows the inline "Search index not found... run `npm run pagefind:sync`" message with only a benign network 404 in the console, not a crash. `package.json` has no `postbuild` script (confirmed no infinite-recursion risk), and `scripts/sync-pagefind-dev.mjs` calls `execFileSync('npx', ['astro', 'build'])` / `execFileSync('npx', ['pagefind', ...])` directly, never `npm run build` — confirmed by reading the file, not just grepping.
- **Bug #2 (modal positioning), confirmed visually:** at 1400×900, the modal renders centered with a visible blurred/dimmed backdrop, in both `astro dev` and `astro preview` — screenshots taken, not just DOM-inspected.
- **Bug #3 (result formatting), confirmed against real content, both structurally and visually:** `SearchResultItem.jsx`'s `BlogResultItem`/`CategoryResultItem`/`AuthorResultItem` class names and layout verified line-for-line against the Gatsby `BlogSearchResultItem`/`CategorySearchResultItem`/`AuthorSearchResultItem` — all match (one minor, unclaimed divergence: Gatsby's blog card prefixes the title with the post's category name in a light span; the Astro port omits it since no `data-pagefind-meta` carries that field — cosmetic, not something the writeup claimed to have ported). Live searches for "coffee" (blogs), "movies" (category), and "Mounish" (author) all rendered the correct distinct card types with real images/dates/descriptions, not a generic fallback. Confirmed built `<title>` tags still carry the " | mounish's blog" suffix (e.g. "Movies | mounish's blog") while the live search result correctly shows the clean "Movies"/"Mounish Pedagandham" via the `data-pagefind-meta="title"` override — verified both the raw HTML and the rendered search result, not just one or the other.
- **Bug #4 (indexing scope), confirmed by number and by construction:** a completely clean `rm -rf dist` + `npm run build` reproduced the Pagefind CLI's own "Indexed 12 pages" log exactly, cross-checked against `find dist/{posts,categories,authors} -mindepth 1 -maxdepth 1 -type d` → 5 + 6 + 1 = 12. Confirmed `data-pagefind-body` is present and correctly scoped in all three `[slug].astro` templates (wraps title/image/body, not nav/footer/newsletter), and that no listing/index page (`/posts`, `/categories`, `/authors`, `/tags`, `/`, `/404`) carries `data-pagefind-body` anywhere. Confirmed `data-pagefind-ignore` on the two related-content widgets doesn't accidentally exclude a post's own body — `ExcerptText`/`RichText` sit outside any `data-pagefind-ignore` wrapper. Live "coffee"/"movies" searches show zero listing-page hits.
- **Build health:** `npx astro check` → 0 errors, 0 warnings, 2 pre-existing hints (byte-identical to the writeup's claim). `npx eslint src scripts` → clean, only the pre-existing "React version not specified" warning. `tsconfig.json` excludes `public/pagefind` (confirmed) and `eslint.config.mjs`'s override is scoped to `files: ["astro/scripts/**/*.mjs"]` only (confirmed narrow, can't affect Gatsby-app linting).
- **Regression:** fresh `npm run build` succeeds end-to-end (19 pages, matching T9's route count); `astro preview` spot-checked with curl — homepage/post/category/author pages and `/pagefind/pagefind.js` all 200. `git diff --stat` matches the writeup's described scope exactly (14 modified files + new `astro/scripts/sync-pagefind-dev.mjs`); `dist/` and `public/pagefind/` are untracked and properly gitignored, nothing staged that shouldn't be.
- **One harmless nit found, not worth blocking on:** `astro/.gitignore`'s new comment on the `public/pagefind/` line says "see package.json's predev/postbuild/pagefind:sync scripts" — there is no `postbuild` script in `package.json` (only `predev`, `build`, `pagefind:sync`). Doesn't affect behavior, just a stale word in a comment; flagging so it can be fixed opportunistically.

Verdict: all four bug fixes and the formatting/indexing-scope improvements hold up under independent, from-scratch reproduction — including the specific causal claim (specifier fix vs. dev-copy) that's easiest to get wrong. T13 is genuinely done.

### Post-verification cleanup (2026-08-13)

Closed the two items the independent verification flagged as non-blocking:

- **`.gitignore` stale comment**: removed the reference to a nonexistent `postbuild` script.
- **Category-prefix gap on blog result cards**: `CategoryCatalogue.astro` (rendered inside every post's own `data-pagefind-body`) now tags the category name with `data-pagefind-meta="category"`, scoped precisely to just the category name/description — the adjacent "other posts in this category" grid is still `data-pagefind-ignore`d, unaffected. `SearchResultItem.jsx`'s `BlogResultItem` renders it as a light leading span ahead of the title, matching Gatsby's `BlogSearchResultItem` exactly (e.g. "Short Stories A Coffee can change your Life"). Re-verified: `Indexed 12 pages` unchanged (no widening of index scope), `npx astro check`/`npx eslint src scripts` still clean, and a live "coffee" search screenshot in `astro dev` shows the category prefix on both result cards with no regression to the rest of the layout.
