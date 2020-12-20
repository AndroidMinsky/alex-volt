import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInvoiceById } from "../../api/invoices";

export const fetchSingleInvoice = createAsyncThunk(
  "singleInvoice/fetchSingleInvoice",
  async (id) => {
    const res = await getInvoiceById(id);
    return res.data;
  }
);

export const singleInvoiceSlice = createSlice({
  name: "singleInvoice",
  initialState: {
    invoice: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchSingleInvoice.fulfilled]: (state, action) => {
      state.invoice = action.payload;
      state.loading = false;
    },
    [fetchSingleInvoice.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [fetchSingleInvoice.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default singleInvoiceSlice.reducer;

export const selectSingleInvoice = (state) => state.singleInvoice;
