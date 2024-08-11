import { describe, it, expect } from 'vitest';

import { mockedColorSearch } from '~/__mocks__/mockedPokemons';
import searchMainReducer from '~/reducers/reducers/searchMainReducer';

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

describe('searchMainReducer', () => {
  it('should update the current input correctly', () => {
    const action = {
      type: 'UPDATE_INPUT',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.currentInput).toBe(mockedColorSearch);
  });

  it('should save the current search input correctly', () => {
    const action = {
      type: 'SAVE_INPUT',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.savedInput).toBe(mockedColorSearch);
  });

  it('should handle data fetching failure correctly', () => {
    const action = {
      type: 'FETCH_MAIN_DATA_SUCCESS',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.error).toBe(null);
    expect(newState.currentPage).toBe(1);
    expect(newState.totalPokemons).toBe(1);
    expect(newState.maxPages).toBe(1);
  });

  it('should handle data fetching failure correctly', () => {
    const action = {
      type: 'FETCH_DATA_FAILURE',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.error).toBe(mockedColorSearch);
    expect(newState.currentPage).toBe(1);
    expect(newState.totalPokemons).toBe(0);
    expect(newState.maxPages).toBe(1);
    expect(newState.colorId).toBe(null);
    expect(newState.pokemonsList).toBe(null);
  });

  it('should change current page to 1', () => {
    const action = {
      type: 'CHANGE_PAGE_ONE',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.currentPage).toBe(1);
  });

  it('should change current page to 1', () => {
    const action = {
      type: 'CHANGE_PAGE',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.currentPage).toBe(mockedColorSearch);
  });

  it('should handle data fetching failure correctly', () => {
    const action = {
      type: 'FETCH_DATA_FAILURE',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.error).toBe(mockedColorSearch);
    expect(newState.currentPage).toBe(1);
    expect(newState.totalPokemons).toBe(0);
    expect(newState.maxPages).toBe(1);
    expect(newState.colorId).toBe(null);
    expect(newState.pokemonsList).toBe(null);
  });

  it('should save current pokemons correctly', () => {
    const action = { type: 'SAVE_CURRENT_POKEMONS', payload: mockedColorSearch };
    const newState = searchMainReducer(initialState, action);
    expect(newState.pokemonsOnPage).toHaveLength(0);
  });

  it('should toggle right panel correctly', () => {
    const action = {
      type: 'OPEN_RIGHT_PANEL',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.showRightPanel).toBe(true);
  });

  it('should close the right panel correctly', () => {
    const action = {
      type: 'CLOSE_RIGHT_PANEL',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.showRightPanel).toBe(false);
  });

  it('should update checkbox correctly', () => {
    const action = {
      type: 'UPDATE_CHECKBOXES',
      payload: mockedColorSearch,
    };
    const newState = searchMainReducer(initialState, action);
    expect(newState.savedCartIds).toHaveLength(1);
  });
});
