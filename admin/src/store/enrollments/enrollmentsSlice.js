import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.enrollments = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const enrollmentsActions = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
