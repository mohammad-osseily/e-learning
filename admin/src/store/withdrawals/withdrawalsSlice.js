import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  withdrawals: [],
};

const withdrawalsSlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.withdrawals = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const withdrawalsActions = withdrawalsSlice.actions;
export default withdrawalsSlice.reducer;
