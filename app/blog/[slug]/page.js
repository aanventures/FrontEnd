"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogBySlug,
  resetBlogState,
  likeBlogAction,
  addCommentAction,
  // toggleSaveBlog, // Uncomment when your save API is ready
} from "@/store/slices/blogSlice";

export default function BlogDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector((state) => state.blog);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Local state for the comment textarea
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }
    return () => {
      dispatch(resetBlogState());
    };
  }, [slug, dispatch]);

  const handleLike = () => {
    if (!isAuthenticated) return alert("Please login to like this post");
    dispatch(likeBlogAction(blog._id));
  };

  const handleSave = () => {
    if (!isAuthenticated) return alert("Please login to save articles");
    // dispatch(toggleSaveBlog(blog._id));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert("Please login to comment");
    if (!commentText.trim()) return;

    dispatch(addCommentAction({ blogId: blog._id, text: commentText }));
    setCommentText("");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Loading Story
          </p>
        </div>
      </div>
    );

  if (error || !blog)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article not found</h2>
        <button
          onClick={() => router.push("/blog")}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          Return to Blog Feed
        </button>
      </div>
    );

  return (
    <main className="bg-[#FCFCFD] min-h-screen pb-20 pt-[100px]">
      {/* 1. Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src={blog.image?.url}
          alt={blog.title}
          className="w-full h-full object-cover shadow-inner"
        />
        <div className="absolute top-8 left-8 z-20">
          <button
            onClick={() => router.back()}
            className="bg-white/90 backdrop-blur px-5 py-2 rounded-full text-slate-900 text-xs font-bold shadow-xl hover:bg-white transition-all active:scale-95"
          >
            ← BACK
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        {/* 2. Content Container */}
        <div className="max-w-5xl px-6 w-full">
          {/* Floating Title Card */}
          <header className="p-8 md:p-12 relative z-10  ">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded">
                {blog.category}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {Math.ceil((blog.content?.length || 0) / 800)} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-6">
              {blog.title}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed italic border-l-4 border-blue-500 pl-6 mb-8">
              {blog.excerpt}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold border border-slate-200 uppercase text-lg shadow-sm">
                {blog.author?.name?.charAt(0) || "A"}
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">
                  {blog.author?.name || "Team Tripaango"}
                </p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </header>

          {/* 3. Article Body (Clean Typography, Flat Design) */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
            <article className="max-w-3xl mx-auto">
              <div
                className="prose prose-slate prose-lg max-w-none 
            w-full break-words whitespace-normal
            prose-p:text-slate-700 prose-p:leading-[1.9] prose-p:mb-10 prose-p:text-lg
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-img:rounded-none prose-img:shadow-none prose-img:my-16"
              >
                <div
                  className="break-words"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* 4. Minimalist Interaction Row */}
              <footer className="mt-24 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-10">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-xl transition-transform group-hover:scale-110">
                      ❤️
                    </span>
                    <span className="text-sm font-black text-slate-900 tracking-tighter">
                      {blog.likesCount || 0}
                    </span>
                  </button>

                  <button className="flex items-center gap-2 group">
                    <span className="text-xl transition-transform group-hover:scale-110">
                      💬
                    </span>
                    <span className="text-sm font-black text-slate-900 tracking-tighter">
                      {blog.commentsCount || 0}
                    </span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-xl transition-transform group-hover:scale-110">
                      {blog.isSaved ? "🔖" : "📑"}
                    </span>
                    <span className="text-sm font-black text-slate-900 tracking-tighter uppercase tracking-widest text-[10px]">
                      {blog.isSaved ? "Saved" : "Save Story"}
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied!");
                  }}
                  className="text-[11px] font-black text-slate-900 border-b-2 border-orange-500 pb-1 hover:text-orange-600 transition-all uppercase tracking-widest"
                >
                  Share Article
                </button>
              </footer>

              {/* 5. Discussion (Seamless integration) */}
              <section className="mt-24">
                <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">
                  Discussion
                </h3>

                <form onSubmit={handleCommentSubmit} className="mb-16">
                  <textarea
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a response..."
                    className="w-full py-4 border-b border-slate-200 focus:border-orange-500 outline-none transition-all resize-none text-slate-800 bg-transparent placeholder:text-slate-300 text-lg"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="bg-orange-600 text-white px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-30"
                    >
                      Publish Response
                    </button>
                  </div>
                </form>

                <div className="space-y-12">
                  {blog.comments?.map((c, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-200">
                          {c.author?.name?.charAt(0) || "U"}
                        </div>
                        <span className="text-sm font-black text-slate-900 tracking-tight">
                          {c.author?.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase">
                          {new Date(c?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed pl-11">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
