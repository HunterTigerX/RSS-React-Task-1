import { IDataImageString } from 'reducers/reducers/interfaces';

export const saveUncontrolledFormValue = (data: IDataImageString) => {
  return async (dispatch: (arg0: { type: string; payload: IDataImageString }) => void) => {
    dispatch({
      type: 'SAVE_UNCONTROLLED_INPUT',
      payload: data,
    });
  };
};

export const saveHookFormValue = (data: IDataImageString) => {
  return async (dispatch: (arg0: { type: string; payload: IDataImageString }) => void) => {
    dispatch({
      type: 'SAVE_HOOK_VALUE',
      payload: data,
    });
  };
};
