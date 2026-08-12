/**
 * Sanity content layer (T2).
 *
 * GROQ queries here reproduce the field sets that the Gatsby app pulls today
 * via `gatsby-source-sanity` GraphQL — see:
 *   - ../../../gatsby-node.js (blog/category/author "id" + "slug" list queries)
 *   - ../../../src/templates/single-blog-post.jsx (`postQuery`, the full
 *     single-post field set including nested category/tags/author)
 *
 * Raw Sanity document type names (confirmed against ../../../.cache/schema.gql,
 * Gatsby's generated schema cache) are: "blog", "category", "author", "tag".
 */
import { sanityClient } from 'sanity:client';

/** Matches Gatsby's `slug { current }` shape used throughout the site. */
export interface SlugRef {
  current: string;
}

/** Matches Gatsby's `id` + `slug { current }` list-query shape. */
export interface IdSlugListItem {
  id: string;
  slug: SlugRef;
}

/** Raw Sanity image asset fields needed to drive @sanity/image-url. */
export interface SanityImageAssetRef {
  _id: string;
  _ref?: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface CoverImage {
  alt: string | null;
  caption: string | null;
  asset: SanityImageAssetRef;
}

export interface CategoryRef {
  _id: string;
  title: string;
  color: string | null;
  _rawDescription: unknown;
  slug: SlugRef;
}

export interface TagRef {
  title: string;
  color: string | null;
  slug: SlugRef;
}

export interface AuthorRef {
  name: string;
  description: string | null;
  slug: SlugRef;
}

/** Full field set from `single-blog-post.jsx`'s `postQuery`. */
export interface SingleBlogPost {
  title: string;
  subTitle: string | null;
  publishedAt: string;
  timeToRead: number | null;
  _rawBody: unknown;
  _rawExcerpt: unknown;
  coverImage: CoverImage;
  category: CategoryRef | null;
  tags: TagRef[] | null;
  author: AuthorRef | null;
}

// ---------------------------------------------------------------------------
// List queries — mirror gatsby-node.js's allSanityBlog/Category/Author
// (`id`, `slug { current }` only, used there to build page paths).
// ---------------------------------------------------------------------------

const BLOG_LIST_QUERY = /* groq */ `
  *[_type == "blog"] | order(publishedAt desc) {
    "id": _id,
    slug { current }
  }
`;

const CATEGORY_LIST_QUERY = /* groq */ `
  *[_type == "category"] {
    "id": _id,
    slug { current }
  }
`;

const AUTHOR_LIST_QUERY = /* groq */ `
  *[_type == "author"] {
    "id": _id,
    slug { current }
  }
`;

export async function getBlogList(): Promise<IdSlugListItem[]> {
  return sanityClient.fetch(BLOG_LIST_QUERY);
}

export async function getCategoryList(): Promise<IdSlugListItem[]> {
  return sanityClient.fetch(CATEGORY_LIST_QUERY);
}

export async function getAuthorList(): Promise<IdSlugListItem[]> {
  return sanityClient.fetch(AUTHOR_LIST_QUERY);
}

// ---------------------------------------------------------------------------
// Single blog post — full field set from single-blog-post.jsx's `postQuery`.
//
// Note on the "_raw*" fields: Gatsby's `_rawBody`/`_rawExcerpt`/
// `_rawDescription` (without a `resolveReferences` argument) return the raw
// stored Portable Text JSON with references left unresolved — exactly what
// plain GROQ property access (`body`, `excerpt`, `description`) returns, so
// no extra dereferencing is needed to match them.
// ---------------------------------------------------------------------------

const SINGLE_BLOG_POST_FIELDS = /* groq */ `
  title,
  subTitle,
  publishedAt,
  timeToRead,
  "_rawBody": body,
  "_rawExcerpt": excerpt,
  coverImage {
    alt,
    caption,
    asset -> {
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  },
  category -> {
    _id,
    title,
    color,
    "_rawDescription": description,
    slug { current }
  },
  tags[] -> {
    title,
    color,
    slug { current }
  },
  author -> {
    name,
    description,
    slug { current }
  }
`;

export async function getBlogPostBySlug(
  slug: string
): Promise<SingleBlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{ ${SINGLE_BLOG_POST_FIELDS} }`,
    { slug }
  );
}

/** Equivalent to Gatsby's `sanityBlog(id: { eq: $id })` in the same template. */
export async function getBlogPostById(
  id: string
): Promise<SingleBlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blog" && _id == $id][0]{ ${SINGLE_BLOG_POST_FIELDS} }`,
    { id }
  );
}

