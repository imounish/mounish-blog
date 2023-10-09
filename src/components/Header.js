import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Navbar, IconButton, Collapse } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { menu } from '../constants/menu';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="dark:text-gray-50 mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menu.map((item) => (
        <li
          key={item.path}
          className="p-1 font-normal leading-normal antialiased block"
        >
          <Link className="flex items-center" to={item.path}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  const searchButton = (
    <button type="button">
      <MagnifyingGlassIcon className="w-6 dark:text-gray-50" />
    </button>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 border-0 dark:bg-gray-900 dark:shadow-white font-worksans text-base">
      <div className="flex items-center justify-between relative text-blue-gray-900">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 mr-4 hidden lg:block">
            {navList}
          </div>
          <ThemeSwitcher />
          {searchButton}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden dark:text-gray-50"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse className="text-black dark:text-gray-50" open={openNav}>
        {navList}
      </Collapse>
    </Navbar>
    // <ComplexNavbar />
  );
}

export default Header;
