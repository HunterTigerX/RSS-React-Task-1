import { ISearchData, IPokemonCard } from '../interfaces/interfaces';

export const mockedColorSearch: ISearchData = {
  id: 1,
  name: 'black',
  names: [
    {
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/',
      },
      name: 'くろいろ',
    },
  ],
  pokemon_species: [
    {
      name: 'murkrow',
      url: 'https://pokeapi.co/api/v2/pokemon-species/198/',
    },
  ],
  pokemonId: '1',
};

export const mockedIdSearch: IPokemonCard = {
  flavor_text_entries: [
    {
      flavor_text:
        'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
    },
  ],
  id: 1,
  name: 'bulbasaur',
  pokemonId: '1',
  color: {
    name: 'green',
  },
};
