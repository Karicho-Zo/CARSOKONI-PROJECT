import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    itemCount: 0,
    tax: 0,
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      state.tax = state.total * 0.1; // 10% tax
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      state.tax = state.total * 0.1;
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        state.tax = state.total * 0.1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.tax = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;