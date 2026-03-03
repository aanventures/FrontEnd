"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  ChevronDown, 
  PlusCircle, 
  List,
  Settings,
  LogOut 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({ property: true, blog: false });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (href) => pathname === href;

  return (
    <aside className="w-72 bg-slate-900 h-screen sticky top-0 flex flex-col text-slate-300 border-r border-slate-800">
      {/* Admin Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
        <span className="text-xl font-black text-white tracking-tighter">Ankush </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin') ? 'bg-orange-600 text-white' : 'hover:bg-slate-800'}`}>
          <LayoutDashboard size={20} />
          <span className="font-semibold text-sm">Overview</span>
        </Link>

        {/* PROPERTY TOGGLE SECTION */}
        <div>
          <button 
            onClick={() => toggleMenu('property')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <Home size={20} />
              <span className="font-semibold text-sm">Properties</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${openMenus.property ? 'rotate-180' : ''}`} />
          </button>
          
          {openMenus.property && (
            <div className="mt-2 ml-4 pl-4 border-l border-slate-800 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <Link href="/admin/properties/add" className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:text-white transition-colors ${isActive('/admin/properties/add') ? 'text-orange-500 font-bold' : ''}`}>
                <PlusCircle size={16} /> Add Property
              </Link>
              <Link href="/admin/properties" className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:text-white transition-colors ${isActive('/admin/properties') ? 'text-orange-500 font-bold' : ''}`}>
                <List size={16} /> All Properties
              </Link>
            </div>
          )}
        </div>

        {/* BLOG TOGGLE SECTION */}
        <div>
          <button 
            onClick={() => toggleMenu('blog')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span className="font-semibold text-sm">Blogs</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${openMenus.blog ? 'rotate-180' : ''}`} />
          </button>

          {openMenus.blog && (
            <div className="mt-2 ml-4 pl-4 border-l border-slate-800 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <Link href="/admin/blogs/add" className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:text-white transition-colors ${isActive('/admin/blogs/add') ? 'text-orange-500 font-bold' : ''}`}>
                <PlusCircle size={16} /> Write Post
              </Link>
              <Link href="/admin/blogs" className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg hover:text-white transition-colors ${isActive('/admin/blogs') ? 'text-orange-500 font-bold' : ''}`}>
                <List size={16} /> All Posts
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-800 rounded-xl transition-all">
          <Settings size={20} /> Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}