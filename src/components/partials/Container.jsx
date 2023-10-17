import React from 'react';

function Container({ children, ...props }) {
  return (
    <div className="bg-white dark:bg-black pt-[56px] lg:pt-[72px]" {...props}>
      {children}
    </div>
  );
}

export default Container;
