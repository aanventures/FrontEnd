import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// --- ASYNC THUNKS ---

export const createNewBlog = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/blogs`, blogData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to publish blog",
      );
    }
  },
);

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${baseUrl}/api/blogs${queryString ? `?${queryString}` : ""}`;
      const { data } = await axios.get(url, { withCredentials: true });
      return data.blogs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs",
      );
    }
  },
);

export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/blogs/${slug}`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch article",
      );
    }
  },
);

// DELETE BLOG
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      // Added baseUrl and withCredentials for security
      await axios.delete(`${baseUrl}/api/blogs/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  },
);

// UPDATE BLOG
export const updateBlogAction = createAsyncThunk(
  "blog/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      // Added baseUrl and multipart support for optional image updates
      const { data } = await axios.put(`${baseUrl}/api/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

// Add this to your blogSlice.js
export const updateBlogGalleryAction = createAsyncThunk(
  "blog/updateGallery",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/blogs/${id}/gallery`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteBlogGalleryImageAction = createAsyncThunk(
  "blog/deleteGalleryImage",
  async ({ id, imageId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/blogs/${id}/gallery/${imageId}`,
        {
          withCredentials: true,

          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting image",
      );
    }
  },
);

// In extraReducers, handle the loading state similar to updateBlogAction

export const likeBlogAction = createAsyncThunk(
  "blog/like",
  async (blogId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.post(
        `${baseUrl}/api/blogs/${blogId}/like`,
        {
          userId: auth.user._id,
        },
        { withCredentials: true },
      );

      return { blogId, likesCount: data.likes };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Action failed");
    }
  },
);

export const addCommentAction = createAsyncThunk(
  "blog/addComment",
  async ({ blogId, text }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.post(
        `${baseUrl}/api/blogs/${blogId}/comment`,
        {
          author: auth.user._id,
          text,
        },
        { withCredentials: true },
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment",
      );
    }
  },
);

// --- THE SLICE ---

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetBlogState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Create Blog */
      .addCase(createNewBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs.unshift(action.payload.blog);
      })
      .addCase(createNewBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Fetch All */
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })

      /* Fetch Single By Slug */
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })

      /* Delete Blog */
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted blog from the array instantly
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })

      .addCase(updateBlogGalleryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogGalleryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Update the gallery in the blogs array list
        const index = state.blogs.findIndex((b) => b._id === state.currentId);
        // Note: You might need to pass ID or store it to find the index accurately
        if (index !== -1) {
          state.blogs[index].gallery = action.payload;
        }

        // Update the single blog object if it's currently loaded
        if (state.blog) {
          state.blog.gallery = action.payload;
        }
      })
      .addCase(updateBlogGalleryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Existing Update Blog Action */
      .addCase(updateBlogAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id,
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        if (state.blog?._id === action.payload._id) {
          state.blog = action.payload;
        }
      })
      .addCase(updateBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Interactions */
      .addCase(likeBlogAction.fulfilled, (state, action) => {
        if (state.blog && state.blog._id === action.payload.blogId) {
          state.blog.likesCount = action.payload.likesCount;
        }
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        if (state.blog) {
          state.blog.comments = action.payload;
          state.blog.commentsCount = action.payload.length;
        }
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
