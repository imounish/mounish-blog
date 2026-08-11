// T3: ported from src/components/theme/ThemeToggle.jsx (Gatsby app), with
// two adaptations for Astro's islands model:
//   1. It toggles the `dark` class on `document.documentElement` (<html>)
//      instead of `document.body` — matches the pre-hydration script in
//      Layout.astro, which (unlike gatsby-ssr.jsx's pre-*body* script) runs
//      in <head> and so must use `documentElement`, since `document.body`
//      doesn't exist yet at that point in parsing. See Layout.astro for the
//      full explanation.
//   2. This is rendered with `client:load` from Layout.astro (see that
//      file) — the rest of the porting (state, effect, localStorage
//      persistence, the isClient-gated null render to dodge an
//      icon-flash-on-hydration) is unchanged.
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import styles from './ThemeToggle.module.css';
import { getDefaultTheme, setThemeLocal } from '../../utils/themeLocalStorage';
import useIsClient from '../../utils/useIsClient';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(getDefaultTheme());
  const { isClient, key } = useIsClient();

  useEffect(() => {
    if (isDark === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setThemeLocal(isDark);
  }, [isDark]);

  if (!isClient) return null;

  return (
    <div key={key}>
      {isDark === 'dark' ? (
        <HiSun
          title="Change to light mode"
          onClick={() => setIsDark('light')}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${styles.fadeInSun}`}
        />
      ) : (
        <HiMoon
          title="Change to dark mode"
          onClick={() => setIsDark('dark')}
          className={`h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 sm:h-8 sm:w-8 ${styles.fadeInMoon}`}
        />
      )}
    </div>
  );
}

export default ThemeToggle;
