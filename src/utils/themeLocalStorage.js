function setThemeLocal(theme) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

function getDefaultTheme() {
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
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

export { getDefaultTheme, setThemeLocal };
