import React from 'react';
import { pageSpaceContainer } from './PageSpace.module.css';

function PageSpace({ children, className }) {
  return (
    <div
      className={`${
        className ? className : ""
      } ${pageSpaceContainer} bg-white dark:bg-black overflow-auto`}
    >
      <div className='container mx-auto'>
      {children}
      </div>
    </div>
  );
}

export default PageSpace;
