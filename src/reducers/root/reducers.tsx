import { combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';
import searchMainReducer from '../reducers/searchMainReducer';
import searchSideReducer from '../reducers/searchSideReducer';

const rootReducer = combineReducers({
  searchMain: searchMainReducer,
  searchSide: searchSideReducer,
  cart: cartReducer,
});

export default rootReducer;
