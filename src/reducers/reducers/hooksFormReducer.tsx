import { countries } from '@data/countries';
import { IHooksFormData } from './interfaces';
import { IStateHForm } from 'reducers/root/interfaces';

const initialFRState: IStateHForm = {
  savedHooksInputs: [],
  countries: countries,
};

const hooksFormReducer = (state = initialFRState, action: { type: string; payload: IHooksFormData }) => {
  switch (action.type) {
    case 'SAVE_HOOK_VALUE': {
      const storeDataFormat = JSON.stringify(action.payload);
      return {
        ...state,
        savedHooksInputs: state.savedHooksInputs.concat([storeDataFormat]),
      };
    }
    default:
      return state;
  }
};

export default hooksFormReducer;
