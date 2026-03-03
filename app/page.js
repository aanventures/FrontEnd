import BlogCard from "@/component/Home/BlogCard";
import HeroSearch from "@/component/Home/HeroSearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-gray-800 min-h-screen pt-20">
      <section className="relative max-w-8xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col lg:flex-row items-stretch min-h-[580px]">
          {/* Background Image - Decoupled and Optimized */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
              alt="hero"
              fill
              priority // High priority for LCP
              className="object-cover opacity-20"
            />
          </div>

          {/* LEFT SIDE: Client Component (Interactive) */}
          <div className="flex-1 p-8 lg:p-16 z-10 flex flex-col justify-center">
            <HeroSearch />
          </div>

          {/* RIGHT SIDE: Server Component (Static/Fetched Data) */}
          <div className="flex-1 z-10 p-8 flex items-center justify-center bg-transparent">
            <BlogCard />
          </div>
        </div>
      </section>

      {/* Other sections would go here as separate Server Components */}
    </main>
  );
}
