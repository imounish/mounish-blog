import React from 'react'
import { Link } from 'gatsby';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {disabled} from './Pagination.module.css';

function Pagination({ baseUrl, numberOfPages, currentPage, className }) {
  const prevPage = currentPage - 1 <= 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <div className='flex flex-col items-start pb-2'>
    <p className="font-warnockcapt text-gray-600 dark:text-gray-400 text-md italic font-semibold pl-1 pb-1">
        page {currentPage} of {numberOfPages} page{numberOfPages > 1 ? "s" : ""}
      </p>
    <div
      className={`flex flex-row item-start font-worksans text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-lg ${
        className ? className : ""
      }`}
    >
      <Link
        to={`${baseUrl}/${prevPage}`}
        className={`mr-2 flex flex-row items-center ${
          currentPage <= 1 && disabled
        }`}
      >
        <FaChevronLeft />
        Prev
      </Link>
      <Link
        className={`ml-2 flex flex-row items-center ${
          currentPage >= numberOfPages && disabled
        }`}
        to={`${baseUrl}/${nextPage}`}
      >
        Next
        <FaChevronRight />
      </Link>
      <p></p>
    </div>
    </div>
  );
}

export default Pagination;