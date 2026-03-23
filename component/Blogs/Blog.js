"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { fetchAllBlogs } from "@/store/slices/blogSlice";
import Image from "next/image";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchAllBlogs({ status: "published" }));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Tripaango | Travel Blog</title>
      </Head>

      <div className="min-h-screen bg-[#FDF8F2] text-[#2C2C2C] font-serif overflow-x-hidden">
        {/* --- DYNAMIC HERO SECTION --- */}
        <section className="relative h-[450px] md:h-[600px] w-full bg-[#020D32] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600"
            alt="Hero Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />

          <div className="relative z-20 container mx-auto px-6 md:px-10 h-full flex flex-col justify-center text-center md:text-left">
            {/* Responsive Font Sizes: text-4xl on mobile, text-7xl on desktop */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-4 leading-tight">
              Explore{" "}
              <span className="italic text-[#C9A67F]">Travel Stories</span> &
              Guides
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto md:mx-0">
              Discover destinations, expert tips, and hidden gems before you
              travel.
            </p>
          </div>

          {/* Golden Wave Design - SVG responsive handling */}
          <div className="absolute bottom-0 left-0 w-full leading-[0] z-30">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto min-h-[40px]"
            >
              <path
                d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z"
                fill="#FDF8F2"
              />
              <path
                d="M0 60C300 60 720 0 720 0C1140 0 1440 60 1440 60"
                stroke="#C9A67F"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
          </div>
        </section>

        {/* --- CONTENT AREA --- */}
        <main className="container mx-auto px-4 md:px-10 relative z-40 pb-20 -mt-8 md:mt-0">
          {/* flex-col for mobile, flex-row for desktop */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Blog List Grid */}
            <div className="flex-1 order-2 lg:order-1">
              <header className="mb-8 md:mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1D3178] mb-2 tracking-tight">
                  Travel Blog
                </h2>
                <p className="text-gray-500 italic text-sm md:text-base">
                  Explore the best travel guides from around the world.
                </p>
              </header>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-80 bg-white rounded-xl animate-pulse border border-gray-100"
                    />
                  ))}
                </div>
              ) : (
                /* Grid: 1 col on mobile, 2 on tablet, 3 on large screens */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {blogs?.map((blog) => (
                    <BlogCard key={blog._id?.$oid || blog.id} blog={blog} />
                  ))}
                </div>
              )}

              {/* Pagination - Responsive wrap */}
              <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-2">
                <button className="w-10 h-10 rounded border bg-white hover:border-[#C9A67F] transition-colors text-sm">
                  1
                </button>
                <button className="w-10 h-10 rounded border bg-[#C9A67F] text-white text-sm">
                  2
                </button>
                <button className="px-4 h-10 rounded border bg-white hover:border-[#C9A67F] transition-colors text-sm">
                  Next &gt;
                </button>
              </div>
            </div>

            {/* Sidebar - Positioned as order-1 on mobile if you want it on top, 
                or order-2 to keep it below. Usually sidebar goes below content on mobile. */}
            <aside className="w-full lg:w-[320px] space-y-8 order-1 lg:order-2">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-10">
                <h3 className="text-lg md:text-xl font-bold text-[#1D3178] mb-6 border-b pb-4">
                  Popular Posts
                </h3>
                <ul className="space-y-6">
                  {blogs?.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex gap-4 cursor-pointer group">
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image?.url}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <h4 className="text-[13px] font-bold text-[#1D3178] line-clamp-2 leading-tight group-hover:text-[#C9A67F] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">
                          {item.category}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Sidebar Newsletter */}
                <div className="mt-10 bg-[#020D32] p-6 rounded-xl text-center">
                  <p className="text-[#C9A67F] font-bold text-xs uppercase mb-2 tracking-widest">
                    Stay Updated
                  </p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 text-xs rounded mb-3 outline-none focus:ring-1 focus:ring-[#C9A67F]"
                  />
                  <button className="w-full bg-[#C9A67F] text-white py-2.5 rounded text-xs font-bold hover:bg-[#B38D5B] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPage;