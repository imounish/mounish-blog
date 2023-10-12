import React from 'react'
import { animatedArrowButton } from './AnimatedArrowButton.module.css'; 
import { HiArrowUpRight } from "react-icons/hi2";
import { Link } from 'gatsby';

function AnimatedArrowButton({ children, path, className, ...props }) {
  return (
    <Link
      className={`flex items-center gap-2 w-min font-worksans text-lg font-medium text-gray-800 dark:text-gray-400 hover:text-black hover:dark:text-gray-50 ${animatedArrowButton} ${className}`}
      to={path}
      {...props}
    >
      {children}
      <HiArrowUpRight className='text-semibold w-6 h-6' />
    </Link>
  );
}

export default AnimatedArrowButton