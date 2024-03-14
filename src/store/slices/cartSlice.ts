import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

type CartSliceState = {
  totalPrice: number;
  items: CartItem[];
};

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;

export const {
  addItem,
  removeItem,
  clearItems,
  incrementItemCount,
  decrementItemCount,
} = cartSlice.actions;
