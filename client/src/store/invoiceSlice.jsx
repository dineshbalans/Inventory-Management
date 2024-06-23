import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
  },
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
  },
});

export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice.reducer;
