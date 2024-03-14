import { CartItem } from '../common';

export type CartSliceState = {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
};
