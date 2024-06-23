import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = !state.isAuth;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
