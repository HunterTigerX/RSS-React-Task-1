import { combineReducers } from 'redux';
import searchMainReducer from 'reducers/reducers/searchMainReducer';
import searchSideReducer from 'reducers/reducers/searchSideReducer';
import cartReducer from 'reducers/reducers/cartReducer';

const rootReducer = combineReducers({
  searchMain: searchMainReducer,
  searchSide: searchSideReducer,
  cart: cartReducer,
});

export default rootReducer;
