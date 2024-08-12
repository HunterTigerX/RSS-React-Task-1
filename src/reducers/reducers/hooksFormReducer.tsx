const initialState = {
  pokemonData: null,
  isLoading: false,
  loadingRight: false,
  error: null,
  currentPage: 1,
  maxPages: 0,
  totalPokemons: 0,
  colorId: 1,
  pokemonsList: [],
  pokemonsOnPage: [],
  pokemonsPerPage: 20,
  currentPokemonId: 0,
  showRightPanel: false,
  hasError: false,
  savedCartIds: [],
  currentInput: '',
  savedInput: '',
};

const hooksFormReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CHANGE_PAGE': {
      return {
        ...state,
        data: action.payload,
        totalPokemons: action.payload.pokemon_species.length,
        maxPages: Math.ceil(action.payload.pokemon_species.length / state.pokemonsPerPage),
        colorId: action.payload.id,
        pokemonsList: action.payload.pokemon_species,
      };
    }

    default:
      return state;
  }
};

export default hooksFormReducer;
