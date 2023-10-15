import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { MdClose } from 'react-icons/md';
import React from 'react';
import Input from '../input/Input';

function SearchField({ value, setValue, onFocus, closeModal }) {
  return (
    <div className="rounded-lg text-lg flex flex-row items-center justify-between ring-0 border-0">
      <div className="absolute inset-y-0 left-0 ml-3 flex items-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
      </div>
      <Input
        type="text"
        name="Search"
        id="search"
        placeholder="search"
        className="py-2 px-11"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus && onFocus}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 mr-3 flex items-center"
        onClick={closeModal}
      >
        <MdClose className="w-6 h-6 text-gray-900 dark:text-gray-100" />
      </button>
    </div>
  );
}

export default SearchField;
