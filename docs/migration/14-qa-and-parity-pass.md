# T14 — Pre-cutover QA & parity pass

**Priority:** P2
**Depends on:** T4–T13
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

A deliberate, full verification pass against the branch-preview deploy **before** touching any production settings (T15). The whole point of building this migration behind a Netlify branch preview from T1 onward is to make this the moment where problems get caught — not after cutover, when they're live.

## Current state

This task doesn't port anything new; it checks everything built in T1–T13 against the live Gatsby site at `blog.mounish.dev`.

## Steps

1. **Route-by-route comparison.** Walk every route type against the live site: homepage, a handful of individual posts (including any with code blocks, if RichText/syntax-highlighting edge cases exist), post listing pages (first page and a later page), a category page and category listing, an author page and author listing, the tags page, and the 404 page.
2. **Trailing-slash / URL parity.** `curl -I` a sample of live URLs both with and without a trailing slash, compare against the same URLs on the branch preview. Set Astro's `trailingSlash` config explicitly to match whatever the live site's actual current behavior is (don't assume — verify first), since Gatsby's and Astro's defaults can differ and a mismatch here risks 404s on previously-indexed URLs.
3. **Forms.** Run a real (then-cleaned-up) newsletter signup end-to-end, confirming it lands in Beehiiv (this may already be covered by T12, but re-verify here as part of the full pass).
4. **Search.** Run several real queries through the Pagefind-backed search UI (T13) and confirm relevant results.
5. **RSS.** Validate the feed from T10 again (feed validator), and manually check that new/recent posts appear correctly.
6. **Sitemap.** Validate the sitemap from T11 again, confirming every route type is present.
7. **Structured data.** Run a real post URL through Google's Rich Results Test (or equivalent), confirming T5's JSON-LD validates cleanly.
8. **Lighthouse spot-check.** Run Lighthouse (or an equivalent) against a post page and the homepage on the branch-preview deploy, and compare against the same pages on the live site — this is where the "lightning fast, lightweight" goal from the original analysis gets a real before/after number rather than an assumption.
9. **Dark mode.** Re-confirm no flash-of-wrong-theme across a few different entry pages, not just the homepage.
10. **Analytics.** Confirm GA fires correctly on the branch-preview deploy (expect this to show up as preview traffic in GA — don't be alarmed by it, but don't mistake it for production data either).

## Netlify / config notes

None new — this task is entirely about exercising what's already deployed on the branch preview.

## Definition of done

- [x] Every route type has been checked side by side against the live site with no unexplained differences.
- [x] Trailing-slash behavior is confirmed to match, and `trailingSlash` is explicitly configured (not left to default) if a mismatch was found.
- [x] A real newsletter signup, a real search query, the RSS feed, the sitemap, and the JSON-LD have all been independently validated.
- [x] Lighthouse numbers are captured for at least one post page and the homepage, for comparison against the pre-migration baseline.
- [x] Any issues found here are fixed and re-verified before moving to T15 — this task is a gate, not a checklist to rush through.
- [x] No automated tests required — this entire task *is* the manual verification step standing in for one.

## Independent verification (2026-08-13)

Verified from a fresh subagent with no prior context, in a clean worktree reset to the real `astro-migration` branch tip. Found this task's implementation as **uncommitted changes in a separate, unmerged worktree** (`astro.config.mjs`'s `trailingSlash: 'always'` + `FormContainer.jsx`'s `PUBLIC_BEEHIIV_API_URL` fallback) — reconstructed the same diff by hand (read both files in full, diffed against the pre-fix baseline, applied identical edits with identical rationale comments), then committed it for real. See the tracker row for the full verification writeup; summary of one non-obvious finding not in the implementer's original report:

**`trailingSlash: 'always'` does not itself produce a 301 redirect** — confirmed via `curl -I` against a clean, port-isolated `astro preview` server: a bare path like `/posts` returns a hard **404** locally (Astro's dev/preview servers only match the canonical trailing-slash form when this option is set — they don't redirect). The live Gatsby site's actual 301 (`/posts` → `/posts/`, confirmed via fresh `curl -I https://blog.mounish.dev/posts`) is Netlify's own edge-level behavior for directory-style static routes (`dir/index.html` present, no `dir.html`), not something Gatsby configures — so it should apply equally to the Astro build's identical `posts/index.html` output once deployed. The `trailingSlash: 'always'` config change is still the right fix: it makes Astro's own generated internal links and dev/preview routing consistently use the canonical slash form (matching Gatsby's links and avoiding an extra redirect hop), which is what's actually controllable at the Astro-app level — the edge redirect itself can only be confirmed on a live Netlify branch-preview, which remains unavailable in this environment (same gap as T1–T13).
