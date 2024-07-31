import { ICartPayload } from '@/interfaces/interfaces';
import { describe, it, expect } from 'vitest';
import cartReducer from './cartReducer';

const payload: ICartPayload = {
  pokemonId: '1',
  pokemonName: 'bulbasaur',
  action: true,
  flavor_text_entries: [
    {
      flavor_text: 'green pokemon',
    },
  ],
  id: 1,
  name: 'bulbasaur',
};

describe('cartReducer', () => {
  const initialState = {
    savedCartData: {},
    somethingInCart: false,
  };

  it('should handle TOGGLE_CART action correctly', () => {
    const initialState = {
      savedCartData: {},
      somethingInCart: false,
    };

    const action = {
      type: 'TOGGLE_CART',
      payload,
    };
    const newState = cartReducer(initialState, action);

    expect(newState.savedCartData[1]).toBe('bulbasaur');
    expect(newState.somethingInCart).toBe(true);
  });

  it('should handle unknown action type', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {} as ICartPayload,
    };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should handle UPDATE_CART action correctly', () => {
    const initialState = {
      savedCartData: { 1: 'Pikachu' },
      somethingInCart: true,
    };

    const action = {
      type: 'UPDATE_CART',
      payload,
    };
    const newState = cartReducer(initialState, action);

    expect(newState.savedCartData[1]).toBe('Bulbasaur&&1&&green pokemon&&https://pokeapi.co/api/v2/pokemon-species/1/');
  });

  it('should handle CLOSE_FLYOUT action correctly', () => {
    const action = {
      type: 'CLOSE_FLYOUT',
      payload: payload,
    };
    const newState = cartReducer(initialState, action);
    expect(newState.somethingInCart).toBe(false);
  });
});
