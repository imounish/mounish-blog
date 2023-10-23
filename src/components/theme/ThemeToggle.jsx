import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import useDarkMode from 'use-dark-mode';

function ThemeToggle() {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <button type='button' onClick={darkMode.toggle}
      className='h-6 w-6 sm:h-8 sm:w-8'
      aria-label='Change theme'
      title='Change theme'
    >
      {darkMode.value && <HiSun className="w-full h-full dark:text-gray-50" />}
      {!darkMode.value && <HiMoon className='w-full h-full text-gray-900' />}
    </button>
  )
}

export default ThemeToggle;