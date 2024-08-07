import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  enrollment: [], // Assuming enrollment holds an array of enrollments
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.enrollment = action.payload;
      state.error = null;
    },
    createEnrollmentSuccess: (state, action) => {
      state.loading = false;
      state.enrollment = [...state.enrollment, action.payload];
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const enrollmentActions = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
