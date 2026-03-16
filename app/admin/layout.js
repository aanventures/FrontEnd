"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/component/admin/dashboard/Sidebar";
import { Loader2, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (!isAuthenticated || user?.role !== "admin") {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, user, loading, router, isMounted]);

  if (!isMounted || loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Verifying Authority
        </p>
      </div>
    );
  }

  // 2. Fallback for unauthorized (while redirect happens)
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <ShieldAlert className="text-red-500 mb-4" size={48} />
        <p className="text-slate-900 font-black uppercase tracking-widest text-xs">Access Denied</p>
      </div>
    );
  }

  // 3. Final Layout
  return (
    <div className="flex bg-slate-50 min-h-screen pt-[100px]">
      <Sidebar />
      <div className="flex-1 flex flex-col"> {/* Adjusted for sidebar width */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Console</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Admin: <span className="text-orange-600">{user?.name}</span>
            </p>
          </div>
        </header>

        <main className="p-3">
          {children}
        </main>
      </div>
    </div>
  );
}