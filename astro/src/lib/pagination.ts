/**
 * Generic list-pagination helper (T7).
 *
 * `gatsby-node.js` computes essentially identical `limit`/`offset`/
 * `numberOfPages`/`currentPage` pagination math three separate times — once
 * each for the `/posts`, `/categories`, and `/authors` list pages
 * (`Math.ceil(items.length / pageSize)`, then a loop building
 * `index === 0 ? baseUrl : `${baseUrl}/${index + 1}`` paths with
 * `{ limit, offset, numberOfPages, currentPage }` context).
 *
 * This module is that logic extracted once, with no posts-specific naming,
 * so T8 (categories/authors) can call `paginate()`/`pageUrl()` directly
 * instead of re-deriving the math.
 */

/** Per-page slice/position info for one page of a paginated list. */
export interface PageConfig {
  /** 1-indexed page number. */
  pageNumber: number;
  /** Alias of `pageNumber` — matches gatsby-node.js's `context.currentPage` naming that the ported `<Pagination>` UI reads. */
  currentPage: number;
  /** Zero-indexed offset into the full item list for this page. */
  offset: number;
  /** Page size (same for every page in a given result). */
  limit: number;
}

export interface PaginationResult {
  numberOfPages: number;
  pageConfigs: PageConfig[];
}

/**
 * Compute the page count and per-page offset/limit for a list of
 * `totalItems`, `pageSize` items per page.
 *
 * Mirrors `gatsby-node.js`'s `Math.ceil(items.length / pageSize)` +
 * `Array.from({ length: totalPages }).forEach((_, index) => ...)` loop
 * exactly: 0 items produces 0 pages (no pages at all — matches Gatsby not
 * creating a route when a list is empty), and the last page's `limit` may
 * request more items than actually remain (the caller's fetch naturally
 * returns a shorter "remainder" page in that case, e.g. 27 items / 10 per
 * page = pages of 10, 10, 7).
 */
export function paginate(totalItems: number, pageSize: number): PaginationResult {
  if (!Number.isFinite(pageSize) || pageSize <= 0) {
    throw new Error(`paginate: pageSize must be a positive number (got ${pageSize})`);
  }

  const numberOfPages = Math.ceil(Math.max(totalItems, 0) / pageSize);

  const pageConfigs: PageConfig[] = Array.from({ length: numberOfPages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      pageNumber,
      currentPage: pageNumber,
      offset: index * pageSize,
      limit: pageSize,
    };
  });

  return { numberOfPages, pageConfigs };
}

/**
 * Build the URL for `pageNumber` under `baseUrl`, matching
 * `gatsby-node.js`'s `index === 0 ? path : `${path}/${index + 1}`` scheme
 * exactly: page 1 has no numeric suffix (`/posts`, not `/posts/1`), page 2+
 * does (`/posts/2`, `/posts/3`, ...).
 */
export function pageUrl(baseUrl: string, pageNumber: number): string {
  return pageNumber <= 1 ? baseUrl : `${baseUrl}/${pageNumber}`;
}
