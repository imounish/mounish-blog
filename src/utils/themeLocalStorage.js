function setThemeLocal(theme) {
  localStorage.setItem('theme', theme);
}

function getDefaultTheme() {
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

export { getDefaultTheme, setThemeLocal };
