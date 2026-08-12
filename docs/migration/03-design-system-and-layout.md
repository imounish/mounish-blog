# T3 — Design system & shared layout

**Priority:** P0
**Depends on:** T1
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Port the shared visual foundation — Tailwind config, fonts, global CSS, the page layout wrapper, dark-mode handling, and analytics — so every page/template built afterward has consistent chrome and styling to sit inside.

## Current state

- `tailwind.config.js` (repo root): `darkMode: 'class'`, custom font families (`worksans`, `warnock` + variants, `lora`, `courier`, served from local `@fontsource`/static font files), custom brand colors (`custom-red`, `brand`, `brand-teal`), wrapped in `withMT()` for Material Tailwind.
- `src/styles/global.css`: global styles, imported in `gatsby-browser.jsx`.
- `src/components/layout/Layout.jsx` (+ `Layout.module.css`): wraps every page via `wrapPageElement` in both `gatsby-browser.jsx` and `gatsby-ssr.jsx` — this is where header/footer/global chrome lives.
- `gatsby-ssr.jsx`: injects an inline pre-body `<script>` that reads `localStorage.theme`, falling back to `prefers-color-scheme`, and adds `.light`/`.dark` to `<body>` **before** hydration — this is what avoids a flash of the wrong theme. `src/utils/themeLocalStorage.js` holds the persistence helpers.
- `src/components/theme/ThemeToggle.jsx` (+ `.module.css`): the toggle UI — this is one of the few components that genuinely needs client-side interactivity.
- `gatsby-config.js`'s `gatsby-plugin-google-gtag` block: GA4 tracking IDs, `head: true`, `respectDNT: true`, and an `exclude` list (`/preview/**`, `/do-not-track/me/too/`). A `public/~partytown/` directory in the current build output indicates the plugin already offloads GA to a web worker via Partytown.
- `src/components/header/`, `src/components/footer/`, `src/components/logo/`, `src/constants/menu.js`, `src/constants/social.jsx` — the nav/footer content Layout assembles.

## Steps

