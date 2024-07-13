import { IPokemonData } from './interfaces';
import { Data } from '../data/Data';

const Results = () => {
  const database = Data.checkData();
  let pokemonsFound = database.foundStatus;
  let pokemonData: IPokemonData[] = [];

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
            <div>
              {pokemonData.map((item: IPokemonData, index: number) => (
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
        </>
      );
    }
  };

  return (
    <div className="bottom-section">
      <h2>Bottom Section. Here are your results.</h2>
      {setResults()}
    </div>
  );
};

export default Results;
