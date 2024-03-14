import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/common';
import { CartSliceState } from '../../types/store/cart';
import { getCartFromLS } from '../../utils/getCartFromLS';

const initialState: CartSliceState = {
  totalPrice: getCartFromLS().totalPrice,
  totalCount: getCartFromLS().totalCount,
  items: getCartFromLS().items,
};

const cartSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items.find(item => item.id === action.payload.id);
      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action: PayloadAction<string>) {
      const foundItem = state.items.find(item => item.id === action.payload);
      if (foundItem) {
        state.totalPrice -= foundItem.price * foundItem.count;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    incrementItemCount(state, action: PayloadAction<string>) {
      const foundItem = state.items.find(item => item.id === action.payload);
      if (foundItem) {
        foundItem.count += 1;
        state.totalPrice += foundItem.price;
      }
    },
    decrementItemCount(state, action: PayloadAction<string>) {
      const foundItem = state.items.find(item => item.id === action.payload);
      if (foundItem && foundItem.count > 1) {
        foundItem.count -= 1;
        state.totalPrice -= foundItem.price;
      }
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  removeItem,
  clearItems,
  incrementItemCount,
  decrementItemCount,
} = cartSlice.actions;
