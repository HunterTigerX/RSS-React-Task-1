import { ISearchData } from 'reducers/actions/Interfaces';
import { ISearchMainResults, IStateMain } from './Interfaces';

const initialState: IStateMain = {
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

const searchMainReducer = (state = initialState, action: { type: string; payload: ISearchData }) => {
  switch (action.type) {
    case 'UPDATE_INPUT': {
      return { ...state, currentInput: action.payload };
    }
    case 'SAVE_INPUT': {
      return { ...state, savedInput: action.payload };
    }

    case 'FETCH_MAIN_DATA_SUCCESS': {
      if (action.payload) {
        return {
          ...state,
          data: action.payload,
          totalPokemons: action.payload.pokemon_species.length,
          maxPages: Math.ceil(action.payload.pokemon_species.length / state.pokemonsPerPage),
          colorId: action.payload.id,
          pokemonsList: action.payload.pokemon_species,
        };
      } else {
        return {
          ...state,
        };
      }
    }

    case 'FETCH_DATA_FAILURE': {
      return {
        ...state,
        error: action.payload,
        currentPage: 1,
        totalPokemons: 0,
        maxPages: 1,
        colorId: null,
        pokemonsList: null,
      };
    }

    case 'CHANGE_PAGE_ONE': {
      return {
        ...state,
        currentPage: 1,
      };
    }

    case 'CHANGE_PAGE': {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    case 'SAVE_CURRENT_POKEMONS': {
      const firstPagePokemonsCount =
        state.totalPokemons < state.pokemonsPerPage ? state.totalPokemons : state.pokemonsPerPage;
      const resultList: ISearchMainResults[] = [];

      const getPokemonId = (url: string) => {
        const filter = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        const filtered = filter.slice(0, filter.length - 1);
        return filtered;
      };

      const returnPokemonsList = (numberOfPokemons: number) => {
        const start = (state.currentPage - 1) * state.pokemonsPerPage;
        const isArray = Array.isArray(state.pokemonsList);
        if (isArray && state.pokemonsList.length > 0) {
          for (let i = start; i < start + numberOfPokemons; i += 1) {
            if (state.pokemonsList[i]) {
              const pokemonId = getPokemonId(state.pokemonsList[i].url);
              resultList.push({
                name: state.pokemonsList[i].name,
                id: pokemonId,
                checkBox: state.savedCartIds.includes(pokemonId) ? true : false,
              });
            }
          }
        }
      };

      if (state.currentPage === 1) {
        returnPokemonsList(firstPagePokemonsCount);
      } else if (state.currentPage === state.maxPages) {
        returnPokemonsList(state.totalPokemons - state.pokemonsPerPage * (state.maxPages - 1));
      } else {
        returnPokemonsList(state.pokemonsPerPage);
      }

      return {
        ...state,
        pokemonsOnPage: resultList,
      };
    }

    case 'TOGGLE_RIGHT_PANEL': {
      return { ...state, showRightPanel: action.payload ? true : false };
    }

    case 'CLOSE_RIGHT_PANEL': {
      return { ...state, showRightPanel: false };
    }

    case 'UPDATE_CHECKBOXES': {
      const pokemonId = action.payload.pokemonId;
      const foundCheckBox = state.savedCartIds.indexOf(pokemonId);
      let mergedArray;
      if (foundCheckBox > -1) {
        const deepCopy = JSON.stringify(state.savedCartIds);
        mergedArray = JSON.parse(deepCopy);
        mergedArray.splice(foundCheckBox, 1);
      } else {
        mergedArray = state.savedCartIds.concat([pokemonId]);
      }
      return { ...state, savedCartIds: mergedArray };
    }

    default:
      return state;
  }
};

export default searchMainReducer;
