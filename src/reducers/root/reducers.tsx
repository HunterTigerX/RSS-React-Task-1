import hooksFormReducer from 'reducers/reducers/hooksFormReducer';
import stateReducer from 'reducers/reducers/statesReducer';
import uncontrolledFormReducer from 'reducers/reducers/uncontrolledFormReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledFormReducer,
  hooksForm: hooksFormReducer,
  stateReducer: stateReducer,
});

export default rootReducer;
