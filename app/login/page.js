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
    

        {/* Right Side: The Interactive Form */}
        <div className="flex-1 flex justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
