import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const savedState = localStorage.getItem('state');
const persistentState = savedState ? JSON.parse(savedState) : {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: persistentState,
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
});

export type AppDispatch = typeof store.dispatch;

export default store;
