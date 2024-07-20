import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchSide, setLoadingRight, toggleRightPanel } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { IPokemonData } from './interfaces';
import { IState } from 'reducers/reducers/Interfaces';

import './results.css';

const Results = () => {
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);
  const showRightPanel = useSelector((state: IState) => state.searchMain.showRightPanel);

  const dispatch = useDispatch<AppDispatch>();

  const linkClicked = () => {
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
          <div className="results-right">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default Results;
