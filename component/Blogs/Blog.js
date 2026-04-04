"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { fetchAllBlogs } from "@/store/slices/blogSlice";
import Image from "next/image";
import Link from "next/link";

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

      <div className="min-h-screen bg-[#FDF8F2] text-[#2C2C2C] font-montserrat overflow-x-hidden">
        {/* --- ADJUSTED HERO SECTION --- */}
        <section className="relative h-[200px] md:h-[250px] w-full bg-slate-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />

          

          {/* Enhanced Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10" />

          <div className="relative z-20 container mx-auto px-6 md:px-10 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
              Explore{" "}
              <span className="text-amber-500 italic font-serif">
                Travel Stories
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
              Discover destinations, expert tips, and hidden gems before you
              travel.
            </p>
          </div>

          {/* Golden Wave Design - Adjusted height for better transition */}
          {/* <div className="absolute bottom-0 left-0 w-full leading-[0] z-30">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="M0 100L1440 100V40C1440 40 1140 0 720 0C300 0 0 40 0 40V100Z"
                fill="#FDF8F2"
              />
            </svg>
          </div> */}
        </section>

        {/* --- CONTENT AREA --- */}
        <main className="container mx-auto px-4 md:px-10 relative z-40 pb-20 mt-5">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Blog List Grid */}
            <div className="flex-1 order-2 lg:order-1">
              <header className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tighter">
                  Latest Articles
                </h2>
                <div className="h-1.5 w-20 bg-amber-600 mx-auto lg:mx-0 rounded-full mb-4"></div>
                <p className="text-slate-500 font-medium text-base md:text-lg">
                  Explore the best travel guides from around the world.
                </p>
              </header>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1, 2, 4].map((i) => (
                    <div
                      key={i}
                      className="h-96 bg-white rounded-3xl animate-pulse border border-slate-100 shadow-sm"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-3">
                  {blogs?.map((blog) => (
                    <BlogCard key={blog._id?.$oid || blog.id} blog={blog} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-16 flex flex-wrap justify-center items-center gap-3">
                <button className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white hover:border-amber-600 font-black transition-all text-sm">
                  1
                </button>
                <button className="w-12 h-12 rounded-full bg-amber-600 text-white font-black text-sm shadow-lg shadow-amber-600/20">
                  2
                </button>
                <button className="px-6 h-12 rounded-full border-2 border-slate-200 bg-white hover:border-amber-600 font-black transition-all text-sm uppercase tracking-widest">
                  Next
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-[350px] space-y-8 order-1 lg:order-2">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 lg:sticky lg:top-28">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <span className="w-2 h-6 bg-amber-600 rounded-full"></span>
                  Popular Posts
                </h3>

                <ul className="space-y-8">
                  {blogs?.slice(0, 4).map((item, i) => (
                    /* Wrap the entire list item content in a Link */
                    <li key={i}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="flex gap-4 cursor-pointer group"
                      >
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                          <img
                            src={item.image?.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h4 className="text-[14px] font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-amber-700 mt-1 uppercase font-black tracking-widest">
                            {item.category}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Sidebar Newsletter */}
                <div className="mt-12 bg-slate-900 p-8 rounded-[1.5rem] text-center shadow-xl">
                  <p className="text-amber-500 font-black text-[10px] uppercase mb-3 tracking-[0.2em]">
                    Join the Journey
                  </p>
                  <h4 className="text-white font-black text-lg mb-6 leading-tight">
                    Get Travel Tips in Your Inbox
                  </h4>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 text-xs font-bold rounded-xl mb-4 bg-white/10 border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  <button className="w-full bg-amber-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 active:scale-95">
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
