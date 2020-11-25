import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getProducts from "../../api/getProducts";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await getProducts();
    console.log(res.data);
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      console.log(action.payload);
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
