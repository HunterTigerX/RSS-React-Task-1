import { countries } from '@data/countries';
import { IHooksFormData } from './interfaces';
import { IStateUForm } from 'reducers/root/interfaces';

const initialUCState: IStateUForm = {
  savedUncontrolledInputs: [],
  countries: countries,
};

const uncontrolledFormReducer = (state = initialUCState, action: { type: string; payload: IHooksFormData }) => {
  switch (action.type) {
    case 'SAVE_UNCONTROLLED_INPUT': {
      const storeDataFormat = JSON.stringify(action.payload);
      return {
        ...state,
        savedUncontrolledInputs: state.savedUncontrolledInputs.concat([storeDataFormat]),
      };
    }

    default:
      return state;
  }
};

export default uncontrolledFormReducer;
