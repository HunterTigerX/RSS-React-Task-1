import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePokemonsList, openRightPanel, sideLinkClicked } from '../reducers/actions/actions';
import { addToCart, closeFlyout, updateCart } from '../reducers/actions/cartActions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { returnPokemonData } from './urlMethods';
import { IState, IPokemonData } from '~/interfaces/interfaces';
import './Results.css';

const Results = ({ error }: { error: boolean }) => {
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const linkClicked = useSelector((state: IState) => state.searchSide.linkClicked);
  const savedInputCheck = useSelector((state: IState) => state.searchMain.savedInput);
  const currentPage = useSelector((state: IState) => state.searchMain.currentPage);
  const savedCartIds = useSelector((state: IState) => state.searchMain.savedCartIds);
  const savedToCart = useSelector((state: IState) => state.cart.savedCartData);
  const dispatch = useDispatch<AppDispatch>();
  const savedInput = savedInputCheck === '' ? 'black' : savedInputCheck;

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    const selectedPokemonId = pokemonsOnPage[index].id;
    const selectedPokemonName = pokemonsOnPage[index].name;
    const results = await returnPokemonData(selectedPokemonId, savedToCart);
    if (results) {
      dispatch(updateCart(results));
    }

    dispatch(addToCart(selectedPokemonId, isChecked, selectedPokemonName));
    dispatch(savePokemonsList());
  };

  useEffect(() => {
    if (savedCartIds.length === 0) {
      dispatch(closeFlyout());
    }
  }, [dispatch, savedCartIds]);

  useEffect(() => {
    if (linkClicked) {
      // Открываем правую панель только при нажатии на ссылку
      dispatch(openRightPanel());
    }
  }, [dispatch, linkClicked]);

  const linkClickedFunc = () => {
    dispatch(sideLinkClicked());
  };

  const setResults = () => {
    return (
      <>
        {
          <nav>
            <ul>
              {pokemonsOnPage &&
                pokemonsOnPage.map((item: IPokemonData, index: number) => (
                  <li key={`pokeKey${index}`} className="checkboxes">
                    <input
                      type="checkbox"
                      checked={pokemonsOnPage[index].checkBox}
                      onChange={(e) => handleCheckboxChange(e, index)}
                    />
                    <Link
                      to={`/color/${savedInput}/pokemon/${pokemonsOnPage[index].id}?${currentPage}`}
                      key={`pokeLinkKey${index + 1}`}
                      onClick={linkClickedFunc}
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
  };

  return (
    <>
      {error && <div className="bottom-section">{`Pokemons with this color were not found`}</div>}
      {!error && (
        <div className="results-container">
          <div className="results-left">{setResults()}</div>
        </div>
      )}
    </>
  );
};

export default Results;
