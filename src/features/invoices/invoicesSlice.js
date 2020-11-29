import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getInvoices from "../../api/getInvoices";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const res = await getInvoices();
    return res.data;
  }
);

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchInvoices.fulfilled]: (state, action) => {
      state.invoices = action.payload;
      state.loading = false;
    },
    [fetchInvoices.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [fetchInvoices.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const selectInvoices = (state) => state.invoices;

export default invoicesSlice.reducer;
