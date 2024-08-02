import { mockedIdSearch } from '@/app/__mocks__/mockedPokemons';
import { describe, it, expect, vi } from 'vitest';
import { addToCart, updateCart } from './cartActions';

describe('should dispatch the correct actions', () => {
  it('should change page', async () => {
    const mockDispatch = vi.fn();

    const pokemonId = '1';
    const action = true;
    const pokemonName = 'bulbasaur';

    const actionX = addToCart(pokemonId, action, pokemonName);

    await actionX(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'TOGGLE_CART',
      payload: { pokemonId, action, pokemonName },
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'UPDATE_CHECKBOXES', payload: { pokemonId, action } });
  });
  it('should update cart', async () => {
    const mockDispatch = vi.fn();
    const actionX = updateCart(mockedIdSearch);
    await actionX(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'UPDATE_CART',
      payload: mockedIdSearch,
    });
  });
});
