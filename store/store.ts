import { useMemo } from 'react';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer, { RootReducerI } from './rootReducer';

let store: any;

// add redux loading bar middleware
const loadingMD = loadingBarMiddleware({
  promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
});

const persistConfig = {
  key: 'primary',
  storage,
  // whitelist: ['vendor'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore(initialState: RootReducerI) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, loadingMD)),
  );
}

export const initializeStore = (preloadedState: RootReducerI) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootReducerI) {
  const memoedStore = useMemo(
    () => initializeStore(initialState),
    [initialState],
  );
  return memoedStore;
}
