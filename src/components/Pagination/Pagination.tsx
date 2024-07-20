import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage } from 'reducers/actions/actions';
import { IState } from 'reducers/reducers/Interfaces';
import { AppDispatch } from 'reducers/root/rootReduces';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const maxPages = useSelector((state: IState) => state.searchMain.maxPages);
  const pokemonsOnPage = useSelector((state: IState) => state.searchMain.pokemonsOnPage);
  if (pokemonsOnPage.length > 0) {
    const pagesLiArray = [];
    for (let i = 1; i <= maxPages; i += 1) {
      pagesLiArray.push(
        <li key={`liNavBar${i}`}>
          <Link
            to={`page/${i}`}
            key={`pageLinkKey${i + 1}`}
            onClick={() => {
              dispatch(changePage(i));
              dispatch({ type: 'SAVE_CURRENT_POKEMONS' });
            }}
          >
            {i}
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
