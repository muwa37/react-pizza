export type PizzaState = {
  imageUrl: string;
  title: string;
  price: number;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
