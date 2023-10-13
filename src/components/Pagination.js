import React from 'react';
import { Link } from 'gatsby';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { disabled } from './Pagination.module.css';

function Pagination({ baseUrl, numberOfPages, currentPage, className }) {
  const prevPage = currentPage - 1 <= 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <div className="flex flex-col items-end pb-2 sm:pb-4">
      <div
        className={`flex flex-row item-end font-worksans text-gray-900 dark:text-gray-50 text-lg ${
          className || ''
        }`}
      >
        <Link
          to={`${baseUrl}/${prevPage}`}
          className={`mr-2 flex flex-row items-center pl-2.5 pr-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors ${
            currentPage <= 1 && disabled
          }`}
        >
          <FaChevronLeft />
          Prev
        </Link>
        <Link
          className={`ml-2 flex flex-row items-center pl-3 pr-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors ${
            currentPage >= numberOfPages && disabled
          }`}
          to={`${baseUrl}/${nextPage}`}
        >
          Next
          <FaChevronRight />
        </Link>
      </div>
      <p className="font-warnockcapt text-gray-600 dark:text-gray-400 text-md italic font-light tracking-wide pt-2">
        page {currentPage} of {numberOfPages} page{numberOfPages > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default Pagination;
