// T13: new — Pagefind result rendering. Not a 1:1 port of
// src/components/search/SearchResultItem.jsx (Gatsby app): the flexsearch
// version rendered one component per *content type* (Blog/Category/Tag/
// Author), each pulling fields straight off its own curated
// gatsby-plugin-local-search store. Pagefind indexes built HTML instead, so
// every result comes back as the same shape (url, title/meta, excerpt) no
// matter what kind of page it came from — one generic item renders all of
// them, and SearchResult.jsx buckets them by URL prefix for the same
// section-header grouping the old UI had.
import React, { useContext } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';

// Pagefind returns excerpts as HTML with matched terms wrapped in <mark>.
function ResultExcerpt({ html }) {
  if (!html) return null;
  // eslint-disable-next-line react/no-danger
  return (
    <p
      className="font-worksans text-xs text-gray-600 dark:text-gray-400"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SearchResultItem({ result }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  const title = result.meta?.title || result.meta?.image_alt || result.url;

  return (
    <li>
      <a
        href={result.url}
        onClick={closeSearchModal}
        className="flex flex-col gap-0.5"
        title={title}
      >
        <h2 className="font-lora text-sm text-gray-900 dark:text-gray-100 md:text-base">
          {title}
        </h2>
        <ResultExcerpt html={result.excerpt} />
      </a>
    </li>
  );
}

export default SearchResultItem;
