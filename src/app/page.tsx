'use client';
import Cart from '@/app/components/Cart';
import ErrorButton from '@/app/components/ErrorButton';
import FlyoutCart from '@/app/components/FlyoutCart';
import Pagination from '@/app/components/Pagination';
import Results from '@/app/components/Results';
import Search from '@/app/components/Search';
import { IState, MainProps } from '@/app/interfaces/interfaces';
import { closeRightPanel, sideLinkUnClicked } from '@/app/reducers/actions/actions';
import { AppDispatch } from '@/app/reducers/root/rootReduces';
import { ThemeContext } from '@/app/themes/themeContect';
import { ThemeSwitcher } from '@/app/themes/themeSwitcher';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Main: React.FC<MainProps> = ({ pokemonId }) => {
  const { theme } = useContext(ThemeContext);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);
  const overlayStatus = useSelector((state: IState) => state.searchSide.overlayStatus);
  const dispatch = useDispatch<AppDispatch>();

  const closeOverlayX = () => {
    dispatch(closeRightPanel());
    dispatch(sideLinkUnClicked());
  };

  return (
    <div className={`container ${theme}`}>
      {overlayStatus && <div className={`shadow shadow-${theme}`} onClick={closeOverlayX}></div>}
      <div className={`container-inner`}>
        <ThemeSwitcher></ThemeSwitcher>
        <Search></Search>
        <ErrorButton errorEnable={''}></ErrorButton>
        <Results pokemonId={pokemonId}></Results>
        {totalPokemons > 0 && <Pagination />}
        <Cart></Cart>
      </div>
      <FlyoutCart></FlyoutCart>
    </div>
  );
};

export default Main;
