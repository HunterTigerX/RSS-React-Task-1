import { useEffect, useState } from 'react';
import { Data } from '../data/Data';
import { IPokemonSpecies, IPokemonData, OnSearchEndFunction } from './Interfaces';

const Search = ({ onSearchEnd }: { onSearchEnd: OnSearchEndFunction }) => {
  const database = Data.checkData();
  const [input, setinput] = useState(database.lastInput);
  const [searching, setSearchingState] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const makeNameCapital = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const updateResults = (data: string, status: boolean) => {
    database.updateData(data, status);
    setSearchingState(false);
    onSearchEnd();
  };

  const searchPokemons = async (pokemon: { pokemon_species: IPokemonSpecies[] }) => {
    const pokemons = pokemon.pokemon_species;
    const maxNumber = pokemons.length < 15 ? pokemons.length : 15;
    const resultsTemp: IPokemonData[] = [];

    for (let i = 0; i < maxNumber; i += 1) {
      await fetch(pokemons[i].url)
        .then((response) => {
          if (!response.ok) {
            updateResults('Pokemons with this color were not found', false);
          }
          return response.json();
        })
        .then((singlePokemonData) => {
          resultsTemp.push({
            name: makeNameCapital(singlePokemonData.name),
            description: singlePokemonData.flavor_text_entries[1].flavor_text.replace('', ' '),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemonData.id}.png`,
          });
        })
        .catch(() => {});
    }
    updateResults(JSON.stringify(resultsTemp), true);
  };

  const startPage = async (pokemon: { results: { url: string | URL | Request }[] }) => {
    await fetch(pokemon.results[0].url)
      .then((response) => {
        if (!response.ok) {
          updateResults('Pokemons with this color were not found', false);
        }
        return response.json();
      })
      .then(async (singlePokemonData) => {
        await searchPokemons(singlePokemonData);
      });
  };

  const handleSearch = async () => {
    database.updateLastInput(input);
    setSearchingState(true);
    const link = `https://pokeapi.co/api/v2/pokemon-color/${input.toLowerCase()}`;

    await fetch(link)
      .then((response) => {
        if (!response.ok) {
          updateResults('Pokemons with this color were not found', false);
        }
        return response.json();
      })
      .then(async (pokemon) => {
        if (pokemon.pokemon_species) {
          await searchPokemons(pokemon);
        } else {
          await startPage(pokemon);
        }
      });
  };

  return (
    <div className="top-section">
      <h2>Top Section. Search Pokemon by it's color</h2>
      <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter Pokemon's color" />
      <button onClick={() => handleSearch()}>Search</button>
      {searching && <div id="loading"></div>}
    </div>
  );
};

export default Search;
