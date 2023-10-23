import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { MdClose } from 'react-icons/md';
import React from 'react';
import Input from '../input/Input';

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
      <Input
        type="text"
        name="Search"
        id="search"
        placeholder="search"
        className={`overflow-hidden px-11 py-2 ${
          resultVisible ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'
        }`}
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={onFocus && onFocus}
        style={{
          WebkitBorderBottomLeftRadius: resultVisible ? '0rem' : '0.5rem',
          WebkitBorderBottomRightRadius: resultVisible ? '0rem' : '0.5rem',
        }}
      />
      <button
        type="button"
        className="absolute right-0 mr-3 flex items-center"
        onClick={closeModal}
      >
        <MdClose className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      </button>
    </div>
  );
}

export default SearchField;
