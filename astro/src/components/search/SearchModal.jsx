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
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';
import { modal, modalBackdrop } from './SearchModal.module.css';
import SearchField from './SearchField';
import SearchResult from './SearchResult';

function SearchModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pagefind, setPagefind] = useState(null);
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
    // Vite must not try to statically analyze/bundle this — it's a runtime
    // asset emitted by the post-build `pagefind` CLI step, not a module
    // that exists in the source tree at build time.
    const mod = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    setPagefind(mod);
  };

  return (
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
        <div className={`font-worksans + ${modal}`}>
          <SearchField
            value={searchQuery}
            setValue={setSearchQuery}
            onFocus={onFocusHandler}
            closeModal={closeSearchModal}
            resultVisible={searchQuery}
          />
          {searchQuery && pagefind && (
            <SearchResult pagefind={pagefind} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchModal;
