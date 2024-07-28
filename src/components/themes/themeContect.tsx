import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleRightPanel } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';

export const ThemeContext = createContext({
  theme: 'dark',
  overflow: true,
  toggleTheme: () => {},
  toggleOverlay: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const savedTheme = localStorage.getItem('savedTheme');
  const [theme, setTheme] = useState(savedTheme ? savedTheme : 'light');
  const [overflow, setOverflow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('savedTheme', updatedTheme);
  };
  const toggleOverlay = () => {
    const updatedStatus = overflow === true ? false : true;
    setOverflow(updatedStatus);

    if (overflow === true) {
      dispatch(toggleRightPanel());
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, overflow, toggleTheme, toggleOverlay }}>{children}</ThemeContext.Provider>
  );
};
