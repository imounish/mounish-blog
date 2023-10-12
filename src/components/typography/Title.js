import React from 'react';
import { Link } from 'gatsby';
import {
  hoverUnderlineAnimation,
  bgCustomGreen,
  bgCustomMaroon,
} from './Title.module.css';

function Title({ children, className, path, highLightColor }) {
  return (
    <h3 className={`font-lora text-xl md:text-2xl font-semibold ${className ? className : ''}`}>
      <Link
        className={`no-underline text-gray-900 dark:text-gray-50 ${hoverUnderlineAnimation} ${
          highLightColor === 'maroon' && bgCustomMaroon
        } ${highLightColor === 'green' && bgCustomGreen}`}
        to={path}
      >
        {children}
      </Link>
    </h3>
  );
}

export default Title;
