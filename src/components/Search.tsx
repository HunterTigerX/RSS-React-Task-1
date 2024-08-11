'use client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  searchMain,
  savePokemonsList,
  searchFailed,
  updateInput,
  goToPageOne,
  saveInput,
  saveSearchedValues,
  setInputChanged,
} from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { SearchProps, IState, ISearchData } from '@/interfaces/interfaces';
import { ThemeContext } from '@/themes/themeContect';

const Search: React.FC<SearchProps> = ({ data, error, lastSearch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentInputX = useSelector((state: IState) => state.searchMain.currentInput);
  const savedSearches = useSelector((state: IState) => state.searchMain.savedSearches);
  const inputChanged = useSelector((state: IState) => state.searchMain.inputChanged);
  const [lastInput, setLastInput] = useState('');
  const [lastData, setLastData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const currentInput = currentInputX === '' && inputChanged !== true ? lastInput : currentInputX;

  useEffect(() => {
    setLastInput(lastSearch);
  }, []);

  useEffect(() => {
    if (data !== lastData) {
      setLastData(data);
      setisLoading(false);
    }
  }, [data, lastData]);

  useEffect(() => {
    if (data && !error) {
      dispatch(searchMain(data as ISearchData));
      dispatch(savePokemonsList());
    }
    if (error) {
      const deepCopy = JSON.stringify(error);
      const errorMessage: string = JSON.parse(deepCopy);
      dispatch(searchFailed(errorMessage));
    }
  }, [data, dispatch]);

  const updatecurrentInput = (input: string) => {
    dispatch(setInputChanged());
    dispatch(updateInput(input));
  };

  const handleSearch = () => {
    const stringedInput = String(currentInput);

    if (String(lastSearch) !== stringedInput) {
      if (!savedSearches.includes(stringedInput)) {
        dispatch(saveSearchedValues(stringedInput));
        setisLoading(true);
      }
    }
    const checkedInput = currentInput === '' ? 'black' : currentInput;
    router.push(`/color/${checkedInput}`);
    dispatch(goToPageOne());
    dispatch(saveInput(checkedInput));
  };

  return (
    <>
      <div>
        {isLoading && <div id="loading"></div>}
        <div className="top-section">
          <button className={`button_${theme} search_button`} onClick={handleSearch}>
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
        </div>
      </div>
    </>
  );
};

export default Search;
