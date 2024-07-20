import axios from 'axios';
import { ISearchData, IErrorMessage, IPokemonCard, IPokemonCardData, ISearchPayload } from './Interfaces';

const searchPokemonByColor = `https://pokeapi.co/api/v2/pokemon-color/`;
const searchPokemonById = `https://pokeapi.co/api/v2/pokemon-species/`;

function returnErrorMessage(err: IErrorMessage): string {
  return err.message;
}

export const changePage = (newPage: number) => {
  return async (dispatch: (arg0: { type: string; payload?: number }) => void) => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL'});
    dispatch({
      type: 'CHANGE_PAGE',
      payload: newPage,
    });
  };
};

export const searchMain = (input: string, pokemonsPerPage: number) => {
  return async (dispatch: (arg0: { type: string; payload?: ISearchData | string }) => void) => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL'});
    dispatch({ type: 'FETCH_DATA_START' });
    try {
      const response: ISearchPayload = await axios.get(`${searchPokemonByColor}/${input}`);
      response.data.input = input;
      response.data.pokemonsPerPage = pokemonsPerPage;
      dispatch({ type: 'FETCH_MAIN_DATA_SUCCESS', payload: response.data });
      dispatch({ type: 'SAVE_CURRENT_POKEMONS' });
    } catch (error: unknown) {
      const errorMessage = returnErrorMessage(error as IErrorMessage);
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: errorMessage });
      
    }
  };
};

export const savePokemonsList = () => {
  return {
    type: 'SAVE_CURRENT_POKEMONS',
  };
};

export const searchSide = (pokemonId: string) => {
  return async (dispatch: (arg0: { type: string; payload?: IPokemonCard | string; }) => void) => {
    dispatch({ type: 'FETCH_POKEMON_DATA_START' });
    try {
      const response: IPokemonCardData = await axios.get(`${searchPokemonById}${pokemonId}`);
      response.data.pokemonId = pokemonId;
      dispatch({ type: 'FETCH_POKEMON_DATA_SUCCESS', payload: response.data });
    } catch (error: unknown) {
      const errorMessage = returnErrorMessage(error as IErrorMessage);
      dispatch({ type: 'FETCH_POKEMON_DATA_FAILURE', payload: errorMessage });
    }
  };
};

export const toggleRightPanel = (state?: boolean) => {
  return async (dispatch: (arg0: { type: string; payload: boolean | undefined; }) => void) => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL', payload: state });
  };
};

export const setLoadingRight = () => {
  return {
    type: 'SET_LOADING_RIGHT',
  };
};
