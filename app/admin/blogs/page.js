"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Search, 
  Plus, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function BlogListPage() {
  // Sample Data - This would normally come from your API/Database
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "10 Hidden Gems in Bali for 2026",
      category: "Travel Tips",
      author: "Admin",
      date: "Mar 04, 2026",
      status: "Published",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=200&h=150&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Why Boutique Hotels are Rising",
      category: "Hotel Reviews",
      author: "Editor",
      date: "Feb 28, 2026",
      status: "Draft",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&h=150&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "How to Save 40% on Summer Flights",
      category: "Exclusive Deals",
      author: "Admin",
      date: "Feb 15, 2026",
      status: "Published",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=200&h=150&auto=format&fit=crop"
    }
  ]);

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Blog Management</h2>
          <p className="text-slate-500 text-sm">View, edit, and manage your published stories.</p>
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none text-sm"
          />
        </div>
        <select className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none w-full md:w-48">
          <option>All Categories</option>
          <option>Travel Tips</option>
          <option>Hotel Reviews</option>
          <option>Deals</option>
        </select>
      </div>

      {/* TABLE DATA */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Blog Detail</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden relative flex-shrink-0 border border-slate-100">
                        <Image src={blog.image} alt="thumb" fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {blog.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">By {blog.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {blog.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-1 rounded-md w-fit ${
                      blog.status === 'Published' 
                      ? 'text-emerald-600 bg-emerald-50' 
                      : 'text-amber-600 bg-amber-50'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${blog.status === 'Published' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      {blog.status}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/blogs/edit/${blog.id}`} 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit Post"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-all">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-8 py-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">Showing 1 to 3 of 42 entries</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-white transition-all disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white transition-all shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}