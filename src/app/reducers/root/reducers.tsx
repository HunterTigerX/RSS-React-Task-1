import { combineReducers } from 'redux';
import { pokemonApi } from './pokemonApi';
import cartReducer from '../reducers/cartReducer';
import searchMainReducer from '../reducers/searchMainReducer';
import searchSideReducer from '../reducers/searchSideReducer';

const rootReducer = combineReducers({
  searchMain: searchMainReducer,
  searchSide: searchSideReducer,
  cart: cartReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export default rootReducer;
