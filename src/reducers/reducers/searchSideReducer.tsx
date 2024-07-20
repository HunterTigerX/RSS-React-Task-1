import { IPokemonCard } from 'reducers/actions/Interfaces';

const initialState = {
  loadingRight: false,
  error: null,
  pokemonName: '',
  pokemonImage: '',
  pokemonDescription: '',
};

const searchSideReducer = (state = initialState, action: { type: string; payload: IPokemonCard }) => {
  switch (action.type) {
    case 'FETCH_POKEMON_DATA_START':
      return { ...state, loadingRight: true, error: null };
    case 'FETCH_POKEMON_DATA_SUCCESS': {
      return {
        ...state,
        loadingRight: false,
        pokemonImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${action.payload.id}.png`,
        pokemonDescription: action.payload.flavor_text_entries[0].flavor_text.replace('', ' '),
        pokemonName: action.payload.name,
      };
    }
    case 'FETCH_POKEMON_DATA_FAILURE':
      return {
        ...state,
        loadingRight: false,
        error: action.payload,
      };
    case 'SET_LOADING_RIGHT': {
      return {
        ...state,
        loadingRight: true,
      };
    }

    default:
      return state;
  }
};

export default searchSideReducer;
