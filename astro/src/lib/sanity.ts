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

// ---------------------------------------------------------------------------
// T8 — single category / author pages + paginated category/author lists.
//
// Field sets mirror the four Gatsby templates being ported:
//   - src/templates/single-category.jsx (SingleCategoryQuery)
//   - src/templates/category-list.jsx (CategoriesListQuery)
//   - src/templates/single-author.jsx (SingleAuthorQuery)
//   - src/templates/author-list.jsx (AuthorsListQuery)
// ---------------------------------------------------------------------------

/** Full field set for a single category page (single-category.jsx's `sanityCategory`). */
export interface SingleCategory {
  _id: string;
  title: string;
  color: string | null;
  _rawDescription: unknown;
  coverImage: CoverImage;
}

const SINGLE_CATEGORY_FIELDS = /* groq */ `
  "_id": _id,
  title,
  color,
  "_rawDescription": description,
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

export async function getCategoryBySlug(slug: string): Promise<SingleCategory | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ ${SINGLE_CATEGORY_FIELDS} }`,
    { slug }
  );
}

/**
 * Blogs belonging to a category, for the single-category page's grid
 * (single-category.jsx's `allSanityBlog(filter: { category: { id: { eq: $id } } })`).
 * Reuses `BLOG_GRID_FIELDS` (same field set `BlogGrid`/`BlogItem` render
 * elsewhere) rather than defining a near-duplicate query — distinct from
 * `getBlogsByCategory` above, which powers T6's `CategoryCatalogue` "other
 * posts in this category" strip and deliberately fetches a smaller field set
 * (no `timeToRead`, plus `author`) for that different use case.
 */
export async function getCategoryPageBlogs(categoryId: string): Promise<BlogListItem[]> {
  return sanityClient.fetch(
    `*[_type == "blog" && category._ref == $categoryId] | order(publishedAt desc) { ${BLOG_GRID_FIELDS} }`,
    { categoryId }
  );
}

/** Full field set for a single author page (single-author.jsx's `sanityAuthor`). */
export interface SingleAuthor {
  _id: string;
  name: string;
  description: string | null;
  _rawBio: unknown;
  profileImage: CoverImage;
}

const SINGLE_AUTHOR_FIELDS = /* groq */ `
  "_id": _id,
  name,
  description,
  "_rawBio": bio,
  profileImage {
    alt,
    caption,
    asset -> {
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  }
`;

export async function getAuthorBySlug(slug: string): Promise<SingleAuthor | null> {
  return sanityClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ ${SINGLE_AUTHOR_FIELDS} }`,
    { slug }
  );
}

/** Blogs written by an author, for the single-author page's grid (single-author.jsx's `allSanityBlog(filter: { author: { id: { eq: $id } } })`). */
export async function getAuthorPageBlogs(authorId: string): Promise<BlogListItem[]> {
  return sanityClient.fetch(
    `*[_type == "blog" && author._ref == $authorId] | order(publishedAt desc) { ${BLOG_GRID_FIELDS} }`,
    { authorId }
  );
}

/** One category list item — category-list.jsx's `CategoriesListQuery` field set. */
export interface CategoryListItem {
  id: string;
  title: string;
  slug: SlugRef;
  _rawDescription: unknown;
  coverImage: CoverImage;
}

const CATEGORY_GRID_FIELDS = /* groq */ `
  "id": _id,
  title,
  slug { current },
  "_rawDescription": description,
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

/** Total number of categories — drives `paginate()`'s `totalItems` for `/categories`. */
let cachedCategoryCount: Promise<number> | null = null;
export function getCategoryCount(): Promise<number> {
  if (!cachedCategoryCount) {
    cachedCategoryCount = sanityClient.fetch(`count(*[_type == "category"])`);
  }
  return cachedCategoryCount;
}

