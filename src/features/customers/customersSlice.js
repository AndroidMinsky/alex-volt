import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  getCustomers,
  postCustomer,
  putCustomer,
  deleteCustomer,
} from "../../api/customers";

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

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (data) => {
    const res = await postCustomer(data);
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

export const removeCustomer = createAsyncThunk(
  "customers/removeCustomer",
  async (id) => {
    await deleteCustomer(id);
    return id;
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
    [createCustomer.fulfilled]: (state, action) => {
      state.customers.push(action.payload);
    },
    [updateCustomer.fulfilled]: (state, { payload }) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === payload.id
      );
      state.customers[index] = payload;
    },
    [removeCustomer.fulfilled]: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload
      );
      state.customers.splice(index, 1);
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
