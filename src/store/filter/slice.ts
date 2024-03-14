import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortProperties } from '../../types/common';
import { FilterSliceState, Sort } from '../../types/store/filter';

const initialState: FilterSliceState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  sort: {
    name: 'popularity',
    sortProp: SortProperties.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.searchValue = action.payload.searchValue;
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export default filterSlice.reducer;

export const {
  setCategory,
  setSort,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;
