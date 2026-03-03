"use client";
import { useState } from "react";
import { Save, Image as ImageIcon, X, Globe, Lock } from "lucide-react";

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "travel",
    status: "draft",
    author: "Admin",
  });

  const categories = [
    { id: "travel", label: "Travel Tips" },
    { id: "hotels", label: "Hotel Reviews" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "news", label: "Industry News" },
    { id: "deals", label: "Exclusive Deals" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Blog Data:", formData);
    alert("Blog saved successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Create New Blog
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details to publish a new story.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all flex items-center gap-2"
          >
            <Save size={18} /> Publish Post
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Field */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Blog Title *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. 10 Best Hidden Beaches in Bali"
                className="w-full mt-2 px-0 py-3 text-2xl font-bold border-b border-slate-100 focus:border-orange-500 focus:outline-none transition-colors"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Excerpt Field */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Short Excerpt *
              </label>
              <textarea
                required
                rows="2"
                placeholder="A brief summary for the card view..."
                className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/10 text-slate-600"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
            </div>

            {/* Content Body */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Main Content *
              </label>
              <textarea
                required
                rows="12"
                placeholder="Start writing your story here..."
                className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/10 text-slate-700 leading-relaxed"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings (Right Column) */}
        <div className="space-y-6">
          {/* CATEGORY SELECTOR (The field you requested) */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">
              Blog Type / Category
            </label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    formData.category === cat.id
                      ? "bg-orange-50 border-orange-200 text-orange-600 shadow-sm"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {cat.label}
                  {formData.category === cat.id && (
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Image Upload Placeholder */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">
              Featured Image
            </label>
            <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:bg-slate-100 transition-colors">
              <ImageIcon
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-bold mt-2 uppercase">
                Upload JPG/PNG
              </span>
            </div>
          </div>

          {/* Post Settings */}
          <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Globe size={16} className="text-orange-500" /> Visibility
              Settings
            </h4>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="accent-orange-500"
                  defaultChecked
                />
                <span className="text-sm font-medium">Public (Live)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="accent-orange-500"
                />
                <span className="text-sm font-medium">Private / Draft</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
