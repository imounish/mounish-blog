import { Link } from 'gatsby';
import React from 'react';

function Logo() {
  return (
    <Link
      to="/"
      title='Logo'
      className="mr-4 py-1 font-bold text-2xl text-gray-900 dark:text-gray-50 font-warnockdisp tracking-wide"
    >
      {/* mounish's blog */}
      mounish&apos;s blog
    </Link>
  );
}

export default Logo;
