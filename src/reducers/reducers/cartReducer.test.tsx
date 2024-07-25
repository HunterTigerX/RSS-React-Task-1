import { ICartPayload } from '@components/interfaces/interfaces';
import cartReducer from 'reducers/reducers/cartReducer';
import { describe, it, expect } from 'vitest';

describe('cartReducer', () => {
  const initialState = {
    savedCartData: {},
    somethingInCart: false,
  };

  it('should add a pokemon to the cart', () => {
    const action = {
      type: 'TOGGLE_CART',
      payload: {
        pokemonId: '1',
        pokemonName: 'Pikachu',
        action: true,
      } as ICartPayload,
    };
    const newState = cartReducer(initialState, action);
    expect(newState.savedCartData).toHaveProperty('1', 'Pikachu');
    expect(newState.somethingInCart).toBe(true);
  });

  it('should remove a pokemon from the cart', () => {
    const action = {
      type: 'TOGGLE_CART',
      payload: {
        pokemonId: '1',
        pokemonName: 'Pikachu',
        action: false,
      } as ICartPayload,
    };
    const stateWithPokemon = {
      savedCartData: {
        '1': 'Pikachu',
      },
      somethingInCart: true,
    };
    const newState = cartReducer(stateWithPokemon, action);
    expect(newState.savedCartData).not.toHaveProperty('1');
    expect(newState.somethingInCart).toBe(false);
  });

  it('should handle unknown action type', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {} as ICartPayload,
    };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should handle empty payload', () => {
    const action = {
      type: 'TOGGLE_CART',
      payload: {} as ICartPayload,
    };
    const newState = cartReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
