import { IPokemonCard } from '~/interfaces/interfaces';

const initialState = {
  linkClicked: false,
  loadingRight: false,
  overlayStatus: false,
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
    case 'SET_LOADING_RIGHT': {
      return {
        ...state,
        loadingRight: true,
      };
    }
    case 'SIDE_LINK_CLICKED': {
      return {
        ...state,
        linkClicked: true,
        overlayStatus: true,
      };
    }
    case 'SIDE_LINK_UNCLICKED': {
      return {
        ...state,
        linkClicked: false,
        overlayStatus: false,
      };
    }

    default:
      return state;
  }
};

export default searchSideReducer;
