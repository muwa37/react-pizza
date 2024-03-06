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
      const foundItem = state.items.find(item => item.id === action.payload.id);
      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action) {
      state.totalPrice -=
        state.items.find(item => item.id === action.payload).price *
        state.items.find(item => item.id === action.payload).count;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    incrementItemCount(state, action) {
      state.items.find(item => item.id === action.payload).count += 1;
      state.totalPrice += state.items.find(
        item => item.id === action.payload
      ).price;
    },
    decrementItemCount(state, action) {
      const foundItemCount = state.items.find(
        item => item.id === action.payload
      ).count;

      if (foundItemCount > 1) {
        state.items.find(item => item.id === action.payload).count -= 1;
        state.totalPrice -= state.items.find(
          item => item.id === action.payload
        ).price;
      }
    },
  },
});

export const selectCart = state => state.cart;
export const selectCartItemById = id => state =>
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;

export const {
  addItem,
  removeItem,
  clearItems,
  incrementItemCount,
  decrementItemCount,
} = cartSlice.actions;
