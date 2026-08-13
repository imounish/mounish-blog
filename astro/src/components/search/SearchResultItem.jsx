// T13 (search formatting follow-up): the first port of this file rendered
// every Pagefind result the same way (title + plain excerpt), regardless of
// what kind of page it came from — a real formatting regression versus
// src/components/search/SearchResultItem.jsx (Gatsby app), which rendered a
// distinct card per content type (blog/category/author), each pulling
// fields straight off its own curated gatsby-plugin-local-search store:
// blog cards showed a cover thumbnail + published date, author cards showed
// a profile photo + one-line description, category cards were a plain bold
// title. Pagefind doesn't give per-type fields for free, so the page
// templates now tag the relevant elements with data-pagefind-meta
// (image/title/date/category/description — see posts/[slug].astro,
// categories/[slug].astro, authors/[slug].astro, CategoryCatalogue.astro)
// and this file reproduces
// each of the three Gatsby card layouts (verbatim class names) from that
// `result.meta`, keyed off the same URL-prefix `section` SearchResult.jsx
// already buckets by.
import React, { useContext } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';

// Pagefind returns excerpts as HTML with matched terms wrapped in <mark>.
function ResultExcerpt({ html, className }) {
  if (!html) return null;
  // eslint-disable-next-line react/no-danger
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function BlogResultItem({ result, onClick }) {
  const title = result.meta?.title || result.url;
  return (
    <li>
      <a href={result.url} onClick={onClick} className="flex flex-row items-start gap-2" title={title}>
        {result.meta?.image && (
          <img
            src={result.meta.image}
            alt=""
            loading="lazy"
            className="block w-2/12 rounded-lg object-cover"
          />
        )}
        <div className={`flex flex-col gap-0.5 ${result.meta?.image ? 'w-10/12' : 'w-full'}`}>
          <h2 className="font-lora text-sm text-gray-900 dark:text-gray-100 md:text-base">
            {result.meta?.category && (
              <span className="font-warnockdisp pr-1 text-xs font-light md:text-sm">
                {result.meta.category}
              </span>
            )}
            {title}
          </h2>
          {result.meta?.date && (
            <p className="font-worksans text-xs text-gray-600 dark:text-gray-400">
              <span className="font-warnockcapt font-bold italic">On </span>
              {result.meta.date}
            </p>
          )}
        </div>
      </a>
    </li>
  );
}

function CategoryResultItem({ result, onClick }) {
  const title = result.meta?.title || result.url;
  return (
    <li className="w-fit">
      <a href={result.url} onClick={onClick} title={title}>
        <h2 className="font-warnockdisp text-base font-semibold text-gray-900 dark:text-gray-100 md:text-lg">
          {title}
        </h2>
      </a>
    </li>
  );
}

function AuthorResultItem({ result, onClick }) {
  const title = result.meta?.title || result.url;
  return (
    <li>
      <a href={result.url} onClick={onClick} className="flex flex-row items-start gap-2" title={title}>
        {result.meta?.image && (
          <img
            src={result.meta.image}
            alt=""
            loading="lazy"
            className="block w-1/6 rounded-full object-cover"
          />
        )}
        <div className={`flex flex-col justify-around ${result.meta?.image ? 'w-5/6' : 'w-full'}`}>
          <h2 className="font-warnockdisp text-sm text-gray-900 dark:text-gray-100 sm:text-base">
            {title}
          </h2>
          {result.meta?.description && (
            <p className="font-worksans text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              <span className="font-warnockcapt font-bold italic">{result.meta.description}</span>
            </p>
          )}
        </div>
      </a>
    </li>
  );
}

function GenericResultItem({ result, onClick }) {
  const title = result.meta?.title || result.url;
  return (
    <li>
      <a href={result.url} onClick={onClick} className="flex flex-col gap-0.5" title={title}>
        <h2 className="font-lora text-sm text-gray-900 dark:text-gray-100 md:text-base">
          {title}
        </h2>
        <ResultExcerpt
          html={result.excerpt}
          className="font-worksans text-xs text-gray-600 dark:text-gray-400"
        />
      </a>
    </li>
  );
}

const SECTION_COMPONENTS = {
  blogs: BlogResultItem,
  categories: CategoryResultItem,
  authors: AuthorResultItem,
};

function SearchResultItem({ section, result }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  const ItemComponent = SECTION_COMPONENTS[section] || GenericResultItem;
  return <ItemComponent result={result} onClick={closeSearchModal} />;
}

export default SearchResultItem;
