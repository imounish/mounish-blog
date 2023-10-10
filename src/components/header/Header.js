import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Navbar, IconButton, Collapse } from '@material-tailwind/react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

import { menu } from '../../constants/menu';
import Logo from '../logo/Logo';
import ThemeSwitcher from '../theme/ThemeSwitcher';
import { SearchModalContext } from '../../context/searchModalContext';
import SearchButton from '../search/SearchButton';
import { hoverUnderlineAnimation } from './Header.module.css';

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const { openSearchModal } = useContext(SearchModalContext);

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
          className="py-1 px-0 lg:px-1 font-normal leading-normal antialiased block"
        >
          <Link
            className={`flex items-center ${hoverUnderlineAnimation}`}
            to={item.path}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 border-0 dark:bg-gray-900 dark:shadow-white font-worksans text-base">
      <div className="flex items-center justify-between relative text-black">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 mr-4 hidden lg:block">
            {navList}
          </div>
          <ThemeSwitcher />
          <SearchButton openSearchModal={openSearchModal} />
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 sm:h-8 sm:w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden dark:text-gray-50"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <HiX className="h-6 w-6 sm:h-8 sm:w-8" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 sm:h-8 sm:w-8" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse className="text-black dark:text-gray-50" open={openNav}>
        {navList}
      </Collapse>
    </Navbar>
  );
}

export default Header;
