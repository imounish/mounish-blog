import React from 'react';

function MarginedContainer({ children, className, ...props }) {
  return (
    <div className={`container mx-auto ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export default MarginedContainer;
