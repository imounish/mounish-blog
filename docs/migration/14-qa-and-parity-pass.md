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

- [ ] Every route type has been checked side by side against the live site with no unexplained differences.
- [ ] Trailing-slash behavior is confirmed to match, and `trailingSlash` is explicitly configured (not left to default) if a mismatch was found.
- [ ] A real newsletter signup, a real search query, the RSS feed, the sitemap, and the JSON-LD have all been independently validated.
- [ ] Lighthouse numbers are captured for at least one post page and the homepage, for comparison against the pre-migration baseline.
- [ ] Any issues found here are fixed and re-verified before moving to T15 — this task is a gate, not a checklist to rush through.
- [ ] No automated tests required — this entire task *is* the manual verification step standing in for one.
