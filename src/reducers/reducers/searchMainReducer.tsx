import { ISearchData } from "reducers/actions/Interfaces";
import { ISearchMainResults, IStateMain } from "./Interfaces";

const initialState: IStateMain = {
  pokemonData: null,
  isLoading: false,
  loadingRight: false,
  error: null,
  currentPage: 0,
  maxPages: 0,
  totalPokemons: 0,
  colorId: 1,
  pokemonsList: [],
  pokemonsOnPage: [],
  input: '',
  pokemonsPerPage: 0,
  currentPokemonId: 0,
  showRightPanel: false,
  hasError: false,
};

const pokemonsPerPage = 20;

const searchMainReducer = (state = initialState, action: { type: string; payload: ISearchData }) => {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_MAIN_DATA_SUCCESS': {


      return {
        ...state,
        isLoading: false,
        data: action.payload,
        totalPokemons: action.payload.pokemon_species.length,
        currentPage: 1,
        maxPages: Math.ceil(action.payload.pokemon_species.length / pokemonsPerPage),
        colorId: action.payload.id,
        pokemonsList: action.payload.pokemon_species,
        input: action.payload.input,
        pokemonsPerPage:
          action.payload.totalPokemons < action.payload.pokemonsPerPage
            ? action.payload.totalPokemons
            : action.payload.pokemonsPerPage,
      };
    }
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        currentPage: 1,
        totalPokemons: 0,
        maxPages: 1,
        colorId: null,
        pokemonsList: null,
        input: action.payload.input,
      };

    case 'CHANGE_PAGE': {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    case 'SAVE_CURRENT_POKEMONS': {
      const pokemonsPerPage = 20;

      const firstPagePokemonsCount =
        state.totalPokemons < state.pokemonsPerPage ? state.totalPokemons : state.pokemonsPerPage;
      const resultList: ISearchMainResults[] = [];

      const getPokemonId = (url: string) => {
        const filter = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        const filtered = filter.slice(0, filter.length - 1);
        return filtered;
      };

      const returnPokemonsList = (numberOfPokemons: number) => {
        const start = (state.currentPage - 1) * pokemonsPerPage;
        if (state.pokemonsList.length > 0) {
          for (let i = start; i < start + numberOfPokemons; i += 1) {
            resultList.push({
              name: state.pokemonsList[i].name,
              id: getPokemonId(state.pokemonsList[i].url),
            });
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

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, showRightPanel: action.payload ? true : false };

    default:
      return state;
  }
};

export default searchMainReducer;
