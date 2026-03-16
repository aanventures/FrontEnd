"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs, deleteBlog } from "@/store/slices/blogSlice";
import cloudinaryLoader from "@/utils/cloudinaryLoader"; // Ensure this helper exists
import {
  Edit3,
  Trash2,
  Search,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function BlogListPage() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // 1. Fetch blogs on component load
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // 2. Handle Delete with Confirmation
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone.",
      )
    ) {
      dispatch(deleteBlog(id));
    }
  };

  // 3. Filter blogs based on search and category
  const filteredBlogs =
    blogs?.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All Categories" ||
        blog.category === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    }) || [];

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Blog Management
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            View, edit, and manage your published stories.
          </p>
        </div>
        <Link
          href="/admin/blogs/add"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95 w-fit"
        >
          <Plus size={18} /> Create New Post
        </Link>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none w-full md:w-48 cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option value="travel">Travel Tips</option>
          <option value="hotels">Hotel Reviews</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="news">Industry News</option>
          <option value="deals">Exclusive Deals</option>
        </select>
      </div>

      {/* TABLE DATA */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="animate-spin text-orange-500" size={32} />
            <p className="font-bold text-sm">Syncing with database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Blog Detail
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                    Home Page
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="hover:bg-slate-50/30 transition-colors group"
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-10 rounded-lg overflow-hidden relative flex-shrink-0 border border-slate-100 bg-slate-100">
                            {blog.image?.url ? (
                              <Image
                                loader={cloudinaryLoader}
                                src={blog.image.url}
                                alt="thumb"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-slate-300">
                                <ImageIcon size={16} />
                              </div>
                            )}
                          </div>
                          <div className="max-w-[200px] md:max-w-xs">
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium">
                              By {blog.author?.name || "Team Tripaango"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {blog.home_page ? (
                          <div
                            className="flex justify-center text-blue-500"
                            title="Visible on Home Slider"
                          >
                            <CheckCircle2 size={20} />
                          </div>
                        ) : (
                          <div className="flex justify-center text-slate-200">
                            <XCircle size={20} />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap capitalize">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-1 rounded-md w-fit ${
                            blog.status === "published"
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-amber-600 bg-amber-50"
                          }`}
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${blog.status === "published" ? "bg-emerald-600" : "bg-amber-600"}`}
                          />
                          {blog.status}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* VIEW LIVE ACTION */}
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="View Live"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          {/* EDIT ACTION */}
                          <Link
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Post"
                          >
                            <Edit3 size={18} />
                          </Link>
                          {/* DELETE ACTION */}
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-20 text-slate-400 font-bold"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon size={40} className="opacity-20" />
                        No articles found matching your criteria.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION FOOTER */}
        <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">
            Showing{" "}
            <span className="text-slate-900">{filteredBlogs.length}</span> of{" "}
            <span className="text-slate-900">{blogs?.length || 0}</span> stories
          </p>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              disabled
            >
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white transition-all shadow-sm hover:border-orange-200">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
