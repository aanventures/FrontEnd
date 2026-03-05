import Image from "next/image";

export default function BlogCard() {
  // In a real app, you could fetch data here:
  // const post = await getLatestPost();

  return (
    <div className="relative w-full group">
      <div className="absolute -inset-4 bg-gradient-to-tr from-orange-100 to-blue-50 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
      <div className="relative bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-white transform transition duration-500 hover:-translate-y-2">
        <div className="relative h-64 w-full">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop"
            alt="Blog post"
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-tighter">
            Trending Stories
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            How to find the cheapest hotel deals in 2026
          </h3>
          <p className="text-slate-500 text-sm mt-3 line-clamp-2">
            Discover the secret tricks travel agencies don't want you to know...
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">5 min read</span>
            <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition">
              Read Story →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}