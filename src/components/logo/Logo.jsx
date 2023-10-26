import { Link } from 'gatsby';
import React from 'react';
import MBLogo from './MBLogo';

function Logo() {
  return (
    <Link
      to="/"
      title="mounish's blog"
      className=""
      // className="font-warnockdisp text-custom-red mr-4 py-1 text-2xl font-bold tracking-wide"
    >
      {/* mounish's blog logo */}
      <MBLogo height="40px" />

      {/* mounish's blog  text */}
      {/* // mounish&apos;s blog */}
    </Link>
  );
}

export default Logo;
