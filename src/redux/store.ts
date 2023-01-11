import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducers';
import cartReducer from './reducers/cartReducers';
import wishListReducer from './reducers/wishListReducers';
import userReducer from './reducers/userReducers';
import themeReducer from './reducers/themeReducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducers = combineReducers(
  {
    products: productReducer,
    categories: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    users: userReducer,
    theme: themeReducer
  }
)
const persistedReducer = persistReducer(persistConfig, reducers)

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
};

const store = createStore()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
