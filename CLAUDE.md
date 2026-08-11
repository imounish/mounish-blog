# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Gatsby 5 personal blog (`blog.mounish.dev`), content-managed via Sanity.io, styled with Tailwind CSS + Material Tailwind, deployed on Netlify.

## Commands

```bash
npm run dev      # gatsby clean && gatsby develop — local dev server
npm run build    # gatsby clean && gatsby build   — production build
npm run serve    # gatsby serve                   — serve the production build locally
npm run clean    # gatsby clean                   — wipe .cache and public
```

There is no test suite and no `lint` script — ESLint config exists (`eslint.config.mjs`, flat config) but must be invoked directly, e.g. `npx eslint src`.

Both `eslint.config.mjs` (flat config, active) and a legacy empty `.eslintrc.js` are present; the flat config is the real one in use.

## Architecture

### Content source: Sanity CMS

All blog content (posts, categories, tags, authors) lives in Sanity, not in this repo. `sanity.config.js` reads `GATSBY_SANITY_PROJECT_ID`, `GATSBY_SANITY_DATASET`, and `SANITY_TOKEN` from the environment and is consumed by the `gatsby-source-sanity` plugin in `gatsby-config.js`. GraphQL types like `SanityBlog`, `SanityCategory`, `SanityAuthor`, `SanityTag` come from this source — there is no local markdown/MDX content.

### Page generation (`gatsby-node.js`)

All dynamic routes are created programmatically in `createPages`, querying Sanity via GraphQL and mapping nodes to templates in `src/templates/`:

- Single pages: `/posts/:slug`, `/categories/:slug`, `/authors/:slug`
- Paginated list pages: `/posts`, `/posts/2`, ... ; `/categories`, `/categories/2`, ...; `/authors`, `/authors/2`, ...

Page size per list is controlled by env vars (`GATSBY_POSTS_PER_PAGE`, `GATSBY_CATEGORIES_PER_PAGE`, `GATSBY_AUTHORS_PER_PAGE`, defaulting to 10/6/4). When adding a new content type that needs its own routes, follow this same pattern: add a template under `src/templates/`, query it in `gatsby-node.js`, and wire up both single and paginated list pages.

### Global layout & theming

- `gatsby-browser.jsx` and `gatsby-ssr.jsx` both wrap every page in `src/components/layout/Layout.jsx` via `wrapPageElement` — this is where header/footer/global chrome lives, not in individual page components.
- Dark mode is class-based (Tailwind `darkMode: 'class'`). `gatsby-ssr.jsx` injects an inline pre-body script that reads `localStorage.theme` (or falls back to `prefers-color-scheme`) and adds `.light`/`.dark` to `<body>` before hydration, avoiding a flash of wrong theme. Theme persistence helpers are in `src/utils/themeLocalStorage.js`, and the toggle UI is `src/components/theme/ThemeToggle.jsx`.

### Search

Site search runs entirely client-side via `gatsby-plugin-local-search`. Four independent search indices are configured in `gatsby-config.js` (blogs, categories, tags, authors), each with its own GraphQL query, `ref`, `index`, and `store` fields, queried with `flexsearch`. The search UI (`src/components/search/`) and its state (`src/context/searchModalContext.jsx`) are decoupled from this indexing config — if new fields need to be searchable/displayable, they must be added to both the relevant index's `query`/`store` in `gatsby-config.js` and the component consuming it.

### Newsletter signup

`react-mailchimp-subscribe` on the frontend (`src/components/newsletter/`) posts to a Netlify serverless function at `netlify/functions/subscribe-user/`, rather than calling Mailchimp directly from the browser.

### Styling

Tailwind is configured with custom font families (`worksans`, `warnock` + variants, `lora`, `courier` — served as local `@fontsource`/static font files) and brand colors (`brand`, `brand-teal`, `custom-red`) in `tailwind.config.js`. Material Tailwind is wired in via `withMT()`. Component-scoped styles that don't fit Tailwind utility classes use CSS Modules (`*.module.css`) colocated with their component.

### Directory layout

- `src/components/` — grouped by domain (blogs, categories, authors, tags, search, theme, homepage, layout, header, footer, seo, ...), not by atomic/molecule tiers.
- `src/templates/` — page-level components rendered by `gatsby-node.js` `createPage` calls.
- `src/context/` — React context for cross-cutting UI state (search modal, sign-up modal).
- `src/utils/` — small standalone helpers (Sanity image data, theme persistence, video URL parsing, client-detection hook).
- `src/constants/` — static config like nav menu and social links.
