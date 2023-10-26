import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { fadeInSun, fadeInMoon } from './ThemeToggle.module.css';
import { getDefaultTheme, setThemeLocal } from '../../utils/themeLocalStorage';
import useIsClient from '../../utils/useIsClient';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(getDefaultTheme());
  const { isClient, key } = useIsClient();

  useEffect(() => {
    if (isDark === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    setThemeLocal(isDark);
  }, [isDark])

  if (!isClient) return null;

  return (
    <div key={key}>
      {isDark === 'dark' ? (
        <HiSun
          title="Change to light mode"
          onClick={() => setIsDark('light')}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${fadeInSun}`}
        />
      ) : (
        <HiMoon
          title="Change to dark mode"
          onClick={() => setIsDark('dark')}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${fadeInMoon}`}
        />
      )}
    </div>
  );
}

export default ThemeToggle;