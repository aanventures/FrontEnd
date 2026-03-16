"use client";
import Link from "next/link";
import Image from "next/image";
import cloudinaryLoader from "@/utils/cloudinaryLoader";

export default function BlogCard({ post }) {
  if (!post) return null;

  return (
    <Link href={`/blog/${post.slug}`} className="group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 flex flex-col h-full">
        
        {/* Image Container */}
        <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
          <Image
            loader={cloudinaryLoader}
            src={post.image?.url || "/placeholder.jpg"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-xs font-semibold text-blue-600 uppercase mb-2">
            {post.category}
          </span>
          
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2 italic">
            {post.excerpt}
          </p>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}