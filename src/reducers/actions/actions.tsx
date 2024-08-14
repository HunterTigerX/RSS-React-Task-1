export interface IData {
  age: number;
  confirmPassword: string;
  country: string;
  email: string;
  gender: string;
  image: string | ArrayBuffer;
  name: string;
  password: string;
  termsAccepted: boolean;
}

export const saveUncontrolledFormValue = (input: string) => {
  return async (dispatch: (arg0: { type: string; payload?: string }) => void) => {
    dispatch({
      type: 'SAVE_UNCONTROLLED_INPUT',
      payload: input,
    });
  };
};

export const saveHookFormValue = (data: IData) => {
  return async (dispatch: (arg0: { type: string; payload?: IData }) => void) => {
    dispatch({
      type: 'SAVE_HOOK_VALUE',
      payload: data,
    });
  };
};
