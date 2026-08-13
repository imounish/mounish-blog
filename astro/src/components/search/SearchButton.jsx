// T13: ported from src/components/search/SearchButton.jsx (Gatsby app).
// Adapted to read `openSearchModal` from context directly instead of via a
// prop — this island now owns its own SearchModalContext (see Search.jsx,
// same self-contained-island pattern T12 used for NewsletterSignup.jsx)
// rather than relying on a page-wide provider Astro islands can't share.
import React, { useContext } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchModalContext } from '../../context/searchModalContext';
import styles from './SearchButton.module.css';

function SearchButton() {
  const { openSearchModal } = useContext(SearchModalContext);

  return (
    <button
      type="button"
      aria-label="Search"
      title="Search"
      className={styles.zoomInOut}
      onClick={openSearchModal}
    >
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8" />
    </button>
  );
}

export default SearchButton;
