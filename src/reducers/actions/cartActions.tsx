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
