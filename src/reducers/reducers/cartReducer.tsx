import { ICartPayload } from '@components/interfaces/interfaces';

const initialState = {
  savedCartData: {},
  somethingInCart: false,
};

function removeKey(object: { [x: string]: string }, key: string) {
  if (key in object) {
    delete object[key];
  }
}

const cartReducer = (state = initialState, action: { type: string; payload: ICartPayload }) => {
  switch (action.type) {
    case 'TOGGLE_CART': {
      const pokemonId = action.payload.pokemonId;
      const pokemonName = action.payload.pokemonName;
      const wasAdded = action.payload.action;
      const deepCopy = JSON.stringify(state.savedCartData);
      const savedCartDataCopy = JSON.parse(deepCopy);
      if (wasAdded) {
        savedCartDataCopy[pokemonId] = pokemonName;
      } else {
        removeKey(savedCartDataCopy, pokemonId);
      }
      const isSomethingInCard = Object.keys(savedCartDataCopy).length === 0 ? false : true;
      return { ...state, savedCartData: savedCartDataCopy, somethingInCart: isSomethingInCard };
    }

    case 'UPDATE_CART': {
      const pokemonId = action.payload.id;
      const pokemonName = action.payload.name;
      const description = action.payload.flavor_text_entries[0].flavor_text.replace('', ' ');
      const url = `https://pokeapi.co/api/v2/pokemon-species/${action.payload.id}/`;
      const deepCopy = JSON.stringify(state.savedCartData);
      const savedCartDataCopy = JSON.parse(deepCopy);
      const newValue = `${pokemonName}&&${pokemonId}&&${description}&&${url}`;
      if (action.payload.id in savedCartDataCopy) {
        savedCartDataCopy[action.payload.id] = newValue
      }

      return { ...state, savedCartData: savedCartDataCopy };
    }

    default:
      return state;
  }
};

export default cartReducer;
