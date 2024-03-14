import { CartItem } from '../types/common';

export const getCartFromLS = () => {
  const cartData = localStorage.getItem('cart');
  const items: CartItem[] = cartData ? JSON.parse(cartData) : [];
  const totalPrice = items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

  return {
    items,
    totalPrice,
  };
};
