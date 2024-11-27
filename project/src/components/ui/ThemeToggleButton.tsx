
import { useTheme } from '../../lib/hooks/useTheme';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? '🌞 Mode Clair' : '🌜 Mode Sombre'}
    </button>
  );
};

export default ThemeToggleButton;
