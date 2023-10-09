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
          <HiSun className={theme !== 'dark' ? fadeIn : fadeOut} />
          <HiMoon
            className={theme === 'dark' ? `dark:text-white ${fadeIn}` : fadeOut}
          />
          {/* {theme !== 'dark' && <SunIcon className="w-6" />}
          {theme === 'dark' && <MoonIcon className="w-6 dark:text-gray-50" />} */}
        </label>
      )}
    </ThemeToggler>
  );
}
