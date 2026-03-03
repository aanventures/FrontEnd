import LoginForm from "@/component/Login/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative p-6 bg-slate-50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10 w-full flex flex-col lg:flex-row max-w-6xl gap-12 items-center">
        {/* Left Side: Branding/Image (Hidden on mobile)
        <div className="hidden lg:flex flex-1 flex-col justify-center">
          <div className="relative w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-6 mb-8">
            <span className="text-white font-black text-4xl">S</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Unlock your next <br />
            <span className="text-orange-600 underline decoration-blue-200 underline-offset-8">
              adventure.
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-md font-medium">
            Join 2 million travelers booking smarter, faster, and cheaper stays
            globally.
          </p>
        </div> */}

        {/* Right Side: The Interactive Form */}
        <div className="flex-1 flex justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
