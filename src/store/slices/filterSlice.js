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
  },
});

export default filterSlice.reducer;
export const { setCategory, setSort, setSearchValue, setCurrentPage } =
  filterSlice.actions;
