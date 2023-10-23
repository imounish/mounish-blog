import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Navbar, IconButton, Collapse } from '@material-tailwind/react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

import menu from '../../constants/menu';
import Logo from '../logo/Logo';
import { SearchModalContext } from '../../context/searchModalContext';
import SearchButton from '../search/SearchButton';
import { hoverUnderlineAnimation } from './Header.module.css';
import ThemeToggle from '../theme/ThemeToggle';

function Header() {
  // add close on click outside
  const [openNav, setOpenNav] = useState(false);
  // scroll state
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // header visible state
  const [visible, setVisible] = useState(true);
  const { openSearchModal } = useContext(SearchModalContext);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 dark:text-gray-50 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menu.map(item => (
        <li
          key={item.path}
          className="block px-0 py-1 font-normal leading-normal antialiased lg:px-1"
        >
          <Link
            className={`flex w-fit items-center ${hoverUnderlineAnimation}`}
            to={item.path}
            onClick={() => {
              if (openNav) setOpenNav(!openNav);
            }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Navbar
      className="font-worksans fixed top-0 z-10 h-max max-w-full rounded-none border-0 px-4 py-2 text-lg opacity-100 backdrop-blur-lg transition-opacity dark:bg-black/75 dark:shadow-gray-900/40 lg:px-8 lg:py-4"
      style={{
        top: visible ? '0' : '-72px',
        transition: '0.5s',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="relative flex items-center justify-between text-black">
        <Logo />
        <div className="flex items-center gap-4">
          <div className="absolute left-2/4 top-2/4 mr-4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            {navList}
          </div>
          <ThemeToggle />
          <SearchButton openSearchModal={openSearchModal} />
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent dark:text-gray-50 sm:h-8 sm:w-8 lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <HiX className="h-6 w-6 text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8" />
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
