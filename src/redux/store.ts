import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';

export const store = configureStore({
  reducer: {
    productReducer,
    categoryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
