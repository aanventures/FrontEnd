"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  if (loading || blogs.length === 0) return null;

  const blog = blogs[currentIndex];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10 bg-transparent font-montserrat">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
        <div className="h-[1px] bg-slate-200 w-full max-w-[40px] md:max-w-[100px]"></div>
        <h2 className="text-xl md:text-3xl font-serif text-[#1A1A1A] whitespace-nowrap font-black">
          From Our Travel Blog
        </h2>
        <div className="h-[1px] bg-slate-200 w-full max-w-[40px] md:max-w-[100px]"></div>
      </div>

      {/* Main Carousel Card */}
      <div className="relative bg-[#FAF7F2] backdrop-blur-md rounded-[2rem] shadow-sm border border-white flex flex-col md:flex-row min-h-fit md:min-h-[420px] overflow-hidden">
        {/* Image Container */}
        <div className="p-3 md:p-4 w-full md:w-5/12">
          <div className="relative h-[220px] md:h-full w-full rounded-2xl overflow-hidden">
            <Image
              src={
                blog.image?.url ||
                "https://images.unsplash.com/photo-1545105511-923f63f29e07?q=80&w=800"
              }
              alt={blog.title}
              fill={true}
              className="object-cover transition-opacity duration-500"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-12 md:pr-24 w-full md:w-7/12 flex flex-col justify-between relative">
          <div>
            <h4 className="text-sm md:text-base font-black text-amber-700 uppercase tracking-widest mb-1 md:mb-2">
              {blog.category || "Travel Tips"}
            </h4>
            <h3 className="text-sm sm:text-2xl md:text-xl font-serif text-[#1A1A1A] leading-tight mb-3 md:mb-4 font-black">
              {blog.title}
            </h3>
            <p className="text-[10px] md:text-xs text-slate-400 font-black mb-4 md:mb-6 tracking-widest uppercase">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div className="max-w-full md:max-w-[95%] overflow-hidden">
              <p
                className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium 
                     line-clamp-3 md:line-clamp-4 whitespace-normal break-words"
              >
                {blog.content
                  ? blog.content
                      .replace(/<[^>]*>/g, "") // Remove HTML tags
                      .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
                      .replace(/&amp;/g, "&") // Replace ampersands
                  : ""}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-block bg-amber-700 text-white px-5 sm:px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-700/20 hover:bg-amber-800 transition-all active:scale-95"
            >
              Read More
            </Link>
          </div>

          {/* Navigation Arrows - Kept exactly as per your layout request */}
          <div className="flex md:flex-col items-center justify-center gap-8 md:gap-8 mt-8 md:mt-0 py-4 md:py-0 border-t md:border-t-0 md:border-l border-slate-100 md:absolute md:right-0 md:top-0 md:bottom-0 md:w-16">
            <button
              onClick={prevSlide}
              className="p-2 text-slate-300 hover:text-amber-700 transition-colors group"
              aria-label="Previous slide"
            >
              <ChevronRight
                className="rotate-180 transition-transform group-hover:-translate-x-1"
                size={24}
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 text-slate-300 hover:text-amber-700 transition-colors group"
              aria-label="Next slide"
            >
              <ChevronRight
                className="transition-transform group-hover:translate-x-1"
                size={24}
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
