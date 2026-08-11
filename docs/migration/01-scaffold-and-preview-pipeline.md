# T1 — Scaffold `/astro` + prove the Netlify branch-preview pipeline

**Priority:** P0
**Depends on:** —
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Get a trivial Astro page building and deploying through Netlify's branch-preview pipeline, from a `/astro` subdirectory, without touching any real content or design work. This task exists purely to de-risk the deploy mechanics before any real feature work happens on top of it — if the subdirectory/branch-context setup is going to have a gotcha, better to find it now on a blank page than later on top of a fully-built site.

## Current state

- No `netlify.toml` exists in this repo today — all production build settings live in the Netlify UI.
- The Gatsby app lives at the repo root and must keep building from `main` unaffected by anything done here.
- `netlify/functions/subscribe-user/` currently lives at the repo root; it is **not** moved in this task (that happens in T12).

## Steps

1. Create a new branch off `main` for the whole migration, e.g. `astro-migration`. This is the one long-lived branch every subsequent task works on.
2. Inside the repo, scaffold a new Astro project into `/astro` (`npm create astro@latest` run with the target directory set to `astro`, or manually if you want more control over the starting template). Choose the minimal/blank template — no need for a starter theme.
3. Add Tailwind's Astro integration (`npx astro add tailwind` from inside `/astro`) but leave the actual `tailwind.config` content minimal for now — the full port happens in T3. The goal here is just proving the build pipeline works, not building the design system.
4. Build a single trivial page (e.g. `/astro/src/pages/index.astro` with placeholder text) and confirm `npm run build` inside `/astro` produces output in `astro/dist`.
5. Add a `netlify.toml` at the **repo root** with a branch-scoped context block only — do not add a top-level `[build]` block that could affect `main`:
   ```toml
   [context.astro-migration]
     base = "astro"
     command = "npm run build"
     publish = "dist"
   ```
   Use the exact branch name (`context.astro-migration`), not the generic `context.branch-deploy`, so no other future branch accidentally inherits this.
6. Push the branch and confirm Netlify picks it up as a branch deploy, using the `astro-migration` context, building only the `/astro` subdirectory. Confirm the resulting preview URL serves the trivial page.
7. **Verify `main` is unaffected**: trigger (or wait for) a deploy of `main` and confirm it still builds Gatsby from the repo root exactly as before. This is the single most important check in this task — a broken production build here derails everything downstream.
8. Decide and record (in this file or the tracker) whether Astro's `PUBLIC_` env var convention will be used from the start — see the tracker's env var table. No real env vars are needed yet, but note the convention now so T2 doesn't have to rediscover it.

## Netlify / config notes

- Netlify resolves `publish` (and, once functions exist, `functions`) relative to `base`. Confirm this resolves the way you expect with `publish = "dist"` before building anything real on top of it — this is exactly the kind of assumption worth checking now rather than debugging later under a real deploy.
- Scope any env vars added later to the `astro-migration` branch context specifically, not globally, unless they're meant to apply to Gatsby too.
- Consider adding an `X-Robots-Tag: noindex` header (via a `netlify.toml` `[[headers]]` block scoped to the branch context, or a build-time conditional) once real content exists — not required for this trivial-page task, but worth deciding the mechanism now since T10/T11 will produce real RSS/sitemap output that shouldn't get indexed from the preview subdomain.

## Decisions

- **Env var prefix convention confirmed:** Astro's `PUBLIC_` prefix convention (Vite-based client-exposed env vars) will be used from the start, per the tracker's [env var reference table](00-tracker.md#env-var-reference-applies-across-t1-t2-t12-t15). No real env vars are introduced in this task — the scaffold builds with none — but future tasks (T2, T12, T15) should follow that table as-is rather than rediscovering the convention.

## Definition of done

- [x] `/astro` exists with a minimal Astro + Tailwind scaffold and one trivial page.
- [x] `netlify.toml` exists at repo root with a branch-scoped (not top-level) context block.
- [ ] The `astro-migration` branch has a working Netlify branch-preview deploy serving the trivial page.
- [ ] `main` still deploys Gatsby successfully, unaffected by the new `netlify.toml`.
- [ ] No automated tests required — this is a manual "does the preview URL load" check.
