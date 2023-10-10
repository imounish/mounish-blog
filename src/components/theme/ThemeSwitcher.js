import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import {
  themeSwitch,
  fadeIn,
  fadeOut,
  verticalShake,
} from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className={`${themeSwitch} ${verticalShake}`}>
          <input
            type="checkbox"
            onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />
          <HiSun
            className={`h-6 w-6 sm:h-8 sm:w-8 ${
              theme !== 'dark' ? fadeIn : fadeOut
            }`}
          />
          <HiMoon
            className={`h-6 w-6 sm:h-8 sm:w-8 dark:text-white ${
              theme === 'dark' ? `${fadeIn}` : fadeOut
            }`}
          />
        </label>
      )}
    </ThemeToggler>
  );
}