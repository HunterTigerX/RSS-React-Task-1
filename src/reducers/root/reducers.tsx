import hooksFormReducer from 'reducers/reducers/hooksFormReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  hooksForm: hooksFormReducer,
});

export default rootReducer;
