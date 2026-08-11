# T16 — Decommission Gatsby

**Priority:** P2
**Depends on:** T15 (+ a bake period)

**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Clean up the old Gatsby app once the new Astro site has been live and stable for a while. This task has a genuine **time** dependency, not just a code one — don't rush straight into this the moment T15 finishes; give the live cutover some real-world observation time first (a few days to a couple of weeks is reasonable for a personal blog, adjust to your own comfort level).

## Current state

- After T15, the repo contains both the old Gatsby app (root-level `gatsby-*.js`, `src/`, `static/`, the old `netlify/functions/`, and Gatsby-only dependencies in the root `package.json`) and the new Astro app (`/astro`), with production now building from `/astro`.

## Steps

1. **Bake period first.** Watch production for real traffic, confirm analytics looks normal, confirm no unexpected error reports, before deleting anything.
2. Once confident, remove the old Gatsby-specific files from the repo root: `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.jsx`, `gatsby-ssr.jsx`, `sanity.config.js` (if fully superseded by the Astro-side Sanity config), the old `src/` tree, `static/`, and the old root-level `netlify/functions/` directory (already superseded by the relocated copy under `/astro` per T12).
3. Remove Gatsby-only dependencies from the root `package.json` (or delete the root `package.json` entirely if `/astro` has its own and nothing at the root is needed anymore).
4. **Flatten `/astro` back to the repo root** — move its contents up so the repo returns to a normal single-app layout rather than permanently living in a subdirectory. Update `netlify.toml` accordingly (remove the `base = "astro"` context override now that root *is* the Astro app, and fold what was branch-scoped config back into top-level/production settings if it isn't already there from T15).
5. Remove any preview-only `noindex` guard that was added during the migration (per the tracker's gotcha list) now that this is the sole, permanent production site — don't leave a stray noindex header active on production.
6. Delete the now-merged `astro-migration` branch once everything above is confirmed working on `main`.

## Netlify / config notes

- After flattening, re-verify the site's build settings one more time (base directory should now be empty/root, not `astro`) — this is a second opportunity for the same "wrong base directory" class of mistake T15 already warned about, so don't skip re-checking it here.

## Definition of done

- [ ] A real bake period has passed with no issues before this task starts.
- [ ] All Gatsby-specific files and dependencies are removed from the repo.
- [ ] The former `/astro` contents now live at the repo root, and `netlify.toml`/production build settings are updated to match.
- [ ] Any preview-only `noindex` guard is removed.
- [ ] The migration branch is deleted after everything is confirmed stable on `main`.
- [ ] No automated tests required.
