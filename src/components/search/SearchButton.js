import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { zoomInOut } from './SearchButton.module.css';

function SearchButton({ openSearchModal }) {
  return (
    <button
      type="button"
      className={zoomInOut}
      onClick={openSearchModal}
      onKeyDown={openSearchModal}
    >
      <MagnifyingGlassIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800 hover:text-black dark:text-gray-400 dark:hover:text-gray-50" />
    </button>
  );
}

export default SearchButton;
