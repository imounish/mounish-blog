import { Link } from 'gatsby';
import React from 'react';

function Logo() {
  return (
    <Link
      to="/"
      className="mr-4 py-1 font-bold text-xl dark:text-gray-50 font-warnock tracking-wide"
    >
      mounish's blog
    </Link>
  );
}

export default Logo;
