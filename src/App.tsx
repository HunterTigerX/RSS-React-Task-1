import { Component, PropsWithChildren } from 'react';
import './App.css';
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
  hasError: boolean;
  isSearching: boolean;
  errorMessage: string,
  results: string,
}

class App extends Component<PropsWithChildren, PokemonSearchState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      lastInput: localStorage.getItem('lastInput') || '',
      pokemonData: null,
      hasError: false,
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
    this.setState({ isSearching: value })
  };

  async startPage(pokemon: { results: { url: string | URL | Request; }[]; }) {
      await fetch(pokemon.results[0].url)
        .then((response) => {
          if (!response.ok) {
            this.searchStateChanged(false);
            this.setState({ errorMessage: 'Pokemons with this color were not found', hasError: true });
          }
          return response.json();
        })
        .then((pokemon2) => {
          this.searchPokemons(pokemon2)
        })
        .catch((error) => {
            this.setState({ pokemonData: null, hasError: true, errorMessage: error });
        });
  }

  async searchPokemons(pokemon: { pokemon_species: IPokemonSpecies[]; }) {
    const pokemons = pokemon.pokemon_species;
    const results: IPokemonData[] = [];
    const maxNumber = pokemons.length < 15 ? pokemons.length : 15;
    
    for (let i = 0; i < maxNumber; i += 1) {
      await fetch(pokemons[i].url)
        .then((response) => {
          if (!response.ok) {
            this.searchStateChanged(false);
            this.setState({ errorMessage: 'Pokemons with this color were not found', hasError: true });
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
            this.setState({ pokemonData: null, hasError: true, errorMessage: error });
        });
    }
    this.setState({ pokemonData: results, hasError: false });
    this.searchStateChanged(false);
  }

  handleSearch = async () => {
    localStorage.setItem('lastInput', this.state.lastInput);
    this.searchStateChanged(true);
    console.log('input', this.state.lastInput)
    const link = `https://pokeapi.co/api/v2/pokemon-color/${this.state.lastInput.toLowerCase()}`;

    await fetch(link)
      .then((response) => {
        if (!response.ok) {
          this.searchStateChanged(false);
          // throw new Error('Pokemons with this color were not found');
        }
        return response.json();
      })
      .then(async (pokemon) => {

        if (pokemon.pokemon_species) {
          this.searchPokemons(pokemon)
        } else {
          this.startPage(pokemon)
        }
  

      })
      .catch((error) => {
          this.setState({ pokemonData: null, hasError: true, errorMessage: error });
      });
  };

  makeNameCapital(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  throwError = () => {
    // this.setState({ errorMessage: 'This is a manual message from button click', hasError: true });
  };

  render() {

    if (this.state.hasError) {
      // throw new Error(this.state.errorMessage);
    }

    if (this.state.hasError) {
      // throw new Error(this.state.errorMessage);
    }

    return (
      <div className="container">
        <div className="top-section">
          <h2>Top Section. Search Pokemon by it's color</h2>
          <input
            type="text"
            value={this.state.lastInput}
            onChange={this.handleInputChange}
            placeholder="Enter Pokemon's color"
          />
          <button onClick={this.handleSearch}>Search</button>
          {this.state.isSearching && (<div id="loading"></div>)}
          <button onClick={this.throwError}>Throw Error</button>
        </div>

        <div className="bottom-section">
          <h2>Bottom Section. Here are your results.</h2>
          {this.state.hasError && <p>{this.state.hasError}</p>}
          {this.state.pokemonData && (
            <div>
              {this.state.pokemonData.map((item, index) => (
                <div key={`pokeKey${index}`}>
                  <p>Pokemon name is {item.name}</p>
                  <p>
                    {'Pokemon picture'}
                    <img className="pokePic" src={item.image} alt="React Image" />
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
