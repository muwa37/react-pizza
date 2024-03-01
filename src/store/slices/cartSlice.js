import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearItems } = cartSlice.actions;
