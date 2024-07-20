import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePokemonsList, searchMain } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';
import { IState } from 'reducers/reducers/Interfaces';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../themes/themeContect';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingMain = useSelector((state: IState) => state.searchMain.isLoading);
  const pokemonsPerPage = 20;
  let navigate = useNavigate();
  const [input, setinput] = useState<string>('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    navigate('/page/1');
    dispatch(searchMain(input === '' ? '1' : input, pokemonsPerPage));
    dispatch(savePokemonsList());
  }, []);

  return (
    <div className="top-section">
      <button
        className={`button_${theme}`}
        onClick={() => {
          navigate('/page/1');
          dispatch(searchMain(input === '' ? '1' : input, pokemonsPerPage));
        }}
      >
        Search
      </button>
      <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter Pokemon's color" />
      {loadingMain && <div id="loading"></div>}
    </div>
  );
};

export default Search;
