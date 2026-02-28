/* ThemeContext: state 'light' | 'dark', action toggleTheme(). Persisted to localStorage. */
const ThemeContext = React.createContext(null);

const STORAGE_KEY = 'lab3-theme';

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (_) {}
  return 'dark';
}

function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = React.useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
}

window.ThemeContext = ThemeContext;
window.ThemeProvider = ThemeProvider;