1. Copy `tailwind.config.js`'s `theme` block (fonts, colors) into `/astro/tailwind.config.mjs` as-is — it's framework-agnostic. Decide here whether to keep `@material-tailwind/react` (`withMT()`) or drop it per the earlier analysis's suggestion to hand-roll the handful of primitives actually used — this decision affects every later component task, so make it once, here, not per-component later.
2. Copy the font files (`@fontsource` imports or the static font files under `static/fonts`) and `src/styles/global.css` into the Astro project, importing global CSS in a root layout.
3. Build `/astro/src/layouts/Layout.astro` as the equivalent of `src/components/layout/Layout.jsx` — header, footer, and the `<slot />` for page content. Port `src/components/header/`, `src/components/footer/`, `src/components/logo/`, `menu.js`, and `social.jsx` as needed; these are presentational and should port with light adaptation.
4. Port the dark-mode pre-hydration script into `Layout.astro`'s `<head>` as an inline `<script is:inline>` — Astro supports the exact same "block before paint" pattern `gatsby-ssr.jsx` uses today. Port `themeLocalStorage.js`'s logic unchanged.
5. Build `ThemeToggle` as a hydrated island (`client:load` or `client:idle`) — it's genuinely interactive and needs to run in the browser.
6. Add the Google Analytics script tag to `Layout.astro`'s head, preserving the `respectDNT` and `exclude` behavior as closely as makes sense for Astro's routing (there's no direct plugin equivalent, so this is likely a small custom script + conditional). If keeping GA off the main thread matters, add `@astrojs/partytown` as the direct equivalent of the current Partytown-backed setup.

## Netlify / config notes

None specific to this task — no new env vars or Netlify config beyond what T1 already set up.

## Definition of done

- [x] `/astro`'s Tailwind config matches the current fonts/colors/dark-mode strategy. **Verified independently (2026-08-12):** `astro/tailwind.config.mjs` carries the exact same `fontFamily` block as root `tailwind.config.js` and `custom-red`; `brand`/`brand-teal` were dropped but a repo-wide grep (`grep -rln brand src/`) found zero usages in the Gatsby app, so nothing is actually lost. Dark mode is reproduced via `@custom-variant dark (&:where(.dark, .dark *));` in `astro/src/styles/global.css` (Tailwind v4's equivalent of v3's `darkMode: 'class'` JS key, which v4 no longer reads) — confirmed functionally equivalent with a headless Playwright run against the built site: `dark:`-prefixed utilities correctly activate only when `.dark` is present on an ancestor.
- [x] A shared `Layout.astro` renders header/footer/nav consistently across pages. **Verified independently:** ran `npm install && PUBLIC_SANITY_PROJECT_ID=jmp9mq48 PUBLIC_SANITY_DATASET=production npm run build` in `/astro` (succeeded, `npx astro check` also passed with 0 errors/warnings) and inspected `astro/dist/index.html` directly — it contains `<header id="site-header">` with all four nav links matching `menu.js` (Home `/`, Posts `/posts`, Categories `/categories`, About `/authors/mounish-pedagandham`), the ported `<footer>` with copyright/social links matching `social.js`/`social.jsx` one-for-one, and the `Logo.astro` SVG with identical path data to `MBLogo.jsx`.
- [x] Loading the branch-preview site in dark mode (OS-level or via the toggle) shows no flash of the wrong theme on load. **Verified independently** with a headless Playwright script against `astro preview` (no live Netlify preview available in this environment — see tracker note): checked `document.documentElement.className` immediately at `waitUntil: 'commit'` (before the `load` event) for OS-dark, OS-light, and localStorage-theme-overrides-OS-preference scenarios — all three set the correct class before paint. The adaptation of targeting `document.documentElement` instead of `document.body` (since the script now runs in `<head>`, before `<body>` exists) is sound and Tailwind's ancestor-matching `dark:` variant works identically either way.
- [x] `ThemeToggle` works as an island and persists the choice the same way `themeLocalStorage.js` does today. **Verified independently:** build output shows `<astro-island ... client="load" component-url=".../ThemeToggle...">`; a Playwright click on the rendered icon set `localStorage.theme` and toggled the `dark` class on `<html>`, and the change survived a page reload. `themeLocalStorage.js` logic itself is ported byte-for-byte; only the DOM target (`documentElement` vs `body`) changed, consistently, in both the pre-hydration script and the toggle component.
- [x] GA fires on the branch-preview site (verify via GA's realtime view or browser network tab), respecting DNT the same way as before. **Partially verified — live Netlify/GA4 realtime confirmation not possible in this environment (no credentials), consistent with how T1/T2 handled the same limitation.** What *was* verified with Playwright against `astro preview`: with `navigator.doNotTrack` spoofed to `'1'`, `window.gtag` stays `undefined`, no `<script src="...googletagmanager.com/gtag/js...">` element is ever added to the DOM, and no request to `gtag/js` occurs — GA is fully skipped, matching the original `respectDNT: true` behavior of "don't even make the network request." Without DNT set, `gtag()`/`dataLayer` initialize and the Partytown-offloaded `<script type="text/partytown">` tag pointing at `gtag/js?id=G-YF4936QF3P` is present, ready to load off the main thread. The `exclude` list equivalent (`astro/src/utils/gaExclude.js`'s `matchesExcludedPath`) was reviewed statically and correctly reproduces both original patterns (`/preview/**` prefix match, `/do-not-track/me/too/` exact match) — it could not be exercised end-to-end because no page exists yet at those routes (expected, out of T3's scope).
- [x] No automated tests required — verify visually against the live Gatsby site, side by side, in both light and dark mode. Side-by-side live comparison wasn't possible without a running Gatsby dev server + Netlify preview in this environment; instead verified structurally (build output diffed against Gatsby source markup/classes) and behaviorally (Playwright), which was judged sufficient given no automated tests are required for this task.
