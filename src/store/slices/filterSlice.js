import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  sort: {
    name: 'popularity',
    sortProp: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.searchValue = action.payload.searchValue;
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = store => store.filter.sort;
export const selectFilter = store => store.filter;

export default filterSlice.reducer;
export const {
  setCategory,
  setSort,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;
