import React from 'react';

function SectionHeading({ children, className }) {
  return (
    <h2
      className={`font-warnockdisp text-3xl tracking-wide text-black dark:text-gray-50 md:text-4xl ${
        className || ''
      }`}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
