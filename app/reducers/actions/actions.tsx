import { ISearchData, IPokemonCard } from '~/interfaces/interfaces';

export const changePage = (newPage: number) => {
  return async (dispatch: (arg0: { type: string; payload?: number }) => void) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: newPage,
    });
  };
};

export const searchMain = (data: ISearchData) => {
  return async (dispatch: (arg0: { type: string; payload?: ISearchData | string }) => void) => {
    dispatch({ type: 'FETCH_MAIN_DATA_SUCCESS', payload: data });
    dispatch({ type: 'SAVE_CURRENT_POKEMONS' });
  };
};
export const searchFailed = (error: string) => {
  return async (dispatch: (arg0: { type: string; payload?: ISearchData | string }) => void) => {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
  };
};

export const savePokemonsList = () => {
  return {
    type: 'SAVE_CURRENT_POKEMONS',
  };
};

export const searchSide = (pokemonData: IPokemonCard) => {
  return async (dispatch: (arg0: { type: string; payload?: IPokemonCard | string }) => void) => {
    dispatch({ type: 'FETCH_POKEMON_DATA_SUCCESS', payload: pokemonData });
  };
};

export const openRightPanel = () => {
  return { type: 'OPEN_RIGHT_PANEL' };
};

export const closeRightPanel = () => {
  return { type: 'CLOSE_RIGHT_PANEL' };
};

export const updateInput = (input: string) => {
  return async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({ type: 'UPDATE_INPUT', payload: input });
  };
};
export const saveInput = (input: string) => {
  return async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({ type: 'SAVE_INPUT', payload: input });
  };
};

export const setLoadingRight = () => {
  return {
    type: 'SET_LOADING_RIGHT',
  };
};

export const goToPageOne = () => {
  return {
    type: 'CHANGE_PAGE_ONE',
  };
};

export const sideLinkClicked = () => {
  return {
    type: 'SIDE_LINK_CLICKED',
  };
};

export const sideLinkUnClicked = () => {
  return {
    type: 'SIDE_LINK_UNCLICKED',
  };
};
