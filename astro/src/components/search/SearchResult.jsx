// T13: new — replaces src/components/search/SearchResult.jsx's (Gatsby app)
// four separate `useFlexSearch` calls (one per gatsby-plugin-local-search
// index) with a single Pagefind query against the whole built site (Step 5
// of 13-search-pagefind.md: one unified index, not four maintained
// separately). Section headers (blogs/categories/authors) are recovered by
// bucketing the flat result list on its URL prefix, so the grouped-by-type
// look of the old UI is preserved without hand-maintaining parallel
// indices.
import React, { useEffect, useState } from 'react';
import { searchResultSection } from './SearchResult.module.css';
import SearchResultHolder from './SearchResultHolder';
import SearchResultItem from './SearchResultItem';

const SECTIONS = [
  { key: 'blogs', label: 'blogs', test: (url) => url.startsWith('/posts/') },
  {
    key: 'categories',
    label: 'categories',
    test: (url) => url.startsWith('/categories/'),
  },
  {
    key: 'authors',
    label: 'authors',
    test: (url) => url.startsWith('/authors/'),
  },
];

function groupResults(results) {
  const groups = { blogs: [], categories: [], authors: [], other: [] };
  results.forEach((result) => {
    const section = SECTIONS.find(({ test }) => test(result.url));
    groups[section ? section.key : 'other'].push(result);
  });
  return groups;
}

function SearchResult({ pagefind, searchQuery }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      if (!pagefind || !searchQuery) {
        setResults(null);
        return;
      }
      const search = await pagefind.search(searchQuery);
      const resolved = await Promise.all(
        search.results.slice(0, 20).map((r) => r.data())
      );
      if (!cancelled) setResults(resolved);
    }

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [pagefind, searchQuery]);

  if (results === null) {
    return (
      <SearchResultHolder className="text-gray-600 dark:text-gray-400">
        <p className="font-worksans py-2">Searching...</p>
      </SearchResultHolder>
    );
  }

  if (results.length === 0) {
    return (
      <SearchResultHolder className="text-gray-600 dark:text-gray-400">
        <p className="font-worksans py-2">No result found</p>
      </SearchResultHolder>
    );
  }

  const groups = groupResults(results);

  return (
    <SearchResultHolder className={searchResultSection}>
      {SECTIONS.map(
        ({ key, label }) =>
          groups[key].length > 0 && (
            <React.Fragment key={key}>
              <p className="font-lora text-sm lowercase text-gray-500 md:text-base">
                {label}
              </p>
              <ul className="flex flex-col gap-2 pb-4 pt-2">
                {groups[key].map((result) => (
                  <SearchResultItem key={result.url} section={key} result={result} />
                ))}
              </ul>
            </React.Fragment>
          )
      )}
      {groups.other.length > 0 && (
        <>
          <p className="font-lora text-sm lowercase text-gray-500 md:text-base">
            pages
          </p>
          <ul className="flex flex-col gap-2 pb-4 pt-2">
            {groups.other.map((result) => (
              <SearchResultItem key={result.url} section="other" result={result} />
            ))}
          </ul>
        </>
      )}
    </SearchResultHolder>
  );
}

export default SearchResult;
