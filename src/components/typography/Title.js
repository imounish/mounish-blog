import React from 'react';
import { Link } from 'gatsby';
import {
  hoverUnderlineAnimation,
  bgCustomGreen,
  bgCustomMaroon,
} from './Title.module.css';

function Title({ children, className, path, highLightColor, leadingText }) {
  return (
    <h3 className={`${className || ""}`}>
      <Link
        className={`no-underline text-gray-900 dark:text-gray-50  ${hoverUnderlineAnimation} ${
          highLightColor === "maroon" && bgCustomMaroon
        } ${highLightColor === "green" && bgCustomGreen}`}
        to={path}
      >
        {leadingText && (
          <span className="font-warnockdisp text-lg md:text-xl font-light no-underline text-gray-800 dark:text-gray-200 pr-3">
            {leadingText}
          </span>
        )}
        {children}
      </Link>
    </h3>
  );
}

export default Title;
