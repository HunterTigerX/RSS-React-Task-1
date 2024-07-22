import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Search from 'components/search/Search';
import ErrorButton from 'components/ErrorButton/ErrorButton';
import Pagination from 'components/Pagination/Pagination';
import Cart from '@components/cart/cart';

import { ThemeSwitcher } from 'components/themes/themeSwitcher';
import { ThemeContext } from 'components/themes/themeContect';

import './Main.css';

const Main = () => {
  const { theme, overflow, toggleOverlay } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`}>
      {overflow && <div className={`shadow shadow-${theme}`} onClick={toggleOverlay}></div>}
      <div className={`container-inner`}>
        <ThemeSwitcher></ThemeSwitcher>
        <Search></Search>
        <ErrorButton errorEnable={''}></ErrorButton>
        <Outlet />
        <Pagination></Pagination>
        <Cart></Cart>
      </div>
    </div>
  );
};

export { Main };
