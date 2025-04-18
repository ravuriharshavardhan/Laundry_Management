import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../Slice/AddClothSlice'

export const store = configureStore({
  reducer: {
    OrderDetails: orderReducer,
  },
});
