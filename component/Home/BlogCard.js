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
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10 bg-transparent">
      {/* Section Header - Text size scales for mobile */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
        <div className="h-[1px] bg-gray-300 w-full max-w-[40px] md:max-w-[100px]"></div>
        <h2 className="text-xl md:text-3xl font-serif text-[#1A1A1A] whitespace-nowrap">
          From Our Travel Blog
        </h2>
        <div className="h-[1px] bg-gray-300 w-full max-w-[40px] md:max-w-[100px]"></div>
      </div>

      {/* Main Carousel Card - Column on mobile, Row on desktop */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row min-h-fit md:min-h-[420px] overflow-hidden">
        
        {/* Image Container - Fixed height on mobile, full height on desktop */}
        <div className="p-3 md:p-4 w-full md:w-5/12">
          <div className="relative h-[220px] md:h-full w-full rounded-2xl overflow-hidden">
            <Image
              src={blog.image?.url || "https://images.unsplash.com/photo-1545105511-923f63f29e07?q=80&w=800"}
              alt={blog.title}
              fill
              className="object-cover transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-12 md:pr-16 w-full md:w-7/12 flex flex-col justify-between relative">
          
          <div>
            <h4 className="text-base md:text-xl font-serif text-[#1A1A1A] mb-1 md:mb-2">
              {blog.category || "Travel"}
            </h4>
            <h3 className="text-xl md:text-2xl font-serif text-[#B38B59] leading-tight mb-3 md:mb-4">
              {blog.title}
            </h3>
            <p className="text-[10px] md:text-sm text-gray-400 font-medium mb-4 md:mb-6 tracking-wide uppercase">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </p>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4 max-w-full md:max-w-[90%]">
              {blog.description}
            </p>
          </div>

          {/* Button - Centered on mobile */}
          <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
            <Link 
              href={`/blog/${blog.slug}`}
              className="inline-block bg-gradient-to-b from-[#D4A373] to-[#B38B59] text-white px-8 md:px-10 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Read More
            </Link>
          </div>

          {/* Navigation Arrows */}
          {/* Desktop: Vertical sidebar | Mobile: Bottom horizontal bar */}
          <div className="flex md:flex-col items-center justify-center gap-8 md:gap-8 mt-8 md:mt-0 py-4 md:py-0 border-t md:border-t-0 md:border-l border-gray-100 md:absolute md:right-0 md:top-0 md:bottom-0 md:w-12">
            <button 
              onClick={prevSlide}
              className="p-2 text-gray-400 hover:text-[#B38B59] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronRight className="rotate-180" size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 text-gray-400 hover:text-[#B38B59] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}