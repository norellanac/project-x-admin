import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageImport from 'redux-persist/lib/storage/index.js'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const storage = (storageImport as any).default || storageImport;
import authReducer from '../slices/authSlice';
import serviceStepperReducer from '../slices/serviceStepperSlice';
import roleSwitcherReducer from '../slices/roleSwitcherSlice';
import brandingReducer from '../slices/brandingSlice';
import { authApi } from '../../services/authApi';
import { productApi } from '../../services/productApi';
import { categoryApi } from '../../services/categoryApi';
import { userApi } from '../../services/userApi';
import { ordersApi } from '../../services/ordersApi';
import { locationsApi } from '../../services/locationsApi';
import { chatApi } from '../../services/chatApi';
import { brandingApi } from '../../services/brandingApi';

const rootReducer = combineReducers({
  auth: authReducer,
  serviceStepper: serviceStepperReducer,
  roleSwitcher: roleSwitcherReducer,
  branding: brandingReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [locationsApi.reducerPath]: locationsApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [brandingApi.reducerPath]: brandingApi.reducer,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'serviceStepper', 'roleSwitcher'], // Only persist the auth reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      ordersApi.middleware,
      locationsApi.middleware,
      chatApi.middleware,
      brandingApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;