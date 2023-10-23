import React from 'react';
import { pageSpaceContainer } from './PageSpace.module.css';

function PageSpace({ children, className, ...props }) {
  return (
    <div
      className={`${
        className || ''
      } ${pageSpaceContainer} overflow-auto bg-white dark:bg-black`}
      {...props}
    >
      {children}
    </div>
  );
}

export default PageSpace;
