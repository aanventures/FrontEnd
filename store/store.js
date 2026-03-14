import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as you build them (e.g., blogs, hotels)
  },
  devTools: process.env.NODE_ENV !== "production",
});