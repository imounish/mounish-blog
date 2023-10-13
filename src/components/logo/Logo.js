import { Link } from 'gatsby';
import React from 'react';

function Logo() {
  return (
    <Link
      to="/"
      className="mr-4 py-1 font-bold text-2xl text-gray-900 hover:text-black dark:text-gray-100 dark:hover:text-white transition-all font-warnockdisp tracking-wide"
    >
      mounish's blog
    </Link>
  );
}

export default Logo;
