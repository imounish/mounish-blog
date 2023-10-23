import { Link } from 'gatsby';
import React from 'react';
import {
  customAnimationGreen,
  customAnimationMaroon,
} from './Title.module.css';

function Title({ children, className, path, highLightColor, leadingText }) {
  return (
    <h3 className={`${className || ''}`}>
      <Link
        className={`text-gray-900 no-underline dark:text-gray-50 `}
        to={path}
      >
        {leadingText && (
          <span className="font-warnockdisp pr-3 text-lg font-light text-gray-800 no-underline dark:text-gray-200 md:text-xl">
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
