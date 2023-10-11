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
  // todo: when opening on phone, it is showing light mode icon in dark mode
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className={`${themeSwitch} ${verticalShake}`}>
          <input
            type="checkbox"
            onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
          <HiSun
            className={`h-6 w-6 sm:h-8 sm:w-8 text-gray-800 hover:text-black ${
              theme !== "dark" ? fadeIn : fadeOut
            }`}
          />
          <HiMoon
            className={`h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-400 dark:hover:text-gray-50 ${
              theme === "dark" ? `${fadeIn}` : fadeOut
            }`}
          />
        </label>
      )}
    </ThemeToggler>
  );
}
