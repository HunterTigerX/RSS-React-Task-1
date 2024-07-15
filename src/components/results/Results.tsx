import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPokemonData, onPageChangedFunction } from './interfaces';
import { Data } from '../data/Data';
import './results.css';
import PokemonCard from '../../components/card/pokemonCard';
import { loadLocationData } from '../../components/methods/urlMethods';

const Results = ({ onPageChanged }: { onPageChanged: onPageChangedFunction }) => {
  const [showRightPanel, setRightPanelStatus] = useState(false);

  const database = Data.checkData();
  let pokemonsFound = database.foundStatus;
  let pokemonData: IPokemonData[] = [];

  const fillPagination = () => {
    const maxPages = database.pages;
    if (database.data !== `Pokemons with this color were not found`) {
      const pagesLiArray = [];
      for (let i = 1; i <= maxPages; i += 1) {
        pagesLiArray.push(
          <li key={`liNavBar${i}`}>
            <button key={`liButton${i}`} onClick={() => updateLocation(i, false)}>
              {i}
            </button>
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

  const toggleRightPanel = (status?: boolean) => {
    if (status) {
      setRightPanelStatus(true);
    } else if (status === false) {
      setRightPanelStatus(false);
    } else {
      if (showRightPanel) {
        setRightPanelStatus(false);
      } else {
        setRightPanelStatus(true);
      }
    }
  };

  const updateLocation = (newPage: number, panelStatus: boolean) => {
    toggleRightPanel(panelStatus);

    const currentUrl = window.location.href;
    const splittedUrl = currentUrl.split('?');
    if (splittedUrl.length > 1) {
      const splittedArgs = splittedUrl[1].split('&');
      splittedArgs[1] = `page=${newPage}`;
      const updatedUrl = `${window.location.origin}?${splittedArgs.join('&')}`;
      window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    }

    onPageChanged();
  };

  const setResults = () => {
    pokemonsFound = database.foundStatus;
    if (!pokemonsFound) {
      return (
        <>
          <div className="bottom-section">{`Pokemons with this color were not found`}</div>
        </>
      );
    } else {
      pokemonData = JSON.parse(database.data);
      return (
        <>
          {pokemonData && (
            <nav>
              <ul>
                {pokemonData.map((item: IPokemonData, index: number) => (
                  <li key={`pokeKey${index}`}>
                    <Link
                      to={`${pokemonData[index].location}&${pokemonData[index].id}`}
                      key={`pokeLinkKey${index + 1}`}
                      onClick={() => updateLocation(index, true)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      );
    }
  };

  const pageInfo = loadLocationData();
  const searchSuccess = pageInfo.page !== 0

  return (
    <>
      <div className="bottom-section">
        <h2>Bottom Section. Here are your results.</h2>
        <p>Default color is Black</p>
        <button onClick={() => toggleRightPanel()}>{showRightPanel ? 'Hide right panel' : 'Show right panel'}</button>
        <div className="results-panels">
          <div className={`results-left ${searchSuccess && showRightPanel ? 'results-left-width' : ''}`}>{setResults()}</div>
          {searchSuccess && showRightPanel && (
            <div className={`results-right ${!showRightPanel ? 'results-right-hidden' : ''}`}>
              <PokemonCard></PokemonCard>
            </div>
          )}
        </div>
      </div>
      <div>{fillPagination()}</div>
    </>
  );
};

export default Results;
