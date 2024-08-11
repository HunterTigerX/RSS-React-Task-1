import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../interfaces/interfaces';
import { changePage } from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const maxPages = useSelector((state: IState) => state.searchMain.maxPages);
  const savedInput = useSelector((state: IState) => state.searchMain.savedInput);
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const currentPage = useSelector((state: IState) => state.searchMain.currentPage);
  const totalPokemons = useSelector((state: IState) => state.searchMain.totalPokemons);

  const pagesLiArray = [];
  if (pokemonsOnPage.length > 0) {
    for (let i = 1; i <= maxPages; i += 1) {
      pagesLiArray.push(
        <li key={`liNavBar${i}`}>
          <Link
            href={`/page/${i}?${savedInput === '' ? 'black' : savedInput}`}
            key={`pageLinkKey${i + 1}`}
            onClick={() => {
              dispatch(changePage(i));
              dispatch({ type: 'SAVE_CURRENT_POKEMONS', payload: true });
            }}
          >
            {<div className={i === currentPage ? 'boldPagination' : ''}>{i}</div>}
          </Link>
        </li>
      );
    }
  }
  return (
    <>
      {totalPokemons > 0 && (
        <nav>
          <ul id="ulPagination" className="ulPagination">
            {pagesLiArray}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
