import React from 'react';

function SectionMiddle({ children, className, ...props }) {
  return (
    <div className={`my-8 ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export default SectionMiddle;
