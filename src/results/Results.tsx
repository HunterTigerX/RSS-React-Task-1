import { Component } from 'react';

interface IPokemonData {
  name: string;
  description: string;
  image: string;
}

interface PokemonSearchState {
  results: boolean;
  pokemonData: IPokemonData[] | null;
}
interface ResultProps {
  onSearchEnd: () => void;
}

class Results extends Component<ResultProps, PokemonSearchState> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      results: false,
      pokemonData: null,
    };
  }

  componentDidMount() {
    const results = localStorage.getItem('searchResults');

    if (results) {
      const resultsParsed = JSON.parse(results);
      this.setState({ pokemonData: resultsParsed });
    }
  }

  render() {
    let pokemonData = this.state.pokemonData;
    const results = localStorage.getItem('searchResults') || '[]';
    pokemonData = JSON.parse(results);
    if (typeof pokemonData === 'string') {
      return <div className="bottom-section">{`Pokemons with this color were not found`}</div>;
    } else {
      return (
        <div className="bottom-section">
          <h2>Bottom Section. Here are your results.</h2>
          {pokemonData && (
            <div>
              {pokemonData.map((item, index) => (
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
      );
    }
  }
}

export default Results;