/** One page of the category list, matching Gatsby's `sort: { _createdAt: DESC }`. */
export async function getCategoryListPage(
  offset: number,
  limit: number
): Promise<CategoryListItem[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(_createdAt desc) [$offset...$end] { ${CATEGORY_GRID_FIELDS} }`,
    { offset, end: offset + limit }
  );
}

/** One author list item — author-list.jsx's `AuthorsListQuery` field set. */
export interface AuthorListItem {
  id: string;
  name: string;
  description: string | null;
  slug: SlugRef;
  profileImage: CoverImage;
}

const AUTHOR_GRID_FIELDS = /* groq */ `
  "id": _id,
  name,
  description,
  slug { current },
  profileImage {
    alt,
    caption,
    asset -> {
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  }
`;

/** Total number of authors — drives `paginate()`'s `totalItems` for `/authors`. */
let cachedAuthorCount: Promise<number> | null = null;
export function getAuthorCount(): Promise<number> {
  if (!cachedAuthorCount) {
    cachedAuthorCount = sanityClient.fetch(`count(*[_type == "author"])`);
  }
  return cachedAuthorCount;
}

/** One page of the author list, matching Gatsby's `sort: { name: DESC }`. */
export async function getAuthorListPage(
  offset: number,
  limit: number
): Promise<AuthorListItem[]> {
  return sanityClient.fetch(
    `*[_type == "author"] | order(name desc) [$offset...$end] { ${AUTHOR_GRID_FIELDS} }`,
    { offset, end: offset + limit }
  );
}

// ---------------------------------------------------------------------------
// T9 — homepage "featured" content + tags page.
//
// Field sets mirror:
//   - src/components/homepage/FeaturedBlogs.jsx / FeaturedCategories.jsx
//     (both `useStaticQuery` a singleton `allSanityFeatured(filter: { _id: {
//     eq: "featuredItems" } })` doc referencing `blogs[]` / `categories[]`)
//   - src/pages/tags.jsx's `TagsListQuery` (`allSanityTag` + `allSanityBlog`
//     with `tags` included)
// ---------------------------------------------------------------------------

export interface FeaturedContent {
  blogs: BlogListItem[];
  categories: CategoryListItem[];
}

const FEATURED_QUERY = /* groq */ `
  *[_type == "featured" && _id == "featuredItems"][0] {
    blogs[]-> { ${BLOG_GRID_FIELDS} },
    categories[]-> { ${CATEGORY_GRID_FIELDS} }
  }
`;

/** The homepage's singleton "featured blogs + categories" doc, or null if none is set up. */
export async function getFeaturedContent(): Promise<FeaturedContent | null> {
  const result = await sanityClient.fetch(FEATURED_QUERY);
  return result
    ? {
        blogs: result.blogs ?? [],
        categories: result.categories ?? [],
      }
    : null;
}

/** One tag list item — tags.jsx's `allSanityTag` field set. */
export interface TagListItem {
  id: string;
  title: string;
  slug: SlugRef;
}

const TAG_LIST_QUERY = /* groq */ `
  *[_type == "tag"] {
    "id": _id,
    title,
    slug { current }
  }
`;

export async function getTagList(): Promise<TagListItem[]> {
  return sanityClient.fetch(TAG_LIST_QUERY);
}

/** A blog list item with its tags — tags.jsx's `allSanityBlog` field set (BLOG_GRID_FIELDS + tags). */
export interface BlogWithTags extends BlogListItem {
  tags: { title: string; slug: SlugRef }[] | null;
}

const BLOG_WITH_TAGS_FIELDS = /* groq */ `
  ${BLOG_GRID_FIELDS},
  tags[]-> {
    title,
    slug { current }
  }
`;

/** All blogs (unpaginated), each with its resolved `tags`, for tags.jsx's client-side tag filter. */
export async function getAllBlogsWithTags(): Promise<BlogWithTags[]> {
  return sanityClient.fetch(
    `*[_type == "blog"] | order(publishedAt desc) { ${BLOG_WITH_TAGS_FIELDS} }`
  );
}
