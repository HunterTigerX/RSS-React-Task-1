import { useEffect, useState } from 'react';
import { loadLocationData } from '../methods/urlMethods';
import { Data } from '../../components/data/Data';
import './pokemonCard.css';

const PokemonCard = () => {
  const database = Data.checkData();
  const [searching, setSearchingState] = useState(false);
  const [lastLocation, setLastLocation] = useState<string>();

  const makeNameCapital = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const loadPokemonData = async () => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon-species/${loadLocationData().pokemonId}/`;

    if (loadLocationData().pokemonId && lastLocation !== pokemonUrl) {
      setSearchingState(true);

      setLastLocation(pokemonUrl);
      await fetch(pokemonUrl)
        .then((response) => {
          if (!response.ok) {
            console.log('error');
            setSearchingState(false);
          }
          return response.json();
        })
        .then((singlePokemonData) => {
          const pokemonDataTemp = {
            name: makeNameCapital(singlePokemonData.name),
            description: singlePokemonData.flavor_text_entries[1].flavor_text.replace('', ' '),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemonData.id}.png`,
          };
          database.updateCard(pokemonDataTemp);
          setSearchingState(false);
        })
        .catch(() => {
          console.log('error');
          setSearchingState(false);
        });
    }
  };

  useEffect(() => {
    loadPokemonData();
  }, [loadPokemonData]);

  const pokemonCard = () => {
    if (searching) {
      return <>{<div id="loading2"></div>}</>;
    }
    if (database.cardInfo.name === '') {
      return <>{<p>Please select a pokemon from the left</p>}</>;
    } else {
      return (
        <>
          {
            <div>
              {
                <div>
                  <p>Pokemon name is {database.cardInfo.name}</p>
                  <p>
                    {'Pokemon picture'}
                    <img className="pokePic" src={database.cardInfo.image} alt="React Image" />
                  </p>
                  <p>{database.cardInfo.description}</p>
                </div>
              }
            </div>
          }
        </>
      );
    }
  };

  return <div>{pokemonCard()}</div>;
};

export default PokemonCard;
