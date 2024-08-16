export interface IState {
  uncontrolledForm: IStateUForm;
  hooksForm: IStateHForm;
  stateReducer: IStates;
}

export interface IStateUForm {
  savedUncontrolledInputs: string[];
  countries: string[];
}

export interface IStateHForm {
  savedHooksInputs: string[];
  countries: string[];
}

export interface IStates {
  hooksLastAdded: boolean;
  uncontrolledLastAdded: boolean;
}

export interface IPassData {
  strength: number;
  number: boolean;
  capital: boolean;
  small: boolean;
  symbol: boolean;
}