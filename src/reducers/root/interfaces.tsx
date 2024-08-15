import { IHooksFormData } from 'reducers/reducers/interfaces';

export interface IState {
  uncontrolledForm: IStateUForm;
  hooksForm: IStateHForm;
}

export interface IStateUForm {
  savedUncontrolledInputs: string[];
  countries: string[];
}

export interface IStateHForm {
  savedHooksInputs: IHooksFormData[];
  countries: string[];
}
