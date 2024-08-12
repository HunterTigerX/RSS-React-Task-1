
export const changePage = (newPage: number) => {
  return async (dispatch: (arg0: { type: string; payload?: number }) => void) => {
    dispatch({ type: 'TOGGLE_RIGHT_PANEL' });
    dispatch({
      type: 'CHANGE_PAGE',
      payload: newPage,
    });
  };
};
