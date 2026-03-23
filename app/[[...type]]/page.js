import Image from "next/image";
import HeroSearch from "@/component/Home/HeroSearch";
import Features from "@/component/Home/Features";
import CategoryCards from "@/component/Home/CategoryCards";
import BlogSection from "@/component/Home/BlogCard";

export default function Home() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* HERO SECTION */}
      {/* Changed: h-[500px] on mobile, h-[650px] on medium screens and up */}
      <section className="relative h-[550px] md:h-[650px] w-full overflow-hidden ">
        {/* Main Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600"
          alt="Coastal View"
          fill
          className="object-cover"
          priority
        />

        {/* Decorative Wave Overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-[#FAF7F2] z-10"
          style={{ clipPath: "ellipse(80% 100% at 50% 100%)" }}
        ></div>

        {/* Content Container */}
        <div className="relative pt-[100px] z-20 flex flex-col items-center justify-center h-full text-white text-center px-6">
          {/* Changed: text-3xl for mobile, text-5xl for tablet, text-7xl for desktop */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif mb-4 drop-shadow-md leading-tight">
            Your Journey, Your Way
          </h1>

          {/* Changed: smaller text and reduced margin on mobile */}
          <p className="text-lg md:text-xl font-light mb-6 md:mb-10 opacity-90 tracking-wide">
            Flights, Hotels & Cars – All in One Place
          </p>

          {/* Hero Search - Ensure the component itself is responsive internally! */}
          <div className="w-full max-w-5xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      <div className="pt-20 sm:pt-0">
        <CategoryCards />
        <Features />
        <BlogSection />
      </div>
    </main>
  );
}
