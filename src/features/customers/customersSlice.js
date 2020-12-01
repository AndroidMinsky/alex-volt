import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { getCustomers, putCustomer } from "../../api/customers";

const initialState = {
  customers: [],
  loading: false,
  error: false,
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const res = await getCustomers();
    return res.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (data) => {
    const { id, newData } = data;
    const res = await putCustomer(id, newData);
    return res.data;
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState,
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
    [updateCustomer.fulfilled]: (state, { payload }) => {
      let newData = state.customers.find(
        (customer) => customer.id === payload.id
      );

      if (newData) {
        newData = payload;
      }
    },
  },
});

export default customersSlice.reducer;

export const selectCustomers = (state) => state.customers;

export const selectCustomerById = createSelector(
  (state) => state.customers.customers,
  (_, props) => props.id,
  (customers, id) => customers.find((customer) => customer.id === id)
);
