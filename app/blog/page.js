"use client"; // Required for useEffect and useSelector

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from '@/component/Blogs/Blog';
import { fetchAllBlogs } from '@/store/slices/blogSlice';

export default function Blog() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(
      fetchAllBlogs({
        status: "published",
      }),
    );
  }, [dispatch]);

  return (
    <div className="w-full bg-[#FDF8F2]">
      {/* 2. THE MAIN BLOG LIST SECTION */}
      <div className="container mx-auto -mt-10 relative z-40">
        {/* If BlogList handles its own grid and sidebar, keep it as is */}
        {/* Otherwise, pass the blogs and loading state as props */}
        <BlogList blogs={blogs} loading={loading} />
      </div>

      {/* 3. YOUR NEWSLETTER SECTION (Styled to match the new theme) */}
      <section className="bg-gradient-to-r from-[#1D3178] to-[#020D32] mt-20 border-t-4 border-[#C9A67F]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8 text-lg opacity-80">
            Get the latest travel stories, property insights, and market updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A67F] bg-white/10 text-white border border-white/20 placeholder:text-gray-400"
            />
            <button className="bg-[#C9A67F] hover:bg-[#B38D5B] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}