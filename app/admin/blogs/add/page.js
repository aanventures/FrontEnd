"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog, resetBlogState } from "@/store/slices/blogSlice";
import {
  Save,
  Image as ImageIcon,
  Globe,
  Loader2,
  Plus,
  X,
  Home, // Added Home icon
} from "lucide-react";
import QuillEditor from "@/component/admin/Blogs/QuillEditor";

export default function AddBlogPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading, success, error } = useSelector((state) => state.blog);

  const [imagePreview, setImagePreview] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "travel",
    status: "published",
    isFeatured: false, // NEW FIELD
  });

  const categories = [
    { id: "travel", label: "Travel Tips" },
    { id: "hotels", label: "Hotel Reviews" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "news", label: "Industry News" },
    { id: "deals", label: "Exclusive Deals" },
  ];

  useEffect(() => {
    if (success) {
      alert("Blog Published Successfully!");
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "travel",
        status: "published",
        isFeatured: false, // Reset new field
      });
      setBlogImage(null);
      setImagePreview(null);
      dispatch(resetBlogState());
    }
    if (error) {
      alert(error);
      dispatch(resetBlogState());
    }
  }, [success, error, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.title || !formData.content || !blogImage) {
      alert("Title, Content, and Featured Image are required!");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("excerpt", formData.excerpt);
    dataToSend.append("content", formData.content);
    dataToSend.append("category", formData.category);
    dataToSend.append("status", formData.status);
    dataToSend.append("isFeatured", formData.isFeatured); // SEND TO BACKEND
    dataToSend.append("image", blogImage);

    dispatch(createNewBlog(dataToSend));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Create New Blog
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Draft your story and share it with the Tripaango community.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-2xl bg-orange-600 text-white font-black text-sm shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center gap-3 disabled:opacity-70 active:scale-95"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            {/* Title */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Story Title
              </label>
              <input
                required
                type="text"
                placeholder="Enter a title..."
                className="w-full mt-2 px-0 py-3 text-lg font-black border-b-2 border-slate-50 focus:border-orange-500 focus:outline-none transition-all placeholder:text-slate-200"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Image */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">
                Featured Image
              </label>
              <div className="relative group w-full h-64 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-orange-400">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setBlogImage(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={32} />
                    </div>
                    <span className="text-sm font-bold text-slate-500">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Short Excerpt
              </label>
              <textarea
                required
                rows="2"
                placeholder="A brief summary for the preview card..."
                className="w-full mt-2 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 focus:ring-2 focus:ring-orange-500/10 focus:outline-none text-slate-600 font-medium leading-relaxed transition-all"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
            </div>

            {/* Editor */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-3 block">
                The Content
              </label>
              <div className="rounded-3xl overflow-hidden border border-slate-100">
                <QuillEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Home Visibility Toggle (NEW SECTION) */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-5 ml-1">
              Home Display
            </label>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isFeatured: !formData.isFeatured })
              }
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all border ${
                formData.isFeatured
                  ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                  : "bg-slate-50 border-transparent text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home
                  size={18}
                  className={
                    formData.isFeatured ? "text-blue-600" : "text-slate-300"
                  }
                />
                Show on Home Screen
              </div>
              <div
                className={`w-10 h-6 rounded-full relative transition-colors ${formData.isFeatured ? "bg-blue-600" : "bg-slate-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isFeatured ? "left-5" : "left-1"}`}
                />
              </div>
            </button>
            <p className="text-[10px] text-slate-400 mt-3 ml-1 font-medium italic">
              * If enabled, this post will appear in the home screen
              carousel/featured section.
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-5 ml-1">
              Select Category
            </label>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all ${formData.category === cat.id ? "bg-orange-600 text-white shadow-lg shadow-orange-100" : "bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-200 border border-transparent"}`}
                >
                  {cat.label}
                  {formData.category === cat.id && (
                    <Plus size={16} className="rotate-45" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Publishing Status */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe size={80} />
            </div>
            <h4 className="text-sm font-black mb-6 flex items-center gap-2 tracking-wide uppercase">
              <Globe size={18} className="text-orange-500" /> Publishing
            </h4>
            <div className="space-y-4 relative z-10">
              {["published", "draft"].map((status) => (
                <label
                  key={status}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${formData.status === status ? "bg-white/10 border-orange-500/50" : "border-white/5 hover:bg-white/5"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      className="hidden"
                      checked={formData.status === status}
                      onChange={() => setFormData({ ...formData, status })}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.status === status ? "border-orange-500" : "border-white/20"}`}
                    >
                      {formData.status === status && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-bold capitalize">
                      {status === "published" ? "Live Now" : "Save Draft"}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
