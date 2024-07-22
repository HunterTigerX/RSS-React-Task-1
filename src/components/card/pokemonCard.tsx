import { useDispatch, useSelector } from 'react-redux';
import { toggleRightPanel } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { IState } from 'reducers/reducers/Interfaces';
import { useContext } from 'react';
import { ThemeContext } from '../themes/themeContect';
import { makeNameCapital } from '@components/methods/urlMethods';

import './pokemonCard.css';

const PokemonCard = () => {
  const pokemonName = useSelector((state: IState) => state.searchSide.pokemonName);
  const pokemonImage = useSelector((state: IState) => state.searchSide.pokemonImage);
  const pokemonDescription = useSelector((state: IState) => state.searchSide.pokemonDescription);
  const loadingRight = useSelector((state: IState) => state.searchSide.loadingRight);
  const { theme, toggleOverlay } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const closeRightScreen = () => {
    toggleOverlay();
    dispatch(toggleRightPanel());
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
            <img className={`pokePic`} src={pokemonImage} alt="React Image" />
          </div>
        )}
      </div>
    );
  };

  return <>{setResults()}</>;
};

export default PokemonCard;
