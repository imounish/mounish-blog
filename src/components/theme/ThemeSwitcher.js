import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import {
  themeSwitch,
  fadeIn,
  fadeOut,
  verticalShake,
} from './ThemeSwitcher.module.css';

const useThemeDetector = () => {
  // const getCurrentTheme = () =>
  //   window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState();
  const mqListener = (e) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

export default function ThemeSwitcher() {
  let isDarkTheme = useThemeDetector();
  const onThemeChange = (e, toggleTheme) => {
    if (e.target.checked) {
      isDarkTheme = true;
      toggleTheme('dark');
    } else {
      isDarkTheme = false;
      toggleTheme('light');
    }
  };

  // todo: when opening on phone, it is showing light mode icon in dark mode
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className={`${themeSwitch} ${verticalShake}`}>
          <input
            type="checkbox"
            onChange={(e) => onThemeChange(e, toggleTheme)}
            checked={isDarkTheme}
            // checked={theme === 'dark'}
          />
          <HiSun
            className={`h-6 w-6 sm:h-8 sm:w-8 text-gray-800 hover:text-black ${
              !isDarkTheme ? fadeIn : fadeOut
            }`}
          />
          <HiMoon
            className={`h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-400 dark:hover:text-gray-50 ${
              isDarkTheme ? `${fadeIn}` : fadeOut
            }`}
          />
        </label>
      )}
    </ThemeToggler>
  );
}
