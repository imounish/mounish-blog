import React from 'react';

function SectionBottom({ children, className, ...props }) {
  return (
    <div
      className={`mb-3 mt-8 lg:mb-4 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default SectionBottom;
