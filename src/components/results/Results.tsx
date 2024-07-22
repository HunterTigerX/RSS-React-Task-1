import { ChangeEvent, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePokemonsList, searchSide, setLoadingRight, toggleRightPanel } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { IState } from 'reducers/reducers/Interfaces';
import { ThemeContext } from 'components/themes/themeContect';
import { IPokemonData } from './interfaces';

import './results.css';
import { toggleCart } from 'reducers/actions/cartActions';

const Results = () => {
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);
  const showRightPanel = useSelector((state: IState) => state.searchMain.showRightPanel);
  const { theme, toggleOverlay } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    const selectedPokemonId = pokemonsOnPage[index].id;
    const selectedPokemonName = pokemonsOnPage[index].name;
    dispatch(toggleCart(selectedPokemonId, isChecked, selectedPokemonName));
    dispatch(savePokemonsList());
  };

  const linkClicked = () => {
    toggleOverlay();
    dispatch(setLoadingRight());
    dispatch(toggleRightPanel(true));

    setTimeout(() => {
      const pokemonId = window.location.href.split('/')[6];
      dispatch(searchSide(pokemonId));
    }, 500);
  };

  const setResults = () => {
    if (totalPokemons === 0) {
      return (
        <>
          <div className="bottom-section">{`Pokemons with this color were not found`}</div>
        </>
      );
    } else {
      return (
        <>
          {
            <nav>
              <ul>
                {pokemonsOnPage &&
                  pokemonsOnPage.map((item: IPokemonData, index: number) => (
                    <li key={`pokeKey${index}`}>
                      <input
                        type="checkbox"
                        checked={pokemonsOnPage[index].checkBox}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                      <Link
                        to={`pokemon/${pokemonsOnPage[index].id}`}
                        key={`pokeLinkKey${index + 1}`}
                        onClick={linkClicked}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          }
        </>
      );
    }
  };

  return (
    <>
      <div className="results-container">
        <div className="results-left">{setResults()}</div>
        {showRightPanel && (
          <div className={`results-right border-${theme}`}>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default Results;
