import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { pokemonApi } from './pokemonApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
