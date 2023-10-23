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
        className={`item-end font-worksans flex flex-row text-lg text-gray-900 dark:text-gray-50 ${
          className || ''
        }`}
      >
        <Link
          to={`${baseUrl}/${prevPage}`}
          className={`mr-2 flex flex-row items-center rounded-md bg-gray-100 py-1.5 pl-2.5 pr-3 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 ${
            currentPage <= 1 && disabled
          }`}
        >
          <FaChevronLeft />
          Prev
        </Link>
        <Link
          className={`ml-2 flex flex-row items-center rounded-md bg-gray-100 py-1 pl-3 pr-2.5 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 ${
            currentPage >= numberOfPages && disabled
          }`}
          to={`${baseUrl}/${nextPage}`}
        >
          Next
          <FaChevronRight />
        </Link>
      </div>
      <p className="font-warnockcapt text-md pt-2 font-light italic tracking-wide text-gray-600 dark:text-gray-400">
        page {currentPage} of {numberOfPages} page{numberOfPages > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default Pagination;
