import BlogCard from "@/component/Home/BlogCard";
import HeroSearch from "@/component/Home/HeroSearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-gray-800 min-h-screen pt-16 lg:pt-20">
      {/* Container: Added horizontal padding for small screens */}
      <section className="relative max-w-8xl mx-auto mt-4 lg:mt-12 px-4 sm:px-6 lg:px-8">
        
        {/* The Card: 
            - Changed to flex-col for mobile, flex-row for lg
            - min-h is auto on mobile to prevent overflow, fixed on lg
        */}
        <div className="relative bg-white rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col lg:flex-row items-stretch min-h-fit lg:min-h-[580px]">
          
          {/* Background Image: 
              - Added a slightly higher opacity for mobile to maintain the "look" 
          */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
              alt="hero"
              fill
              priority
              className="object-cover opacity-[0.15] lg:opacity-20"
            />
          </div>


          <div className="w-full lg:flex-[0_0_65%] p-6 sm:p-10 lg:p-16 z-10 flex flex-col justify-center">
            <HeroSearch />
          </div>

          <div className="w-full lg:flex-[0_0_35%]  p-6 sm:p-10 lg:p-8 flex items-center justify-center bg-transparent">
            <div className="w-full max-w-md lg:max-w-full">
              <BlogCard />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}