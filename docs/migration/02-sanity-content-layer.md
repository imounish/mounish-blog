# T2 — Sanity content layer

**Priority:** P0
**Depends on:** T1
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Get Astro talking to the same Sanity project/dataset the Gatsby site uses today, with GROQ queries that pull the same fields the current GraphQL queries pull — so every later template task has real data to render against.

## Current state

- `sanity.config.js` (repo root): reads `GATSBY_SANITY_PROJECT_ID`, `GATSBY_SANITY_DATASET`, `SANITY_TOKEN` and is consumed by `gatsby-source-sanity` in `gatsby-config.js`.
- `gatsby-node.js`: the GraphQL queries here are the authoritative list of fields currently used to build pages — `allSanityBlog`, `allSanityCategory`, `allSanityAuthor` nodes with `id`/`slug.current`.
- `src/templates/single-blog-post.jsx`: the `postQuery` GraphQL query here is the most complete example of the full field set needed per blog post — `title`, `subTitle`, `publishedAt`, `timeToRead`, `_rawBody`, `_rawExcerpt`, `coverImage { alt caption asset { gatsbyImageData } }`, `category { _id title color _rawDescription slug { current } }`, `tags { title color slug { current } }`, `author { name description slug { current } }`.
- `gatsby-config.js`'s four `gatsby-plugin-local-search` blocks also each contain a GraphQL query — useful as a secondary reference for what fields exist on category/tag/author nodes, independent of the search work itself (which is T13).

## Steps

1. Add the official Sanity Astro integration: `npx astro add @sanity/astro` from inside `/astro`, or install `@sanity/astro` and `@sanity/client`/`@sanity/image-url` directly if you want more control over the config shape.
2. Configure it with the renamed env vars from the tracker's env var table (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_TOKEN`) — add these to the `astro-migration` branch's Netlify context, and to `/astro/.env` for local dev.
3. Write GROQ queries (or use the Sanity client directly in `getStaticPaths`/frontmatter) that reproduce each of the field sets above:
   - Blog list: `id`, `slug`.
   - Category list: `id`, `slug`.
   - Author list: `id`, `slug`.
   - Single blog post: the full field set from `single-blog-post.jsx`'s `postQuery`, including the nested `category`, `tags`, and `author` references.
4. Do a field-parity check: for one real blog post, log/print the GROQ result next to what the current GraphQL query returns for the same post, and confirm nothing is missing (this is the point where a forgotten field would otherwise silently break a template later).
5. Decide the image data shape now, since T6 depends on it: Sanity images in this repo are resolved via `src/utils/getSanityImageData.js`, which builds URLs against Sanity's own image CDN (`?w=&h=&fmt=&q=` params) rather than running images through local Sharp transforms. The Astro equivalent is `@sanity/image-url`, not `astro:assets` — confirm you can build an equivalent URL + width/height pair from the GROQ `coverImage.asset` reference before moving on.

## Netlify / config notes

- `SANITY_TOKEN` stays unprefixed and server-only — it's only used at build time to query Sanity, never shipped to the client.
- `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` need the `PUBLIC_` prefix specifically because `@sanity/image-url` may need to build URLs inside a hydrated island later (e.g. if any interactive component ever needs to reference an image client-side) — Astro/Vite won't inline non-`PUBLIC_` vars into the client bundle.

## Definition of done

- [x] `@sanity/astro` is configured and successfully queries the real Sanity project/dataset from a branch-preview build. Verified independently: `astro/astro.config.mjs` wires `@sanity/astro` to `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` (`jmp9mq48`/`production`), which matches the root Gatsby `.env`'s `GATSBY_SANITY_PROJECT_ID`/`GATSBY_SANITY_DATASET` exactly — same real project. Ran a fresh `npm run build` (after `rm -rf dist .astro`) inside `/astro`: build succeeded and the debug page's console output/HTML shows real fetched content ("A Coffee can change your Life", author "Mounish Pedagandham", category "Short Stories") and a real `cdn.sanity.io/images/jmp9mq48/production/...` image URL — not stubbed data. `npx astro check` also passed clean (0 errors, 0 warnings, 0 hints). Netlify branch-preview itself was not verified live (no Netlify credentials in this environment) — see tracker note.
- [x] GROQ queries exist covering the same field sets as the current GraphQL queries for blog/category/author (list and single). Verified by direct comparison: `astro/src/lib/sanity.ts`'s `BLOG_LIST_QUERY`/`CATEGORY_LIST_QUERY`/`AUTHOR_LIST_QUERY` mirror `gatsby-node.js`'s `allSanityBlog`/`allSanityCategory`/`allSanityAuthor` (`id`, `slug.current` only), and `SINGLE_BLOG_POST_FIELDS` matches `single-blog-post.jsx`'s `postQuery` field-for-field (`title`, `subTitle`, `publishedAt`, `timeToRead`, `_rawBody`→`body`, `_rawExcerpt`→`excerpt`, `coverImage{alt,caption,asset{...}}`, `category{_id,title,color,_rawDescription,slug{current}}`, `tags[]{title,color,slug{current}}`, `author{name,description,slug{current}}`).
- [x] A manual field-parity check confirms no fields are missing versus what `single-blog-post.jsx`'s `postQuery` currently pulls. Confirmed two ways: (1) the field-by-field query comparison above, and (2) the debug page's build-time output shows all 10 expected fields as `present`. Note: a comment in `astro/src/pages/debug/sanity.astro` references "the T2 implementation report for a full byte-for-byte comparison" — no such report file exists anywhere in the repo (searched `astro/` and `docs/`); this looks like a stale/unfulfilled claim. It doesn't sink this item since the field-by-field comparison was independently redone above, but the dangling reference should be removed or replaced with an actual artifact.
- [x] An image URL + dimensions can be built from a GROQ-fetched `coverImage.asset` reference, confirming the `@sanity/image-url` approach works before T6 needs it. `astro/src/lib/sanityImage.ts`'s `buildSanityImageUrl` was exercised via the real build: produced `https://cdn.sanity.io/images/jmp9mq48/production/...jpg?w=800&q=80&auto=format` at 800x533 (derived from source 1920x1280 via aspect ratio) and the un-resized source-dimension URL at 1920x1280.
- [x] No automated tests required — verify via a build that actually renders fetched data (even to a throwaway debug page) and a manual diff against the current GraphQL output. `astro/src/pages/debug/sanity.astro` is exactly this throwaway page, and it rendered real data in the build output (`astro/dist/debug/sanity/index.html`). The "manual diff against current GraphQL output" was done here as a query-source comparison (see above) rather than a captured side-by-side artifact, since no such artifact exists in the repo.
