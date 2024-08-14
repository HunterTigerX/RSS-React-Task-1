export interface IState {
  uncontrolledForm: IStateUForm;
  hooksForm: IStateHForm;
}

export interface IStateUForm {
  savedUncontrolledInputs: string;
  countries: string[];
}

export interface IStateHForm {
  savedFormsInputs: string;
  countries: string[];
}
