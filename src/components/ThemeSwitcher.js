import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { themeSwitch } from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className={themeSwitch}>
          <input
            type="checkbox"
            onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />
          {theme !== 'dark' && <SunIcon className="w-6" />}
          {theme === 'dark' && <MoonIcon className="w-6 dark:text-gray-50" />}
        </label>
      )}
    </ThemeToggler>
  );
}
