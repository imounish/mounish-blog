// T13: ported from src/components/search/SearchField.jsx (Gatsby app).
// The Gatsby version delegated the <input> to a shared `Input` component
// (src/components/input/Input.jsx) that had no other Astro consumer, so
// rather than porting a one-off shared component, the input is inlined here
// with the same markup/classes Input.jsx used.
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { MdClose } from 'react-icons/md';
import React from 'react';

function SearchField({ value, setValue, onFocus, closeModal, resultVisible }) {
  return (
    <div
      className={`${
        resultVisible ? ' rounded-b-none rounded-t-lg' : 'rounded-lg'
      } flex flex-row items-center justify-between overflow-hidden border-0 text-lg ring-0`}
    >
      <div className="absolute left-0 ml-3 flex items-center">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="search"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        className={`overflow-hidden px-11 py-2 block w-full border-0 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-400 ${
          resultVisible ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'
        }`}
        style={{
          WebkitBorderBottomLeftRadius: resultVisible ? '0rem' : '0.5rem',
          WebkitBorderBottomRightRadius: resultVisible ? '0rem' : '0.5rem',
        }}
      />
      <button
        type="button"
        aria-label="Close search"
        className="absolute right-0 mr-3 flex items-center"
        onClick={closeModal}
      >
        <MdClose className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      </button>
    </div>
  );
}

export default SearchField;
