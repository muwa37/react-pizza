import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ activeCategory, sortBy, order, search, currentPage }) => {
    const { data } = await axios.get(
      `https://65de02ccdccfcd562f561234.mockapi.io/items?${activeCategory}sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
    );
    return data;
  }
);

const initialState = {
  items: [],
  loadingStatus: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.loadingStatus = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loadingStatus = 'success';
    });
    builder.addCase(fetchPizzas.rejected, state => {
      state.loadingStatus = 'error';
      state.items = [];
    });
  },
});

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions;
