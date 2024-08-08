import { makeNameCapital } from '@/pages/components/urlMethods';
import { ICartPayload } from '@/pages/interfaces/interfaces';

const initialState = {
  savedCartData: {},
  somethingInCart: false,
};

const cartReducer = (state = initialState, action: { type: string; payload: ICartPayload }) => {
  switch (action.type) {
    case 'TOGGLE_CART': {
      const pokemonId = action.payload.pokemonId;
      const pokemonName = action.payload.pokemonName;
      const deepCopy = JSON.stringify(state.savedCartData);
      const savedCartDataCopy = JSON.parse(deepCopy);
      savedCartDataCopy[pokemonId] = pokemonName;
      const isSomethingInCard = Object.keys(savedCartDataCopy).length === 0 ? false : true;
      return { ...state, somethingInCart: isSomethingInCard };
    }

    case 'UPDATE_CART': {
      const pokemonId = action.payload.id;
      const pokemonName = makeNameCapital(action.payload.name);
      const description = action.payload.flavor_text_entries[0].flavor_text.replace('', ' ');
      const url = `https://pokeapi.co/api/v2/pokemon-species/${action.payload.id}/`;
      const deepCopy = JSON.stringify(state.savedCartData);
      const savedCartDataCopy = JSON.parse(deepCopy);
      const newValue = `${pokemonName}&&${pokemonId}&&${description}&&${url}`;
      savedCartDataCopy[action.payload.id] = newValue;
      return { ...state, savedCartData: savedCartDataCopy };
    }

    case 'CLOSE_FLYOUT': {
      return { ...state, somethingInCart: false };
    }

    default:
      return state;
  }
};

export default cartReducer;
