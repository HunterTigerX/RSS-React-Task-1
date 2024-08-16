import { IStates } from "reducers/root/interfaces";

const initialState: IStates = {
  hooksLastAdded: false,
  uncontrolledLastAdded: false,
};

const stateReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case 'HOOKS_ADDED': {
      return {
        ...state,
        hooksLastAdded: true,
        uncontrolledLastAdded: false,
      };
    }
    case 'UC_ADDED': {
      return {
        ...state,
        hooksLastAdded: false,
        uncontrolledLastAdded: true,
      };
    }
    default:
      return state;
  }
};

export default stateReducer;
