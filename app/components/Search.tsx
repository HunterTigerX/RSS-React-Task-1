import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchMain,
  savePokemonsList,
  searchFailed,
  updateInput,
  goToPageOne,
  saveInput,
} from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { SearchProps, IState, ISearchData, ISearchDataBasic } from '~/interfaces/interfaces';
import { ThemeContext } from '~/themes/themeContect';
import './Search.css';

const Search: React.FC<SearchProps> = ({
  data,
  error,
  lastSearch,
}: {
  data: ISearchDataBasic;
  error: boolean;
  lastSearch: string;
}) => {
  const [searchedValues, setSearchedValues] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const currentInputX = useSelector((state: IState) => state.searchMain.currentInput);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [lastInput, setLastInput] = useState('');
  const [inputChanged, setInputChanged] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [lastData, setLastData] = useState({});
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
  }, [data, dispatch, error]);

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
    navigate(`/color/${checkedInput}`);
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
            className={`search-input border-${theme}`}
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
