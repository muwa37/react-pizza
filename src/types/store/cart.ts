import { CartItem } from '../common';

export type CartSliceState = {
  totalPrice: number;
  items: CartItem[];
};
