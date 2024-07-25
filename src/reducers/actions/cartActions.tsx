import { IPokemonCard } from '@components/interfaces/interfaces';

export const toggleCart = (pokemonId: string, action: boolean, pokemonName?: string) => {
  return async (
    dispatch: (arg0: {
      type: string;
      payload:
        | { pokemonId: string; action: boolean; pokemonName: string | undefined }
        | { pokemonId: string; action: boolean };
    }) => void
  ) => {
    dispatch({ type: 'TOGGLE_CART', payload: { pokemonId, action, pokemonName } });
    dispatch({ type: 'UPDATE_CHECKBOXES', payload: { pokemonId, action } });
  };
};

export const updateCart = (pokemonData: IPokemonCard) => {
  return async (dispatch: (arg0: { type: string; payload: IPokemonCard }) => void) => {
    dispatch({ type: 'UPDATE_CART', payload: pokemonData });
  };
};
