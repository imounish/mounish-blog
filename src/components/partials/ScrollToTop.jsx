import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa6';
import { scrollToTopBtn, scrollToTopBtnHiding } from './ScrollToTop.module.css';

const ScrollToTop = ({ showBelow }) => {
  const [show, setShow] = useState(!showBelow);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (!showBelow) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (window.pageYOffset > showBelow) {
          setShow(true);
          setIsHiding(false);
        } else {
          if (show) setIsHiding(true);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, showBelow]);

  const handleAnimationEnd = () => {
    if (isHiding) {
      setShow(false);
      setIsHiding(false);
    }
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onAnimationEnd={handleAnimationEnd}
      className={`lg:bottom-18 bottom-16 right-5 rounded-full bg-gray-50/80 p-3.5 text-gray-900 shadow-xl backdrop-blur-lg hover:bg-gray-200/80 focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 dark:bg-gray-800/60 dark:text-gray-100 dark:hover:bg-gray-600/60 dark:focus-visible:ring-gray-100 md:right-8 lg:right-12 ${isHiding ? scrollToTopBtnHiding : scrollToTopBtn}`}
    >
      <FaChevronUp className="h-8 w-8" />
    </button>
  );
};

export default ScrollToTop;
