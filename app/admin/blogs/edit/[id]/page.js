"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { updateBlogAction, fetchAllBlogs, resetBlogState } from "@/store/slices/blogSlice"; 
import {
  Save,
  Image as ImageIcon,
  Globe,
  Loader2,
  Plus,
  X,
  Home,
  ArrowLeft
} from "lucide-react";
import QuillEditor from "@/component/admin/Blogs/QuillEditor";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux States
  const { blogs, loading, success, error } = useSelector((state) => state.blog);

  // Local States
  const [imagePreview, setImagePreview] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "travel",
    status: "published",
    home_page: false,
  });

  // 1. Load data for editing
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchAllBlogs());
    } else {
      const blogToEdit = blogs.find((b) => b._id === id);
      if (blogToEdit) {
        setFormData({
          title: blogToEdit.title,
          excerpt: blogToEdit.excerpt || "",
          content: blogToEdit.content,
          category: blogToEdit.category,
          status: blogToEdit.status,
          home_page: blogToEdit.home_page,
        });
        if (blogToEdit.image?.url) {
          setImagePreview(blogToEdit.image.url);
        }
      }
    }
  }, [id, blogs, dispatch]);

  // 2. Handle Success/Error
  useEffect(() => {
    if (success) {
      alert("Blog Updated Successfully!");
      dispatch(resetBlogState());
      router.push("/admin/blogs"); // Redirect back to list
    }
    if (error) {
      alert(error);
      dispatch(resetBlogState());
    }
  }, [success, error, dispatch, router]);

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
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and Content are required!");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("excerpt", formData.excerpt);
    dataToSend.append("content", formData.content);
    dataToSend.append("category", formData.category);
    dataToSend.append("status", formData.status);
    dataToSend.append("isFeatured", formData.home_page); // Match controller key

    // Only append image if a new one was selected
    if (blogImage) {
      dataToSend.append("image", blogImage);
    }

    dispatch(updateBlogAction({ id, formData: dataToSend }));
  };

  const categories = [
    { id: "travel", label: "Travel Tips" },
    { id: "hotels", label: "Hotel Reviews" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "news", label: "Industry News" },
    { id: "deals", label: "Exclusive Deals" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Edit Story</h2>
            <p className="text-slate-500 text-sm font-medium">Update your content and visibility settings.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-3 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? "Saving Changes..." : "Update Post"}
        </button>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            {/* Title */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
              <input
                type="text"
                className="w-full mt-2 px-0 py-3 text-lg font-black border-b-2 border-slate-50 focus:border-blue-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Featured Image</label>
              <div className="relative h-64 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-400">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                    <label className="absolute bottom-4 right-4 p-3 bg-white text-blue-600 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                       <ImageIcon size={20} />
                       <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <ImageIcon size={32} className="text-slate-300 mb-2" />
                    <span className="text-xs font-bold text-slate-400">Change Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Summary</label>
              <textarea
                rows="2"
                className="w-full mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            {/* Content */}
            <div className="rounded-3xl overflow-hidden border border-slate-100">
               <QuillEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-5">Category</label>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all ${
                    formData.category === cat.id ? "bg-blue-600 text-white shadow-lg" : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {cat.label}
                  {formData.category === cat.id && <Plus size={16} className="rotate-45" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
            <h4 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Home size={18} className="text-blue-500" /> Home Display
            </h4>
            <button
               type="button"
               onClick={() => setFormData({...formData, home_page: !formData.home_page})}
               className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                 formData.home_page ? "bg-white/10 border-blue-500/50" : "border-white/5"
               }`}
            >
              <span className="text-sm font-bold">Featured on Slider</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.home_page ? "border-blue-500" : "border-white/20"}`}>
                {formData.home_page && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}