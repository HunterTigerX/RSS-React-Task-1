import { useContext } from 'react';
import { ThemeContext } from './themeContect';

import './button.css';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <button className={`toggle_button button_${theme}`} onClick={toggleTheme}>
        Enable {theme === 'dark' ? 'light' : 'dark'} theme
      </button>
    </div>
  );
};
