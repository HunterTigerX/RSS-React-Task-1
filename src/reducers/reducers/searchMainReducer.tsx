import { returnPokemonList } from '@/components/urlMethods';
import { IStateMain, ISearchData } from '@/interfaces/interfaces';

const initialState: IStateMain = {
  pokemonData: null,
  isLoading: false,
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
  savedSearches: [],
  inputChanged: false,
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
      return {
        ...state,
        data: action.payload,
        totalPokemons: action.payload.pokemon_species.length,
        maxPages: Math.ceil(action.payload.pokemon_species.length / state.pokemonsPerPage),
        colorId: action.payload.id,
        pokemonsList: action.payload.pokemon_species,
      };
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
    case 'SAVE_SEARCHED': {
      const resuls = String(action.payload);
      const newArray = state.savedSearches.concat([resuls]);
      return {
        ...state,
        savedSearches: newArray,
      };
    }

    case 'INPUT_CHANGED': {
      return { ...state, inputChanged: true };
    }

    case 'SAVE_CURRENT_POKEMONS': {
      const firstPagePokemonsCount =
        state.totalPokemons < state.pokemonsPerPage ? state.totalPokemons : state.pokemonsPerPage;
      const middlePageStartNumber = state.totalPokemons - state.pokemonsPerPage * (state.maxPages - 1);
      const numberOfPokemons =
        state.currentPage === 1
          ? firstPagePokemonsCount
          : state.currentPage === state.maxPages
            ? middlePageStartNumber
            : state.pokemonsPerPage;

      const resultList = returnPokemonList(
        numberOfPokemons,
        state.pokemonsPerPage,
        state.currentPage,
        state.pokemonsList,
        state.savedCartIds
      );

      return {
        ...state,
        pokemonsOnPage: resultList,
      };
    }

    case 'OPEN_RIGHT_PANEL': {
      return { ...state, showRightPanel: true };
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
