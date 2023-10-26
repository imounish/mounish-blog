function setThemeLocal(theme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

function getDefaultTheme() {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setThemeLocal('dark');
        return 'dark';
      }
      setThemeLocal('light');
      return 'light';
    }
    return savedTheme;
  }
  return null;
}

export { getDefaultTheme, setThemeLocal };
