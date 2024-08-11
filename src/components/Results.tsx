import Link from 'next/link';
import { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SideProps, IState, IPokemonData } from '../interfaces/interfaces';
import { savePokemonsList, openRightPanel, sideLinkClicked } from '../reducers/actions/actions';
import { addToCart, closeFlyout, updateCart } from '../reducers/actions/cartActions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { returnPokemonData } from './urlMethods';

const Results: React.FC<SideProps> = ({ error }) => {
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
  }, [savedCartIds]);

  useEffect(() => {
    if (linkClicked) {
      // Открываем правую панель только при нажатии на ссылку
      dispatch(openRightPanel());
    }
  }, [linkClicked]);

  const linkClickedFunc = () => {
    dispatch(sideLinkClicked());
  };

  const setResults = () => {
    if (error) {
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
                        href={`/page/${currentPage}/pokemon/${pokemonsOnPage[index].id}?${savedInput}`}
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
    }
  };

  return (
    <>
      <div className="results-container">
        <div className="results-left">{setResults()}</div>
      </div>
    </>
  );
};

export default Results;
