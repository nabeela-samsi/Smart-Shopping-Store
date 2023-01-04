import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducers';
import cartReducer from './reducers/cartReducers';
import wishListReducer from './reducers/wishListReducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducers = combineReducers(
  {
    products: productReducer,
    categories: categoryReducer,
    users: userReducer,
    auth: authReducer,
    cart: cartReducer,
    wishList: wishListReducer
  }
)
const persistedReducer = persistReducer(persistConfig, reducers)

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer
  })
} ;

const store = createStore()
console.log(typeof store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
