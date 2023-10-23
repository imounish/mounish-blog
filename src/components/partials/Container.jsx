import React from 'react';

function Container({ children, ...props }) {
  return (
    <div className="bg-white pt-[56px] dark:bg-black lg:pt-[72px]" {...props}>
      {children}
    </div>
  );
}

export default Container;
