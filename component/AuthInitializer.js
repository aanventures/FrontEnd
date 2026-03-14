"use client";
import { loadUser } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // This looks for the HTTP-Only cookie automatically
    dispatch(loadUser());
  }, [dispatch]);

  return null; // This component doesn't render anything
}