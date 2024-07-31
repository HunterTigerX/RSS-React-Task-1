import { IState } from '@/interfaces/interfaces';
import { closeRightPanel, sideLinkUnClicked } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { ThemeContext } from '@/themes/themeContect';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeNameCapital } from './urlMethods';
import Image from 'next/image';

const PokemonCard = () => {
  const pokemonName = useSelector((state: IState) => state.searchSide.pokemonName);
  const pokemonImage = useSelector((state: IState) => state.searchSide.pokemonImage);
  const pokemonDescription = useSelector((state: IState) => state.searchSide.pokemonDescription);
  const loadingRight = useSelector((state: IState) => state.searchSide.loadingRight);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const closeRightScreen = () => {
    dispatch(closeRightPanel());
    dispatch(sideLinkUnClicked());
  };

  const setResults = () => {
    return (
      <div>
        <button className={`button_${theme}`} onClick={closeRightScreen}>
          X
        </button>
        {loadingRight && <div id="loadingRightSlide"></div>}
        {!loadingRight && (
          <div>
            <div>Pokemon name is {makeNameCapital(pokemonName)}</div>
            <div>{pokemonDescription}</div>
            {pokemonImage && (
              <Image className={`pokePic`} src={pokemonImage} alt="Pokemon Image" width={96} height={96} />
            )}
          </div>
        )}
      </div>
    );
  };

  return <>{setResults()}</>;
};

export default PokemonCard;
