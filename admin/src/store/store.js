import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import classesReducer from "./classes/classesSlice";
import enrollmentsReducer from "./enrollments/enrollmentsSlice";
import withdrawalsReducer from "./withdrawals/withdrawalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    enrollments: enrollmentsReducer,
    withdrawals: withdrawalsReducer,
  },
});

export default store;
