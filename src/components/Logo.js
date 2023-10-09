import { Link } from 'gatsby';
import React from 'react';

function Logo() {
  return (
    <Link
      to="/"
      className="mr-4 py-1.5 font-semibold text-lg dark:text-gray-50"
    >
      mounish's blog
    </Link>
  );
}

export default Logo;
