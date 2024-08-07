// classesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  classes: [],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.classes = action.payload;
      state.error = null;
    },
    createclassessuccess: (state, action) => {
      state.loading = false;
      state.classes = [...state.classes, action.payload];
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const classesActions = classesSlice.actions;
export default classesSlice.reducer;
