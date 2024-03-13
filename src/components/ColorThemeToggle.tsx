import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

interface ColorModeToggleProps {
  onToggle: (isDark: boolean) => void;
  isDarkTheme: boolean;
}

export default function ColorThemeToggle({
  onToggle,
  isDarkTheme,
}: ColorModeToggleProps) {
  return (
    <section className='toggle-container'>
      <button className='dark-toggle' onClick={() => onToggle(!isDarkTheme)}>
        {isDarkTheme ? (
          <FaSun className='toggle-icon' />
        ) : (
          <FaMoon className='toggle-icon' />
        )}
      </button>
    </section>
  );
}
