import Cart from '@/components/Cart';
import ErrorButton from '@/components/ErrorButton';
import FlyoutCart from '@/components/FlyoutCart';
import Pagination from '@/components/Pagination';
import Results from '@/components/Results';
import Search from '@/components/Search';
import { IState, MainProps } from '@/interfaces/interfaces';
import { closeRightPanel, sideLinkUnClicked } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { ThemeContext } from '@/themes/themeContect';
import { ThemeSwitcher } from '@/themes/themeSwitcher';
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

export { Main };
