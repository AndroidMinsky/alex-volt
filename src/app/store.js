import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import customersReducer from "../features/customers/customersSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";
import singleInvoiceReducer from "../features/invoices/singleInvoiceSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    invoices: invoicesReducer,
    singleInvoice: singleInvoiceReducer,
  },
});
