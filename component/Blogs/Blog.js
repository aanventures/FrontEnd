"use client";
import { fetchAllBlogs } from "@/store/slices/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import cloudinaryLoader from "@/utils/cloudinaryLoader";
import Image from "next/image";
import BlogCard from "../Home/BlogCard";

export default function BlogList() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(
      fetchAllBlogs({
        status: "published",
      }),
    );
  }, [dispatch]);

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "travel", label: "Travel" },
    { id: "hotels", label: "Hotels" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "news", label: "News" },
    { id: "deals", label: "Deals" },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogs
      : blogs.filter(
          (post) =>
            post.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  if (loading)
    return (
      <div className="py-20 text-center font-semibold text-slate-600">
        Loading articles...
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 capitalize">
          {selectedCategory === "all"
            ? "All Articles"
            : `${selectedCategory} Articles`}
        </h2>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 font-medium">
            No articles found in this category.
          </div>
        )}
      </section>
    </div>
  );
}
