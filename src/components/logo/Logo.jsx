import { Link } from 'gatsby';
import React from 'react';

function Logo() {
  return (
    <Link
      to="/"
      title="Logo"
      className="font-warnockdisp mr-4 py-1 text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-50"
    >
      {/* mounish's blog */}
      mounish&apos;s blog
    </Link>
  );
}

export default Logo;
