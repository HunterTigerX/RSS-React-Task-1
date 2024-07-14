import { useState } from 'react';
import { loadLocationData } from '../methods/urlMethods';
import { Data } from '../../components/data/Data';
import { onCardChangedFunction } from './interfaces';
import './pokemonCard.css';

const PokemonCard = ({ onCardChanged }: { onCardChanged: onCardChangedFunction }) => {
  const database = Data.checkData();
  let [reRender, rerender] = useState(0);

  const reRenderPage = () => {
    rerender((reRender += 1));
  };

  const doCardChanged = (oldCard: string, newCard: string) => {
    if (oldCard !== newCard) {
      reRenderPage();
      onCardChanged();
    }
  };

  const makeNameCapital = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const loadPokemonData = async () => {
    if (loadLocationData().pokemonId) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon-species/${loadLocationData().pokemonId}/`;

      await fetch(pokemonUrl)
        .then((response) => {
          if (!response.ok) {
            console.log('error');
          }
          return response.json();
        })
        .then((singlePokemonData) => {
          const pokemonDataTemp = {
            name: makeNameCapital(singlePokemonData.name),
            description: singlePokemonData.flavor_text_entries[1].flavor_text.replace('', ' '),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemonData.id}.png`,
          };
          const oldCard = JSON.stringify(database.cardInfo);
          database.updateCard(pokemonDataTemp);
          const newCard = JSON.stringify(database.cardInfo);
          doCardChanged(oldCard, newCard);
        })
        .catch(() => {
          console.log('error');
        });
    }
  };

  const pokemonCard = () => {
    loadPokemonData();
    if (database.cardInfo.name === '') {
      return <>{<div id="loading2"></div>}</>;
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
