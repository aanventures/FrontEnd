"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "@/store/slices/blogSlice";
import BlogCard from "./BlogCard";
import styles from "./styles/FeaturedSlider.module.css"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Arrow Components
// const NextArrow = ({ onClick }) => (
//   <button
//     className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all border border-slate-100"
//     onClick={onClick}
//   >
//     <ChevronRight size={16} />
//   </button>
// );

// const PrevArrow = ({ onClick }) => (
//   <button
//     className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all border border-slate-100"
//     onClick={onClick}
//   >
//     <ChevronLeft size={16} />
//   </button>
// );

export default function FeaturedSlider() {
  const dispatch = useDispatch();
  const { blogs = [], loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchAllBlogs({ home_page: true, status: "published" }));
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: blogs.length > 1,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, 
    // nextArrow: <NextArrow />, 
    // prevArrow: <PrevArrow />,
    fade: true,
    cssEase: "linear"
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-10 animate-pulse">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-2"></div>
      <p className="text-[10px] text-slate-400 font-bold uppercase">Loading...</p>
    </div>
  );

  if (!blogs.length) return null;

  return (
    <div className={`${styles.sliderWrapper} relative px-2`}>
      {/* <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-1 bg-orange-500 rounded-full"></div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Featured</h3>
      </div> */}

      {/* Added a container to scale down the cards slightly */}
      <div className="w-1/3">
        <Slider {...settings}>
          {blogs.map((post) => (
            <div key={post._id} className="outline-none px-1">
              {/* Added a wrapper to control height/width specifically for the slider */}
              <div className="scale-[0.98] origin-center">
                <BlogCard post={post} compact={true} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}