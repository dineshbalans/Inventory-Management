import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import productReducer from "./productSlice";
import invoicesReducer from "./invoiceSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    product: productReducer,
    invoices: invoicesReducer,
  },
});
export default store;
