import { IState } from '@/interfaces/interfaces';
import {
  searchMain,
  savePokemonsList,
  searchFailed,
  updateInput,
  goToPageOne,
  saveInput,
} from '@/reducers/actions/actions';
import { useGetPokemonByColorQuery } from '@/reducers/root/pokemonApi';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { ThemeContext } from '@/themes/themeContect';
import router from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentInput = useSelector((state: IState) => state.searchMain.currentInput);
  const savedInput = useSelector((state: IState) => state.searchMain.savedInput);
  const { theme } = useContext(ThemeContext);
  const [pokemonName, setPokemonName] = useState<string>('');
  const { data, error, isFetching } = useGetPokemonByColorQuery(pokemonName === '' ? '1' : pokemonName);

  useEffect(() => {
    if (data) {
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
    const checkedInput = currentInput === '' ? '1' : currentInput;
    router.push(`/page/1?${checkedInput}`);
    dispatch(goToPageOne());
    dispatch(saveInput(checkedInput));
    setPokemonName(checkedInput);
  };

  useEffect(() => {
    setPokemonName(savedInput === '' ? 'black' : savedInput);
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
