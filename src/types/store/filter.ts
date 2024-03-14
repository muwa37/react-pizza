import { SortProperties } from '../common';

export type Sort = {
  name: string;
  sortProp: SortProperties;
};

export type FilterSliceState = {
  searchValue: string;
  category: number;
  currentPage: number;
  sort: Sort;
};
