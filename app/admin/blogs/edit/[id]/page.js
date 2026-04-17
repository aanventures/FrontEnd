"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  updateBlogAction,
  fetchAllBlogs,
  resetBlogState,
  updateBlogGalleryAction,
  deleteBlogGalleryImageAction,
} from "@/store/slices/blogSlice";
import {
  Save,
  Image as ImageIcon,
  Loader2,
  Plus,
  X,
  Home,
  ArrowLeft,
  Images,
  Trash2,
  UploadCloud,
} from "lucide-react";
import QuillEditor from "@/component/admin/Blogs/QuillEditor";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { blogs, loading, success, error } = useSelector((state) => state.blog);

  const [imagePreview, setImagePreview] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "travel",
    status: "published",
    home_page: false,
  });

  // Load blog data
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
        if (blogToEdit.gallery) {
          setGalleryItems(
            blogToEdit.gallery.map((img) => ({
              _id: img._id,              // ✅ keep subdocument id
              title: img.title || "",
              preview: img.url,
              file: null,
              isExisting: true,
            }))
          );
        }
      }
    }
  }, [id, blogs, dispatch]);

  // Handle success/error
  useEffect(() => {
    if (success) {
      alert("Blog Updated Successfully!");
      dispatch(resetBlogState());
      router.push("/admin/blogs");
    }
    if (error) {
      alert(error);
      dispatch(resetBlogState());
    }
  }, [success, error, dispatch, router]);

  // Gallery logic
  const addGalleryField = () => {
    setGalleryItems([...galleryItems, { title: "", file: null, preview: "" }]);
  };

  const removeGalleryField = async (index, imageId) => {
    try {
      const updated = [...galleryItems];
      updated.splice(index, 1);
      setGalleryItems(updated);

      // Only call backend if image has _id (already saved in DB)
      if (imageId) {
        await dispatch(deleteBlogGalleryImageAction({ id, imageId })).unwrap();
        alert("Image removed successfully!");
      }
    } catch (err) {
      alert(`Error removing image: ${err}`);
    }
  };

  const updateGalleryItem = (index, key, value) => {
    const updated = [...galleryItems];
    if (key === "file") {
      const file = value;
      updated[index].file = file;
      updated[index].preview = URL.createObjectURL(file);
    } else {
      updated[index][key] = value;
    }
    setGalleryItems(updated);
  };

  const handleGallerySubmit = async () => {
    if (galleryItems.length === 0) {
      alert("Please add at least one item or close the modal.");
      return;
    }

    const galleryData = new FormData();
    galleryItems.forEach((item) => {
      galleryData.append("titles[]", item.title);
      if (item.file) {
        galleryData.append("images", item.file);
      } else if (item.isExisting && item.preview) {
        galleryData.append("existingImages[]", item.preview);
      }
    });

    dispatch(updateBlogGalleryAction({ id, formData: galleryData }))
      .unwrap()
      .then(() => {
        setIsGalleryOpen(false);
        alert("Slider Gallery Updated Successfully!");
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

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
    dataToSend.append("isFeatured", formData.home_page);

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
    <div className="max-w-6xl mx-auto space-y-6 p-6 font-sans relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Edit Story
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Update content and slider gallery.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-black text-sm hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            <Images size={20} />
            Manage Gallery
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? "Saving..." : "Update Post"}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            {/* Title */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Title
              </label>
              <input
                type="text"
                className="w-full mt-2 px-0 py-3 text-lg font-black border-b-2 border-slate-50 focus:border-blue-500 outline-none"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Featured Image
              </label>
              <div className="relative h-64 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-400">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <label className="absolute bottom-4 right-4 p-3 bg-white text-blue-600 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <ImageIcon size={20} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <ImageIcon size={32} className="text-slate-300 mb-2" />
                    <span className="text-xs font-bold text-slate-400">
                      Change Image
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Summary
              </label>
              <textarea
                rows="2"
                className="w-full mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-100 outline-none"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
            </div>

            {/* Content */}
            <div className="rounded-3xl overflow-hidden border border-slate-100">
              <QuillEditor
                value={formData.content}
                onChange={(val) => setFormData({ ...formData, content: val })}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-5">
              Category
            </label>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all ${
                    formData.category === cat.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {cat.label}
                  {formData.category === cat.id && (
                    <Plus size={16} className="rotate-45" />
                  )}
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
              onClick={() =>
                setFormData({ ...formData, home_page: !formData.home_page })
              }
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                formData.home_page
                  ? "bg-white/10 border-blue-500/50"
                  : "border-white/5"
              }`}
            >
              <span className="text-sm font-bold">Featured on Slider</span>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.home_page ? "border-blue-500" : "border-white/20"}`}
              >
                {formData.home_page && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
            </button>
          </div>
        </div>
      </form>

      {/* GALLERY MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Slider Gallery
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">
                  Add images for the blog slider
                </p>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 group"
                >
                  <div className="w-24 h-24 rounded-2xl bg-slate-200 overflow-hidden flex-shrink-0 relative">
                    {item.preview ? (
                      <img
                        src={item.preview}
                        className="w-full h-full object-cover"
                        alt="gallery"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        updateGalleryItem(index, "file", e.target.files[0])
                      }
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      placeholder="Image Title..."
                      value={item.title}
                      onChange={(e) =>
                        updateGalleryItem(index, "title", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-[10px] text-slate-400 font-bold ml-1">
                      Click image to upload file
                    </p>
                  </div>

                  <button
                    onClick={() => removeGalleryField(index,item._id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button
                onClick={addGalleryField}
                className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50/50"
              >
                <Plus size={24} className="mb-1" />
                <span className="text-xs font-black uppercase">
                  Add New Slide
                </span>
              </button>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="flex-1 py-4 font-black text-slate-500 hover:text-slate-700"
              >
                Discard
              </button>
              <button
                onClick={handleGallerySubmit}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud size={20} />
                Save Gallery Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
