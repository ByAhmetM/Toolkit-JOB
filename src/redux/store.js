import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobSlice";

export const store = configureStore({
  reducer: { jobs: jobsReducer },
});
