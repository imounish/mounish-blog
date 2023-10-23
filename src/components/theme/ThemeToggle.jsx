import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import useDarkMode from 'use-dark-mode';
import { fadeIn, animateSun, animateMoon, moonLogo, sunLogo } from './ThemeToggle.module.css';

function ThemeToggle() {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    minify: true,
  });

  return (
    // <button type='button' onClick={darkMode.toggle}
    //   className='h-6 w-6 sm:h-8 sm:w-8 rounded-full'
    //   aria-label='Change theme'
    //   title='Change theme'
    // >
    //   {darkMode?.value && <HiSun className="w-full h-full text-gray-50" />}
    //   {!darkMode?.value && <HiMoon className='w-full h-full text-gray-900' />}
    // </button>
    <>
      {darkMode?.value && (
        <HiSun
          title="Change to light mode"
          onClick={darkMode.disable}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${fadeIn}`}
        />
      )}
      {!darkMode?.value && (
        <HiMoon
          title="Change to dark mode"
          onClick={darkMode.enable}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${fadeIn}`}
        />
      )}
    </>
  );
}

export default ThemeToggle;
