import { useDarkMode } from "usehooks-ts";

const ThemeToggle = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <button onClick={toggle} className="theme-toggle">
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;