import { createContext, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const savedThemeInit = () => {
    const savedState = typeof window !== 'undefined' ? localStorage.getItem('savedTheme') : null;
    return savedState;
  };
  const savedTheme = savedThemeInit();

  const [theme, setTheme] = useState(savedTheme ? savedTheme : 'light');

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('savedTheme', updatedTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
