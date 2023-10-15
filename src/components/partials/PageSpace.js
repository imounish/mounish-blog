import React from 'react';
import { pageSpaceContainer } from './PageSpace.module.css';

function PageSpace({ children, className, ...props }) {
  return (
    <div
      className={`${
        className || ''
      } ${pageSpaceContainer} bg-white dark:bg-black overflow-auto`}
      {...props}
    >
      {children}
    </div>
  );
}

export default PageSpace;
