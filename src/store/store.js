import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/cars/carsSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    cart: cartReducer,
    user: userReducer,
    ui: uiReducer,
  },
});