'use client';
import { IState } from '@/app/interfaces/interfaces';
import {
  searchMain,
  savePokemonsList,
  searchFailed,
  updateInput,
  goToPageOne,
  saveInput,
} from '@/app/reducers/actions/actions';
import { useGetPokemonByColorQuery } from '@/app/reducers/root/pokemonApi';
import { AppDispatch } from '@/app/reducers/root/rootReduces';
import { ThemeContext } from '@/app/themes/themeContect';
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentInput = useSelector((state: IState) => state.searchMain.currentInput);
  const savedInput = useSelector((state: IState) => state.searchMain.savedInput);
  const { theme } = useContext(ThemeContext);
  const [pokemonName, setPokemonName] = useState<string>('');
  const { data, error, isFetching } = useGetPokemonByColorQuery(pokemonName === '' ? '1' : pokemonName);
  const router = useRouter();

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
