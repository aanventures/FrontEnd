"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  fetchBlogBySlug,
  resetBlogState,
  likeBlogAction,
  addCommentAction,
} from "@/store/slices/blogSlice";
import Image from "next/image";

export default function BlogDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector((state) => state.blog);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (slug) dispatch(fetchBlogBySlug(slug));
    return () => dispatch(resetBlogState());
  }, [slug, dispatch]);

  const handleLike = () => {
    if (!isAuthenticated) return alert("Please login to like");
    dispatch(likeBlogAction(blog._id));
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-amber-500 rounded-full" />
      </div>
    );

  if (!blog || error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Story Not Found</h2>
        <button onClick={() => router.push("/blog")} className="text-amber-500">
          Back to Feed
        </button>
      </div>
    );

  return (
    <main className="bg-white min-h-screen py-[90px] ">
      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden group">
        <Image
          src={blog.image?.url}
          fill
          alt={blog.title}
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-[2000ms]"
        />

        <div className="flex items-center justify-center  bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* <button
          onClick={() => router.back()}
          className=" z-20 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white"
        >
          ← Back
        </button> */}

     
      </section>
      

      {/* FLOATING ACTIONS */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-10 top-1/3 z-40">
        <button
          onClick={handleLike}
          className="w-12 h-12 bg-white shadow rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition"
        >
          <Heart />
        </button>

        <button className="w-12 h-12 bg-white shadow rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition">
          <MessageCircle />
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
          className="w-12 h-12 bg-white shadow rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition"
        >
          <Share2 />
        </button>
      </div>
     {/* CONTENT */}
<section className="max-w-5xl mx-auto px-4 md:px-6 mt-10 md:mt-16">

  {/* TITLE BLOCK */}
  <div className="max-w-3xl text-slate-900">
    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
      {blog.category}
    </span>

    <h1 className="mt-3 text-2xl md:text-4xl font-bold leading-snug tracking-tight">
      {blog.title}
    </h1>
  </div>

  {/* SHORT DESCRIPTION */}
  <div className="w-full mt-4">
    <p
      className="text-slate-600 text-sm md:text-base leading-relaxed font-normal 
                 line-clamp-3 md:line-clamp-4"
    >
      {blog.content
        ? blog.content
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
        : ""}
    </p>
  </div>

  {/* FLOATING INFO CARD */}
  <div className="w-full relative z-20 mt-8">
    <div className="bg-white p-5 md:p-6 rounded-2xl  flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

      {/* AUTHOR */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow">
          {blog.author?.name?.charAt(0) || "A"}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-800">
            {blog.author?.name}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(blog.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="flex gap-6 text-xs md:text-sm text-gray-500 font-medium">
        <span>⏱ {Math.ceil((blog.content?.length || 0) / 800)} min</span>
        <span>💬 {blog.commentsCount || 0}</span>
        <span>❤️ {blog.likesCount || 0}</span>
      </div>
    </div>
  </div>

  {/* COMMENTS */}
  <div className="mt-14 md:mt-20">
    <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-900">
      Comments
    </h3>

    {/* COMMENT BOX */}
    <form
      onSubmit={handleCommentSubmit}
      className="bg-white shadow-sm p-5 rounded-2xl mb-8"
    >
      <textarea
        rows="4"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
      />

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition"
        >
          Post
        </button>
      </div>
    </form>

    {/* COMMENTS LIST */}
    <div className="space-y-5">
      {blog.comments?.map((c, i) => (
        <div key={i} className="flex gap-3">
          
          {/* AVATAR */}
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-sm">
            {c.author?.name?.charAt(0)}
          </div>

          {/* COMMENT CARD */}
          <div className="bg-white rounded-xl p-4 w-full  shadow hover:shadow-md transition">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">
                {c.author?.name}
              </span>
              <span className="text-gray-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {c.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </main>
  );
}
