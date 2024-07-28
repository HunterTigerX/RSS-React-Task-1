import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  savePokemonsList,
  searchFailed,
  searchSide,
  setLoadingRight,
  toggleRightPanel,
} from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { ThemeContext } from 'components/themes/themeContect';
import { addToCart, updateCart } from 'reducers/actions/cartActions';
import { useGetPokemonByIdQuery } from 'reducers/root/pokemonApi';
import { IState, IPokemonData } from '@components/interfaces/interfaces';
import './results.css';

interface ICheckboxData {
  checked: boolean;
  pokemonId: string | null;
}

const Results = () => {
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);
  const showRightPanel = useSelector((state: IState) => state.searchMain.showRightPanel);
  const { theme, toggleOverlay } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const [pokemonData, setPokemonData] = useState<ICheckboxData>({ checked: false, pokemonId: null });
  const [pokemonId, setPokemonId] = useState<string>('');
  const [samePokemonClicked, setSamePokemonClicked] = useState<boolean>(false);
  const { data, error } = useGetPokemonByIdQuery(pokemonId, {
    skip: !pokemonId || pokemonId == '',
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    const selectedPokemonId = pokemonsOnPage[index].id;
    const selectedPokemonName = pokemonsOnPage[index].name;
    dispatch(addToCart(selectedPokemonId, isChecked, selectedPokemonName));
    setPokemonId(selectedPokemonId);
    dispatch(savePokemonsList());
    setPokemonData({
      checked: isChecked,
      pokemonId: selectedPokemonId,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(searchSide(data));
      if (pokemonData.checked) {
        dispatch(updateCart(data));
        setPokemonData({
          checked: false,
          pokemonId: null,
        });
      }
    }
    if (error) {
      const deepCopy = JSON.stringify(error);
      const errorMessage: string = JSON.parse(deepCopy);
      dispatch(searchFailed(errorMessage));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(searchSide(data));
      if (pokemonData.checked) {
        dispatch(updateCart(data));
        setPokemonData({
          checked: false,
          pokemonId: null,
        });
      }
    }
  }, [samePokemonClicked]);

  useEffect(() => {
    if (data) {
      if (String(data.id) === pokemonId) {
        dispatch(updateCart(data));
      }
    }
  }, [pokemonData]);

  const linkClicked = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetUrl = event.currentTarget.getAttribute('href');
    if (targetUrl) {
      const pokemonIdFromUrl = targetUrl.split('/')[4];
      if (pokemonIdFromUrl === pokemonId) {
        setSamePokemonClicked(!samePokemonClicked);
      }
      toggleOverlay();
      dispatch(setLoadingRight());
      dispatch(toggleRightPanel(true));
      setPokemonId(pokemonIdFromUrl);
    }
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
