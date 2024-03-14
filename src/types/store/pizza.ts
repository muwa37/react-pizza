import { Status } from '../common';

export type PizzaSliceState = {
  items: Pizza[];
  loadingStatus: Status;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
