import React from 'react';

function SectionHeading({ children, className }) {
  return (
    <h2
      className={`font-warnockdisp text-2xl md:text-3xl font-semibold tracking-wide text-black dark:text-gray-50 lowercase ${className}`}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
