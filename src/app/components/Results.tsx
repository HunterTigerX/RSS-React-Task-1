'use client';
import { IState, IPokemonData, ICheckboxData, SideProps } from '@/app/interfaces/interfaces';
import {
  savePokemonsList,
  searchSide,
  searchFailed,
  setLoadingRight,
  openRightPanel,
  sideLinkClicked,
} from '@/app/reducers/actions/actions';
import { addToCart, closeFlyout, updateCart } from '@/app/reducers/actions/cartActions';
import { useGetPokemonByIdQuery } from '@/app/reducers/root/pokemonApi';
import { AppDispatch } from '@/app/reducers/root/rootReduces';
import { ThemeContext } from '@/app/themes/themeContect';
import Link from 'next/link';
import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from './PokemonCard';

const Results: React.FC<SideProps> = ({ pokemonId }) => {
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const linkClicked = useSelector((state: IState) => state.searchSide.linkClicked);
  const currentPage = useSelector((state: IState) => state.searchMain.currentPage);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);
  const showRightPanel = useSelector((state: IState) => state.searchMain.showRightPanel);
  const savedCartIds = useSelector((state: IState) => state.searchMain.savedCartIds);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const [pokemonData, setPokemonData] = useState<ICheckboxData>({ checked: false, pokemonId: null });
  const [pokemonIdX, setPokemonId] = useState<string>('');
  const { data, error, isFetching } = useGetPokemonByIdQuery(pokemonIdX, {
    skip: !pokemonIdX || pokemonIdX == '',
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const isChecked = event.target.checked;
    const selectedPokemonId = pokemonsOnPage[index].id;
    const selectedPokemonName = pokemonsOnPage[index].name;
    dispatch(addToCart(selectedPokemonId, isChecked, selectedPokemonName));
    setPokemonId(selectedPokemonId);
    dispatch(savePokemonsList());
    setPokemonData({
      checked: isChecked,
      pokemonId: selectedPokemonId,
    });
  };

  useEffect(() => {
    if (savedCartIds.length === 0) {
      dispatch(closeFlyout());
    }
  }, [savedCartIds]);

  useEffect(() => {
    if (typeof pokemonId === 'string') {
      // Установили pokemonId для API запроса и обновления data
      setPokemonId(pokemonId);
    }
  }, [pokemonId]);

  useEffect(() => {
    if (linkClicked) {
      // Открываем правую панель только при нажатии на ссылку
      dispatch(openRightPanel());
    }
  }, [linkClicked]);

  useEffect(() => {
    if (isFetching) {
      // Показываем индикатор загрузки только если загружается новый не кэшированный элемент
      dispatch(setLoadingRight());
    }
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      // Загружаем только новые данные
      dispatch(searchSide(data));
      dispatch(updateCart(data));
    }
    if (error) {
      const deepCopy = JSON.stringify(error);
      const errorMessage: string = JSON.parse(deepCopy);
      dispatch(searchFailed(errorMessage));
    }
  }, [data, error]);

  useEffect(() => {
    if (data) {
      if (String(data.id) === pokemonIdX) {
        dispatch(updateCart(data));
      }
    }
  }, [pokemonData]);

  const linkClickedFunc = () => {
    dispatch(sideLinkClicked());
  };

  const setResults = () => {
    if (totalPokemons === 0) {
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
                        disabled={isFetching}
                        onChange={(e) => handleCheckboxChange(e, index)}
                      />
                      <Link
                        href={`/page/${currentPage}/pokemon/${pokemonsOnPage[index].id}`}
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
        {showRightPanel && (
          <div className={`results-right border-${theme}`}>
            <PokemonCard />
          </div>
        )}
      </div>
    </>
  );
};

export default Results;
