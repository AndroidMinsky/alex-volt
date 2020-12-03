import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import customersReducer from "../features/customers/customersSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    invoices: invoicesReducer,
  },
});
