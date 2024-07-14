import { useEffect, useState } from 'react';
import { Data } from '../data/Data';
import { OnSearchEndFunction, ICurrentUrlData } from './Interfaces';
import { loadLocationData } from '../methods/urlMethods';

const Search = ({ onSearchEnd }: { onSearchEnd: OnSearchEndFunction }) => {
  const database = Data.checkData();
  const [input, setinput] = useState(database.lastInput);
  const [searching, setSearchingState] = useState(false);
  const [currentPageSaved, setCurrentPage] = useState(1);
  const searchUrl = `https://pokeapi.co/api/v2/pokemon-color`;

  useEffect(() => {
    handleSearch();
  }, []);

  const getPokemonId = (url: string) => {
    const filter = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
    const filtered = filter.slice(0, filter.length - 1);
    return filtered;
  };

  const updateResults = (data: string, status: boolean, numberOfPages: number) => {
    database.updateData(data, status, numberOfPages);
    setSearchingState(false);
    onSearchEnd();
  };

  const handleSearch = async (inputClicked?: boolean) => {
    database.updateLastInput(input);
    setSearchingState(true);

    const currentLocation: ICurrentUrlData = loadLocationData();
    let colorOrId = '1';

    if (inputClicked) {
      currentLocation.page = 1;
    }

    setCurrentPage(currentLocation.page);

    if (input !== '') {
      colorOrId = input;
    } else if (!inputClicked && currentLocation.color) {
      colorOrId = currentLocation.color;
    }

    const currentPage = Number(currentLocation.page);
    const newSearchlink = `${searchUrl}/${colorOrId.toLowerCase()}`;
    const newLocation = `?id=${colorOrId.toLowerCase()}&page=${currentPage}`;
    updateLocation(newLocation);

    await fetch(newSearchlink)
      .then((response) => {
        if (!response.ok) {
          updateResults('Pokemons with this color were not found', false, 1);
        }
        return response.json();
      })
      .then(async (pokemonList) => {
        const pokemons = pokemonList.pokemon_species;
        const numberOfPokemons = pokemons.length;
        const pokemonsPerPage = 20;
        const numberOfPages = Math.ceil(numberOfPokemons / pokemonsPerPage);
        const firstPagePokemonsCount = numberOfPokemons < pokemonsPerPage ? numberOfPokemons : pokemonsPerPage;
        const resultsTemp: { name: string; location: string; id: string }[] = [];

        if (currentPage > numberOfPages || currentPage < 0) {
          updateResults('There are no such page with pokemons', false, 1);
          return;
        }

        const countPokemons2 = async (numberOfPokemons: number) => {
          const start = (currentPage - 1) * pokemonsPerPage;
          console.log(start, numberOfPokemons)
          for (let i = start; i < start + numberOfPokemons; i += 1) {
            resultsTemp.push({
              name: pokemons[i].name,
              location: newLocation,
              id: getPokemonId(pokemons[i].url),
            });
          }
        };
        console.log(pokemonList, 'numberOfPokemons', numberOfPokemons)
        if (currentPage === 1) {
          await countPokemons2(firstPagePokemonsCount);
        } else if (currentPage === numberOfPages) {
          await countPokemons2(numberOfPokemons - (pokemonsPerPage * (numberOfPages - 1)));
        } else {
          await countPokemons2(pokemonsPerPage);
        }

        updateResults(JSON.stringify(resultsTemp), true, numberOfPages);
      });
  };

  const updateLocation = (newUrl: string) => {
    const currentUrl = window.location.href;
    const splittedUrl = currentUrl.split('?');
    const baseUrl = splittedUrl[0];
    const updatedUrl = baseUrl + newUrl;

    window.history.pushState({ path: updatedUrl }, '', updatedUrl);
  };

  const getCurrentPage = () => {
    const currentUrl = window.location.href;
    const splittedUrl = currentUrl.split('?');
    if (splittedUrl.length > 1) {
      const splittedArgs = splittedUrl[1].split('&');
      return Number(splittedArgs[1].replace('page=', ''));
    } else {
      return 1;
    }
  };

  const checkIfLocationChanged = () => {
    if (getCurrentPage() !== currentPageSaved) {
      handleSearch();
    }
  };
  checkIfLocationChanged();

  return (
    <div className="top-section">
      <h2>Top Section. Search Pokemon by it's color</h2>
      <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter Pokemon's color" />
      <button onClick={() => handleSearch(true)}>Search</button>
      {searching && <div id="loading"></div>}
    </div>
  );
};

export default Search;
