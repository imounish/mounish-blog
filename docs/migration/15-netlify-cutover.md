# T15 — Netlify cutover

**Priority:** P2
**Depends on:** T14
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Flip production over to the new Astro site. This is the highest-blast-radius task in the whole migration — get the ordering right (merge, then flip settings, never the reverse) and it's a non-event; get it backwards and the next `main` deploy breaks production.

## Current state

- Production build settings for `blog.mounish.dev` currently live entirely in the Netlify UI (no `netlify.toml` controls production today — T1's `netlify.toml` only added a branch-scoped context block for the migration branch).
- `main` has been building Gatsby from the repo root, unaffected, for the entire migration up to this point.

## Steps

1. **Confirm T14 is fully signed off** — this task assumes the branch-preview deploy has already been thoroughly verified. Don't start this task as a way of doing that verification.
2. **Move all `PUBLIC_*`/`SANITY_TOKEN`/`BEEHIIV_*`/page-size env vars from the branch-scoped context to the site's global/production Netlify env var settings** (or add a production-scoped equivalent), per the tracker's env var table — the branch-context-only vars used during migration won't apply once this becomes the production build.
3. **Merge the migration branch into `main`.** At this point `main`'s working tree contains both the (still-building, unaffected) Gatsby app at the root and the finished `/astro` app in the subdirectory — nothing changes for production yet, since Netlify's site-level build settings still point at the root/Gatsby build.
4. **Only after the merge succeeds and `main` has deployed once more (still as Gatsby, confirming nothing broke from the merge itself)**, flip the site's production build settings in the Netlify UI: base directory → `astro`, build command → `npm run build` (or whatever T1 settled on), publish directory → `dist`, functions directory → the relocated path from T12.
5. Trigger a fresh production deploy and watch it build.
6. **Post-cutover smoke test** (short — the real verification already happened in T14): load the live domain, click through a post, submit a real newsletter signup (and clean it up in Beehiiv after), run one search query, check `/rss.xml` and the sitemap resolve at the production domain, and confirm analytics is receiving production traffic (not still tagged as preview).
7. Remove the now-unnecessary branch-scoped `netlify.toml` context block for the migration branch, or leave it briefly if you want a fallback preview during the bake period (T16) — your call.

## Netlify / config notes

- This is the task where every gotcha from the tracker's "Netlify / branch-preview gotchas" section is directly relevant — re-read that list before starting.
- Specifically: **flip settings after merging, not before.** If production settings are flipped while `main` is still Gatsby-only, the next auto-deploy tries to build `/astro` from a `main` that doesn't have it yet (if flipped before merge) or, worse, succeeds against stale content if timed wrong. Do the merge, confirm one clean Gatsby deploy post-merge, then flip.
- Double-check the top-level (non-context-scoped) build settings in the Netlify UI end up matching what was previously only true inside `[context.astro-migration]` — the UI settings become the new "top level" now, effectively superseding the branch-context override from T1.

## Definition of done

- [ ] Production env vars are set at the site level (not just the migration branch's context).
- [ ] The migration branch is merged into `main`, and one deploy of `main` succeeded *before* any production build-setting changes were made.
- [ ] Production build settings now point at `/astro`, and a fresh production deploy succeeds.
- [ ] The live domain serves the new Astro site, and the post-cutover smoke test passes.
- [ ] No automated tests required.
