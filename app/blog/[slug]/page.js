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
import Slider from "react-slick";
import Link from "next/link";

// Required for Slick Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    arrows: true,
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
        <button
          onClick={() => router.push("/blog")}
          className="text-amber-500 underline"
        >
          Back to Feed
        </button>
      </div>
    );

  return (
    <main className="bg-white min-h-screen py-[90px]">
      {/* HERO SLIDER SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] group overflow-hidden">
        <Slider
          {...sliderSettings}
          className="h-full w-full 
            [&_.slick-prev]:left-6 [&_.slick-prev]:z-30 
            [&_.slick-next]:right-6 [&_.slick-next]:z-30
            [&_.slick-prev:before]:text-3xl [&_.slick-next:before]:text-3xl
            [&_.slick-prev:before]:opacity-100 [&_.slick-next:before]:opacity-100"
        >
          {blog?.gallery?.map((item, index) => (
            <div
              key={index}
              className="relative h-[50vh] md:h-[60vh] w-full outline-none"
            >
              <Link
                href={`/blog/${blog.slug}/images`}
                className="block relative w-full h-full"
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.url}
                    fill
                    alt={item.title || blog.title}
                    priority={index === 0}
                    className="object-cover transition-transform duration-[6000ms] scale-100 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-10" />

                {/* Text Layer */}
                {/* Text Layer */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2  backdrop-blur-sm flex flex-col items-center px-8 py-4 z-20 w-[90%] md:w-auto shadow-2xl rounded-sm">
                  {item.title && (
                    <h2 className="text-white text-2xl md:text-xl font-bold tracking-widest uppercase text-center mb-2">
                      {item.title}
                    </h2>
                  )}
                  <p className="max-w-xl text-white text-xs md:text-sm font-medium leading-relaxed text-center italic">
                    {item.description ||
                      "Explore the visual journey of this story. Click to view the full gallery."}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* FLOATING ACTIONS (Desktop) */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-10 top-1/3 z-40">
        <button
          onClick={handleLike}
          className="w-12 h-12 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
        >
          <Heart size={20} />
        </button>

        <button className="w-12 h-12 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
          <MessageCircle size={20} />
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
          className="w-12 h-12 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 mt-12 md:mt-20">
        <div className="mb-10">
          <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {blog.category}
          </span>
          <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] tracking-tight">
            {blog.title}
          </h1>
        </div>

        {/* Content with proper paragraph spacing */}
        <div
          className="prose prose-slate max-w-none 
                     whitespace-pre-wrap break-words 
                     text-slate-700 text-lg leading-loose
                     [&_p]:mb-8 [&_h2]:text-slate-900 [&_h2]:mt-12"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

        {/* AUTHOR INFO CARD */}
        <div className="mt-20 p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center font-bold text-xl shadow-lg">
              {blog.author?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="font-bold text-lg text-slate-800">
                {blog.author?.name}
              </p>
              <p className="text-sm text-slate-400 font-medium">
                {new Date(blog.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-10 text-slate-500">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                Read Time
              </p>
              <p className="font-bold text-slate-900">
                {Math.ceil((blog.content?.length || 0) / 800)} min
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                Feedback
              </p>
              <p className="font-bold text-slate-900">
                {blog.likesCount || 0} Likes
              </p>
            </div>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="mt-24 mb-32">
          <h3 className="text-2xl font-bold text-slate-900 mb-10">
            Share your experience
          </h3>

          <form onSubmit={handleCommentSubmit} className="mb-16">
            <textarea
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Join the conversation..."
              className="w-full border-2 border-slate-100 bg-slate-50 rounded-2xl p-5 text-slate-700 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
            />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold hover:bg-amber-600 transition-all shadow-lg active:scale-95"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-8">
            {blog.comments?.map((c, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold shrink-0">
                  {c.author?.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-slate-900">
                      {c.author?.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
