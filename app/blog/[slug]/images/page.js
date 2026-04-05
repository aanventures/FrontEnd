"use client";
import React, { useEffect, useState } from "react"; // Added useState
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { ArrowLeft, Expand, Instagram, Share2, X } from "lucide-react"; // Added X icon
import { fetchBlogBySlug } from "@/store/slices/blogSlice";

export default function BlogGallery() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { blog, loading } = useSelector((state) => state.blog);
  
  // --- NEW STATE FOR FULLSCREEN ---
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (!blog && slug) dispatch(fetchBlogBySlug(slug));
  }, [blog, slug, dispatch]);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="h-12 w-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="bg-[#0c0c0c] min-h-screen text-white selection:bg-amber-500/30 font-montserrat relative">
      
      {/* --- FULLSCREEN LIGHTBOX MODAL --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[210]">
            <X size={40} strokeWidth={1} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
            <Image
              src={selectedImg.url}
              alt={selectedImg.title || "Full View"}
              fill
              className="object-contain"
              priority
            />
            {selectedImg.title && (
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-xl font-serif italic text-white/90">{selectedImg.title}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- PREMIUM STICKY NAV --- */}
      <nav className="sticky top-0 z-[100] bg-[#0c0c0c]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-5">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push(`/blog/${slug}`)}
            className="group flex items-center gap-4 text-white/40 hover:text-white transition-all"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-500 transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] hidden md:block">
              Exit Gallery
            </span>
          </button>

          <div className="flex flex-col items-center">
            <h1 className="text-sm md:text-lg font-serif italic tracking-wide text-white/90">
              {blog?.title}
            </h1>
            <div className="flex items-center gap-3 mt-1">
               <div className="h-[1px] w-4 bg-amber-500/50"></div>
               <span className="text-[8px] text-amber-500 uppercase tracking-[0.4em] font-black">
                 Curated Visuals
               </span>
               <div className="h-[1px] w-4 bg-amber-500/50"></div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="text-white/30 hover:text-white transition-colors">
                <Share2 size={18} />
             </button>
          </div>
        </div>
      </nav>

      {/* --- STAGGERED GRID SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 md:gap-y-64 items-start">
          {blog?.gallery?.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col group ${isEven ? "md:mt-0" : "md:mt-48"}`}
              >
                {/* Meta Info */}
                <div className="flex items-end justify-between mb-8">
                   <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-amber-500 tracking-[0.3em]">
                        PLATE {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-700"></div>
                   </div>
                </div>

                {/* Main Visual Frame */}
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-zoom-in"
                  onClick={() => setSelectedImg(item)} // Clicking the image also opens it
                >
                  <Image
                    src={item.url}
                    alt={item.title || "Gallery Image"}
                    fill
                    className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* View Fullscreen Toggle */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double firing
                        setSelectedImg(item);
                      }}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all"
                    >
                      <Expand size={18} />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="mt-10 px-2 md:px-0">
                  <h3 className="text-2xl md:text-4xl font-serif italic font-medium mb-5 text-white/95 group-hover:text-amber-500 transition-colors duration-500">
                    {item.title || "Untitled Fragment"}
                  </h3>
                  
                  <div className="flex gap-6">
                    <div className="w-[1px] bg-white/10 group-hover:bg-amber-500/50 transition-colors duration-700"></div>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-md">
                      {item.description || "An evocative capture focusing on the interplay of light and texture."}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-48 flex flex-col items-center bg-gradient-to-t from-black to-transparent">
        <div className="w-px h-32 bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent mb-12"></div>
        <button
          onClick={() => router.push(`/blog/${slug}`)}
          className="group relative px-16 py-6 transition-all border border-white/5 hover:border-amber-500/50"
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-white transition-all">
            Return to Narrative
          </span>
        </button>
      </footer>
    </main>
  );
}