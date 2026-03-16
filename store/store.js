import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogReducer from "../store/slices/blogSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer, 
  },
  devTools: process.env.NODE_ENV !== "production",
});