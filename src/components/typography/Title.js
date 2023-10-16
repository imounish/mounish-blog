import {
  customAnimationGreen,
  customAnimationMaroon,
} from './Title.module.css';

import { Link } from 'gatsby';
import React from 'react';

function Title({ children, className, path, highLightColor, leadingText }) {
  return (
    <h3 className={`${className || ''}`}>
      <Link
        className={`no-underline text-gray-900 dark:text-gray-50 `}
        to={path}
      >
        {leadingText && (
          <span className="font-warnockdisp text-lg md:text-xl font-light no-underline text-gray-800 dark:text-gray-200 pr-3">
            {leadingText}
          </span>
        )}
        <span
          className={`${highLightColor === 'maroon' && customAnimationMaroon} ${
            highLightColor === 'green' && customAnimationGreen
          }`}
        >
          {children}
        </span>
      </Link>
    </h3>
  );
}

export default Title;
