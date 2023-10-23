import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'gatsby';
import { animatedArrowButton } from './AnimatedArrowButton.module.css';

function AnimatedArrowButton({ children, path, className }) {
  return (
    <Link
      className={`font-worksans flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-black dark:text-gray-400 hover:dark:text-gray-50 ${animatedArrowButton} ${className}`}
      to={path}
    >
      {children}
      <HiArrowUpRight className="text-semibold h-6 w-6" />
    </Link>
  );
}

export default AnimatedArrowButton;
