import Sidebar from "@/component/admin/dashboard/Sidebar";

export default function AdminLayout({ children }) {
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
            <p className="text-xs text-slate-500">Welcome back, Administrator</p>
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