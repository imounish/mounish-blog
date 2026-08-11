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

- [ ] `@sanity/astro` is configured and successfully queries the real Sanity project/dataset from a branch-preview build.
- [ ] GROQ queries exist covering the same field sets as the current GraphQL queries for blog/category/author (list and single).
- [ ] A manual field-parity check confirms no fields are missing versus what `single-blog-post.jsx`'s `postQuery` currently pulls.
- [ ] An image URL + dimensions can be built from a GROQ-fetched `coverImage.asset` reference, confirming the `@sanity/image-url` approach works before T6 needs it.
- [ ] No automated tests required — verify via a build that actually renders fetched data (even to a throwaway debug page) and a manual diff against the current GraphQL output.
