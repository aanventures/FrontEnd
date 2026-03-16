import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// --- ASYNC THUNKS ---

export const authenticateUser = createAsyncThunk(
  "auth/authenticate",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/auth`,
        credentials,
        { withCredentials: true },
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Authentication failed",
      );
    }
  },
);

// store/slices/authSlice.js
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          withCredentials: true,
        },
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${baseUrl}/api/users/${id}`, userData, {
        withCredentials: true,
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/logout`, {
        withCredentials: true,
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

// --- THE SLICE ---

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    // Used for immediate UI cleanup if needed
    logoutLocal: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Authenticate
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.message = "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearMessage, logoutLocal } = authSlice.actions;
export default authSlice.reducer;
