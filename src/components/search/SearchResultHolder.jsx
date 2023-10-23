import React from 'react';

function SearchResultHolder({ children, className }) {
  return (
    <div
      className={`block w-full rounded-b-lg bg-gray-100 px-11 text-lg dark:bg-gray-800 ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
}

export default SearchResultHolder;
