import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISearchData, IState, SearchProps } from '../interfaces/interfaces';
import {
  searchMain,
  savePokemonsList,
  searchFailed,
  updateInput,
  goToPageOne,
  saveInput,
} from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { ThemeContext } from '../themes/themeContect';

const Search: React.FC<SearchProps> = ({ data, error, lastSearch }) => {
  const [searchedValues, setSearchedValues] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const currentInputX = useSelector((state: IState) => state.searchMain.currentInput);
  const [inputChanged, setInputChanged] = useState(false);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [lastInput, setLastInput] = useState('');
  const [lastData, setLastData] = useState({});
  const [isLoading, setisLoading] = useState(false);

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

  const currentInput = currentInputX === '' && inputChanged !== true ? lastInput : currentInputX;

  const updatecurrentInput = (input: string) => {
    setInputChanged(true);
    dispatch(updateInput(input));
  };

  const handleSearch = () => {
    const stringedInput = String(currentInput);
    if (String(lastSearch) !== stringedInput) {
      if (!searchedValues.includes(stringedInput)) {
        const newArray = searchedValues.concat([stringedInput]);
        setSearchedValues(newArray);
        setisLoading(true);
      }
    }
    const checkedInput = currentInput === '' ? 'black' : currentInput;
    router.push(`/page/1?${checkedInput}`);
    dispatch(goToPageOne());
    dispatch(saveInput(checkedInput));
  };

  return (
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
  );
};

export default Search;
