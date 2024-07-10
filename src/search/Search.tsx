import { Component } from 'react';

interface IPokemonData {
  name: string;
  description: string;
  image: string;
}

interface IPokemonSpecies {
  name: string;
  url: string;
}

interface PokemonSearchState {
  lastInput: string;
  pokemonData: IPokemonData[] | null;
  isSearching: boolean;
  errorMessage: string;
  results: string;
}

interface SearchProps {
  onSearchEnd: () => void;
}

class Search extends Component<SearchProps, PokemonSearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      lastInput: localStorage.getItem('lastInput') || '',
      pokemonData: null,
      isSearching: false,
      errorMessage: '',
      results: '',
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange = (event: { target: { value: string } }) => {
    this.setState({ lastInput: event.target.value });
  };

  searchStateChanged = (value: boolean) => {
    this.setState({ isSearching: value });
  };

  noResults = (error: string) => {
    localStorage.setItem('searchResults', JSON.stringify(error));
    this.setState({ results: '' });
    this.props.onSearchEnd();
  };

  async startPage(pokemon: { results: { url: string | URL | Request }[] }) {
    await fetch(pokemon.results[0].url)
      .then((response) => {
        if (!response.ok) {
          this.searchStateChanged(false);
          this.setState({ errorMessage: 'Pokemons with this color were not found' });
        }
        return response.json();
      })
      .then((pokemon2) => {
        this.searchPokemons(pokemon2);
      });
  }

  async searchPokemons(pokemon: { pokemon_species: IPokemonSpecies[] }) {
    const pokemons = pokemon.pokemon_species;
    const results: IPokemonData[] = [];
    const maxNumber = pokemons.length < 15 ? pokemons.length : 15;

    for (let i = 0; i < maxNumber; i += 1) {
      await fetch(pokemons[i].url)
        .then((response) => {
          if (!response.ok) {
            this.searchStateChanged(false);
            this.setState({ errorMessage: 'Pokemons with this color were not found' });
          }
          return response.json();
        })
        .then((pokemon2) => {
          results.push({
            name: this.makeNameCapital(pokemon2.name),
            description: pokemon2.flavor_text_entries[1].flavor_text.replace('', ' '),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2.id}.png`,
          });
        })
        .catch((error) => {
          this.setState({ pokemonData: null, errorMessage: error });
          this.noResults(error);
        });
    }
    localStorage.setItem('searchResults', JSON.stringify(results));
    this.setState({ pokemonData: results });
    this.searchStateChanged(false);
    this.props.onSearchEnd();
  }

  handleSearch = async () => {
    localStorage.setItem('lastInput', this.state.lastInput);
    this.searchStateChanged(true);
    const link = `https://pokeapi.co/api/v2/pokemon-color/${this.state.lastInput.toLowerCase()}`;

    await fetch(link)
      .then((response) => {
        if (!response.ok) {
          this.noResults('Pokemons with this color were not found');
          this.searchStateChanged(false);
        }
        return response.json();
      })
      .then(async (pokemon) => {
        if (pokemon.pokemon_species) {
          await this.searchPokemons(pokemon);
        } else {
          await this.startPage(pokemon);
        }
      });
  };

  makeNameCapital(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  render() {
    return (
      <div className="top-section">
        <h2>Top Section. Search Pokemon by it's color</h2>
        <input
          type="text"
          value={this.state.lastInput}
          onChange={this.handleInputChange}
          placeholder="Enter Pokemon's color"
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.isSearching && <div id="loading"></div>}
      </div>
    );
  }
}

export default Search;
