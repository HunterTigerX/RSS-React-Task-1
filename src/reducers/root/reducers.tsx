import { combineReducers } from 'redux';
import searchMainReducer from 'reducers/reducers/searchMainReducer';
import searchSideReducer from 'reducers/reducers/searchSideReducer';

const rootReducer = combineReducers({
  searchMain: searchMainReducer,
  searchSide: searchSideReducer,
});

export default rootReducer;
