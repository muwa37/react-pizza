import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';

export type FetchPizzasParams = {
  activeCategory: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
};

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

type PizzaSliceState = {
  items: Pizza[];
  loadingStatus: Status;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

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

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions;
