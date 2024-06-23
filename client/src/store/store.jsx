import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    product: productReducer,
  },
});
export default store;
