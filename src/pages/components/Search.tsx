import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
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

const Search: React.FC<SearchProps> = ({ data, error }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentInput = useSelector((state: IState) => state.searchMain.currentInput);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const color = data.name;

  useEffect(() => {
    if (data) {
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
    dispatch(updateInput(input));
  };

  const handleSearch = () => {
    const checkedInput = currentInput === '' ? '1' : currentInput;
    router.push(`/page/1?${checkedInput}`);
    dispatch(goToPageOne());
    dispatch(saveInput(checkedInput));
  };

  return (
    <div>
      <div className="top-section">
        <button className={`button_${theme} search_button`} onClick={handleSearch}>
          Search
        </button>
        <input
          type="text"
          value={currentInput === '' ? color : currentInput}
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
