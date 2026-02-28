function ThemeToggleButton() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <button type="button" className="btn" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
    </button>
  );
}
window.ThemeToggleButton = ThemeToggleButton;
