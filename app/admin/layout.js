"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/component/admin/dashboard/Sidebar";
import { Loader2, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and user is not an admin, redirect to login
    // We use router.replace to prevent the user from clicking "back" into the admin area
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, loading, router]);

  // 1. Show a professional Loading State while checking authentication
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Securing Environment...
        </p>
      </div>
    );
  }

  // 2. If check fails, show nothing (or a small error) while the useEffect redirects
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
         <ShieldAlert className="text-red-500 mb-2" size={48} />
         <p className="text-slate-600 font-bold">Access Denied</p>
      </div>
    );
  }

  // 3. If authenticated and is admin, render the actual layout
  return (
    <div className="flex bg-slate-50 min-h-screen pt-[100px]">
      {/* Static Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header/Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Dashboard Console</h1>
            <p className="text-xs text-slate-500">
              Welcome back, <span className="text-orange-600 font-bold">{user?.name || "Administrator"}</span>
            </p>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}