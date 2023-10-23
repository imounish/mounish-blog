import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa6';
import { scrollToTopBtn } from './ScrollToTop.module.css';

const ScrollToTop = ({ showBelow }) => {
  const [show, setShow] = useState(!showBelow);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else if (show) setShow(false);
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  const scrollClickHandler = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  return (
    show && (
      <button
        type="button"
        onClick={scrollClickHandler}
        className={`lg:bottom-18 bottom-16 right-5 rounded-full bg-gray-50/80 p-3.5  text-gray-900 shadow-xl backdrop-blur-2xl hover:bg-gray-200/80 dark:bg-gray-800/60 dark:text-gray-100 dark:hover:bg-gray-600/60 md:right-8 lg:right-12 ${scrollToTopBtn}`}
      >
        <FaChevronUp className="h-8 w-8" />
      </button>
    )
  );
};
// shadow-xl dark:shadow-lg dark:shadow-gray-900

export default ScrollToTop;
