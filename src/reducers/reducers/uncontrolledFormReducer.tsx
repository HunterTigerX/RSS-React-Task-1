import { countries } from '@data/countries';

const initialUCState = {
  savedUncontrolledInputs: '',
  countries: countries,
};

const uncontrolledFormReducer = (state = initialUCState, action: { type: string; payload: string }) => {
  switch (action.type) {
    case 'SAVE_UNCONTROLLED_INPUT': {
      console.log('uncontroled action');
      return {
        ...state,
        savedUncontrolledInputs: `${state.savedUncontrolledInputs} ${action.payload}`,
      };
    }

    default:
      return state;
  }
};

export default uncontrolledFormReducer;