// ---------------------------------------------------------------------------
// Blogs by category — T6's CategoryCatalogue (src/components/categories/
// CategoryCatalogue.jsx in the Gatsby app), which filters the full blog list
// down to posts sharing the current post's category. Field set mirrors that
// component's `useStaticQuery` (id/title/publishedAt/slug/category/
// coverImage/author).
// ---------------------------------------------------------------------------

export interface CategoryCatalogueBlog {
  id: string;
  title: string;
  publishedAt: string;
  slug: SlugRef;
  category: {
    _id: string;
    title: string;
    color: string | null;
    slug: SlugRef;
  } | null;
  coverImage: CoverImage;
  author: { name: string; slug: SlugRef } | null;
}

const CATEGORY_CATALOGUE_BLOG_FIELDS = /* groq */ `
  "id": _id,
  title,
  publishedAt,
  slug { current },
  category -> {
    _id,
    title,
    color,
    slug { current }
  },
  coverImage {
    alt,
    caption,
    asset -> {
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  },
  author -> {
    name,
    slug { current }
  }
`;

export async function getBlogsByCategory(
  categoryId: string
): Promise<CategoryCatalogueBlog[]> {
  return sanityClient.fetch(
    `*[_type == "blog" && category._ref == $categoryId] | order(publishedAt desc) { ${CATEGORY_CATALOGUE_BLOG_FIELDS} }`,
    { categoryId }
  );
}

// ---------------------------------------------------------------------------
// Blog list (paginated) — T7's `/posts` + `/posts/N` listing pages. Field set
// mirrors `blog-post-list.jsx`'s `BlogsListQuery` (the fields `BlogGrid`/
// `BlogItem` actually render: title/timeToRead/publishedAt/slug/category/
// coverImage — that query also fetches `author`, but neither BlogGrid nor
// BlogItem ever reads it, so it's left out here).
// ---------------------------------------------------------------------------

export interface BlogListItem {
  id: string;
  title: string;
  timeToRead: number | null;
  publishedAt: string;
  slug: SlugRef;
  category: {
    title: string;
    color: string | null;
    slug: SlugRef;
  } | null;
  coverImage: CoverImage;
}

const BLOG_GRID_FIELDS = /* groq */ `
  "id": _id,
  title,
  timeToRead,
  publishedAt,
  slug { current },
  category -> {
    title,
    color,
    slug { current }
  },
  coverImage {
    alt,
    caption,
    asset -> {
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  }
`;

/** Total number of published blog posts — drives `paginate()`'s `totalItems`. */
let cachedBlogCount: Promise<number> | null = null;
export function getBlogCount(): Promise<number> {
  // Memoized so every call within a single build resolves to the same count
  // (guarding against a race between /posts/index.astro and
  // /posts/[page].astro's getStaticPaths otherwise seeing different totals
  // if content changed mid-build) and to avoid redundant round-trips.
  if (!cachedBlogCount) {
    cachedBlogCount = sanityClient.fetch(`count(*[_type == "blog"])`);
  }
  return cachedBlogCount;
}

/** One page of the blog list, newest first — pair with `paginate()`'s per-page `offset`/`limit`. */
export async function getBlogListPage(
  offset: number,
  limit: number
): Promise<BlogListItem[]> {
  return sanityClient.fetch(
    `*[_type == "blog"] | order(publishedAt desc) [$offset...$end] { ${BLOG_GRID_FIELDS} }`,
    { offset, end: offset + limit }
  );
}
