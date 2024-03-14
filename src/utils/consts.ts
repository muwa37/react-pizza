import { SortItem, SortProperties } from '../types/common';

export const categories = [
  'All',
  'Meat',
  'Vegetarian',
  'Grill',
  'Spicy',
  'Closed',
];

export const typeNames = ['traditional', 'thin'];

export const sortTypes: SortItem[] = [
  { name: 'popularity (decrease)', sortProp: SortProperties.RATING_DESC },
  { name: 'popularity (increase)', sortProp: SortProperties.RATING_ASC },
  { name: 'price (decrease)', sortProp: SortProperties.PRICE_DESC },
  { name: 'price (increase)', sortProp: SortProperties.PRICE_ASC },
  { name: 'alphabet (a - z)', sortProp: SortProperties.TITLE_ASC },
  { name: 'alphabet (z - a)', sortProp: SortProperties.TITLE_DESC },
];
