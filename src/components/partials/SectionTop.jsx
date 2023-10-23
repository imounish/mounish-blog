import React from 'react';

function SectionTop({ children, className, ...props }) {
  return (
    <div className={`mb-8 mt-3 lg:mt-4 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export default SectionTop;
