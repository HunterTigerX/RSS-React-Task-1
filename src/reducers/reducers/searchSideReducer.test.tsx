import { describe, it, expect } from 'vitest';
import searchSideReducer from './searchSideReducer';
import { mockedIdSearch } from '../../__mocks__/mockedPokemons';

describe('searchSideReducer', () => {
  const initialState = {
    linkClicked: false,
    loadingRight: false,
    overlayStatus: false,
    error: null,
    pokemonName: '',
    pokemonImage: '',
    pokemonDescription: '',
  };

  it('should handle FETCH_POKEMON_DATA_START action', () => {
    const action = { type: 'FETCH_POKEMON_DATA_START', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState.loadingRight).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle FETCH_POKEMON_DATA_SUCCESS action', () => {
    const action = {
      type: 'FETCH_POKEMON_DATA_SUCCESS',
      payload: mockedIdSearch,
    };
    const newState = searchSideReducer(initialState, action);
    expect(newState.loadingRight).toBe(false);
    expect(newState.pokemonImage).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
    expect(newState.pokemonDescription).toBe(
      'A strange seed was\nplanted on its\nback at birth. The plant sprouts\nand grows with\nthis POKéMON.'
    );
    expect(newState.pokemonName).toBe('bulbasaur');
  });

  it('should handle FETCH_POKEMON_DATA_FAILURE action', () => {
    const action = { type: 'FETCH_POKEMON_DATA_FAILURE', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState.loadingRight).toBe(false);
  });

  it('should handle SET_LOADING_RIGHT action', () => {
    const action = { type: 'SET_LOADING_RIGHT', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState.loadingRight).toBe(true);
  });
  it('should handle SIDE_LINK_CLICKED action', () => {
    const action = { type: 'SIDE_LINK_CLICKED', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState.linkClicked).toBe(true);
    expect(newState.overlayStatus).toBe(true);
  });
  it('should handle SIDE_LINK_UNCLICKED action', () => {
    const action = { type: 'SIDE_LINK_UNCLICKED', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState.linkClicked).toBe(false);
    expect(newState.overlayStatus).toBe(false);
  });

  it('should return the current state for unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: mockedIdSearch };
    const newState = searchSideReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
