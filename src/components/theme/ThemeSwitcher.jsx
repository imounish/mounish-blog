import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import {
  themeSwitch,
  fadeIn,
  fadeOut,
  verticalShake,
} from './ThemeSwitcher.module.css';

// TODO: use localStorage to save the user preference and update accordingly
// write a util fn to store the dark mode preference
// explore and implement adding class to the body tag of the website directly without using 3rd party plugin

// const useThemeDetector = () => {
//   // const getCurrentTheme = () =>
//   //   window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const [isDarkTheme, setIsDarkTheme] = useState();
//   const mqListener = (e) => {
//     setIsDarkTheme(e.matches);
//   };

//   useEffect(() => {
//     const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
//     darkThemeMq.addListener(mqListener);
//     return () => darkThemeMq.removeListener(mqListener);
//   }, []);
//   return isDarkTheme;
// };

export default function ThemeSwitcher() {
  // todo: when opening on phone, it is showing light mode icon in dark mode
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label htmlFor='theme-checkbox' className={`h-6 w-6 sm:h-8 sm:w-8 ${themeSwitch} ${verticalShake}`}>
          <input
            type="checkbox"
            id="theme-checkbox"
            onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />
          <HiSun
            className={`w-full h-full text-gray-800 hover:text-black ${
              theme !== 'dark' ? fadeIn : fadeOut
            }`}
          />
          <HiMoon
            className={`w-full h-full dark:text-gray-400 dark:hover:text-gray-50 ${
              theme === 'dark' ? `${fadeIn}` : fadeOut
            }`}
          />
        </label>
      )}
    </ThemeToggler>
  );
}