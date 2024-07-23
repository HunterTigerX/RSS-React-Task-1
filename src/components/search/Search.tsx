import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToPageOne,
  saveInput,
  savePokemonsList,
  searchFailed,
  searchMain,
  updateInput,
} from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { IState } from 'reducers/reducers/Interfaces';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../themes/themeContect';
import { useGetPokemonByColorQuery } from 'reducers/root/pokemonApi';
import './search.css';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: IState) => state.searchMain.currentPage);
  const currentInput = useSelector((state: IState) => state.searchMain.currentInput);
  const savedInput = useSelector((state: IState) => state.searchMain.savedInput);
  const { theme } = useContext(ThemeContext);
  let navigate = useNavigate();

  const [pokemonName, setPokemonName] = useState<string>('');
  const { data, error, isFetching } = useGetPokemonByColorQuery(pokemonName === '' ? '1' : pokemonName);

  useEffect(() => {
    if (data) {
      navigate(`/page/1?${pokemonName}`);
      dispatch(searchMain(data));
      dispatch(savePokemonsList());
    }

    if (error) {
      const deepCopy = JSON.stringify(error);
      const errorMessage: string = JSON.parse(deepCopy);
      dispatch(searchFailed(errorMessage));
    }
  }, [data, error, dispatch]);

  const updatecurrentInput = (input: string) => {
    dispatch(updateInput(input));
  };

  const handleSearch = () => {
    dispatch(goToPageOne());
    const checkedInput = currentInput === '' ? '1' : currentInput;
    dispatch(saveInput(checkedInput));
    setPokemonName(checkedInput);
  };

  useEffect(() => {
    if (currentPage) {
      navigate(`/page/${currentPage}?${savedInput}`);
    } else {
      navigate('/page/1?black');
    }
    setPokemonName(savedInput);
  }, []);

  return (
    <div className="top-section">
      <button disabled={isFetching} className={`button_${theme} search_button`} onClick={handleSearch}>
        Search
      </button>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => {
          updatecurrentInput(e.target.value);
        }}
        placeholder="Enter Pokemon's color"
      />
      {isFetching && <div id="loading"></div>}
    </div>
  );
};

export default Search;
