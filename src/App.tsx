import { Component } from 'react';

interface IPokemonData {
  name: string,
  description: string,
  image: string,
}

interface PokemonSearchState {
  lastInput: string;
  pokemonData: IPokemonData | null;
  error: string | null;
}

class PokemonSearch extends Component<{}, PokemonSearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      lastInput: localStorage.getItem('lastInput') || '',
      pokemonData: null,
      error: null,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('lastInput')) {
      this.handleSearch();
    }
  }

  handleInputChange = (event: { target: { value: string; }; }) => {
    this.setState({ lastInput: event.target.value });
  };

  handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.lastInput.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then((pokemon) => {
        const pokemonInfo = {
          name: pokemon.name,
          description: `Pokemon number is ${pokemon.id}, and it's type is ${pokemon.types[0].type.name}`,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
}
        this.setState({ pokemonData: pokemonInfo, error: null });
        localStorage.setItem('lastInput', this.state.lastInput); // Save the new search term in local storage
      })
      .catch((error) => {
        this.setState({ pokemonData: null, error: error.message });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="top-section">
          <h2>Top Section</h2>
          <input
            type="text"
            value={this.state.lastInput}
            onChange={this.handleInputChange}
            placeholder="Enter Pokemon Name"
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>

        <div className="bottom-section">
          <h2>Bottom Section</h2>
          {this.state.error && <p>{this.state.error}</p>}
          {this.state.pokemonData && (
            <div>
              <h2>Pokemon name is {this.state.pokemonData.name}</h2>
              <p>{this.state.pokemonData.description}</p>
              <img src={this.state.pokemonData.image} alt="React Image" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PokemonSearch;
