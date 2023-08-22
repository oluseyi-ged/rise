import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query/react';
import {extApi} from '@services/extApi';
import {mutationApi} from '@services/mutationApi';
import {queryApi} from '@services/queryApi';
import addressReducer from '@slices/address';
import authReducer from '@slices/auth';
import fauxReducer from '@slices/faux';
import firstReducer from '@slices/first';
import loadingReducer from '@slices/loading';
import loggedReducer from '@slices/logged';
import metricsReducer from '@slices/metrics';
import profileReducer from '@slices/profile';
import restaurantsReducer from '@slices/restaurants';
import splashReducer from '@slices/splash';
import unitsReducer from '@slices/units';
import userReducer from '@slices/user';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  units: unitsReducer,
  user: userReducer,
  restaurants: restaurantsReducer,
  profile: profileReducer,
  logged: loggedReducer,
  auth: authReducer,
  loading: loadingReducer,
  splash: splashReducer,
  first: firstReducer,
  metrics: metricsReducer,
  faux: fauxReducer,
  address: addressReducer,
  [mutationApi.reducerPath]: mutationApi.reducer,
  [extApi.reducerPath]: extApi.reducer,
  [queryApi.reducerPath]: queryApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'units',
    'user',
    'profile',
    'auth',
    'loading',
    'splash',
    'first',
    'metrics',
    'faux',
    'logged',
    'address',
    'restaurants',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      thunkMiddleware,
      mutationApi.middleware,
      extApi.middleware,
      queryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;
