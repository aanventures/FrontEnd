"use client";
import React from "react";
import Link from "next/link"; // Import Link
import Image from "next/image";

export default function BlogCard({ blog }) {
  // Mapping the DB Object fields correctly
  const imageUrl =
    blog.image?.url ||
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800";
  const category = blog.category || "Travel";
  const title = blog.title;
  const excerpt =
    blog.excerpt ||
    blog.content?.replace(/<[^>]*>?/gm, "").substring(0, 100) + "...";
  const date = blog.createdAt?.$date
    ? new Date(blog.createdAt.$date)
    : new Date();

    console.log(blog)

  // Create the dynamic link path
  const blogPath = `/blog/${blog.slug}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* 1. Make the Image/Title clickable */}
      <Link
        href={blogPath}
        className="relative h-48 w-full overflow-hidden block"
      >
        <Image
          src={imageUrl}
          width={100}
          height={100}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-md font-bold leading-tight line-clamp-2 group-hover:text-[#C9A67F] transition-colors">
            {title}
          </h3>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-600 text-xs line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>

        {/* Metadata Tags */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] mb-4">
          <span className="bg-[#E89E4F] text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
            {category}
          </span>
          <span className="text-gray-400 font-medium">
            {date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 font-medium">5 min read</span>
        </div>

        {/* Engagement Footer */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
          <div className="flex gap-3 text-[11px] font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-red-400 text-xs">❤️</span>{" "}
              {blog.likesCount || 0} Likes
            </span>
            <span className="flex items-center gap-1">
              <span className="text-blue-400 text-xs">💬</span>{" "}
              {blog.commentsCount || 0} Comments
            </span>
          </div>

          {/* 2. Update the button to be a Link component */}
          <Link
            href={blogPath}
            className="bg-[#C9A67F] hover:bg-[#B38D5B] text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-sm transition-colors text-center"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
