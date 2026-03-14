"use client";
import { useState } from "react";
import { Save, Image as ImageIcon, Globe, Loader2 } from "lucide-react";
import QuillEditor from "@/component/admin/Blogs/QuillEditor";

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "travel",
    status: "published",
    author: "Admin",
  });

  const categories = [
    { id: "travel", label: "Travel Tips" },
    { id: "hotels", label: "Hotel Reviews" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "news", label: "Industry News" },
    { id: "deals", label: "Exclusive Deals" },
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // 1. Validation
    if (
      !formData.title ||
      !formData.content ||
      formData.content === "<p></p>"
    ) {
      alert("Title and Content are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Blog Saved Successfully!");
        // 2. Reset the form state
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "travel",
          status: "published",
          author: "Admin",
        });
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Connection to backend failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 font-sans">
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
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        onSubmit={handleSubmit}
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
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

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Short Excerpt *
              </label>
              <textarea
                required
                rows="2"
                placeholder="A brief summary..."
                className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none text-slate-600"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Main Content *
              </label>
              <QuillEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">
              Category
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

          <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Globe size={16} className="text-orange-500" /> Visibility
              Settings
            </h4>
            <div className="space-y-4">
              {["published", "draft"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer capitalize"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={formData.status === status}
                    onChange={() => setFormData({ ...formData, status })}
                    className="accent-orange-500"
                  />
                  <span className="text-sm font-medium">
                    {status === "published"
                      ? "Public (Live)"
                      : "Private / Draft"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
