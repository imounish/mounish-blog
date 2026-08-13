// T13: ported from src/components/search/SearchModal.jsx (Gatsby app), with
// the backend swapped from gatsby-plugin-local-search/flexsearch to
// Pagefind. The old version fetched two static JSON files (index + store)
// per content type up front on first focus; this version instead lazily
// `import()`s Pagefind's own JS bundle (emitted to /pagefind/pagefind.js by
// the `pagefind --site dist` post-build step, see package.json) the first
// time the modal is focused, and hands it off to <SearchResult> to run
// queries against — this is what keeps Pagefind's runtime out of the main
// page bundle entirely until someone actually opens search (see the task's
// "loaded on demand" note in 13-search-pagefind.md step 3).
//
// The import specifier must be a fully-qualified URL (origin + path), not a
// root-relative path. Vite's dev server refuses to `import()` any JS file
// under its `publicDir` — even with `@vite-ignore` — throwing "Cannot import
// non-asset file ... which is inside /public"; that restriction only fires
// for specifiers Vite recognizes as pointing into publicDir, and an absolute
// http(s) URL skips its resolver entirely (same code path browsers use for
// any cross-origin import), in dev and in the static `astro build` output
// alike.
import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchModalContext } from '../../context/searchModalContext';
import { modal, modalBackdrop } from './SearchModal.module.css';
import SearchField from './SearchField';
import SearchResult from './SearchResult';

function SearchModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pagefind, setPagefind] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const { isSearchModalOpen, closeSearchModal } =
    useContext(SearchModalContext);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      setSearchQuery('');
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSearchModal();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSearchModalOpen) return null;

  const onFocusHandler = async () => {
    if (pagefind || loadingRef.current) return;
    loadingRef.current = true;
    setLoadError(false);
    try {
      // Vite must not try to statically analyze/bundle this — it's a runtime
      // asset emitted by the post-build `pagefind` CLI step, not a module
      // that exists in the source tree at build time.
      const pagefindUrl = new URL('/pagefind/pagefind.js', window.location.origin).href;
      const mod = await import(/* @vite-ignore */ pagefindUrl);
      setPagefind(mod);
    } catch {
      // No index at /pagefind/pagefind.js — most commonly `astro dev`
      // without having run `npm run pagefind:sync` first (see AGENTS.md).
      // Reset loadingRef so refocusing after fixing that can retry, instead
      // of leaving search silently, permanently broken for the session.
      loadingRef.current = false;
      setLoadError(true);
    }
  };

  // Gatsby's Layout.jsx renders <Search /> (the modal) as a sibling of
  // <Header />, never nested inside it. Astro islands can't share React
  // context across separate `client:*` roots, so Search.jsx bundles the
  // button and this modal into one island rendered inside Header.astro's
  // slot — which puts this fixed-position modal *inside* an element that
  // has `backdrop-blur-lg` (`backdrop-filter`). Per the CSS spec, an
  // ancestor with `backdrop-filter` becomes the containing block for
  // `position: fixed` descendants (same category as `filter`/`transform`),
  // so `.modal`'s `calc(50% - 20rem)` resolved against the header's own box
  // instead of the viewport — the modal rendered pinned near the top-left
  // instead of centered. A portal to `document.body` restores the same
  // containing block Gatsby's sibling placement gave it for free, without
  // having to split the button/modal back into separate context-sharing
  // islands.
  return createPortal(
    <>
      <div
        className={`bg-blue-gray-600/25 opacity-100 backdrop-blur-lg transition-opacity ${modalBackdrop}`}
        style={{
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={closeSearchModal}
        onKeyDown={closeSearchModal}
        role="button"
        tabIndex={0}
        aria-label="Close"
      />
      <div className="flex flex-col">
        <div className={`font-worksans ${modal}`}>
          <SearchField
            value={searchQuery}
            setValue={setSearchQuery}
            onFocus={onFocusHandler}
            closeModal={closeSearchModal}
            resultVisible={searchQuery}
          />
          {loadError && (
            <div className="block w-full rounded-b-lg bg-gray-100 px-11 py-2 text-lg dark:bg-gray-800">
              <p className="font-worksans text-xs text-gray-600 dark:text-gray-400">
                Search index not found. If you&apos;re running{' '}
                <code>astro dev</code>, run{' '}
                <code>npm run pagefind:sync</code> once, then try again.
              </p>
            </div>
          )}
          {searchQuery && pagefind && (
            <SearchResult pagefind={pagefind} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

export default SearchModal;
