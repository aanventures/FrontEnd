import Image from "next/image";
import HeroSearch from "@/component/Home/HeroSearch";
import Features from "@/component/Home/Features";
import CategoryCards from "@/component/Home/CategoryCards";
import BlogSection from "@/component/Home/BlogCard";

// Home/page.js
export default function Home() {
  return (
    <main className="bg-white min-h-screen pt-[50px] sm:pt-[90px]">
      {/* FIXED: Removed overflow-hidden and added a higher z-index */}
      <section className="relative h-[600px] md:h-[600px] w-full z-40"> 
        <Image
          src="/Home/banner2.jpeg"
          alt="Coastal View"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/30"></div>

        {/* Added z-50 here to ensure search bar stays top-most */}
        <div className="relative z-50 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif md:mb-4 drop-shadow-lg leading-tight">
            Your Journey, Your Way
          </h1>

          <p className="text-lg md:text-2xl font-light mb-5 md:mb-12 opacity-95 tracking-wide drop-shadow-md">
            Flights, Hotels & Cars – All in One Place
          </p>

          <div className="w-full max-w-5xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* FIXED: Added a lower z-index here so it stays behind the dropdowns */}
      <div className="relative z-0">
        <CategoryCards />
        <div className="py-12 md:py-20 space-y-20">
          <BlogSection />
          <Features />
        </div>
      </div>
    </main>
  );
}