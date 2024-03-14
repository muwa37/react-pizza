import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasParams, Status } from '../../types/common';
import { Pizza, PizzaSliceState } from '../../types/store/pizza';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({
    activeCategory,
    sortBy,
    order,
    search,
    currentPage,
  }: FetchPizzasParams) => {
    const { data } = await axios.get<Pizza[]>(
      `https://65de02ccdccfcd562f561234.mockapi.io/items?${activeCategory}sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
    );

    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  loadingStatus: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.loadingStatus = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loadingStatus = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, state => {
      state.loadingStatus = Status.ERROR;
      state.items = [];
    });
  },
});

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions;
