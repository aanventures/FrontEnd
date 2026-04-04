import Image from "next/image";
import HeroSearch from "@/component/Home/HeroSearch";
import Features from "@/component/Home/Features";
import CategoryCards from "@/component/Home/CategoryCards";
import BlogSection from "@/component/Home/BlogCard";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pt-[90px]">
      {/* HERO SECTION */}
      <section className="relative h-[600px] md:h-[600px] w-full overflow-hidden">
        {/* 1. Main Background Image */}
        <Image
          src="/Home/banner2.jpeg"
          alt="Coastal View"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* 2. DARK OVERLAY (SCRIM) 
           This makes sure the white text is visible even if the image is bright at the top */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* 3. Decorative Wave Overlay */}
        {/* <div
          className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-[#FAF7F2] z-30"
          style={{ clipPath: "ellipse(80% 100% at 50% 100%)" }}
        ></div> */}

        {/* 4. Content Container 
           Added: pt-32 to push content below the fixed navbar */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif  md:mb-4 drop-shadow-lg leading-tight">
            Your Journey, Your Way
          </h1>

          <p className="text-lg md:text-2xl font-light mb-5 md:mb-12 opacity-95 tracking-wide drop-shadow-md">
            Flights, Hotels & Cars – All in One Place
          </p>

          {/* Hero Search */}
          <div className="w-full max-w-5xl ">
            <HeroSearch />
          </div>
        </div>
      </section>

      <div className="">
       <div className="">
         <CategoryCards />
       </div>
        <div className="py-12 md:py-20 space-y-20">
            <BlogSection />
          <Features />
        
        </div>
      </div>
    </main>
  );
}
