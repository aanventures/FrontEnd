"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Story Not Found</h2>
        <button
          onClick={() => router.push("/blog")}
          className="text-amber-500 underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Feed
        </button>
      </div>
    );

  return (
    <main className="bg-white min-h-screen py-[70px] md:py-[90px]">
      {/* HERO SLIDER SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] group overflow-hidden">
        {/* GALLERY INDICATOR BADGE */}
        <Link
          href={`/blog/${blog.slug}/images`}
          className="absolute top-6 right-6 z-40 bg-black/40 hover:bg-amber-600 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 transition-all duration-300 flex items-center gap-2 group/badge"
        >
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
            View All Images
          </span>
        </Link>

        <Slider
          {...sliderSettings}
          className="h-full w-full 
      [&_.slick-prev]:left-4 md:[&_.slick-prev]:left-6 [&_.slick-prev]:z-30 
      [&_.slick-next]:right-4 md:[&_.slick-next]:right-6 [&_.slick-next]:z-30
      [&_.slick-prev:before]:text-2xl md:[&_.slick-prev:before]:text-3xl [&_.slick-next:before]:text-2xl md:[&_.slick-next:before]:text-3xl
      [&_.slick-prev:before]:opacity-100 [&_.slick-next:before]:opacity-100"
        >
          {blog?.gallery?.map((item, index) => (
            <div
              key={index}
              className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full outline-none"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />

                {/* Text Layer */}
                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 backdrop-blur-sm flex flex-col items-center px-4 md:px-8 py-4 z-20 w-[90%] md:w-auto max-w-2xl shadow-2xl rounded-sm">
                  {item.title && (
                    <h2 className="text-white text-lg md:text-xl font-bold tracking-widest uppercase text-center mb-2 leading-tight">
                      {item.title}
                    </h2>
                  )}
                  <p className="text-white text-[10px] md:text-sm font-medium leading-relaxed text-center italic opacity-90">
                    {item.description ||
                      "Explore the visual journey of this story. Click to view the full gallery."}
                  </p>

                  {/* Subtle Hint Link at the bottom of the text box */}
                  <span className="mt-3 text-[9px] md:text-[10px] text-amber-400 font-bold uppercase tracking-tighter border-b border-amber-400/30 pb-0.5">
                    Click any image to see full gallery
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* ACTIONS - Desktop: Fixed Left | Mobile: Fixed Bottom Bar */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-6 xl:left-10 top-1/3 z-40">
        <ActionButton
          icon={<Heart size={20} />}
          onClick={handleLike}
          label="Like"
        />
        <ActionButton icon={<MessageCircle size={20} />} label="Comment" />
        <ActionButton
          icon={<Share2 size={20} />}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
          label="Share"
        />
      </div>

      {/* Mobile Floating Actions */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-slate-200">
        <button
          onClick={handleLike}
          className="text-slate-700 active:text-red-500"
        >
          <Heart size={22} />
        </button>
        <div className="w-[1px] h-6 bg-slate-300" />
        <button
          onClick={() => {
            const commentSection = document.getElementById("comment-form");
            commentSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-slate-700"
        >
          <MessageCircle size={22} />
        </button>
        <div className="w-[1px] h-6 bg-slate-300" />
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
          className="text-slate-700"
        >
          <Share2 size={22} />
        </button>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 mt-10 md:mt-20">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {blog.category}
          </span>
          <h1 className="mt-4 md:mt-6 text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {blog.title}
          </h1>
        </div>

        {/* Content */}
        <div
          className="prose prose-slate max-w-none 
                     whitespace-pre-wrap break-words 
                     text-slate-700 text-base md:text-lg leading-relaxed md:leading-loose
                     [&_p]:mb-6 md:[&_p]:mb-8 [&_h2]:text-slate-900 [&_h2]:mt-10 md:[&_h2]:mt-12 [&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-bold"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

        {/* AUTHOR INFO CARD */}
        <div className="mt-12 md:mt-20 p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center font-bold text-lg shadow-lg shrink-0">
              {blog.author?.name?.charAt(0) || "A"}
            </div>
            <div className="text-left">
              <p className="font-bold text-base md:text-lg text-slate-800 leading-none">
                {blog.author?.name}
              </p>
              <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
                {new Date(blog.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-8 md:gap-10 text-slate-500 border-t md:border-t-0 border-slate-200 pt-4 md:pt-0 w-full md:w-auto justify-center">
            <div className="text-center">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                Read Time
              </p>
              <p className="font-bold text-slate-900 text-sm md:text-base">
                {Math.ceil((blog.content?.length || 0) / 800)} min
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                Feedback
              </p>
              <p className="font-bold text-slate-900 text-sm md:text-base">
                {blog.likesCount || 0} Likes
              </p>
            </div>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="mt-16 md:mt-24 mb-32">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 md:mb-10 text-center md:text-left">
            Share your experience
          </h3>

          <form
            id="comment-form"
            onSubmit={handleCommentSubmit}
            className="mb-12 md:mb-16"
          >
            <textarea
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Join the conversation..."
              className="w-full border-2 border-slate-100 bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-5 text-slate-700 text-sm md:text-base outline-none focus:border-amber-400 focus:bg-white transition-all resize-none"
            />
            <div className="flex justify-center md:justify-end mt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold hover:bg-amber-600 transition-all shadow-lg active:scale-95"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-6 md:space-y-8">
            {blog.comments?.map((c, i) => (
              <div
                key={i}
                className="flex gap-4 md:gap-5 p-4 md:p-6 bg-white border border-slate-100 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold shrink-0 text-sm md:text-base">
                  {c.author?.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-sm md:text-base">
                      {c.author?.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-400 font-medium">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
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

// Helper component for Floating Actions
function ActionButton({ icon, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-12 h-12 bg-white shadow-xl rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all active:scale-90 text-slate-600"
    >
      {icon}
    </button>
  );
}
