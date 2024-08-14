import { countries } from '@data/countries';

const initialFRState = {
  savedFormsInputs: '',
  countries: countries,
};

const hooksFormReducer = (state = initialFRState, action) => {
  switch (action.type) {
    case 'SAVE_HOOK_VALUE': {
      console.log('hook action');
      return {
        ...state,
        savedFormsInputs: `${state.savedFormsInputs} ${action.payload}`,
      };
    }

    default:
      return state;
  }
};

export default hooksFormReducer;
