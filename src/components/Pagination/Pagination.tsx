import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage } from 'reducers/actions/actions';
import { IState } from 'reducers/reducers/Interfaces';
import { AppDispatch } from 'reducers/root/rootReduces';

import './pagination.css';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const maxPages = useSelector((state: IState) => state.searchMain.maxPages);
  const savedInput = useSelector((state: IState) => state.searchMain.savedInput);
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  const currentPage = useSelector((state: IState) => state.searchMain.currentPage);

  if (pokemonsOnPage.length > 0) {
    const pagesLiArray = [];
    for (let i = 1; i <= maxPages; i += 1) {
      pagesLiArray.push(
        <li key={`liNavBar${i}`}>
          <Link
            to={`page/${i}?${savedInput}`}
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

    return (
      <nav>
        <ul className="ulPagination">{pagesLiArray}</ul>
      </nav>
    );
  }
};

export default Pagination;
