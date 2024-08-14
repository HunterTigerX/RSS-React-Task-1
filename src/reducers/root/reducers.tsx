import hooksFormReducer from 'reducers/reducers/hooksFormReducer';
import uncontrolledFormReducer from 'reducers/reducers/uncontrolledFormReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledFormReducer,
  hooksForm: hooksFormReducer,
});

export default rootReducer;
