import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import getCustomers from "../../api/getCustomers";

export const selectCustomerById = createSelector(
  (state) => state.customers.customers,
  (_, props) => props.id,
  (customers, id) => customers.find((customer) => customer.id === id)
);

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const res = await getCustomers();
    return res.data;
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload;
      state.loading = false;
    },
    [fetchCustomers.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [fetchCustomers.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const selectCustomers = (state) => state.customers;

export default customersSlice.reducer;
