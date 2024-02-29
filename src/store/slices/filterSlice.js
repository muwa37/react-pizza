import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
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
  },
});

export default filterSlice.reducer;
export const { setCategory, setSort } = filterSlice.actions;
